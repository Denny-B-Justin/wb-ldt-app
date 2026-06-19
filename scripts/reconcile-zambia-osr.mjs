import fs from "node:fs/promises";
import path from "node:path";

import { parse } from "csv-parse/sync";

const ROOT_DIR = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DATA_DIR = path.join(ROOT_DIR, "data");
const OUTPUT_DIR = path.join(ROOT_DIR, "outputs", "zambia-osr-reconciliation");

const SCORE_FILE = "GPBP_LDT_ZMB_scores_admin_2.csv";
const OSR_FILE = "OSR.csv";

const OSR_VALUE_COLUMNS = [
  "local_taxes",
  "fees_charges",
  "licences",
  "levies",
  "permits",
  "com_ventures",
  "total_OSR",
];

const PROVINCE_ALIASES = new Map([
  ["central", "Central"],
  ["copperbelt", "Copperbelt"],
  ["eastern", "Eastern"],
  ["luapula", "Luapula"],
  ["lusaka", "Lusaka"],
  ["muchiga", "Muchinga"],
  ["muchinga", "Muchinga"],
  ["north western", "North-Western"],
  ["northern", "Northern"],
  ["southern", "Southern"],
  ["western", "Western"],
]);

const DISTRICT_ALIASES = new Map([
  ["chienge", "Chiengi"],
  ["milenge", "Milengi"],
  ["mushindamo", "Mushindano"],
  ["chikankata", "Chikankanta"],
  ["shang ombo", "Shangombo"],
]);

const OSR_PAIR_OVERRIDES = new Map([
  [
    "eastern::chama",
    {
      province: "Muchinga",
      district: "Chama",
      note: "OSR province differs from score/admin geography: Eastern -> Muchinga",
    },
  ],
  [
    "southern::chirundu",
    {
      province: "Lusaka",
      district: "Chirundu",
      note: "OSR province differs from score/admin geography: Southern -> Lusaka",
    },
  ],
]);

function cleanLabel(value) {
  return String(value ?? "").trim();
}

function normalizeText(value) {
  return cleanLabel(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleCaseFromNormalized(value) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

function canonicalizeProvince(value) {
  const source = cleanLabel(value);
  const normalized = normalizeText(source);
  const canonical = PROVINCE_ALIASES.get(normalized) ?? titleCaseFromNormalized(normalized);
  const notes = [];

  if (source && source !== canonical) {
    notes.push(`province normalized: ${source} -> ${canonical}`);
  }

  return { canonical, normalized, notes };
}

function stripCouncilSuffix(value) {
  const source = cleanLabel(value).replace(/([a-z])Town Council$/i, "$1 Town Council");
  const stripped = source.replace(
    /\s+(Municipal|City|Town)\s+(Council|Coucil)$/i,
    "",
  );

  return {
    value: stripped.trim(),
    changed: source !== stripped,
  };
}

function canonicalizeDistrict(value) {
  const source = cleanLabel(value);
  const stripped = stripCouncilSuffix(source);
  const normalized = normalizeText(stripped.value);
  const alias = DISTRICT_ALIASES.get(normalized);
  const canonical = alias ?? stripped.value;
  const notes = [];

  if (stripped.changed) {
    notes.push(`council suffix removed: ${source} -> ${stripped.value}`);
  }

  if (alias && alias !== stripped.value) {
    notes.push(`district spelling normalized: ${stripped.value} -> ${alias}`);
  }

  return {
    canonical,
    normalized: normalizeText(canonical),
    sourceNormalized: normalizeText(source),
    notes,
  };
}

function canonicalizeScoreGeography(record) {
  const province = canonicalizeProvince(record.Province);
  const district = canonicalizeDistrict(record.District);

  return {
    canonicalProvince: province.canonical,
    canonicalDistrict: district.canonical,
    provinceNormalized: normalizeText(province.canonical),
    districtNormalized: normalizeText(district.canonical),
    notes: [...province.notes, ...district.notes],
  };
}

function canonicalizeOsrGeography(record) {
  const province = canonicalizeProvince(record.Province);
  const district = canonicalizeDistrict(record.District);
  const rawOverrideKey = `${province.normalized}::${district.normalized}`;
  const override = OSR_PAIR_OVERRIDES.get(rawOverrideKey);
  const notes = [...province.notes, ...district.notes];

  let canonicalProvince = province.canonical;
  let canonicalDistrict = district.canonical;

  if (override) {
    canonicalProvince = override.province;
    canonicalDistrict = override.district;
    notes.push(override.note);
  }

  return {
    canonicalProvince,
    canonicalDistrict,
    provinceNormalized: normalizeText(canonicalProvince),
    districtNormalized: normalizeText(canonicalDistrict),
    notes,
  };
}

function keyFor(year, province, district) {
  return `${year}::${province}::${district}`;
}

function pairKey(province, district) {
  return `${province}::${district}`;
}

function dedupeValues(values) {
  return [...new Set(values.filter((value) => value !== "" && value !== undefined))];
}

function toCsv(rows, columns) {
  const escape = (value) => {
    if (value === null || value === undefined) {
      return "";
    }

    const text = String(value);
    if (/[",\r\n]/.test(text)) {
      return `"${text.replace(/"/g, '""')}"`;
    }

    return text;
  };

  return `${[
    columns.map(escape).join(","),
    ...rows.map((row) => columns.map((column) => escape(row[column])).join(",")),
  ].join("\n")}\n`;
}

async function readCsv(fileName) {
  const raw = await fs.readFile(path.join(DATA_DIR, fileName), "utf8");
  return parse(raw, {
    bom: true,
    columns: true,
    skip_empty_lines: true,
  });
}

function buildScoreIndexes(scoreRows) {
  const byTemporalKey = new Map();
  const byPairKey = new Map();

  for (const row of scoreRows) {
    const geography = canonicalizeScoreGeography(row);
    const temporalKey = keyFor(
      row.Year,
      geography.provinceNormalized,
      geography.districtNormalized,
    );
    const geographyPairKey = pairKey(geography.provinceNormalized, geography.districtNormalized);
    const indexed = {
      row,
      ...geography,
    };

    if (byTemporalKey.has(temporalKey)) {
      throw new Error(`Duplicate score key after normalization: ${temporalKey}`);
    }

    byTemporalKey.set(temporalKey, indexed);

    if (!byPairKey.has(geographyPairKey)) {
      byPairKey.set(geographyPairKey, indexed);
    }
  }

  return { byTemporalKey, byPairKey };
}

function reconcileOsrRows(osrRows, scoreByTemporalKey, scoreByPairKey) {
  return osrRows.map((row) => {
    const geography = canonicalizeOsrGeography(row);
    const temporalKey = keyFor(
      row.Year,
      geography.provinceNormalized,
      geography.districtNormalized,
    );
    const geographyPairKey = pairKey(geography.provinceNormalized, geography.districtNormalized);
    const scoreMatch = scoreByTemporalKey.get(temporalKey);
    const scoreGeography = scoreByPairKey.get(geographyPairKey);
    const matchedScore = scoreMatch ?? scoreGeography;
    const notes = [...geography.notes];

    if (matchedScore?.row.Province && matchedScore.row.Province !== geography.canonicalProvince) {
      notes.push(
        `score province normalized: ${matchedScore.row.Province} -> ${geography.canonicalProvince}`,
      );
    }

    if (matchedScore?.row.District && matchedScore.row.District !== geography.canonicalDistrict) {
      notes.push(
        `score district normalized: ${matchedScore.row.District} -> ${geography.canonicalDistrict}`,
      );
    }

    return {
      ...row,
      canonical_Province: geography.canonicalProvince,
      canonical_District: geography.canonicalDistrict,
      matched_score_Province: matchedScore?.row.Province ?? "",
      matched_score_District: matchedScore?.row.District ?? "",
      join_key: temporalKey,
      match_status: scoreMatch ? "matched" : "no_score_match",
      reconciliation_notes: dedupeValues(notes).join("; "),
    };
  });
}

function buildCrosswalk(reconciledOsrRows) {
  const groups = new Map();

  for (const row of reconciledOsrRows) {
    const key = `${row.Province}::${row.District}::${row.canonical_Province}::${row.canonical_District}`;
    const group = groups.get(key) ?? {
      osr_Province: row.Province,
      osr_District: row.District,
      canonical_Province: row.canonical_Province,
      canonical_District: row.canonical_District,
      matched_score_Province: row.matched_score_Province,
      matched_score_District: row.matched_score_District,
      match_status: row.match_status,
      osr_years: [],
      osr_rows: 0,
      reconciliation_notes: [],
    };

    group.osr_years.push(row.Year);
    group.osr_rows += 1;
    group.reconciliation_notes.push(row.reconciliation_notes);
    if (row.match_status !== "matched") {
      group.match_status = row.match_status;
    }

    groups.set(key, group);
  }

  return [...groups.values()]
    .map((group) => ({
      ...group,
      osr_years: dedupeValues(group.osr_years).sort().join(";"),
      reconciliation_notes: dedupeValues(group.reconciliation_notes).join("; "),
    }))
    .sort((left, right) =>
      [
        left.canonical_Province.localeCompare(right.canonical_Province),
        left.canonical_District.localeCompare(right.canonical_District),
        left.osr_Province.localeCompare(right.osr_Province),
        left.osr_District.localeCompare(right.osr_District),
      ].find((comparison) => comparison !== 0) ?? 0,
    );
}

function buildOsrIndex(reconciledOsrRows) {
  const byTemporalKey = new Map();

  for (const row of reconciledOsrRows) {
    if (row.match_status !== "matched") {
      continue;
    }

    if (byTemporalKey.has(row.join_key)) {
      throw new Error(`Duplicate OSR key after reconciliation: ${row.join_key}`);
    }

    byTemporalKey.set(row.join_key, row);
  }

  return byTemporalKey;
}

function buildMergedRows(scoreRows, osrByTemporalKey) {
  return scoreRows.map((scoreRow) => {
    const scoreGeography = canonicalizeScoreGeography(scoreRow);
    const temporalKey = keyFor(
      scoreRow.Year,
      scoreGeography.provinceNormalized,
      scoreGeography.districtNormalized,
    );
    const osrRow = osrByTemporalKey.get(temporalKey);

    return {
      ...scoreRow,
      canonical_Province: scoreGeography.canonicalProvince,
      canonical_District: scoreGeography.canonicalDistrict,
      ...Object.fromEntries(OSR_VALUE_COLUMNS.map((column) => [column, osrRow?.[column] ?? ""])),
      osr_source_Province: osrRow?.Province ?? "",
      osr_source_District: osrRow?.District ?? "",
      osr_match_status: osrRow
        ? "matched"
        : Number(scoreRow.Year) > 2024
          ? "no_osr_for_year"
          : "no_osr_match",
      osr_match_notes: osrRow?.reconciliation_notes ?? "",
    };
  });
}

function summarize(reconciledOsrRows, mergedRows, crosswalkRows) {
  const unmatchedOsr = reconciledOsrRows.filter((row) => row.match_status !== "matched");
  const unmatchedScore = mergedRows.filter((row) => row.osr_match_status === "no_osr_match");
  const rowsWithNotes = crosswalkRows.filter((row) => row.reconciliation_notes);
  const scoreRowsWithOsr = mergedRows.filter((row) => row.osr_match_status === "matched");
  const scoreRowsWithoutOsrYear = mergedRows.filter(
    (row) => row.osr_match_status === "no_osr_for_year",
  );

  return [
    {
      metric: "OSR rows",
      value: reconciledOsrRows.length,
    },
    {
      metric: "OSR rows matched to score geography",
      value: reconciledOsrRows.length - unmatchedOsr.length,
    },
    {
      metric: "OSR rows without score match",
      value: unmatchedOsr.length,
    },
    {
      metric: "Score rows with OSR values",
      value: scoreRowsWithOsr.length,
    },
    {
      metric: "Score rows without OSR match in common years",
      value: unmatchedScore.length,
    },
    {
      metric: "Score rows for years not present in OSR",
      value: scoreRowsWithoutOsrYear.length,
    },
    {
      metric: "Unique OSR geography crosswalk rows",
      value: crosswalkRows.length,
    },
    {
      metric: "Crosswalk rows with normalization notes",
      value: rowsWithNotes.length,
    },
  ];
}

const scoreRows = await readCsv(SCORE_FILE);
const osrRows = await readCsv(OSR_FILE);
const { byTemporalKey: scoreByTemporalKey, byPairKey: scoreByPairKey } =
  buildScoreIndexes(scoreRows);
const reconciledOsrRows = reconcileOsrRows(osrRows, scoreByTemporalKey, scoreByPairKey);
const crosswalkRows = buildCrosswalk(reconciledOsrRows);
const osrByTemporalKey = buildOsrIndex(reconciledOsrRows);
const mergedRows = buildMergedRows(scoreRows, osrByTemporalKey);
const summaryRows = summarize(reconciledOsrRows, mergedRows, crosswalkRows);
const unmatchedRows = [
  ...reconciledOsrRows
    .filter((row) => row.match_status !== "matched")
    .map((row) => ({
      source: "OSR",
      Year: row.Year,
      Province: row.Province,
      District: row.District,
      canonical_Province: row.canonical_Province,
      canonical_District: row.canonical_District,
      status: row.match_status,
      notes: row.reconciliation_notes,
    })),
  ...mergedRows
    .filter((row) => row.osr_match_status === "no_osr_match")
    .map((row) => ({
      source: "scores",
      Year: row.Year,
      Province: row.Province,
      District: row.District,
      canonical_Province: row.canonical_Province,
      canonical_District: row.canonical_District,
      status: row.osr_match_status,
      notes: row.osr_match_notes,
    })),
];

await fs.mkdir(OUTPUT_DIR, { recursive: true });

await fs.writeFile(
  path.join(OUTPUT_DIR, "summary.csv"),
  toCsv(summaryRows, ["metric", "value"]),
  "utf8",
);
await fs.writeFile(
  path.join(OUTPUT_DIR, "geography_crosswalk.csv"),
  toCsv(crosswalkRows, [
    "osr_Province",
    "osr_District",
    "canonical_Province",
    "canonical_District",
    "matched_score_Province",
    "matched_score_District",
    "match_status",
    "osr_years",
    "osr_rows",
    "reconciliation_notes",
  ]),
  "utf8",
);
await fs.writeFile(
  path.join(OUTPUT_DIR, "osr_reconciled.csv"),
  toCsv(reconciledOsrRows, [
    ...Object.keys(osrRows[0]),
    "canonical_Province",
    "canonical_District",
    "matched_score_Province",
    "matched_score_District",
    "join_key",
    "match_status",
    "reconciliation_notes",
  ]),
  "utf8",
);
await fs.writeFile(
  path.join(OUTPUT_DIR, "scores_with_osr_2021_2025.csv"),
  toCsv(mergedRows, [
    ...Object.keys(scoreRows[0]),
    "canonical_Province",
    "canonical_District",
    ...OSR_VALUE_COLUMNS,
    "osr_source_Province",
    "osr_source_District",
    "osr_match_status",
    "osr_match_notes",
  ]),
  "utf8",
);
await fs.writeFile(
  path.join(OUTPUT_DIR, "unmatched.csv"),
  toCsv(unmatchedRows, [
    "source",
    "Year",
    "Province",
    "District",
    "canonical_Province",
    "canonical_District",
    "status",
    "notes",
  ]),
  "utf8",
);

console.log(`Wrote reconciliation outputs to ${path.relative(ROOT_DIR, OUTPUT_DIR)}`);
for (const row of summaryRows) {
  console.log(`${row.metric}: ${row.value}`);
}

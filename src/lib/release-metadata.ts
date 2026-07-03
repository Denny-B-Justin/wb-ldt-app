import nplAnalyticsData from "@/generated/analytics-data.json";
import serbiaAnalyticsData from "@/generated/serbia/analytics-data.json";
import zambiaAnalyticsData from "@/generated/zambia/analytics-data.json";
import { countries, type CountrySlug } from "@/lib/countries";

type ReleaseDataset = {
  release: {
    key: string;
    year: number;
    adminFileName: string;
    scoreFileName: string;
    geojsonFileName: string;
    indicatorWorkbookFileName: string;
  };
  coverage: {
    analyticsMunicipalityCount: number;
    mapMunicipalityCount: number;
    analyticsOnlyCount: number;
    boundaryOnlyCount: number;
  };
  years: number[];
};

export type ReleaseMetadata = {
  countryCode: string;
  countrySlug: CountrySlug;
  countryName: string;
  releaseKey: string;
  latestDataYear: number;
  availableYears: number[];
  methodologyVersion: string;
  analyticsMunicipalityCount: number;
  mapMunicipalityCount: number;
  analyticsOnlyCount: number;
  boundaryOnlyCount: number;
  sourceFiles: {
    admin: string;
    scores: string;
    boundaries: string;
    indicators: string;
  };
  caveats: string[];
};

export type GlobalReleaseSummary = {
  countryCount: number;
  totalLoadedLocalUnits: number;
  latestDataYear: number;
  releaseKeys: string[];
  methodologyVersion: string;
};

const methodologyVersion = "PIL v1.5";

const datasetsBySlug: Record<CountrySlug, ReleaseDataset> = {
  nepal: nplAnalyticsData,
  serbia: serbiaAnalyticsData,
  zambia: zambiaAnalyticsData,
};

function buildCaveats(dataset: ReleaseDataset) {
  const caveats = [
    "Generated release metadata reflects the currently loaded LDT analytics package.",
  ];

  if (dataset.coverage.analyticsOnlyCount > 0) {
    caveats.push(
      `${dataset.coverage.analyticsOnlyCount} analytics rows do not have matching boundary features.`,
    );
  }

  if (dataset.coverage.boundaryOnlyCount > 0) {
    caveats.push(
      `${dataset.coverage.boundaryOnlyCount} boundary features do not have matching analytics rows.`,
    );
  }

  return caveats;
}

function buildReleaseMetadata(countrySlug: CountrySlug): ReleaseMetadata {
  const country = countries.find((candidate) => candidate.slug === countrySlug);
  const dataset = datasetsBySlug[countrySlug];

  if (!country) {
    throw new Error(`Unsupported country slug: ${countrySlug}`);
  }

  const latestDataYear = Math.max(dataset.release.year, ...dataset.years);

  return {
    countryCode: country.code,
    countrySlug,
    countryName: country.name,
    releaseKey: dataset.release.key,
    latestDataYear,
    availableYears: [...dataset.years].sort((left, right) => left - right),
    methodologyVersion,
    analyticsMunicipalityCount: dataset.coverage.analyticsMunicipalityCount,
    mapMunicipalityCount: dataset.coverage.mapMunicipalityCount,
    analyticsOnlyCount: dataset.coverage.analyticsOnlyCount,
    boundaryOnlyCount: dataset.coverage.boundaryOnlyCount,
    sourceFiles: {
      admin: dataset.release.adminFileName,
      scores: dataset.release.scoreFileName,
      boundaries: dataset.release.geojsonFileName,
      indicators: dataset.release.indicatorWorkbookFileName,
    },
    caveats: buildCaveats(dataset),
  };
}

export function getAllReleaseMetadata(): ReleaseMetadata[] {
  return countries.map((country) => buildReleaseMetadata(country.slug));
}

export function getReleaseMetadataBySlug(slug: string) {
  if (!Object.hasOwn(datasetsBySlug, slug)) {
    return null;
  }

  return buildReleaseMetadata(slug as CountrySlug);
}

export function getGlobalReleaseSummary(): GlobalReleaseSummary {
  const metadata = getAllReleaseMetadata();

  return {
    countryCount: metadata.length,
    totalLoadedLocalUnits: metadata.reduce(
      (sum, release) => sum + release.analyticsMunicipalityCount,
      0,
    ),
    latestDataYear: Math.max(
      ...metadata.map((release) => release.latestDataYear),
    ),
    releaseKeys: metadata.map((release) => release.releaseKey),
    methodologyVersion,
  };
}

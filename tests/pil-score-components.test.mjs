import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const generatedAnalyticsFiles = [
  "src/generated/analytics-data.json",
  "src/generated/zambia/analytics-data.json",
  "src/generated/serbia/analytics-data.json",
];

const transportClimateComponents = [
  "Railway Heatwave Score",
  "Road Heatwave Score",
  "Road Flood Score",
  "Railway Flood Score",
];

test("transport climate-risk score components belong to Livability", async () => {
  for (const filePath of generatedAnalyticsFiles) {
    const dataset = JSON.parse(await readFile(filePath, "utf8"));
    const infrastructure = dataset.scoreDefinitions.find(
      (definition) => definition.id === "infrastructure_score",
    );
    const livability = dataset.scoreDefinitions.find(
      (definition) => definition.id === "livability_score",
    );

    assert.ok(infrastructure, `${filePath} has Infrastructure Score definition`);
    assert.ok(livability, `${filePath} has Livability Score definition`);

    for (const component of transportClimateComponents) {
      assert.ok(
        livability.componentLabels.includes(component),
        `${component} is under Livability Score in ${filePath}`,
      );
      assert.ok(
        !infrastructure.componentLabels.includes(component),
        `${component} is not under Infrastructure Score in ${filePath}`,
      );
    }
  }
});

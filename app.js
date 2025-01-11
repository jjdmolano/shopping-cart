import { processItems } from "./modules/processItems.js";

// test data import to simulate data coming from the front-end
import testData from "./db/scenarios.json" with { type: "json" };
// test data divided into scenarios
const { scenario1, scenario2, scenario3, scenario4 } = testData;

export function handler(data) {
  processItems(data);
}
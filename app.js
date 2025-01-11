import { processItems } from "./modules/processItems.js";

export function handler(data) {
  processItems(data);
}
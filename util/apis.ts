export function serverNowDate() {
  return new Date();
}

import { prisma as db } from "./db";
import * as apiProxy from "./server/apiProxy";

export { db, apiProxy };

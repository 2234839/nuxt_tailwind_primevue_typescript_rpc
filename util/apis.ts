export function serverNowDate() {
  return new Date();
}

import { prisma as db } from "./db";

export { db };

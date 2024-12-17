import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export { prisma };

async function test() {
  // prisma 会报错，但实际是启用成功了的
  // 启用 WAL 模式
  //  await prisma.$executeRawUnsafe(`PRAGMA journal_mode = WAL;`)

  // 设置 synchronous 为 NORMAL 以提高性能（可选）
  //  默认是 2n: synchronous 设置为 FULL (2) 提供了最高级别的数据安全性，确保在系统崩溃或断电的情况下数据不会丢失。
  //  await prisma.$executeRawUnsafe(`PRAGMA synchronous = NORMAL;`)

  // 验证设置
  const journalMode = await prisma.$queryRaw`PRAGMA journal_mode;`;
  const synchronous = await prisma.$queryRaw`PRAGMA synchronous;`;

  console.log("[SQLITE]", journalMode);
  console.log("[SQLITE]", synchronous);
}

test();

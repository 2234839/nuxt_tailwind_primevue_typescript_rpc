import type { Prisma } from "@prisma/client";

/**
 * 用于导出prisma对象的类型
 *
 * 例如
 * ```ts
 * type Order = exportPrismaFindFirst<typeof API.db.order>;
 * ```
 */
export type exportPrismaFindFirst<T extends { findFirst: () => any }> = NonNullable<
  Awaited<ReturnType<T["findFirst"]>>
>;

export type OrderPayload<T extends Prisma.OrderFindFirstArgs = {}> = NonNullable<
  Awaited<Prisma.OrderGetPayload<T>>
>;
export type OrderWhereInput = Prisma.OrderWhereInput;

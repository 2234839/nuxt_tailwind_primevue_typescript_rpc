import { defineEventHandler, readBody } from "h3";
import SuperJSON from "superjson";
import { prisma } from "~/util/db";
import { RC } from "~/util/rpc";

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, "auth-token");
  let user;
  if (cookie) {
    user = await prisma.user.findFirst;
  }
  if (!user) {
    return {
      success: false,
      error: {
        code: "no login",
        msg: "请先登录",
      },
    };
  }
  try {
    const { method, data } = await readBody(event);
    const arg = SuperJSON.deserialize<any[]>(data);
    console.log(`RPC ${method}(...)`); // Debug log
    const res = await RC(method, arg);
    return {
      success: true,
      data: SuperJSON.serialize(res),
    };
  } catch (error: any) {
    console.error("RPC error:", error);
    return { success: false, error: error?.message };
  }
});

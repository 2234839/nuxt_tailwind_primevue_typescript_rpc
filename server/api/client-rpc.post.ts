import { defineEventHandler, readBody } from "h3";
import SuperJSON from "superjson";
import { RC } from "~/util/client.rpc";
export default defineEventHandler(async (event) => {
  try {
    const { method, data } = await readBody(event);
    const arg = SuperJSON.deserialize<any[]>(data);
    console.log(`RPC ${method}(...)`); // Debug log
    const res = await RC(method, arg);
    if (method === "user.login") {
      setCookie(event, "auth-token", res.cookie, { expires: new Date(Date.now() + 3600000) });
    }
    return {
      success: true,
      data: SuperJSON.serialize(res),
    };
  } catch (error: any) {
    console.error("RPC error:", error);
    return { success: false, error: error?.message };
  }
});

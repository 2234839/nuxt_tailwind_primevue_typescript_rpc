import { API } from "../rpc";

/** 检测请求往返耗时 */
export const ping = async () => {
  const time1 = Date.now();
  const serverNow = (await API.serverNowDate()).getTime();
  const time2 = Date.now();
  return {
    time1,
    serverNow,
    time2,
    /**
     * eq: ping client--{12}->server--{7}-->client full{19}
     */
    msg: `ping client--{${serverNow - time1}}->server--{${time2 - serverNow}}-->client full{${
      time2 - time1
    }}`,
  };
};

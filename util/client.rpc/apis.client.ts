import { prisma } from "../db";

const user = {
  async login(userInfo: { username: string; password: string }) {
    await new Promise((r) => setTimeout(r, Math.random() * 2000));
    const cookie = Math.random().toString(36);
    const user = prisma.user.update({
      where: { name: userInfo.username, password: userInfo.password },
      data: {
        cookie,
      },
    });
    return user;
  },
};
export { user };

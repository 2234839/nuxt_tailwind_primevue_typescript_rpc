import { prisma } from "../db";
import SuperJSON from "superjson";

type Task = any;

const apiProxyTaskUtil = {
  const: {
    status: {
      待处理: "待处理",
      处理中: "处理中",
      处理完毕: "处理完毕",
    },
  },
};

async function validateApiProxy(userId: number, token: string) {
  const apiProxy = await prisma.apiProxy.findFirst({
    where: {
      userId,
      token,
    },
  });

  if (!apiProxy) {
    throw new Error("token 或用户 id 不正确");
  }

  return apiProxy;
}

type AsyncFunction<T, R> = (arg: T) => Promise<R>;

function withErrorHandling<T, R>(
  fn: AsyncFunction<T, R>,
): AsyncFunction<T, R | { errMsg: string }> {
  return async (arg: T) => {
    try {
      return await fn(arg);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { errMsg: error.message };
      }
      return { errMsg: String(error) };
    }
  };
}

/** 创建多个任务 */
export const createTasks = withErrorHandling(
  async (options: { task: Task[]; token: string; userId: number }) => {
    const apiProxy = await validateApiProxy(options.userId, options.token);
    return await prisma.apiProxyTask.createMany({
      data: options.task.map((el) => ({
        apiProxyId: apiProxy.id,
        possessor: "",
        req: SuperJSON.stringify(el),
        res: "",
        status: apiProxyTaskUtil.const.status.待处理,
      })),
    });
  },
);

/** 获取所有未被处理的任务并设置为处理中 */
export const fetchTasks = withErrorHandling(
  async (options: { token: string; userId: number; possessor: string; limit?: number }) => {
    const apiProxy = await validateApiProxy(options.userId, options.token);
    const limit = options.limit || 10;

    return await prisma.$transaction(async (tx) => {
      const tasks = await tx.apiProxyTask.findMany({
        where: {
          apiProxyId: apiProxy.id,
          status: apiProxyTaskUtil.const.status.待处理,
        },
        take: limit,
      });

      if (tasks.length === 0) {
        return { updatedCount: 0, message: "No tasks found to update.", tasks: [] };
      }

      const updatedTasks = await Promise.all(
        tasks.map((task) =>
          tx.apiProxyTask.update({
            where: { id: task.id },
            data: {
              status: apiProxyTaskUtil.const.status.处理中,
              possessor: options.possessor,
            },
          }),
        ),
      );

      return {
        updatedCount: updatedTasks.length,
        message: `Successfully updated ${updatedTasks.length} tasks to processing status.`,
        tasks: updatedTasks,
      };
    });
  },
);

/** 处理任务 */
export const processTasks = withErrorHandling(
  async (options: { token: string; userId: number; tasks: { id: number; res: any }[] }) => {
    const apiProxy = await validateApiProxy(options.userId, options.token);

    return await prisma.$transaction(async (tx) => {
      const processedTasks = await Promise.all(
        options.tasks.map(async (task) => {
          const existingTask = await tx.apiProxyTask.findFirst({
            where: {
              id: task.id,
              apiProxyId: apiProxy.id,
              status: apiProxyTaskUtil.const.status.处理中,
            },
          });

          if (!existingTask) {
            return { id: task.id, error: "Task not found or not in processing status" };
          }

          return tx.apiProxyTask.update({
            where: { id: task.id },
            data: {
              status: apiProxyTaskUtil.const.status.处理完毕,
              res: SuperJSON.stringify(task.res),
            },
          });
        }),
      );

      const successfulUpdates = processedTasks.filter((task) => !("error" in task));
      const failedUpdates = processedTasks.filter((task) => "error" in task);

      return {
        processedCount: successfulUpdates.length,
        failedCount: failedUpdates.length,
        message: `Successfully processed ${successfulUpdates.length} tasks. Failed to process ${failedUpdates.length} tasks.`,
        failedTasks: failedUpdates,
      };
    });
  },
);

/** 获取任务处理结果 */
export const getTaskResults = withErrorHandling(
  async (options: { token: string; userId: number; status?: string; limit?: number }) => {
    const apiProxy = await validateApiProxy(options.userId, options.token);

    const whereClause: any = {
      apiProxyId: apiProxy.id,
    };

    if (options.status) {
      whereClause.status = options.status;
    }

    const limit = options.limit || 100;

    const tasks = await prisma.apiProxyTask.findMany({
      where: whereClause,
      orderBy: {
        updatedAt: "desc",
      },
      take: limit,
    });

    const results = tasks.map((task) => ({
      id: task.id,
      status: task.status,
      req: SuperJSON.parse(task.req),
      res: task.res ? SuperJSON.parse(task.res) : null,
      possessor: task.possessor,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }));

    return { tasks: results, count: results.length };
  },
);

// 新增：创建多个任务并等待结果的函数
export const createAndWaitForTasks = withErrorHandling(
  async (options: {
    tasks: Task[];
    token: string;
    userId: number;
    /** 轮询时间 */
    pollInterval?: number;
    timeout?: number;
  }) => {
    const { tasks, token, userId, pollInterval = 5000, timeout = 300000 } = options;

    // 创建任务
    const createResult = await createTasks({ task: tasks, token, userId });
    if ("errMsg" in createResult) {
      return createResult;
    }

    const startTime = Date.now();
    let allTasksCompleted = false;

    // 轮询检查任务状态
    while (!allTasksCompleted && Date.now() - startTime < timeout) {
      await new Promise((resolve) => setTimeout(resolve, pollInterval));

      const results = await getTaskResults({ token, userId, limit: tasks.length });
      if ("errMsg" in results) {
        return results;
      }

      allTasksCompleted = results.tasks.every(
        (task) => task.status === apiProxyTaskUtil.const.status.处理完毕,
      );

      if (allTasksCompleted) {
        return results;
      }
    }

    if (!allTasksCompleted) {
      return { errMsg: "任务等待超时" };
    }

    // 这行代码理论上不会执行，但为了类型安全，我们保留它
    return { errMsg: "未知错误" };
  },
);

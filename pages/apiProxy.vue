<style scoped></style>
<template>
  <div class="p-5">
    <Button @click="processTasks">处理任务</Button>
    <Button @click="test" class="w-full my-5">创建任务</Button>
  </div>
</template>
<script setup lang="tsx">
  import { useToast } from "primevue/usetoast";
  import { ClientAPI } from "~/util/client.rpc";
  const toast = useToast();
  const userConfig = {
    userId: 1,
    token: "test_test_test",
    possessor: "test",
  };
  async function test() {
    const res = await ClientAPI.apiProxy.createAndWaitForTasks({
      ...userConfig,
      tasks: ["test"],
      pollInterval: 1000,
      timeout: 999999999999,
    });
    console.log("处理结果", res);
  }

  async function processTasks() {
    const tasks = await ClientAPI.apiProxy.fetchTasks({
      ...userConfig,
    });
    if ("errMsg" in tasks) {
      console.log("error", tasks);
      return;
    }
    const processRes = await ClientAPI.apiProxy.processTasks({
      ...userConfig,
      tasks: tasks.tasks.map((el) => ({
        id: el.id,
        res: "test" + Date.now(),
      })),
    });
    console.log("processRes", processRes);
  }
</script>

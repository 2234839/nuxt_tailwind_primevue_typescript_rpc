<style scoped></style>
<template>
  <div class="p-5">
    <Button
      @click="
        toast.add({ severity: 'warn', summary: 'summary', detail: 'detail', life: 3000 })
      "
      >test</Button
    >
    <Button
      @click="
        toast.add({ severity: 'warn', summary: 'summary', detail: 'detail', life: 3000 })
      "
      class="w-full my-5"
      >test</Button
    >

  </div>
</template>
<script setup lang="tsx">
import { useToast } from "primevue/usetoast";
const toast = useToast();
</script>

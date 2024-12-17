<template>
  <NuxtLayout>
    <nav class="bg-gray-800 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="space-x-4">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="text-white hover:text-gray-300 transition-colors"
            active-class="text-yellow-400">
            {{ link.text }}
          </NuxtLink>
        </div>
      </div>
    </nav>
    <NuxtPage />
    <Toast />
  </NuxtLayout>
</template>

<script setup lang="ts">
  const links = [
    { to: "/", text: "Home" },
  ];
</script>

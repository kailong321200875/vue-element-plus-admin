<script setup lang="ts"></script>

<template>
  <section>
    <router-view v-slot="{ Component, route }">
      <component :is="Component" :key="route.fullPath" />
    </router-view>
  </section>
</template>

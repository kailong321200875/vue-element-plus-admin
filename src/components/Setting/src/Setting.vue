<script setup lang="ts">
import { ElDrawer } from 'element-plus'
import { ref } from 'vue'

const drawer = ref(false)
</script>

<template>
  <div
    class="v-setting fixed top-[45%] right-0 w-40px h-40px text-center leading-40px bg-[var(--el-color-primary)] cursor-pointer"
    @click="drawer = true"
  >
    <Icon icon="ant-design:setting-outlined" color="#fff" />
  </div>

  <ElDrawer v-model="drawer" :with-header="false" direction="rtl" size="300px">ddd</ElDrawer>
</template>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-setting';

.@{prefix-cls} {
  border-radius: 6px 0 0 6px;
}
</style>

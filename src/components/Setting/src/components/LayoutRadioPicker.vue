<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'
import { computed } from 'vue'

const appStore = useAppStore()

const layout = computed(() => appStore.getLayout)
console.log(layout.value)
</script>

<template>
  <div class="v-layout-radio-picker flex flex-wrap space-x-14px">
    <div
      :class="[
        'v-layout-radio-picker__classic relative w-56px h-48px cursor-pointer bg-gray-100',
        {
          'is-acitve': layout === 'classic'
        }
      ]"
      @click="appStore.setLayout('classic')"
    ></div>
    <div
      :class="[
        'v-layout-radio-picker__top-left relative w-56px h-48px cursor-pointer bg-gray-100',
        {
          'is-acitve': layout === 'topLeft'
        }
      ]"
      @click="appStore.setLayout('topLeft')"
    ></div>
  </div>
</template>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-layout-radio-picker';

.@{prefix-cls} {
  &__classic {
    border: 2px solid #e5e7eb;
    border-radius: 4px;

    &:before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 33%;
      height: 100%;
      background-color: #273352;
      border-radius: 4px 0 0 4px;
      content: '';
    }

    &:after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 25%;
      background-color: #fff;
      border-radius: 4px 4px 0 4px;
      content: '';
    }
  }

  &__top-left {
    border: 2px solid #e5e7eb;
    border-radius: 4px;

    &:before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 33%;
      background-color: #273352;
      border-radius: 4px 4px 0 0;
      content: '';
    }

    &:after {
      position: absolute;
      top: 0;
      left: 0;
      width: 33%;
      height: 100%;
      background-color: #fff;
      border-radius: 4px 0 0 4px;
      content: '';
    }
  }

  .is-acitve {
    border-color: var(--el-color-primary);
  }
}
</style>

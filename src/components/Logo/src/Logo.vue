<script setup lang="ts">
import { ref, watch, computed, onMounted, unref } from 'vue'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()

const show = ref(true)

const title = computed(() => appStore.getLogoTitle)

const layout = computed(() => appStore.getLayout)

const collapse = computed(() => appStore.getCollapse)

onMounted(() => {
  if (unref(collapse)) show.value = false
})

watch(
  () => collapse.value,
  (collapse: boolean) => {
    if (layout.value !== 'classic') {
      show.value = true
    } else {
      if (!collapse) {
        setTimeout(() => {
          show.value = !collapse
        }, 400)
      } else {
        show.value = !collapse
      }
    }
  }
)
</script>

<template>
  <router-link
    :class="[
      'v-logo',
      {
        'v-logo__Top': layout !== 'classic'
      },
      'flex !h-[var(--logo-height)] items-center cursor-pointer pl-8px relative'
    ]"
    to="/"
  >
    <img
      src="@/assets/imgs/logo.png"
      class="w-[calc(var(--logo-height)-10px)] h-[calc(var(--logo-height)-10px)]"
    />
    <div
      v-if="show"
      :class="[
        'ml-10px text-16px font-700',
        {
          'text-[var(--logo-title-text-color)]': layout === 'classic',
          'text-[var(--top-header-text-color)]': layout === 'topLeft'
        }
      ]"
    >
      {{ title }}
    </div>
  </router-link>
</template>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-logo';

.@{prefix-cls} {
  &:after {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    border-bottom: 1px solid var(--logo-border-color);
    content: '';
  }
}
</style>

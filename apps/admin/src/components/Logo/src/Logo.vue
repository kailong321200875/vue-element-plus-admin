<script setup lang="ts">
  import { ref, watch, computed, onMounted, unref } from 'vue'
  import { useAppStore } from '@/store/modules/app'
  import { appConfig } from '@/config/app'

  const prefixCls = 'v-logo'

  const appStore = useAppStore()

  const show = ref(true)

  const title = appConfig.title

  const layout = computed(() => appStore.layout)

  const collapse = computed(() => appStore.collapse)

  onMounted(() => {
    if (unref(collapse)) show.value = false
  })

  watch(
    () => collapse.value,
    (collapse: boolean) => {
      if (unref(layout) === 'topLeft' || unref(layout) === 'cutMenu') {
        show.value = true
        return
      }
      show.value = !collapse
    }
  )

  watch(
    () => layout.value,
    (layout) => {
      if (layout === 'top' || layout === 'cutMenu') {
        show.value = true
      } else {
        if (unref(collapse)) {
          show.value = false
        } else {
          show.value = true
        }
      }
    }
  )
</script>

<template>
  <div>
    <router-link
      :class="[
        prefixCls,
        layout !== 'classic' ? `${prefixCls}__Top` : '',
        'flex !h-[var(--logo-height)] items-center cursor-pointer pl-8px relative decoration-none overflow-hidden'
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
            'text-[var(--top-header-text-color)]':
              layout === 'topLeft' || layout === 'top' || layout === 'cutMenu'
          }
        ]"
      >
        {{ title }}
      </div>
    </router-link>
  </div>
</template>

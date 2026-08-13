<script setup lang="ts">
  import { computed } from 'vue'
  import { useAppStore } from '@/store/modules/app'
  import { appConfig } from '@/config/app'

  const prefixCls = 'v-logo'

  const props = withDefaults(
    defineProps<{
      compact?: boolean
    }>(),
    {
      compact: false
    }
  )

  const appStore = useAppStore()

  const title = appConfig.title

  const layout = computed(() => appStore.layout)

  const showTitle = computed(
    () =>
      !props.compact && (layout.value === 'top' || layout.value === 'mixed' || !appStore.collapse)
  )
</script>

<template>
  <div>
    <router-link
      :class="[
        prefixCls,
        layout === 'top' || layout === 'mixed' ? `${prefixCls}--header` : '',
        'flex !h-[var(--logo-height)] items-center cursor-pointer px-10px relative decoration-none overflow-hidden'
      ]"
      to="/"
    >
      <img
        src="@/assets/imgs/logo.png"
        class="w-[calc(var(--logo-height)-10px)] h-[calc(var(--logo-height)-10px)]"
      />
      <div
        v-if="showTitle"
        :class="[
          'ml-10px text-16px font-700',
          {
            'text-[var(--logo-title-text-color)]': layout === 'sidebar' || layout === 'dual',
            'text-[var(--top-header-text-color)]': layout === 'top' || layout === 'mixed'
          }
        ]"
      >
        {{ title }}
      </div>
    </router-link>
  </div>
</template>

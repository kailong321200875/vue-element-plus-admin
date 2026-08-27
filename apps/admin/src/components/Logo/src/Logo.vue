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
      <img src="@/assets/imgs/logo.png" class="w-38px h-38px flex-none" />
      <div
        v-if="showTitle"
        :class="[
          'ml-10px text-15px font-600 tracking-[-0.01em]',
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

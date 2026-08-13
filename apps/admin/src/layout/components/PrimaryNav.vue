<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  withDefaults(
    defineProps<{
      routes: AppRouteRecordRaw[]
      activePath?: string
      mode?: 'top' | 'rail'
    }>(),
    {
      activePath: '',
      mode: 'top'
    }
  )

  const emit = defineEmits<{
    select: [route: AppRouteRecordRaw]
  }>()

  const { t } = useI18n()
</script>

<template>
  <nav :class="['primary-nav', `primary-nav--${mode}`]" aria-label="主导航">
    <button
      v-for="route in routes"
      :key="route.path"
      type="button"
      :class="['primary-nav__item', { 'is-active': activePath === route.path }]"
      :title="t(route.meta?.title || '')"
      @click="emit('select', route)"
    >
      <Icon v-if="route.meta?.icon" :icon="route.meta.icon" :size="mode === 'rail' ? 22 : 18" />
      <span>{{ t(route.meta?.title || '') }}</span>
    </button>
  </nav>
</template>

<style lang="less" scoped>
  .primary-nav {
    display: flex;

    &__item {
      position: relative;
      display: flex;
      align-items: center;
      color: inherit;
      cursor: pointer;
      background: transparent;
      border: 0;

      &:focus-visible {
        outline: 2px solid var(--el-color-primary);
        outline-offset: -2px;
      }
    }

    &--top {
      height: 100%;
      min-width: 0;
      padding: 0 18px;
      overflow-x: auto;
      color: var(--top-header-text-color);
      flex: 1;
      gap: 4px;
      align-items: center;

      .primary-nav__item {
        gap: 7px;
        height: 36px;
        padding: 0 14px;
        white-space: nowrap;
        border-radius: 8px;

        &:hover,
        &.is-active {
          color: var(--el-color-primary);
          background: color-mix(in srgb, var(--el-color-primary) 9%, transparent);
        }

        &.is-active::after {
          position: absolute;
          right: 14px;
          bottom: -10px;
          left: 14px;
          height: 2px;
          background: var(--el-color-primary);
          border-radius: 2px;
          content: '';
        }
      }
    }

    &--rail {
      flex-direction: column;
      gap: 6px;
      align-items: center;
      padding: 12px 8px;
      color: var(--left-menu-text-color);

      .primary-nav__item {
        flex-direction: column;
        gap: 5px;
        justify-content: center;
        width: 56px;
        min-height: 58px;
        padding: 7px 4px;
        border-radius: 10px;

        span {
          width: 100%;
          overflow: hidden;
          font-size: 11px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        &:hover,
        &.is-active {
          color: var(--left-menu-text-active-color);
          background: var(--left-menu-bg-active-color);
        }
      }
    }
  }
</style>

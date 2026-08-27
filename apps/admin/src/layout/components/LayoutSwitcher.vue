<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useAppStore, type LayoutMode } from '@/store/modules/app'

  const appStore = useAppStore()
  const open = ref(false)
  const { t } = useI18n()

  const layouts: { value: LayoutMode; label: string }[] = [
    { value: 'sidebar', label: 'layout.sidebar' },
    { value: 'top', label: 'layout.top' },
    { value: 'mixed', label: 'layout.mixed' },
    { value: 'dual', label: 'layout.dual' }
  ]

  const currentLabel = computed(() =>
    t(layouts.find((item) => item.value === appStore.layout)?.label ?? '')
  )

  const selectLayout = (layout: LayoutMode) => {
    appStore.setLayout(layout)
    open.value = false
  }

  const closeOnBlur = (event: FocusEvent) => {
    if (!(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node | null)) {
      open.value = false
    }
  }
</script>

<template>
  <div
    :class="['layout-switcher', { 'is-open': open }]"
    @focusout="closeOnBlur"
    @keydown.esc="open = false"
  >
    <button
      class="layout-switcher__trigger"
      type="button"
      :aria-label="t('layout.switch')"
      :title="t('layout.switch')"
      :aria-expanded="open"
      @click="open = !open"
    >
      <Icon icon="mdi:view-quilt-outline" :size="18" />
      <span>{{ currentLabel }}</span>
    </button>

    <div class="layout-switcher__panel">
      <div class="layout-switcher__heading">
        <strong>{{ t('layout.title') }}</strong>
        <span>{{ t('layout.hint') }}</span>
      </div>

      <button
        v-for="item in layouts"
        :key="item.value"
        type="button"
        :class="['layout-switcher__option', { 'is-active': appStore.layout === item.value }]"
        @click="selectLayout(item.value)"
      >
        <span :class="['layout-switcher__preview', `is-${item.value}`]">
          <i class="layout-switcher__preview-header"></i>
          <i class="layout-switcher__preview-primary"></i>
          <i class="layout-switcher__preview-secondary"></i>
          <i class="layout-switcher__preview-content"></i>
        </span>
        <span>{{ t(item.label) }}</span>
        <Icon v-if="appStore.layout === item.value" icon="mdi:check" :size="16" />
      </button>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .layout-switcher {
    position: relative;
    height: 100%;

    &__trigger {
      display: flex;
      gap: 7px;
      align-items: center;
      height: 100%;
      padding: 0 12px;
      color: var(--top-header-text-color);
      cursor: pointer;
      background: transparent;
      border: 0;

      span {
        font-size: 13px;
      }

      &:hover,
      &:focus-visible {
        color: var(--el-color-primary);
        background: var(--top-header-hover-color);
        outline: none;
      }
    }

    &__panel {
      position: absolute;
      top: calc(100% + 10px);
      right: 4px;
      z-index: 4000;
      display: grid;
      padding: 14px;
      pointer-events: none;
      background: var(--top-header-bg-color);
      border: 1px solid var(--layout-border-color);
      border-radius: 16px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-6px);
      box-shadow: var(--layout-shadow);
      transition:
        opacity 160ms ease,
        transform 160ms ease,
        visibility 160ms;
      grid-template-columns: repeat(2, 150px);
      gap: 8px;
    }

    &.is-open &__panel {
      pointer-events: auto;
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    &__heading {
      display: flex;
      grid-column: 1 / -1;
      align-items: baseline;
      justify-content: space-between;
      padding: 2px 2px 6px;

      strong {
        font-size: 14px;
        color: var(--el-text-color-primary);
      }

      span {
        font-size: 11px;
        color: var(--el-text-color-secondary);
      }
    }

    &__option {
      position: relative;
      display: grid;
      grid-template-columns: 52px 1fr 16px;
      gap: 9px;
      align-items: center;
      min-height: 58px;
      padding: 8px;
      color: var(--el-text-color-regular);
      text-align: left;
      cursor: pointer;
      background: var(--left-menu-bg-light-color);
      border: 1px solid transparent;
      border-radius: 10px;

      &:hover,
      &:focus-visible,
      &.is-active {
        color: var(--el-color-primary);
        border-color: color-mix(in srgb, var(--el-color-primary) 45%, transparent);
        outline: none;
      }

      &.is-active {
        background: var(--el-color-primary-light-9);
      }
    }

    &__preview {
      position: relative;
      display: block;
      width: 52px;
      height: 38px;
      overflow: hidden;
      background: var(--app-content-bg-color);
      border: 1px solid var(--layout-border-color);
      border-radius: 6px;

      i {
        position: absolute;
        display: block;
      }

      &-header {
        top: 0;
        right: 0;
        left: 0;
        height: 7px;
        background: var(--top-header-bg-color);
        border-bottom: 1px solid var(--layout-border-color);
      }

      &-primary,
      &-secondary {
        top: 0;
        bottom: 0;
        left: 0;
        background: var(--left-menu-bg-color);
        border-right: 1px solid var(--layout-border-color);
      }

      &-content {
        right: 5px;
        bottom: 5px;
        width: 25px;
        height: 15px;
        background: color-mix(in srgb, var(--el-color-primary) 12%, var(--el-bg-color));
        border-radius: 2px;
      }

      &.is-sidebar {
        .layout-switcher__preview-primary {
          width: 12px;
        }

        .layout-switcher__preview-header {
          left: 12px;
        }
      }

      &.is-top {
        .layout-switcher__preview-primary {
          right: 0;
          width: auto;
          height: 9px;
        }

        .layout-switcher__preview-header {
          display: none;
        }
      }

      &.is-mixed {
        .layout-switcher__preview-primary {
          right: 0;
          width: auto;
          height: 9px;
        }

        .layout-switcher__preview-secondary {
          top: 9px;
          width: 12px;
          background: var(--left-menu-bg-light-color);
        }

        .layout-switcher__preview-header {
          top: 9px;
          left: 12px;
        }
      }

      &.is-dual {
        .layout-switcher__preview-primary {
          width: 8px;
          background: var(--left-menu-bg-color);
        }

        .layout-switcher__preview-secondary {
          left: 8px;
          width: 11px;
          background: var(--left-menu-bg-light-color);
        }

        .layout-switcher__preview-header {
          left: 19px;
        }

        .layout-switcher__preview-content {
          width: 21px;
        }
      }
    }
  }

  @media (width <= 767px) {
    .layout-switcher__trigger span {
      display: none;
    }

    .layout-switcher__panel {
      right: -110px;
      grid-template-columns: 160px;
    }

    .layout-switcher__heading {
      grid-column: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .layout-switcher__panel {
      transition: none;
    }
  }
</style>

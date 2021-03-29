<template>
  <div ref="breadcrumbRef" class="breadcrumb">
    <slot />
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, provide, ref } from 'vue'

export default defineComponent({
  name: 'Breadcrumb',
  props: {
    separator: {
      type: String as PropType<string>,
      default: '/'
    },
    separatorClass: {
      type: String as PropType<string>,
      default: ''
    }
  },
  setup(props) {
    const breadcrumbRef = ref<HTMLElement | null>(null)

    provide('breadcrumb', props)

    return {
      breadcrumbRef
    }
  }
})
</script>
<style lang="less">
.breadcrumb {
  padding-right: 20px;
  font-size: 12px;

  &::after,
  &::before {
    display: table;
    content: '';
  }

  &::after {
    clear: both;
  }

  &__separator {
    margin: 0 9px;
    font-weight: 700;
    color: #6e90a7;

    &[class*='icon'] {
      margin: 0 6px;
      font-weight: 400;
    }
  }

  &__item {
    float: left;
    display: inline-block;
  }

  &__inner {
    display: inline-block;
    color: #6e90a7;

    a {
      font-weight: 700;
      color: #2c3a61;
      text-decoration: none;
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    a:hover,
    &.is-link:hover {
      color: #1890ff;
      cursor: pointer;
    }
  }

  &__item:last-child .breadcrumb__inner,
  &__item:last-child &__inner a,
  &__item:last-child &__inner a:hover,
  &__item:last-child &__inner:hover {
    font-weight: 400;
    color: #6e90a7;
    cursor: text;
  }

  &__item:last-child &__separator {
    display: none;
  }
}
</style>

<template>
  <Button v-bind="getBindValue" :class="[getColor, $attrs.class]">
    <template #default="data">
      <slot name="icon" />
      <slot v-bind="data" />
    </template>
  </Button>
</template>
<script lang="ts">
import { PropType } from 'vue'
import { defineComponent, computed, VNodeChild } from 'vue'
import { Button } from 'ant-design-vue'
export default defineComponent({
  name: 'AButton',
  components: { Button },
  inheritAttrs: false,
  props: {
    // 按钮类型
    type: {
      type: String as PropType<'primary' | 'default' | 'danger' | 'dashed' | 'link' | 'warning' | 'success' | 'info'>,
      default: 'default'
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    htmlType: {
      type: String as PropType<'button' | 'submit' | 'reset' | 'menu'>,
      default: 'button'
    },
    icon: {
      type: Object as PropType<VNodeChild | JSX.Element>,
      default: () => null
    },
    size: {
      type: String as PropType<'small' | 'large' | 'default'>,
      default: 'default'
    },
    loading: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    ghost: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    block: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, { attrs }) {
    const getColor = computed(() => {
      const res: string[] = []
      const { type, disabled } = props
      type && res.push(`ant-btn-${type}`)
      disabled && res.push('is-disabled')
      return res
    })

    const getBindValue = computed((): any => {
      const otherTypes = ['warning', 'success', 'info']
      const bindValue = { ...attrs, ...props }
      if (otherTypes.indexOf(props.type) !== -1) {
        bindValue.type = 'default'
      }
      return bindValue
    })

    return { getBindValue, getColor }
  }
})
</script>

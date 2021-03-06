<template>
  <span class="breadcrumb__item">
    <span ref="linkRef" :class="['breadcrumb__inner']">
      <slot />
    </span>
    <i v-if="separatorClass" class="breadcrumb__separator" :class="separatorClass" />
    <span v-else class="breadcrumb__separator">{{ separator }}</span>
  </span>
</template>

<script lang="ts">
import { defineComponent, inject, ref, onMounted, unref } from 'vue'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'BreadcrumbItem',
  props: {
    to: {
      type: [String, Object] as PropType<string | object>,
      default: ''
    },
    replace: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props) {
    const linkRef = ref<HTMLElement | null>(null)
    const parent = inject('breadcrumb') as {
      separator: string
      separatorClass: string
    }
    const { push, replace } = useRouter()

    onMounted(() => {
      const link = unref(linkRef)
      if (!link) return
      const { to } = props
      if (!props.to) return
      props.replace ? replace(to) : push(to)
    })

    return {
      linkRef,
      separator: parent.separator && parent.separator,
      separatorClass: parent.separatorClass && parent.separatorClass
    }
  }
})
</script>

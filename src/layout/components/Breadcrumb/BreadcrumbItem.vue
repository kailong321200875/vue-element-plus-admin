<template>
  <span class="breadcrumb__item">
    <span ref="linkRef" :class="['breadcrumb__inner']">
      <slot></slot>
    </span>
    <i v-if="separatorClass" class="breadcrumb__separator" :class="separatorClass"></i>
    <span v-else class="breadcrumb__separator">{{ separator }}</span>
  </span>
</template>

<script setup lang="ts" name="BreadcrumbItem">
import { inject, ref, onMounted, unref, PropType } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  to: {
    type: [String, Object] as PropType<string | IObj>,
    default: ''
  },
  replace: {
    type: Boolean as PropType<boolean>,
    default: false
  }
})

const linkRef = ref<HTMLElement | null>(null)
const parent = inject('breadcrumb') as {
  separator: string
  separatorClass: string
}
const separator = parent.separator && parent.separator
const separatorClass = parent.separatorClass && parent.separatorClass
const { push, replace } = useRouter()

onMounted(() => {
  const link = unref(linkRef)
  if (!link) return
  const { to } = props
  if (!props.to) return
  props.replace ? replace(to) : push(to)
})
</script>

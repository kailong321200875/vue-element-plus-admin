<script lang="ts" setup>
import { propTypes } from '@/utils/propTypes'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('waterfall')

defineProps({
  data: propTypes.array.def([]),
  reset: propTypes.bool.def(false),
  width: propTypes.number.def(200),
  gap: propTypes.number.def(20),
  getContainer: propTypes.func.def(() => document.body)
})
</script>

<template>
  <div :class="prefixCls"></div>
</template>

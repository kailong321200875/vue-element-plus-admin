<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import { propTypes } from '@/utils/propTypes'
import { computed } from 'vue'

const emits = defineEmits([
  'update:modelValue',
  'node-click',
  'brackets-click',
  'icon-click',
  'selected-value'
])

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  deep: propTypes.number.def(5),
  showLength: propTypes.bool.def(true),
  showLineNumbers: propTypes.bool.def(true),
  showLineNumber: propTypes.bool.def(true),
  showIcon: propTypes.bool.def(true),
  showDoubleQuotes: propTypes.bool.def(true),
  virtual: propTypes.bool.def(false),
  height: propTypes.number.def(400),
  itemHeight: propTypes.number.def(20),
  rootPath: propTypes.string.def('root'),
  nodeSelectable: propTypes.func.def(),
  selectableType: propTypes.oneOf<'multiple' | 'single'>(['multiple', 'single']).def(),
  showSelectController: propTypes.bool.def(false),
  selectOnClickNode: propTypes.bool.def(true),
  highlightSelectedNode: propTypes.bool.def(true),
  collapsedOnClickBrackets: propTypes.bool.def(true),
  renderNodeKey: propTypes.func.def(),
  renderNodeValue: propTypes.func.def(),
  editable: propTypes.bool.def(true),
  editableTrigger: propTypes.oneOf<'click' | 'dblclick'>(['click', 'dblclick']).def('click')
})

const data = computed(() => props.modelValue)

const localModelValue = computed({
  get: () => data.value,
  set: (val) => {
    console.log(val)
    emits('update:modelValue', val)
  }
})

const nodeClick = (node: any) => {
  emits('node-click', node)
}

const bracketsClick = (collapsed: boolean) => {
  emits('brackets-click', collapsed)
}

const iconClick = (collapsed: boolean) => {
  emits('icon-click', collapsed)
}

const selectedChange = (newVal: any, oldVal: any) => {
  console.log(newVal, oldVal)
  emits('selected-value', newVal, oldVal)
}
</script>

<template>
  <VueJsonPretty
    v-model:data="localModelValue"
    :deep="deep"
    :show-length="showLength"
    :show-line-numbers="showLineNumbers"
    :show-line-number="showLineNumber"
    :show-icon="showIcon"
    :show-double-quotes="showDoubleQuotes"
    :virtual="virtual"
    :height="height"
    :item-height="itemHeight"
    :root-path="rootPath"
    :node-selectable="nodeSelectable"
    :selectable-type="selectableType"
    :show-select-controller="showSelectController"
    :select-on-click-node="selectOnClickNode"
    :highlight-selected-node="highlightSelectedNode"
    :collapsed-on-click-brackets="collapsedOnClickBrackets"
    :render-node-key="renderNodeKey"
    :render-node-value="renderNodeValue"
    :editable="editable"
    :editable-trigger="editableTrigger"
    @node-click="nodeClick"
    @brackets-click="bracketsClick"
    @icon-click="iconClick"
    @selected-change="selectedChange"
  />
</template>

<template>
  <template v-if="item.children" />
  <template v-else>
    <a-table-column
      v-bind="getItemBindValue(item)"
    >
      <!-- title slot -->
      <template v-if="item.slots && item.slots.title" #title>
        <slot :name="item.slots.title" />
      </template>
      <!-- default slot -->
      <template v-if="item.slots && item.slots.customRender" #default="{ text, record, index, column }">
        <slot :name="item.slots.customRender" :text="text" :record="record" :index="index" :column="column" />
      </template>
      <!-- filterDropdown slot -->
      <template v-if="item.slots && item.slots.filterDropdown" #filterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
        <slot :name="item.slots.filterDropdown" :setSelectedKeys="setSelectedKeys" :selectedKeys="selectedKeys" :confirm="confirm" :clearFilters="clearFilters" :column="column" />
      </template>
      <!-- filterIcon slot -->
      <template v-if="item.slots && item.slots.filterIcon" #filterIcon="filtered">
        <slot :name="item.slots.filterIcon" :filtered="filtered" />
      </template>
    </a-table-column>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
export default defineComponent({
  name: 'TableItem',
  functional: true,
  props: {
    item: {
      type: Object as PropType<object>,
      required: true
    }
  },
  setup(props, { attrs }) {
    alert(',,,,')
    const getItemBindValue = computed(() => {
      return function(item: any) {
        return { ...item, ...attrs, ...props }
      }
    })
    return {
      getItemBindValue
    }
  }
})
</script>

<style>
</style>

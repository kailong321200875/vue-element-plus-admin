<template>
  <a-table v-bind="getBindValue">
    <table-item
      v-for="item in columns"
      :key="item.key || item.dataIndex"
      :item="item"
    />
    <template v-if="slots.title" #title="currentPageData">
      <slot name="title" :currentPageData="currentPageData" />
    </template>
    <!-- <template v-for="item in columns" :key="item.key || item.dataIndex"> -->

    <!-- </template> -->
    <template v-if="slots.footer" #footer="currentPageData">
      <slot name="footer" :currentPageData="currentPageData" />
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import TableItem from './TableItem.vue'
export default defineComponent({
  name: 'ComTable',
  components: {
    TableItem
  },
  props: {
    columns: {
      type: Array as PropType<any[]>,
      default: () => []
    }
  },
  setup(props, { attrs, slots }) {
    console.log(TableItem)
    const getBindValue = computed((): any => {
      const bindValue = { ...attrs, ...props }
      delete bindValue.columns
      return bindValue
    })

    return {
      getBindValue,
      slots
    }
  }
})
</script>

<style>
</style>

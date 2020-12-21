<template>
  <el-table ref="elTable" v-bind="getBindValue">
    <!-- 多选 -->
    <el-table-column
      v-if="selection"
      type="selection"
      width="55"
    />
    <template v-for="item in columns">
      <!-- 树型数据 -->
      <template v-if="item.children && item.children.length">
        <table-column
          :key="item[item.key]"
          :child="item"
        />
      </template>

      <template v-else>
        <el-table-column
          :key="item[item.key]"
          v-bind="{...bindValue(item)}"
          :prop="item.key"
        >
          <!-- 表头插槽 -->
          <template v-if="item.slots && item.slots.header" #header="scope">
            <table-slot
              v-if="item.slots && item.slots.header"
              :slot-name="item.slots.header"
              :row="scope.row"
              :column="item"
              :index="scope.$index"
            />
          </template>

          <!-- 表格内容插槽自定义 -->
          <template #default="scope">
            <table-slot
              v-if="item.slots && item.slots.default"
              :slot-name="item.slots.default"
              :row="scope.row"
              :column="item"
              :index="scope.$index"
            />
            <!-- 不需要插槽 -->
            <div v-else style="display: inline-block;">
              {{ scope.row[item.key] }}
            </div>
          </template>
        </el-table-column>
      </template>
    </template>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, provide, getCurrentInstance, ref, unref } from 'vue'
import { deepClone } from '@/utils'
import TableColumn from './components/TableColumn.vue'
import TableSlot from './components/Slot.vue'
export default defineComponent({
  name: 'ComTable',
  components: {
    TableSlot,
    TableColumn
  },
  props: {
    columns: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    selection: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, { attrs, slots }) {
    const elTable = ref<HTMLElement | null>(null)
    function getTableRef() {
      return unref(elTable as any)
    }

    const _this = getCurrentInstance() as any
    provide('tableRoot', _this)

    const getBindValue = computed((): any => {
      const bindValue = { ...attrs, ...props }
      delete bindValue.columns
      return bindValue
    })

    function bindValue(item: any) {
      const delArr: string[] = []
      const obj = deepClone(item)
      for (const key in obj) {
        if (delArr.indexOf(key) !== -1) {
          delete obj[key]
        }
      }
      return obj
    }

    return {
      elTable,
      getBindValue, bindValue,
      slots,
      getTableRef
    }
  }
})
</script>

<style>
</style>

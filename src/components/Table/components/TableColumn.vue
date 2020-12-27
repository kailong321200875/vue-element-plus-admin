<template>
  <el-table-column v-bind="{...getItemBindValue(child)}" :prop="child.key">
    <template v-for="item in child.children">
      <!-- 树型数据 -->
      <template v-if="item.children && item.children.length">
        <table-column
          :key="item[item.field]"
          :child="item"
        />
      </template>

      <template v-else>
        <el-table-column
          :key="item[item.field]"
          v-bind="{...getItemBindValue(item)}"
          :prop="item.field"
        >
          <!-- 表头插槽 -->
          <template v-if="item.slots && item.slots.header" #header="scope">
            <table-slot
              v-if="item.slots && item.slots.header"
              :slot-name="item.slots.header"
              :column="item"
              :index="scope.$index"
            />
          </template>

          <!-- 表格内容插槽自定义 -->
          <template v-if="item.slots && item.slots.default" #default="scope">
            <table-slot
              :slot-name="item.slots.default"
              :row="scope.row"
              :column="item"
              :index="scope.$index"
            />
          </template>

          <!-- 不需要插槽 -->
          <!-- <span v-if="!item.slots || !item.slots.default">
            {{ scope.row[item.field] }}
          </span> -->
        </el-table-column>
      </template>
    </template>
  </el-table-column>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import TableSlot from './Slot.vue'
import { deepClone } from '@/utils'
export default defineComponent({
  name: 'TableColumn',
  components: {
    TableSlot
  },
  props: {
    child: {
      type: Object as PropType<object>,
      default: () => null,
      required: true
    }
  },
  setup() {
    function getItemBindValue(item: any) {
      const delArr: string[] = ['children']
      const obj = deepClone(item)
      for (const key in obj) {
        if (delArr.indexOf(key) !== -1) {
          delete obj[key]
        }
      }
      return obj
    }

    return {
      getItemBindValue
    }
  }
})
</script>

<style>
</style>

<template>
  <el-table-column v-bind="{...bindValue(child)}" :prop="child.key">
    <template v-for="item in child.children">
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
    function bindValue(item: any) {
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
      bindValue
    }
  }
})
</script>

<style>
</style>

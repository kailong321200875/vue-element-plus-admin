<template>
  <div>
    <el-table ref="tableRef" :border="true" v-bind="getBindValue" @header-dragend="headerDragend">
      <!-- 多选 -->
      <el-table-column
        v-if="selection"
        type="selection"
        :reserve-selection="reserveSelection"
        width="40"
      />
      <template v-for="item in columns">
        <!-- 自定义索引 -->
        <template v-if="item.type === 'index'">
          <el-table-column
            :key="item[item.field]"
            v-bind="{ ...getItemBindValue(item) }"
            type="index"
            :index="item.index"
          />
        </template>

        <!-- 树型数据 -->
        <template v-else-if="item.children && item.children.length">
          <table-column :key="item[item.field]" :child="item" />
        </template>

        <template v-else>
          <el-table-column
            :key="item[item.field]"
            v-bind="{ ...getItemBindValue(item) }"
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
                v-if="item.slots && item.slots.default"
                :slot-name="item.slots.default"
                :row="scope.row"
                :column="item"
                :index="scope.$index"
              />
            </template>
          </el-table-column>
        </template>
      </template>
    </el-table>

    <div v-if="pagination" class="pagination__wrap">
      <el-pagination
        :style="paginationStyle"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        v-bind="getPaginationBindValue"
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="ComTable">
import { PropType, computed, useAttrs, ref, getCurrentInstance, provide } from 'vue'
import { deepClone } from '@/utils'
import { isObject } from '@/utils/validate'
import TableColumn from './components/TableColumn.vue'
import TableSlot from './components/Slot.vue'

const props = defineProps({
  // 表头
  columns: {
    type: Array as PropType<IObj[]>,
    default: () => []
  },
  // 是否多选
  selection: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  // 是否展示分页
  pagination: {
    type: [Boolean, Object] as PropType<boolean | IObj>,
    default: false
  },
  // 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key）
  reserveSelection: {
    type: Boolean as PropType<boolean>,
    default: false
  }
})

const attrs = useAttrs()

const tableRef = ref<HTMLElement | null>(null)
function getTableRef() {
  return tableRef.value as any
}

const _this = getCurrentInstance()
provide('tableRoot', _this)

const getBindValue = computed((): IObj => {
  const bindValue = { ...attrs, ...props } as IObj
  delete bindValue.columns
  return bindValue
})

function getItemBindValue(item: IObj) {
  const delArr: string[] = []
  const obj = deepClone(item)
  for (const key in obj) {
    if (delArr.indexOf(key) !== -1) {
      delete obj[key]
    }
  }
  return obj
}

const getPaginationBindValue = computed((): IObj => {
  const PaginationBindValue =
    props.pagination && isObject(props.pagination) ? { ...props.pagination } : {}
  return PaginationBindValue
})

const paginationStyle = computed(() => {
  return {
    textAlign: (props.pagination && (props.pagination as IObj).position) || 'right'
  }
})

function headerDragend(newWidth: number, _: number, column: IObj) {
  // 不懂为啥无法自动计算宽度，只能手动去计算了。。失望ing，到时候看看能不能优化吧。
  const htmlArr = document.getElementsByClassName(column.id)
  for (const v of htmlArr as any) {
    if (v.firstElementChild) {
      ;(v.firstElementChild as any).style.width = newWidth + 'px'
    }
  }
}

defineExpose({
  getTableRef
})
</script>

<style lang="less" scoped>
.pagination__wrap {
  padding: 10px;
  margin-top: 15px;
  background: #fff;
}
</style>

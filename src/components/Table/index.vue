<template>
  <div>
    <el-table ref="elTable" :border="true" v-bind="getBindValue" @header-dragend="headerDragend">
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
            v-bind="{...getItemBindValue(item)}"
            type="index"
            :index="item.index"
          />
        </template>

        <!-- 树型数据 -->
        <template v-else-if="item.children && item.children.length">
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
                v-if="item.slots && item.slots.default"
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

<script lang="ts">
import { defineComponent, PropType, computed, provide, getCurrentInstance, ref, unref } from 'vue'
import { deepClone } from '@/utils'
import { isObject } from '@/utils/is'
import TableColumn from './components/TableColumn.vue'
import TableSlot from './components/Slot.vue'
export default defineComponent({
  name: 'ComTable',
  components: {
    TableSlot,
    TableColumn
  },
  props: {
    // 表头
    columns: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    // 是否多选
    selection: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    // 是否展示分页
    pagination: {
      type: [Boolean, Object] as PropType<boolean | object>,
      default: false
    },
    // 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key）
    reserveSelection: {
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

    function getItemBindValue(item: any) {
      const delArr: string[] = []
      const obj = deepClone(item)
      for (const key in obj) {
        if (delArr.indexOf(key) !== -1) {
          delete obj[key]
        }
      }
      return obj
    }

    const getPaginationBindValue = computed((): any => {
      const PaginationBindValue = props.pagination && isObject(props.pagination)
        ? { ...(props.pagination as any) }
        : {}
      return PaginationBindValue
    })

    const paginationStyle = computed(() => {
      return {
        textAlign: props.pagination && (props.pagination as any).position || 'right'
      }
    })

    function headerDragend(newWidth: number, oldWidth: number, column: any) {
      // 不懂为啥无法自动计算宽度，只能手动去计算了。。失望ing，到时候看看能不能优化吧。
      const htmlArr = document.getElementsByClassName(column.id)
      for (const v of htmlArr) {
        if (v.firstElementChild) {
          (v.firstElementChild as any).style.width = newWidth + 'px'
        }
      }
    }

    return {
      elTable,
      getBindValue, getItemBindValue,
      slots,
      getTableRef,
      getPaginationBindValue, paginationStyle,
      headerDragend
    }
  }
})
</script>

<style lang="less" scoped>
.pagination__wrap {
  margin-top: 15px;
  background: #fff;
  padding: 10px;
}
</style>

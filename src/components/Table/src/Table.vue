<script lang="tsx">
import { ElTable, ElTableColumn, ElPagination } from 'element-plus'
import { defineComponent, PropType, ref, computed, unref, watch, onMounted } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { setIndex } from './helper'
import { getSlot } from '@/utils/tsxHelper'
import type { TableProps } from './types'

export default defineComponent({
  name: 'Table',
  props: {
    pageSize: propTypes.number.def(10),
    currentPage: propTypes.number.def(1),
    // 是否多选
    selection: propTypes.bool.def(true),
    // 是否所有的超出隐藏，优先级低于schema中的showOverflowTooltip,
    showOverflowTooltip: propTypes.bool.def(true),
    // 表头
    columns: {
      type: Array as PropType<TableColumn[]>,
      default: () => []
    },
    // 是否展示分页
    pagination: {
      type: Object as PropType<Pagination>,
      default: (): Pagination | undefined => undefined
    },
    // 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key）
    reserveSelection: propTypes.bool.def(false),
    // 加载状态
    loading: propTypes.bool.def(false),
    // 是否叠加索引
    reserveIndex: propTypes.bool.def(false),
    // 对齐方式
    align: propTypes.string
      .validate((v: string) => ['left', 'center', 'right'].includes(v))
      .def('left'),
    // 表头对齐方式
    headerAlign: propTypes.string
      .validate((v: string) => ['left', 'center', 'right'].includes(v))
      .def('left'),
    data: {
      type: Array as PropType<Recordable[]>,
      default: () => []
    }
  },
  emits: ['update:pageSize', 'update:currentPage', 'register'],
  setup(props, { attrs, slots, emit, expose }) {
    const elTableRef = ref<ComponentRef<typeof ElTable>>()

    // 注册
    onMounted(() => {
      emit('register', unref(elTableRef)?.$parent, unref(elTableRef))
    })

    const pageSizeRef = ref(props.pageSize)

    const currentPageRef = ref(props.currentPage)

    // useTable传入的props
    const outsideProps = ref<TableProps>({})

    const mergeProps = ref<TableProps>({})

    const getProps = computed(() => {
      const propsObj = { ...props }
      Object.assign(propsObj, unref(mergeProps))
      return propsObj
    })

    const setProps = (props: TableProps = {}) => {
      mergeProps.value = Object.assign(unref(mergeProps), props)
      outsideProps.value = props
    }

    expose({
      setProps
    })

    const pagination = computed(() => {
      return Object.assign(
        {
          small: false,
          background: false,
          pagerCount: 7,
          layout: 'sizes, prev, pager, next, jumper, ->, total',
          pageSizes: [10, 20, 30, 40, 50, 100],
          disabled: false,
          hideOnSinglePage: false,
          total: 10
        },
        unref(getProps).pagination
      )
    })

    watch(
      () => unref(getProps).pageSize,
      (val: number) => {
        pageSizeRef.value = val
      }
    )

    watch(
      () => unref(getProps).currentPage,
      (val: number) => {
        currentPageRef.value = val
      }
    )

    watch(
      () => pageSizeRef.value,
      (val: number) => {
        emit('update:pageSize', val)
      }
    )

    watch(
      () => currentPageRef.value,
      (val: number) => {
        emit('update:currentPage', val)
      }
    )

    const getBindValue = computed(() => {
      const bindValue: Recordable = { ...attrs, ...props }
      delete bindValue.columns
      delete bindValue.data
      return bindValue
    })

    const renderTableSelection = () => {
      // 渲染多选
      return unref(getProps).selection ? (
        <ElTableColumn
          type="selection"
          reserveSelection={unref(getProps).reserveSelection}
          align={unref(getProps).align}
          headerAlign={unref(getProps).headerAlign}
          width="50"
        ></ElTableColumn>
      ) : undefined
    }

    const rnderTableColumn = (columns: TableColumn[]) => {
      return [renderTableSelection()].concat(
        columns.map((v) => {
          // 自定生成序号
          if (v.type === 'index') {
            return (
              <ElTableColumn
                type="index"
                index={
                  v.index
                    ? v.index
                    : (index) =>
                        setIndex(
                          unref(getProps).reserveIndex,
                          index,
                          unref(getProps).pageSize,
                          unref(getProps).currentPage
                        )
                }
                align={v.align || unref(getProps).align}
                headerAlign={v.headerAlign || unref(getProps).headerAlign}
                label={v.label}
                width="100px"
              ></ElTableColumn>
            )
          } else {
            return (
              <ElTableColumn
                showOverflowTooltip={unref(getProps).showOverflowTooltip}
                align={unref(getProps).align}
                headerAlign={unref(getProps).headerAlign}
                {...v}
                prop={v.field}
              >
                {{
                  default: (data: TableSlotDefault) =>
                    // @ts-ignore
                    getSlot(slots, v.field, data) ||
                    v?.formatter?.(data.row, data.column, data.row[v.field], data.$index) ||
                    data.row[v.field],
                  // @ts-ignore
                  header: getSlot(slots, `${v.field}-header`)
                }}
              </ElTableColumn>
            )
          }
        })
      )
    }

    return () => (
      <>
        <ElTable
          // @ts-ignore
          ref={elTableRef}
          data={unref(getProps).data}
          {...getBindValue}
          v-loading={unref(getProps).loading}
        >
          {{
            default: () => rnderTableColumn(unref(getProps).columns),
            // @ts-ignore
            append: () => getSlot(slots, 'append')
          }}
        </ElTable>
        {unref(getProps).pagination ? (
          <ElPagination
            v-model:pageSize={pageSizeRef.value}
            v-model:currentPage={currentPageRef.value}
            class="mt-10px"
            {...unref(pagination)}
          ></ElPagination>
        ) : undefined}
      </>
    )
  }
})
</script>

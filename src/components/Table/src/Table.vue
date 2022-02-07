<script lang="tsx">
import { ElTable, ElTableColumn } from 'element-plus'
import { defineComponent, PropType, ref, computed, unref } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { setIndex } from './helper'
import { getSlot } from '@/utils/tsxHelper'

export default defineComponent({
  name: 'Table',
  props: {
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
    // pagination: {
    //   type: [Boolean, Object] as PropType<boolean | IObj>,
    //   default: false
    // },
    // 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key）
    reserveSelection: propTypes.bool.def(false),
    // 加载状态
    loading: propTypes.bool.def(false),
    // 是否叠加索引
    reserveIndex: propTypes.bool.def(true),
    // 对齐方式
    align: propTypes.string
      .validate((v: string) => ['left', 'center', 'right'].includes(v))
      .def('left'),
    headerAlign: propTypes.string
      .validate((v: string) => ['left', 'center', 'right'].includes(v))
      .def('left'),
    // 表头对齐方式
    data: {
      type: Array as PropType<Recordable[]>,
      default: () => []
    }
  },
  setup(props, { attrs, slots }) {
    const tableRef = ref<ComponentRef<typeof ElTable>>()

    const getProps = computed(() => props)

    const getBindValue = computed(() => {
      const bindValue: Recordable = { ...attrs, ...props }
      delete bindValue.columns
      delete bindValue.data
      return bindValue
    })

    const renderTableSelection = () => {
      return (
        <ElTableColumn
          type="selection"
          reserveSelection={props.reserveSelection}
          align={unref(getProps).align}
          headerAlign={unref(getProps).headerAlign}
          width="50"
        ></ElTableColumn>
      )
    }

    const rnderTableColumn = (columns: TableColumn[]) => {
      return (props.selection ? [renderTableSelection()] : []).concat(
        columns.map((v, i) => {
          if (v.type === 'index') {
            return (
              <ElTableColumn
                type="index"
                index={v.index ? v.index : setIndex()}
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
                  default: () =>
                    // @ts-ignore
                    getSlot(slots, v.field, { row: props.data[i], field: v.field, index: i }) ||
                    v?.formatter?.() ||
                    props.data[i][v.field],
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
          ref={tableRef}
          data={unref(getProps).data}
          {...getBindValue}
          v-loading={unref(getProps).loading}
        >
          {{
            default: () => rnderTableColumn(props.columns),
            // @ts-ignore
            append: () => getSlot(slots, 'append')
          }}
        </ElTable>
      </>
    )
  }
})
</script>

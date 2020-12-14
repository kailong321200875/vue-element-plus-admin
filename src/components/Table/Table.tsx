import { defineComponent, PropType, computed } from 'vue'
import { Table } from 'ant-design-vue'

export default defineComponent({
  name: 'ComTable',
  props: {
    columns: {
      type: Array as PropType<any[]>,
      default: () => []
    }
  },
  setup(props, { attrs, slots }) {
    const getBindValue = computed((): any => {
      const bindValue = { ...attrs, ...props }
      delete bindValue.columns
      return bindValue
    })
    
    function renderTabelItem(columns: any[]) {
      return columns.map((v: any) => {
        const vSlots: any = v.slots || {}
        if (v.children) {
          const slotData = {
            title: () => vSlots.title && slots[vSlots.title] && slots[vSlots.title]!(),
            default: () => {renderTabelItem(v.children)}
          }
          if (!vSlots.title) {
            delete slotData.title
          }
          return (
            <Table.ColumnGroup
              v-slots={{...slotData}}
            >
            </Table.ColumnGroup>
          )
        } else {
          const slotData = {
            title: () => vSlots.title && slots[vSlots.title] && slots[vSlots.title]!(),
            default: ({ text, record, index, column }: any) => {
              if (vSlots.customRender) {
                return slots[vSlots.customRender] && slots[vSlots.customRender]!({ text, record, index, column })
              } else {
                return text
              }
            },
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, column }: any) => vSlots.filterDropdown && slots[vSlots.filterDropdown] && slots[vSlots.filterDropdown]!({ setSelectedKeys, selectedKeys, confirm, clearFilters, column }),
            filterIcon: (filtered: any) => vSlots.filterIcon && slots[vSlots.filterIcon] && slots[vSlots.filterIcon]!(filtered)
            }
          if (!vSlots.title) {
            delete slotData.title
          }
          if (!vSlots.filterDropdown) {
            delete slotData.filterDropdown
          }
          if (!vSlots.filterIcon) {
            delete slotData.filterIcon
          }
          return (
            <Table.Column
              {...v}
              v-slots={{...slotData}}
            >
            </Table.Column>
          )
        }
      })
    }
    
    return () => {
      const tableSlot = {
        title: (currentPageData: any) => slots.title && slots.title(currentPageData),
        footer: (currentPageData: any) => slots.footer && slots.footer(currentPageData),
        expandedRowRender: ({ record, index, indent, expanded }: any) => slots.expandedRowRender && slots.expandedRowRender({ record, index, indent, expanded }),
      }
      if (!slots.title) {
        delete tableSlot.title
      }
      if (!slots.footer) {
        delete tableSlot.footer
      }
      if (!slots.expandedRowRender) {
        delete tableSlot.expandedRowRender
      }
      return (
        <Table
          {...(getBindValue as any)}
          v-slots={tableSlot}
        >
          {renderTabelItem(props.columns)}
        </Table>
      )
    }
  }
})

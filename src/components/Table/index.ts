import Table from './src/Table.vue'
import { ElTable } from 'element-plus'
import { TableSetProps } from './src/types'

export type {
  TableColumn,
  TableSlotDefault,
  Pagination,
  TableSetProps,
  TableProps
} from './src/types'

export interface TableExpose {
  setProps: (props: Recordable) => void
  setColumn: (columnProps: TableSetProps[]) => void
  selections: Recordable[]
  elTableRef: ComponentRef<typeof ElTable>
}

export { Table }

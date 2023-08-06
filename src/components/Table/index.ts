import Table from './src/Table.vue'
import { ElTable } from 'element-plus'
import { TableColumn, TableSetProps } from './src/types'

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
  addColumn: (column: TableColumn, index?: number) => void
  delColumn: (field: string) => void
  elTableRef: ComponentRef<typeof ElTable>
}

export { Table }

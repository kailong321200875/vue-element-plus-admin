declare type TableColumn = {
  field: string
  label?: string
} & Recordable

declare type TableSlotDefault = {
  row: Recordable
  column: TableColumn
  $index: number
} & Recordable

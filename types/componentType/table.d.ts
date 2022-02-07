declare type TableColumn = {
  field: string
  label?: string
} & Recordable

declare type TableColumnDefault = {
  row: Recordable
  field: string
  index: number
}

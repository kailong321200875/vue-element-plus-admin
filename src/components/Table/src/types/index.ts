export interface TableColumn {
  field: string
  label?: string
  children?: TableColumn[]
  [key: string]: any
}

export interface TableSlotDefault {
  row: Recordable
  column: TableColumn
  $index: number
  [key: string]: any
}

export interface Pagination {
  small?: boolean
  background?: boolean
  pageSize?: number
  defaultPageSize?: number
  total?: number
  pageCount?: number
  pagerCount?: number
  currentPage?: number
  defaultCurrentPage?: number
  layout?: string
  pageSizes?: number[]
  popperClass?: string
  prevText?: string
  nextText?: string
  disabled?: boolean
  hideOnSinglePage?: boolean
}

export interface TableSetProps {
  field: string
  path: string
  value: any
}

export interface TableProps {
  pageSize?: number
  currentPage?: number
  // 是否多选
  selection?: boolean
  // 是否所有的超出隐藏，优先级低于schema中的showOverflowTooltip,
  showOverflowTooltip?: boolean
  // 表头
  columns?: TableColumn[]
  // 是否展示分页
  pagination?: Pagination | undefined
  // 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key）
  reserveSelection?: boolean
  // 加载状态
  loading?: boolean
  // 是否叠加索引
  reserveIndex?: boolean
  // 对齐方式
  align?: 'left' | 'center' | 'right'
  // 表头对齐方式
  headerAlign?: 'left' | 'center' | 'right'
  data?: Recordable
  expand?: boolean
  [key: string]: any
}

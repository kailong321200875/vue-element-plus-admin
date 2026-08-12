export interface TableItem {
  id: string
  author: string
  title: string
  content: string
  importance: number
  display_time: string
  pageviews: number
}

export interface TableListParams {
  pageIndex: number
  pageSize: number
  title?: string
}

export interface TableListResult {
  list: TableItem[]
  total: number
}

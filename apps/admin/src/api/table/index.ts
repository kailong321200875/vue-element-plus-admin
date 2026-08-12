import request from '@/axios'
import type { TableItem, TableListParams, TableListResult } from './types'

export const getTableListApi = (params: TableListParams) => {
  return request.get<TableListResult>({ url: '/mock/example/list', params })
}

export const saveTableItemApi = (data: Partial<TableItem>) => {
  return request.post<string>({ url: '/mock/example/save', data })
}

export const getTableDetailApi = (id: string) => {
  return request.get<TableItem>({ url: '/mock/example/detail', params: { id } })
}

export const deleteTableItemsApi = (ids: Array<string | number>) => {
  return request.post<string>({ url: '/mock/example/delete', data: { ids } })
}

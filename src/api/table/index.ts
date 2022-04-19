import { useAxios } from '@/hooks/web/useAxios'
import type { TableData } from './types'

const request = useAxios()

export const getTableListApi = ({ params }) => {
  return request.get<{
    total: number
    list: TableData[]
  }>({ url: '/example/list', params })
}

export const saveTableApi = ({ data }) => {
  return request.post<TableData>({ url: '/example/save', data })
}

export const getTableDetApi = ({ params }) => {
  return request.get<TableData>({ url: '/example/detail', params })
}

export const delTableListApi = ({ data }) => {
  return request.post({ url: '/example/delete', data })
}

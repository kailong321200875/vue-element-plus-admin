import { useAxios } from '@/hooks/web/useAxios'
import type { TableData } from './types'

const { request } = useAxios()

export const getTableListApi = ({ params }: AxiosConfig) => {
  return request<{
    total: number
    list: TableData[]
  }>({ url: '/example/list', method: 'get', params })
}

export const saveTableApi = ({ data }: AxiosConfig<Recordable, TableData>) => {
  return request({ url: '/example/save', method: 'post', data })
}

export const getTableDetApi = ({
  params
}: AxiosConfig<
  {
    id: string
  },
  Recordable
>) => {
  return request<TableData>({ url: '/example/detail', method: 'get', params })
}

export const delTableListApi = ({
  data
}: AxiosConfig<
  Recordable,
  {
    id: string[] | number[]
  }
>) => {
  return request({ url: '/example/delete', method: 'post', data })
}

import { useAxios } from '@/hooks/web/useAxios'
import type { TableData } from './types'

const { request } = useAxios()

export const getTableListApi = ({ params }: AxiosConfig) => {
  return request<{
    total: number
    list: TableData[]
  }>({ url: '/example/list', method: 'get', params })
}

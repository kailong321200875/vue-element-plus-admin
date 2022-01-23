import { useAxios } from '@/hooks/web/useAxios'

const { request } = useAxios()

export const getCountApi = () => {
  return request({ url: '/analysis/total', method: 'get' })
}

import { useAxios } from '@/hooks/web/useAxios'

const { request } = useAxios()

export const loginApi = ({ data }: AxiosConfig) => {
  return request({ url: '/user/login', method: 'post', data })
}

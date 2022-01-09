import { useAxios } from '@/hooks/web/useAxios'
import type { UserLoginType } from './types'

const { request } = useAxios()

export const loginApi = (data: UserLoginType) => {
  return request({ url: '/user/login', method: 'post', data })
}

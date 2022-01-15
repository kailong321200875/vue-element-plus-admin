import { useAxios } from '@/hooks/web/useAxios'
import type { UserLoginType } from './types'

const { request } = useAxios()

export const loginApi = (data: UserLoginType) => {
  return request({ url: '/user/login', method: 'post', data } as AxiosConfig<
    Recordable,
    UserLoginType
  >)
}

export const loginOutApi = () => {
  return request({ url: '/user/loginOut', method: 'get' })
}

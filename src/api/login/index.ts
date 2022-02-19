import { useAxios } from '@/hooks/web/useAxios'
import type { UserLoginType, UserType } from './types'

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

export const getUserListApi = ({ params }: AxiosConfig) => {
  return request<{
    total: number
    list: UserType[]
  }>({ url: '/user/list', method: 'get', params })
}

export const getAdminRoleApi = ({ params }: AxiosConfig) => {
  return request<{
    list: AppCustomRouteRecordRaw[]
  }>({ url: '/role/list', method: 'get', params })
}

export const getTestRoleApi = ({ params }: AxiosConfig) => {
  return request<{
    list: string[]
  }>({ url: '/role/list', method: 'get', params })
}

import { useAxios } from '@/hooks/web/useAxios'
import type { UserType } from './types'
import { IUserModel } from '@/api-types/user'

const request = useAxios()

export const loginApi = async (data: Pick<IUserModel, 'user_name' | 'password'>) => {
  const res = await request.post<IResponse<IUserModel>>({
    url: '/user/login',
    data
  })
  return res && res.data
}

export const loginOutApi = () => {
  return request.get({ url: '/user/loginOut' })
}

export const getUserListApi = ({ params }: AxiosConfig) => {
  return request.get<{
    total: number
    list: UserType[]
  }>({ url: '/user/list', params })
}

export const getAdminRoleApi = ({ params }) => {
  return request.get<{
    list: AppCustomRouteRecordRaw[]
  }>({ url: '/role/list', params })
}

export const getTestRoleApi = ({ params }) => {
  return request.get<{
    list: string[]
  }>({ url: '/role/list', params })
}

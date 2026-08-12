import request from '@/axios'
import type { LoginParams, LoginResult, UserListParams, UserListResult } from './types'

export const loginApi = (data: LoginParams) => {
  return request.post<LoginResult>({ url: '/mock/user/login', data })
}

export const logoutApi = () => {
  return request.get({ url: '/mock/user/loginOut' })
}

export const getUserListApi = (params: UserListParams) => {
  return request.get<UserListResult>({ url: '/mock/user/list', params })
}

export const getRouteListApi = () => {
  return request.get<AppCustomRouteRecordRaw[]>({ url: '/mock/role/list' })
}

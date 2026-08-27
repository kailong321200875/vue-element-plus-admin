import request from '@/request'
import type { LoginParams, LoginResult } from './types'

export const loginApi = (data: LoginParams) => {
  return request.post<LoginResult>({ url: '/mock/user/login', data })
}

export const logoutApi = () => {
  return request.get({ url: '/mock/user/loginOut' })
}

export const getRouteListApi = () => {
  return request.get<AppCustomRouteRecordRaw[]>({ url: '/mock/role/list' })
}

import request from '@/config/axios'
import { DepartmentListResponse, DepartmentUserParams, DepartmentUserResponse } from './types'

export const getDepartmentApi = () => {
  return request.get<DepartmentListResponse>({ url: '/department/list' })
}

export const getUserByIdApi = (params: DepartmentUserParams) => {
  return request.get<DepartmentUserResponse>({ url: '/department/users', params })
}

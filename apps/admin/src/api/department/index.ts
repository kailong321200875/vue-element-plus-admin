import request from '@/axios'
import type {
  DepartmentListResult,
  DepartmentTreeResult,
  DepartmentUserListParams,
  DepartmentUserListResult
} from './types'

export const getDepartmentTreeApi = () => {
  return request.get<DepartmentTreeResult>({ url: '/mock/department/list' })
}

export const getDepartmentUserListApi = (params: DepartmentUserListParams) => {
  return request.get<DepartmentUserListResult>({ url: '/mock/department/users', params })
}

export const deleteDepartmentUsersApi = (ids: Array<string | number>) => {
  return request.post<string>({ url: '/mock/department/user/delete', data: { ids } })
}

export const saveDepartmentUserApi = (data: Record<string, unknown>) => {
  return request.post<string>({ url: '/mock/department/user/save', data })
}

export const saveDepartmentApi = (data: Record<string, unknown>) => {
  return request.post<string>({ url: '/mock/department/save', data })
}

export const deleteDepartmentsApi = (ids: Array<string | number>) => {
  return request.post<string>({ url: '/mock/department/delete', data: { ids } })
}

export const getDepartmentListApi = (params: Record<string, unknown>) => {
  return request.get<DepartmentListResult>({ url: '/mock/department/table/list', params })
}

import request from '@/axios'
import type { RoleListResult } from './types'

export const getRoleListApi = () => {
  return request.get<RoleListResult>({ url: '/mock/role/table' })
}

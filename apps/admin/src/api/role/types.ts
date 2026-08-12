import type { MenuItem } from '@/api/menu/types'

export interface RoleItem {
  id: string
  roleName: string
  role: string
  status: number
  createTime: string
  remark: string
  menu: MenuItem[]
}

export interface RoleListResult {
  list: RoleItem[]
  total: number
}

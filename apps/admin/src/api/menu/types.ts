import type { RouteMeta } from 'vue-router'

export interface MenuPermission {
  id: string | number
  label: string
  value: string
}

export interface MenuItem {
  id: string | number
  name: string
  path: string
  title: string
  type: number
  status: number
  parentId?: string | number
  component?: string
  redirect?: string
  meta: RouteMeta
  permissionList?: MenuPermission[]
  children?: MenuItem[]
}

export interface MenuListResult {
  list: MenuItem[]
}

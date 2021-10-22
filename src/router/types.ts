import type { RouteRecordRaw } from 'vue-router'
export interface RouteMeta {
  hidden?: boolean
  alwaysShow?: boolean
  title?: string
  icon?: string
  noCache?: boolean
  breadcrumb?: boolean
  affix?: boolean
  activeMenu?: string
  parent?: string
  noTagsView?: boolean
  followAuth?: string
  showMainRoute?: boolean
  followRoute?: string
}
// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  meta: RouteMeta
  title?: string
  children?: AppRouteRecordRaw[]
}

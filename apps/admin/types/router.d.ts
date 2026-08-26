import type { RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'

interface RouteMetaCustom extends Record<string | number | symbol, unknown> {
  hidden?: boolean
  alwaysShow?: boolean
  title?: string
  icon?: string
  noCache?: boolean
  breadcrumb?: boolean
  affix?: boolean
  activeMenu?: string
  noTagsView?: boolean
}

declare module 'vue-router' {
  interface RouteMeta extends RouteMetaCustom {}
}

type Component<T = any> =
  ReturnType<typeof defineComponent> | (() => Promise<typeof import('*.vue')>) | (() => Promise<T>)

declare global {
  declare interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
    name: string
    meta: RouteMetaCustom
    component?: Component | string
    children?: AppRouteRecordRaw[]
  }

  declare interface AppCustomRouteRecordRaw extends Omit<
    RouteRecordRaw,
    'meta' | 'component' | 'children'
  > {
    name: string
    meta: RouteMetaCustom
    component: string
    path: string
    redirect?: string
    children?: AppCustomRouteRecordRaw[]
  }
}

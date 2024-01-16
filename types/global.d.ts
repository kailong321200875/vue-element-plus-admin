import type { CSSProperties } from 'vue'
import { RawAxiosRequestHeaders } from 'axios'
declare global {
  declare interface Fn<T = any> {
    (...arg: T[]): T
  }

  declare type Nullable<T> = T | null

  declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

  declare type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>

  declare type RemoveReadonly<T> = {
    -readonly [P in keyof T]: T[P]
  }

  declare type ComponentRef<T> = InstanceType<T>

  declare type LocaleType = 'zh-CN' | 'en'

  declare type TimeoutHandle = ReturnType<typeof setTimeout>
  declare type IntervalHandle = ReturnType<typeof setInterval>

  declare type ElementPlusInfoType = 'success' | 'info' | 'warning' | 'danger'

  declare type LayoutType = 'classic' | 'topLeft' | 'top' | 'cutMenu'

  declare type AxiosContentType =
    | 'application/json'
    | 'application/x-www-form-urlencoded'
    | 'multipart/form-data'
    | 'text/plain'

  declare type AxiosMethod = 'get' | 'post' | 'delete' | 'put'

  declare type AxiosResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

  declare interface AxiosConfig {
    params?: any
    data?: any
    url?: string
    method?: AxiosMethod
    headers?: RawAxiosRequestHeaders
    responseType?: AxiosResponseType
  }

  declare interface IResponse<T = any> {
    code: number
    data: T extends any ? T : T & any
  }

  declare interface ThemeTypes {
    elColorPrimary?: string
    leftMenuBorderColor?: string
    leftMenuBgColor?: string
    leftMenuBgLightColor?: string
    leftMenuBgActiveColor?: string
    leftMenuCollapseBgActiveColor?: string
    leftMenuTextColor?: string
    leftMenuTextActiveColor?: string
    logoTitleTextColor?: string
    logoBorderColor?: string
    topHeaderBgColor?: string
    topHeaderTextColor?: string
    topHeaderHoverColor?: string
    topToolBorderColor?: string
  }
}

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

  declare type TimeoutHandle = ReturnType<typeof setTimeout>
  declare type IntervalHandle = ReturnType<typeof setInterval>

  declare type ElementPlusStatus = 'success' | 'info' | 'warning' | 'danger'

  declare type LayoutMode = 'sidebar' | 'top' | 'mixed' | 'dual'

  declare type AxiosContentType =
    'application/json' | 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'

  declare interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_API_BASE_PATH: string
    readonly VITE_BASE_PATH: string
    readonly VITE_DROP_DEBUGGER: string
    readonly VITE_DROP_CONSOLE: string
    readonly VITE_SOURCEMAP: string
    readonly VITE_OUT_DIR: string
    readonly VITE_USE_BUNDLE_ANALYZER: string
    readonly VITE_USE_ALL_ELEMENT_PLUS_STYLE: string
    readonly VITE_USE_MOCK: string
    readonly VITE_USE_CSS_SPLIT: string
  }
}

export {}

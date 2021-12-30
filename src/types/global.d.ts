declare interface Fn<T = any> {
  (...arg: T[]): T
}

declare type Nullable<T> = T | null

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

declare type ElememtPlusSzie = 'default' | 'medium' | 'small' | 'mini'

declare type ElementPlusInfoType = 'success' | 'info' | 'warning' | 'danger'

declare type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>

declare type ComponentRef<T> = InstanceType<T>

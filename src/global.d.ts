declare interface Fn<T = any> {
  (...arg: T[]): T
}

// 任意对象
declare interface IObj<T = any> {
  [key: string]: T
  [key: number]: T
}

declare type Nullable<T> = T | null

declare interface FetchConfig {
  params?: any
  data?: any
  url?: string
  method?: 'get' | 'post' | 'delete' | 'put'
  headersType?: string
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'
}

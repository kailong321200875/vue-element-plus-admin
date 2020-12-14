// 空对象
export interface EmptyObj {
  [key: string]: any
}

// 对象方法
export interface EmptyObjFun {
  [key: string]: Function
}

declare type Nullable<T> = T | null

// 任意对象
declare interface IObj<T = any> {
  [key: string]: T
  [key: number]: T
}

declare type KeyString<T = any> = {
  [key: string]: T
}

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

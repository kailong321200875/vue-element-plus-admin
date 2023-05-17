import type { CSSProperties } from 'vue'
import {
  ColProps,
  ComponentProps,
  ComponentName,
  InputComponentProps,
  AutocompleteComponentProps,
  InputNumberComponentProps,
  SelectComponentProps,
  SelectV2ComponentProps,
  CascaderComponentProps,
  SwitchComponentProps,
  RateComponentProps,
  ColorPickerComponentProps,
  TransferComponentProps
} from '@/types/components'
import { FormValueType, FormValueType } from '@/types/form'
import type { AxiosPromise } from 'axios'

export type FormSetPropsType = {
  field: string
  path: string
  value: any
}

export type FormValueType = string | number | string[] | number[] | boolean | undefined | null

export type FormItemProps = {
  labelWidth?: string | number
  required?: boolean
  rules?: Recordable
  error?: string
  showMessage?: boolean
  inlineMessage?: boolean
  style?: CSSProperties
}

export interface FormSchema {
  /**
   * 唯一标识
   */
  field: string

  /**
   * 标题
   */
  label?: string

  /**
   * 提示信息
   */
  labelMessage?: string

  /**
   * col组件属性
   */
  colProps?: ColProps

  /**
   * 表单组件属性，具体可以查看element-plus文档
   */
  componentProps?:
    | InputComponentProps
    | AutocompleteComponentProps
    | InputNumberComponentProps
    | SelectComponentProps
    | SelectV2ComponentProps
    | CascaderComponentProps
    | SwitchComponentProps
    | RateComponentProps
    | ColorPickerComponentProps
    | TransferComponentProps

  /**
   * formItem组件属性，具体可以查看element-plus文档
   */
  formItemProps?: FormItemProps

  /**
   * 渲染的组件名称
   */
  component?: ComponentName

  /**
   * 初始值
   */
  value?: FormValueType

  /**
   * 是否隐藏
   */
  hidden?: boolean

  /**
   * @returns 远程加载下拉项
   */
  api?: <T = any>() => AxiosPromise<T>
}

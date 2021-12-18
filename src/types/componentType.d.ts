import type { CSSProperties } from 'vue'
import type { RuleItem } from 'async-validator'

declare global {
  // BfForm types start
  declare type ComponentName =
    | 'Radio'
    | 'Checkbox'
    | 'Input'
    | 'Autocomplete'
    | 'InputNumber'
    | 'Select'
    | 'Cascader'
    | 'Switch'
    | 'Slider'
    | 'TimePicker'
    | 'DatePicker'
    | 'Rate'
    | 'ColorPicker'
    | 'Transfer'
    | 'Divider'
    | 'TimeSelect'
    | 'SelectV2'

  declare type ColProps = {
    span?: number
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    tag?: string
  }

  declare type FormValueTypes = string | number | string[] | number[] | boolean | undefined | null

  declare interface FormItemRule extends RuleItem {
    trigger?: string
  }

  declare type FormRulesMap<T extends string = string> = Partial<
    Record<T, FormItemRule | FormItemRule[]>
  >

  declare type FormItemProps = {
    labelWidth?: string | number
    required?: boolean
    rules?: FormRulesMap
    error?: string
    showMessage?: boolean
    inlineMessage?: boolean
    style?: CSSProperties
  }

  declare type FormOptions = {
    label?: string
    value?: FormValueTypes
    disabled?: boolean
    key?: string | number
    children?: FormOptions[]
    options?: FormOptions[]
    [key: string]: any
  }

  declare type FormOptionsAlias = {
    labelField?: string
    valueField?: string
  }

  declare type VFormSchema = {
    // 唯一值
    field: string
    // 标题
    label?: string
    // col组件属性
    colProps?: ColProps
    // 表单组件属性，slots对应的是表单组件的插槽，规则：${field}-xxx，具体可以查看element-plus文档
    componentProps?: { slots?: Recordable } & Recordable
    // formItem组件属性
    formItemProps?: FormItemProps
    // 渲染的组件
    component?: ComponentName
    // 初始值
    value?: FormValueTypes
    // 下拉选项
    options?: FormOptions[]
    // 下拉选项别名
    optionsField?: FormOptionsAlias
    // 下拉选项插槽，规则：${field}-option
    optionsSlot?: boolean
    // 是否隐藏
    hidden?: boolean
    // 表单组件插槽，规则：${field}
    slot?: boolean
  }

  // VForm types end
}

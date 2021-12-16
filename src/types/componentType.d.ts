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

  declare type FormValueTypes = string | number | string[] | number[] | boolean | undefined

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
    field: string
    label?: string
    colProps?: ColProps
    componentProps?: Recordable
    formItemProps?: FormItemProps
    component?: ComponentName
    value?: FormValueTypes
    options?: FormOptions[]
    optionsField?: FormOptionsAlias
    optionsSlot?: boolean
    hidden?: boolean
  }

  // VForm types end
}

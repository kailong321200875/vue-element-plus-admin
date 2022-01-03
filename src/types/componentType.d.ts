import type { CSSProperties } from 'vue'
import type { RuleItem } from 'async-validator'

declare global {
  // Form types start
  declare type ComponentName =
    | 'Radio'
    | 'RadioButton'
    | 'Checkbox'
    | 'CheckboxButton'
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
    | 'InputPassword'

  type ColProps = {
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

  declare type ComponentOptions = {
    label?: string
    value?: FormValueTypes
    disabled?: boolean
    key?: string | number
    children?: ComponentOptions[]
    options?: ComponentOptions[]
  } & Recordable

  declare type ComponentOptionsAlias = {
    labelField?: string
    valueField?: string
  }

  declare type ComponentProps = {
    optionsAlias?: ComponentOptionsAlias
    options?: ComponentOptions[]
    optionsSlot?: boolean
  } & Recordable

  declare type FormSchema = {
    // 唯一值
    field: string
    // 标题
    label?: string
    // col组件属性
    colProps?: ColProps
    // 表单组件属性，slots对应的是表单组件的插槽，规则：${field}-xxx，具体可以查看element-plus文档
    componentProps?: { slots?: Recordable } & ComponentProps
    // formItem组件属性
    formItemProps?: FormItemProps
    // 渲染的组件
    component?: ComponentName
    // 初始值
    value?: FormValueTypes
    // 是否隐藏
    hidden?: boolean
  }
  // Form types end

  // ConfigGlobal types start
  declare interface ConfigGlobalTypes {
    size?: ElememtPlusSzie
  }
  // ConfigGlobal types end

  // Icon type start
  declare interface IconTypes {
    size?: number
    color?: string
    icon: string
  }
  // Icon type end

  // LocaleDropdown type start
  declare interface Language {
    el: Recordable
    name: string
  }

  declare interface LocaleDropdownType {
    lang: LocaleType
    name?: string
    elLocale?: Language
  }
  // LocaleDropdown type end
}

import type { Component } from 'vue'

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

  declare type FormComponentSize = 'large' | 'medium' | 'small' | 'mini'

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

  declare type FormRules = {
    required?: boolean
    message?: string
    type?: string
    trigger?: 'blur' | 'change' | ['change', 'blur']
    validator?: (rule: any, value: FormValueTypes, callback: Fn) => void | boolean
  }

  declare type FormItem = {
    prop?: string
    label?: string
    labelWidth?: string | number
    required?: boolean
    rules?: FormRules | FormRules[]
    error?: string
    showMessage?: boolean
    inlineMessage?: boolean
    size?: ElememtPlusSzie
  }

  declare type FormOptions = {
    label?: string
    value?: FormValueTypes
    disabled?: boolean
    key?: string | number
    children?: FormOptions[]
    [key: string]: any
  }

  declare type FormOptionsAlias = {
    labelField?: string
    valueField?: string
  }

  declare type BlurOrFocusEvent = (e: Event) => viod

  declare type ChangeEvent = (data: { value: FormValueTypes; model: Recordable }) => viod

  declare type RadioProps = {
    border?: boolean
    name?: string
    onChange?: ChangeEvent
  }

  declare type CheckboxProps = {
    border?: boolean
    name?: string
    indeterminate?: boolean
    checked?: boolean
    onChange?: ChangeEvent
  }

  declare type InputProps = {
    type?: 'text' | 'textarea'
    maxlength?: string | number
    minlength?: string | number
    showWordLimit?: boolean
    placeholder?: string
    clearable?: boolean
    showPassword?: boolean
    prefixIcon?: string | Component
    suffixIcon?: string | Component
    rows?: number = 5
    autosize?:
      | boolean
      | {
          minRows?: number
          maxRows?: number
        }
    autocomplete?: string
    name?: string
    readonly?: boolean
    onBlur?: BlurOrFocusEvent
    onFocus?: BlurOrFocusEvent
    onChange?: ChangeEvent
    onInput?: ChangeEvent
    onClear?: Fn
    slots?: {
      prefix?: boolean
      suffix?: boolean
      prepend?: boolean
      append?: boolean
    }
  }

  declare type AutocompleteProps = {
    placeholder?: string
    clearable?: boolean
    valueKey?: string
    icon?: string | Component
    debounce?: number
    placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'
    fetchSuggestions?: (query: string, callback: Fn) => void
    popperClass?: string
    triggerOnFocus?: boolean
    name?: string
    selectWhenUnmatched?: boolean
    label?: boolean
    prefixIcon?: string
    suffixIcon?: string
    hideLoading?: boolean
    popperAppendToBody?: boolean
    highlightFirstItem?: boolean
    onSelect?: ChangeEvent
    change?: ChangeEvent
    slots?: {
      prefix?: boolean
      suffix?: boolean
      prepend?: boolean
      append?: boolean
    }
  }

  declare type InputNumberProps = {
    min?: number
    max?: number
    step?: number
    stepStrictly?: boolean
    precision?: number
    size?: FormComponentSize
    controls?: boolean
    controlsPosition?: 'top' | 'right'
    name?: string
    label?: string
    placeholder?: string
  }

  declare type SelectProps = {
    multiple?: boolean
    valueKey?: string
    size?: FormComponentSize
    clearable?: boolean
    collapseTags?: boolean
    multipleLimit?: number
    name?: string
    autocomplete?: string
    placeholder?: string
    filterable?: boolean
    allowCreate?: boolean
    filterMethod?: Fn
    remote?: boolean
    remoteMethod?: Fn
    loading?: boolean
    loadingText?: string
    noMatchText?: string
    noDataText?: string
    popperClass?: string
    reserveKeyword?: boolean
    defaultFirstOption?: boolean
    popperAppendToBody?: boolean
    automaticDropdown?: boolean
    clearIcon?: string | Component
    fitInputWidth?: boolean
    suffixIcon?: string | Component
    tagType?: ElementPlusInfoType
    onChange?: ChangeEvent
    onVisibleChange?: (val: boolean) => void
    onRemoveTag?: (val: string | number) => void
    onClear?: Fn
    onBlur?: BlurOrFocusEvent
    onFocus?: BlurOrFocusEvent
    slots?: {
      prefix?: boolean
      empty?: boolean
    }
    optionGroup?:
      | boolean
      | {
          label?: string
          disabled?: boolean
        }
  }

  declare type CascaderProps = {}

  declare type FormSchema = {
    field: string
    label?: string
    colProps?: ColProps
    componentProps?:
      | RadioProps
      | CheckboxProps
      | InputProps
      | AutocompleteProps
      | InputNumberProps
      | SelectProps
      | CascaderProps
    // formItemProps?: ElFormItem
    component?: ComponentName
    value?: FormValueTypes
    options?: FormOptions[]
    optionsField?: FormOptionsAlias
    hidden?: boolean
  }

  // BfForm types end
  declare type BfFormSchema = FormSchema[]
}

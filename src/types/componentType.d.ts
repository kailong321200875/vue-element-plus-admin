import type { Component, RendererNode, VNode, CSSProperties } from 'vue'
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
    [key: string]: any
  }

  declare type FormOptionsAlias = {
    labelField?: string
    valueField?: string
  }

  declare type BlurOrFocusEvent = (e: Event) => viod

  declare type ChangeEvent = (data: {
    value: FormValueTypes
    field: string
    model: Recordable
  }) => viod

  declare type RadioProps = {
    border?: boolean
    name?: string
    disabled?: boolean
    onChange?: ChangeEvent
  }

  declare type CheckboxProps = {
    border?: boolean
    name?: string
    indeterminate?: boolean
    disabled?: boolean
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
    disabled?: boolean
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
    disabled?: boolean
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
    controls?: boolean
    controlsPosition?: 'top' | 'right'
    name?: string
    label?: string
    disabled?: boolean
    placeholder?: string
  }

  declare type SelectProps = {
    multiple?: boolean
    valueKey?: string
    clearable?: boolean
    collapseTags?: boolean
    disabled?: boolean
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

  declare type CascaderProps = {
    props?: {
      expandTrigger?: 'click' | 'hover'
      multiple?: boolean
      checkStrictly?: boolean
      emitPath?: boolean
      lazy?: boolean
      lazyLoad?: (node: Recordable, resolve: Fn) => void
      value?: string
      label?: string
      children?: string
      disabled?: string
      leaf?: string
    }
    placeholder?: string
    disabled?: boolean
    clearable?: boolean
    showAllLevels?: boolean
    collapseTags?: boolean
    separator?: string
    filterable?: boolean
    filterMethod?: (node: Recordable, keyword: string | number) => boolean
    debounce?: number
    beforeFilter?: (value: string) => boolean | PromiseRejectedResult
    popperClass?: string
    popperAppendToBody?: boolean
    onChange?: ChangeEvent
    onExpandChange?: (parents: Recordable) => viod
    onBlur?: BlurOrFocusEvent
    onFocus?: BlurOrFocusEvent
    onVisiblechange?: (val: boolean) => void
    onRemoveTag?: (data: Recordable) => viod
    slots?: {
      default?: boolean
      empty?: boolean
    }
  }

  declare type SwitchProps = {
    disabled?: boolean
    loading?: boolean
    width?: number
    inlinePrompt?: boolean
    activeIcon?: string | Component
    inactiveIcon?: string | Component
    activeText?: string
    inactiveText?: string
    activeValue?: boolean | string | number
    inactiveValue?: boolean | string | number
    activeColor?: string
    inactiveColor?: string
    borderColor?: string
    string?: string
    beforeChange?: () => boolean | PromiseRejectedResult
    onChange?: ChangeEvent
  }

  declare type SliderProps = {
    min?: number
    max?: number
    disabled?: boolean
    step?: number
    showInput?: boolean
    showInputControls?: boolean
    showStops?: boolean
    showTooltip?: boolean
    formatTooltip?: (value: number) => string
    range?: boolean
    vertical?: boolean
    height?: string
    label?: string
    debounce?: number
    tooltipClass?: string
    marks?: Recordable
    onChange?: ChangeEvent
  }

  declare type TimePickerProps = {
    readonly?: boolean
    disabled?: boolean
    editable?: boolean
    clearable?: boolean
    placeholder?: string
    startPlaceholder?: string
    endPlaceholder?: string
    isRange?: boolean
    arrowControl?: boolean
    align?: 'left' | 'center' | 'right'
    popperClass?: string
    rangeSeparator?: string
    format?: string
    defaultValue?: Date | string
    name?: string
    prefixIcon?: string | Component
    clearIcon?: string | Component
    disabledHours?: Fn
    disabledMinutes?: Fn
    disabledSeconds?: Fn
    onChange?: ChangeEvent
    onBlur?: BlurOrFocusEvent
    onFocus?: BlurOrFocusEvent
  }

  declare type DatePickerProps = {
    readonly?: boolean
    disabled?: boolean
    editable?: boolean
    clearable?: boolean
    placeholder?: string
    startPlaceholder?: string
    endPlaceholder?: string
    type?:
      | 'year'
      | 'month'
      | 'date'
      | 'dates'
      | 'datetime'
      | 'week'
      | 'datetimerange'
      | 'daterange'
      | 'monthrange'
    format?: string
    popperClass?: string
    rangeSeparator?: string
    defaultValue?: Date
    defaultTime?: Date[]
    valueFormat?: string
    name?: string
    unlinkPanels?: boolean
    prefixIcon?: string | Component
    clearIcon?: string | Component
    disabledDate?: (date: Date) => boolean
    shortcuts?: Recordable
    onChange?: ChangeEvent
    onBlur?: BlurOrFocusEvent
    onFocus?: BlurOrFocusEvent
    onCalendarChange?: (dates: [Date, Date]) => void
    slots?: {
      default?: boolean
      rangeSeparator?: boolean
    }
  }

  declare type RateProps = {
    max?: number
    disabled?: boolean
    allowHalf?: boolean
    lowThreshold?: number
    highThreshold?: number
    colors?: [string, string, string] | Recordable
    voidColor?: string
    disabledVoidColor?: string
    icons?: [string, string, string] | Recordable
    voidIcon?: string | Component
    disabledVoidIcon?: string | Component
    showText?: boolean
    showScore?: boolean
    textColor?: string
    texts?: string[]
    scoreTemplate?: string
    onChange?: ChangeEvent
  }

  declare type ColorPickerProps = {
    disabled?: boolean
    showAlpha?: boolean
    colorFormat?: 'hsl' | 'hsv' | 'hex' | 'rgb'
    popperClass?: string | Component
    predefine?: Recordable
    onChange?: ChangeEvent
    onActiveChange?: (color: string) => void
  }

  declare type TransferProps = {
    data?: {
      key?: string | number
      label?: string
      disabled?: boolean
    }[]
    filterable?: boolean
    filterPlaceholder?: string
    filterMethod?: Fn
    targetOrder?: 'original' | 'push' | 'unshift'
    titles?: [string, string]
    buttonTexts?: [string, string]
    renderContent?: (h: RendererNode, option: Recordable) => VNode | VNode[] | string
    format?: {
      noChecked?: string
      hasChecked?: string
    }
    props?: {
      key?: string
      label?: string
      disabled?: string
    }
    leftDefaultChecked?: Recordable
    rightDefaultChecked?: Recordable
    slots?: {
      leftFooter?: boolean
      rightFooter?: boolean
    }
    onChange?: ChangeEvent
    onLeftCheckChange?: (arr: string[] | number[]) => void
    onRightCheckChange?: (arr: string[] | number[]) => void
  }

  declare type DividerProps = {
    direction?: 'horizontal' | 'vertical'
    borderStyle?: CSSProperties
    contentPosition?: 'left' | 'right' | 'center'
  }

  declare type TimeSelectProps = {
    disabled?: boolean
    editable?: boolean
    clearable?: boolean
    placeholder?: string
    name?: string
    prefixIcon?: string | Component
    clearIcon?: string | Component
    start?: string
    end?: string
    step?: string
    minTime?: string
    maxTime?: string
  }

  declare type SelectV2Props = {
    multiple?: boolean
    disabled?: boolean
    valueKey?: string
    clearable?: boolean
    collapsetags?: boolean
    multiplelimit?: number
    name?: string
    autocomplete?: string
    placeholder?: string
    filterable?: boolean
    allowCreate?: boolean
    noDataText?: string
    popperClass?: string
    popperAppendToBody?: boolean
    popperOptions?: Recordable
    automaticDropdown?: boolean
    clearIcon?: string | Component
    height?: number
    scrollbarAlwaysOn?: boolean
    onChange?: ChangeEvent
    onVisibleChange?: (val: boolean) => void
    onRemoveTag?: (val: string | number) => void
    onClear?: () => void
    onBlur?: BlurOrFocusEvent
    onFocus?: BlurOrFocusEvent
    slots?: {
      default?: boolean
      empty?: boolean
    }
  }

  declare type VFormSchema = {
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
      | SwitchProps
      | SliderProps
      | TimePickerProps
      | DatePickerProps
      | RateProps
      | ColorPickerProps
      | TransferProps
      | DividerProps
      | TimeSelectProps
      | SelectV2Props
    formItemProps?: FormItemProps
    component?: ComponentName
    value?: FormValueTypes
    options?: FormOptions[]
    optionsField?: FormOptionsAlias
    hidden?: boolean
  }

  // VForm types end
}

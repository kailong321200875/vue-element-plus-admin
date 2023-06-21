import { CSSProperties, VNodeProps, VNode } from 'vue'
import {
  InputProps,
  AutocompleteProps,
  InputNumberProps,
  CascaderProps,
  CascaderNode,
  CascaderValue,
  FormItemRule
} from 'element-plus'
import type { AxiosPromise } from 'axios'
import { IEditorConfig } from '@wangeditor/editor'

export interface PlaceholderModel {
  placeholder?: string
  startPlaceholder?: string
  endPlaceholder?: string
  rangeSeparator?: string
}

export enum ComponentNameEnum {
  RADIO_GROUP = 'RadioGroup',
  RADIO_BUTTON = 'RadioButton',
  CHECKBOX_GROUP = 'CheckboxGroup',
  CHECKBOX_BUTTON = 'CheckboxButton',
  INPUT = 'Input',
  AUTOCOMPLETE = 'Autocomplete',
  INPUT_NUMBER = 'InputNumber',
  SELECT = 'Select',
  CASCADER = 'Cascader',
  SWITCH = 'Switch',
  SLIDER = 'Slider',
  TIME_PICKER = 'TimePicker',
  DATE_PICKER = 'DatePicker',
  RATE = 'Rate',
  COLOR_PICKER = 'ColorPicker',
  TRANSFER = 'Transfer',
  DIVIDER = 'Divider',
  TIME_SELECT = 'TimeSelect',
  SELECT_V2 = 'SelectV2',
  INPUT_PASSWORD = 'InputPassword',
  EDITOR = 'Editor'
}

type CamelCaseComponentName = keyof typeof ComponentNameEnum extends infer K
  ? K extends string
    ? K extends `${infer A}_${infer B}`
      ? `${Capitalize<Lowercase<A>>}${Capitalize<Lowercase<B>>}`
      : Capitalize<Lowercase<K>>
    : never
  : never

export type ComponentName = CamelCaseComponentName

export interface InputComponentProps {
  ref?: any
  maxlength?: number | string
  minlength?: number | string
  showWordLimit?: boolean
  placeholder?: string
  clearable?: boolean
  formatter?: (value: string | number) => string
  parser?: (value: string) => string
  showPassword?: boolean
  disabled?: boolean
  size?: ElementPlusSize
  prefixIcon?: string | JSX.Element
  suffixIcon?: string | JSX.Element
  type?: InputProps['type']
  rows?: number
  autosize?: boolean | { Pows?: number; maxRows?: number }
  autocomplete?: string
  name?: string
  readonly?: boolean
  max?: number | string
  min?: number | string
  step?: number | string
  resize?: InputProps['resize']
  autofocus?: boolean
  form?: string
  label?: string
  tabindex?: string | number
  validateEvent?: boolean
  inputStyle?: string | CSSProperties | CSSProperties[] | string[]
  on?: {
    blur?: (event: FocusEvent) => void
    focus?: (event: FocusEvent) => void
    change?: (value: string | number) => void
    clear?: () => void
    input?: (value: string | number) => void
  }
  slots?: {
    prefix?: (...args: any[]) => JSX.Element | null
    suffix?: (...args: any[]) => JSX.Element | null
    prepend?: (...args: any[]) => JSX.Element | null
    append?: (...args: any[]) => JSX.Element | null
  }
  style?: CSSProperties
}

export interface AutocompleteComponentProps {
  ref?: any
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
  valueKey?: string
  debounce?: number
  placement?: AutocompleteProps['placement']
  fetchSuggestions?: (queryString: string, callback: (data: string[]) => void) => void
  triggerOnFocus?: boolean
  selectWhenUnmatched?: boolean
  name?: string
  label?: string
  hideLoading?: boolean
  popperClass?: string
  popperAppendToBody?: boolean
  teleported?: boolean
  highlightFirstItem?: boolean
  fitInputWidth?: boolean
  on?: {
    select?: (item: any) => void
    change?: (value: string | number) => void
  }
  slots?: {
    default?: (...args: any[]) => JSX.Element | null
    prefix?: (...args: any[]) => JSX.Element | null
    suffix?: (...args: any[]) => JSX.Element | null
    prepend?: (...args: any[]) => JSX.Element | null
    append?: (...args: any[]) => JSX.Element | null
  }
  style?: CSSProperties
}

export interface InputNumberComponentProps {
  ref?: any
  min?: number
  max?: number
  step?: number
  stepStrictly?: boolean
  precision?: number
  size?: ElementPlusSize
  readonly?: boolean
  disabled?: boolean
  controls?: boolean
  controlsPosition?: InputNumberProps['controlsPosition']
  name?: string
  label?: string
  placeholder?: string
  id?: string
  valueOnClear?: number | null | 'min' | 'max'
  validateEvent?: boolean
  on?: {
    change?: (currentValue: number | undefined, oldValue: number | undefined) => void
    blur?: (event: FocusEvent) => void
    focus?: (event: FocusEvent) => void
  }
  style?: CSSProperties
}

export interface SelectOption {
  label?: string
  disabled?: boolean
  value?: any
  key?: string | number
  options?: SelectOption[]
  [key: string]: any
}

export interface SelectComponentProps {
  ref?: any
  multiple?: boolean
  disabled?: boolean
  valueKey?: string
  size?: ElementPlusSize
  clearable?: boolean
  collapseTags?: boolean
  collapseTagsTooltip?: number
  multipleLimit?: number
  name?: string
  effect?: string
  autocomplete?: string
  placeholder?: string
  filterable?: boolean
  allowCreate?: boolean
  filterMethod?: (query: string, item: any) => boolean
  remote?: boolean
  remoteMethod?: (query: string) => void
  remoteShowSuffix?: boolean
  loading?: boolean
  loadingText?: string
  noMatchText?: string
  noDataText?: string
  popperClass?: string
  reserveKeyword?: boolean
  defaultFirstOption?: boolean
  popperAppendToBody?: boolean
  teleported?: boolean
  persistent?: boolean
  automaticDropdown?: boolean
  clearIcon?: string | JSX.Element | null
  fitInputWidth?: boolean
  suffixIcon?: string | JSX.Element | null
  tagType?: 'success' | 'info' | 'warning' | 'danger'
  validateEvent?: boolean
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'
  maxCollapseTags?: number
  /**
   * 数据源的字段别名
   */
  props?: {
    key?: string
    value?: string
    label?: string
    children?: string
  }
  on?: {
    change?: (value: string | number | boolean | Object) => void
    visibleChange?: (visible: boolean) => void
    removeTag?: (tag: any) => void
    clear?: () => void
    blur?: (event: FocusEvent) => void
    focus?: (event: FocusEvent) => void
  }
  slots?: {
    default?: (options: SelectOption[]) => JSX.Element[] | null
    optionGroupDefault?: (item: SelectOption) => JSX.Element
    optionDefault?: (option: SelectOption) => JSX.Element | null
    prefix?: (...args: any[]) => JSX.Element | null
    empty?: (...args: any[]) => JSX.Element | null
  }
  options?: SelectOption[]
  style?: CSSProperties
}

export interface SelectV2ComponentProps {
  ref?: any
  multiple?: boolean
  disabled?: boolean
  valueKey?: string
  size?: ElementPlusSize
  clearable?: boolean
  clearIcon?: string | JSX.Element | null
  collapseTags?: boolean
  multipleLimit?: number
  name?: string
  effect?: string
  autocomplete?: string
  placeholder?: string
  filterable?: boolean
  allowCreate?: boolean
  reserveKeyword?: boolean
  noDataText?: string
  popperClass?: string
  teleported?: boolean
  persistent?: boolean
  popperOptions?: any
  automaticDropdown?: boolean
  height?: number
  scrollbarAlwaysOn?: boolean
  remote?: boolean
  remoteMethod?: (query: string) => void
  validateEvent?: boolean
  placement?: AutocompleteProps['placement']
  collapseTagsTooltip?: boolean
  on?: {
    change?: (value: string | number | boolean | Object) => void
    visibleChange?: (visible: boolean) => void
    removeTag?: (tag: any) => void
    clear?: () => void
    blur?: (event: FocusEvent) => void
    focus?: (event: FocusEvent) => void
  }
  options?: SelectOption[]
  slots?: {
    default?: (option: SelectOption) => JSX.Element | null
  }
  style?: CSSProperties
}

export interface CascaderComponentProps {
  ref?: any
  options?: Record<string, unknown>[]
  props?: CascaderProps
  size?: ElementPlusSize
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  showAllLevels?: boolean
  collapseTags?: boolean
  collapseTagsTooltip?: boolean
  separator?: string
  filterable?: boolean
  filterMethod?: (node: CascaderNode, keyword: string) => boolean
  debounce?: number
  beforeFilter?: (value: string) => boolean
  popperClass?: string
  teleported?: boolean
  tagType?: ElementPlusInfoType
  validateEvent?: boolean
  on?: {
    change?: (value: CascaderValue) => void
    expandChange?: (value: CascaderValue) => void
    blur?: (event: FocusEvent) => void
    focus?: (event: FocusEvent) => void
    visibleChange?: (value: boolean) => void
    removeTag?: (value: CascaderNode['valueByOption']) => void
  }
  slots?: {
    default?: (...args: any[]) => JSX.Element | null
    empty?: (...args: any[]) => JSX.Element | null
  }
  style?: CSSProperties
}

export interface SwitchComponentProps {
  ref?: any
  disabled?: boolean
  loading?: boolean
  size?: ElementPlusSize
  width?: number | string
  inlinePrompt?: boolean
  activeIcon?: string | JSX.Element | null
  inactiveIcon?: string | JSX.Element | null
  activeText?: string
  inactiveText?: string
  activeValue?: boolean | string | number
  inactiveValue?: boolean | string | number
  name?: string
  validateEvent?: boolean
  beforeChange?: (value: boolean) => boolean | Promise<boolean>
  on?: {
    change?: (value: boolean | string | number) => void
  }
  style?: CSSProperties
}

export interface RateComponentProps {
  ref?: any
  max?: number
  size?: ElementPlusSize
  disabled?: boolean
  allowHalf?: boolean
  lowThreshold?: number
  highThreshold?: number
  colors?: string[] | Record<number, string>
  voidColor?: string
  disabledVoidColor?: string
  icons?: string[] | JSX.Element[] | Record<number, string | JSX.Element>
  voidIcon?: string | JSX.Element
  disabledVoidIcon?: string | JSX.Element
  showText?: boolean
  showScore?: boolean
  textColor?: string
  texts?: string[]
  scoreTemplate?: string
  clearable?: boolean
  id?: string
  label?: string
  on?: {
    change?: (value: number) => void
  }
  style?: CSSProperties
}

export interface ColorPickerComponentProps {
  ref?: any
  disabled?: boolean
  size?: ElementPlusSize
  showAlpha?: boolean
  colorFormat?: 'hsl' | 'hsv' | 'hex' | 'rgb' | 'hex' | 'rgb'
  predefine?: string[]
  validateEvent?: boolean
  tabindex?: number | string
  label?: string
  id?: string
  on?: {
    change?: (value: string) => void
    activeChange?: (value: string) => void
  }
  style?: CSSProperties
}

export interface TransferComponentProps {
  ref?: any
  data?: any[]
  filterable?: boolean
  filterPlaceholder?: string
  filterMethod?: (query: string, item: any) => boolean
  targetOrder?: string
  titles?: string[]
  buttonTexts?: string[]
  renderContent?: (
    h: (type: string, props: VNodeProps | null, children?: string) => VNode,
    option: any
  ) => JSX.Element
  format?: {
    noChecked?: string
    hasChecked?: string
  }
  props?: {
    label?: string
    key?: string
    disabled?: string
  }
  leftDefaultChecked?: any[]
  rightDefaultChecked?: any[]
  validateEvent?: boolean
  on?: {
    change?: (
      value: number | string,
      direction: 'left' | 'right',
      movedKeys: string[] | number[]
    ) => void
    leftCheckChange?: (value: any[]) => void
    rightCheckChange?: (value: any[]) => void
  }
  slots?: {
    default?: (...args: any[]) => JSX.Element | null
    leftFooter?: (...args: any[]) => JSX.Element | null
    rightFooter?: (...args: any[]) => JSX.Element | null
  }
  style?: CSSProperties
}

export interface RadioOption {
  label?: string
  value?: string | number | boolean
  disabled?: boolean
  border?: boolean
  size?: ElementPlusSize
  name?: string
  [key: string]: any
}
export interface RadioGroupComponentProps {
  ref?: any
  size?: ElementPlusSize
  disabled?: boolean
  textColor?: string
  fill?: string
  validateEvent?: boolean
  label?: string
  name?: string
  id?: string
  options?: RadioOption[]
  /**
   * 数据源的字段别名
   */
  props: {
    label?: string
    value?: string
    disabled?: string
  }
  on?: {
    change?: (value: string | number | boolean) => void
  }
  slots?: {
    default?: (...args: any[]) => JSX.Element | null
  }
  style?: CSSProperties
}

export interface RadioButtonComponentProps {
  ref?: any
  size?: ElementPlusSize
  disabled?: boolean
  textColor?: string
  fill?: string
  validateEvent?: boolean
  label?: string
  name?: string
  id?: string
  options?: RadioOption[]
  /**
   * 数据源的字段别名
   */
  props: {
    label?: string
    value?: string
    disabled?: string
  }
  on?: {
    change?: (value: string | number | boolean) => void
  }
  slots?: {
    default?: (...args: any[]) => JSX.Element | null
  }
  style?: CSSProperties
}

export interface CheckboxOption {
  label?: string
  value?: string | number | boolean
  disabled?: boolean
  trueLabel?: string | number
  falseLabel?: string | number
  border?: boolean
  size?: ElementPlusSize
  name?: string
  checked?: boolean
  indeterminate?: boolean
  validateEvent?: boolean
  tabindex?: number | string
  id?: string
  controls?: boolean
  [key: string]: any
}

export interface CheckboxGroupComponentProps {
  ref?: any
  size?: ElementPlusSize
  disabled?: boolean
  min?: number
  max?: number
  label?: string
  textColor?: string
  fill?: string
  tag?: string
  validateEvent?: boolean
  options?: CheckboxOption[]
  /**
   * 数据源的字段别名
   */
  props: {
    label?: string
    value?: string
    disabled?: string
  }
  on?: {
    change?: (value: string | number | boolean) => void
  }
  slots?: {
    default?: (...args: any[]) => JSX.Element | null
  }
  style?: CSSProperties
}

export interface DividerComponentProps {
  ref?: any
  min?: number
  max?: number
  disabled?: boolean
  step?: number
  showInput?: boolean
  showInputControls?: boolean
  size?: ElementPlusSize
  inputSize?: ElementPlusSize
  showStops?: boolean
  showTooltip?: boolean
  formatTooltip?: (value: number) => string
  range?: boolean
  vertical?: boolean
  height?: string
  label?: string
  rangeStartLabel?: string
  rangeEndLabel?: string
  formatValueText?: (value: number) => string
  debounce?: number
  tooltipClass?: string
  placement?: string
  marks?: Record<number, string>
  validateEvent?: boolean
  on?: {
    change?: (value: number) => void
    input?: (value: number) => void
  }
  style?: CSSProperties
}

export interface DatePickerComponentProps {
  ref?: any
  readonly?: boolean
  disabled?: boolean
  size?: ElementPlusSize
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
    | 'week'
    | 'datetime'
    | 'datetimerange'
    | 'daterange'
    | 'monthrange'
  format?: string
  popperClass?: string
  popperOptions?: Record<string, any>
  rangeSeparator?: string
  defaultValue?: Date | [Date, Date]
  defaultTime?: Date | [Date, Date]
  valueFormat?: string
  id?: string
  name?: string
  unlinkPanels?: boolean
  prefixIcon?: string | JSX.Element
  clearIcon?: string | JSX.Element
  validateEvent?: boolean
  disabledDate?: (date: Date) => boolean
  shortcuts?: Array<{ text: string; value: Date | Function }>
  cellClassName?: string | ((date: Date) => string | undefined)
  teleported?: boolean
  on?: {
    change?: (value: string | Date | number | string[]) => void
    blur?: (event: FocusEvent) => void
    focus?: (event: FocusEvent) => void
    calendarChange?: (val: [Date, Date]) => void
    panelChange?: (date, mode, view) => void
    visibleChange?: (visibility: boolean) => void
  }
  slots?: {
    default?: (...args: any[]) => JSX.Element | null
    rangeSeparator?: (...args: any[]) => JSX.Element | null
  }
  style?: CSSProperties
}

export interface DateTimePickerComponentProps {
  ref?: any
  readonly?: boolean
  disabled?: boolean
  editable?: boolean
  clearable?: boolean
  size?: ElementPlusSize
  placeholder?: string
  startPlaceholder?: string
  endPlaceholder?: string
  timeArrowControl?: boolean
  type?: 'year' | 'month' | 'date' | 'datetime' | 'datetimerange' | 'daterange' | 'week'
  format?: string
  popperClass?: string
  rangeSeparator?: string
  defaultValue?: Date | [Date, Date]
  defaultTime?: Date | [Date, Date]
  valueFormat?: string
  id?: string
  name?: string
  unlinkPanels?: boolean
  prefixIcon?: string | JSX.Element
  clearIcon?: string | JSX.Element
  shortcuts?: Array<{ text: string; value: Date | Function }>
  disabledDate?: (date: Date) => boolean
  cellClassName?: string | ((date: Date) => string | undefined)
  teleported?: boolean
  on?: {
    change?: (value: string | Date | number | string[]) => void
    blur?: (event: FocusEvent) => void
    focus?: (event: FocusEvent) => void
    calendarChange?: (val: [Date, Date]) => void
    visibleChange?: (visibility: boolean) => void
  }
  slots?: {
    default?: (...args: any[]) => JSX.Element | null
    rangeSeparator?: (...args: any[]) => JSX.Element | null
  }
  style?: CSSProperties
}

export interface TimePickerComponentProps {
  ref?: any
  readonly?: boolean
  disabled?: boolean
  editable?: boolean
  clearable?: boolean
  size?: ElementPlusSize
  placeholder?: string
  startPlaceholder?: string
  endPlaceholder?: string
  isRange?: boolean
  arrowControl?: boolean
  popperClass?: string
  rangeSeparator?: string
  format?: string
  defaultValue?: Date | [Date, Date]
  id?: string
  name?: string
  label?: string
  prefixIcon?: string | JSX.Element
  clearIcon?: string | JSX.Element
  disabledHours?: (role: string, comparingDate?: any) => number[]
  disabledMinutes?: (hour: number, role: string, comparingDate?: any) => number[]
  disabledSeconds?: (hour: number, minute: number, role: string, comparingDate?: any) => number[]
  teleported?: boolean
  tabindex?: number | string
  on?: {
    change: (
      val: number | string | Date | [number, number] | [string, string] | [Date, Date]
    ) => void
    blur?: (event: FocusEvent) => void
    focus?: (event: FocusEvent) => void
    visibleChange?: (visibility: boolean) => void
  }
  style?: CSSProperties
}

export interface TimeSelectComponentProps {
  ref?: any
  disabled?: boolean
  editable?: boolean
  clearable?: boolean
  size?: ElementPlusSize
  placeholder?: string
  name?: string
  effect?: string
  prefixIcon?: string | JSX.Element
  clearIcon?: string | JSX.Element
  start?: string
  end?: string
  step?: string
  minTime?: string
  maxTime?: string
  format?: string
  on?: {
    change?: (val: string) => void
    blur?: (event: FocusEvent) => void
    focus?: (event: FocusEvent) => void
  }
  style?: CSSProperties
}

export interface EditorComponentProps {
  ref?: any
  editorConfig?: IEditorConfig
  style?: CSSProperties
}

export interface ColProps {
  span?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  tag?: string
}

export interface FormSetProps {
  field: string
  path: string
  value: any
}

export interface FormItemProps {
  ref?: any
  labelWidth?: string | number
  required?: boolean
  rules?: FormItemRule | FormItemRule[]
  error?: string
  showMessage?: boolean
  inlineMessage?: boolean
  size?: ElementPlusSize
  for?: string
  validateStatus?: '' | 'error' | 'validating' | 'success'
  style?: CSSProperties
  slots?: {
    default?: (...args: any[]) => JSX.Element | null
    label?: (...args: any[]) => JSX.Element | null
    error?: (...args: any[]) => JSX.Element | null
  }
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
    | RadioGroupComponentProps
    | RadioButtonComponentProps
    | DividerComponentProps
    | DatePickerComponentProps
    | DateTimePickerComponentProps
    | TimePickerComponentProps
    | EditorComponentProps
    | any

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
  value?: any

  /**
   * 是否隐藏，如果为true，会连同值一同删除，类似v-if
   */
  remove?: boolean

  /**
   * 样式隐藏，不会把值一同删掉，类似v-show
   */
  hidden?: boolean

  /**
   * @returns 远程加载下拉项
   */
  optionApi?: any
}

export interface FormProps {
  schema?: FormSchema[]
  isCol?: boolean
  model?: Recordable
  autoSetPlaceholder?: boolean
  isCustom?: boolean
  labelWidth?: string | number
  [key: string]: any
}

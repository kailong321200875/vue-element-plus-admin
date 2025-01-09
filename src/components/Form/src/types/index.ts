import {
  AutocompleteProps,
  InputNumberProps,
  CascaderProps,
  CascaderNode,
  CascaderValue,
  SwitchProps,
  ComponentSize,
  InputProps,
  RateProps,
  ColorPickerProps,
  TransferProps,
  RadioGroupProps,
  RadioButtonProps,
  CheckboxGroupProps,
  DividerProps,
  DatePickerProps,
  FormItemProps as ElFormItemProps,
  FormProps as ElFormProps,
  ISelectProps,
  UploadProps
} from 'element-plus'
import { IEditorConfig } from '@wangeditor/editor'
import { JsonEditorProps } from '@/components/JsonEditor'
import { IAgreeProps } from '@/components/IAgree'
import { CSSProperties } from 'vue'

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
  EDITOR = 'Editor',
  TREE_SELECT = 'TreeSelect',
  UPLOAD = 'Upload',
  JSON_EDITOR = 'JsonEditor',
  ICON_PICKER = 'IconPicker',
  I_AGREE = 'IAgree'
}

type CamelCaseComponentName = keyof typeof ComponentNameEnum extends infer K
  ? K extends string
    ? K extends `${infer A}_${infer B}`
      ? `${Capitalize<Lowercase<A>>}${Capitalize<Lowercase<B>>}`
      : Capitalize<Lowercase<K>>
    : never
  : never

export type ComponentName = CamelCaseComponentName

export interface InputPasswordComponentProps {
  strength?: boolean
  style?: CSSProperties
}

export interface InputComponentProps extends Partial<InputProps> {
  rows?: number
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

export interface AutocompleteComponentProps extends Partial<AutocompleteProps> {
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

export interface InputNumberComponentProps extends Partial<InputNumberProps> {
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

export interface SelectComponentProps extends Omit<Partial<ISelectProps>, 'options'> {
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
    change?: (value: string | number | boolean | object) => void
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
  multiple?: boolean
  disabled?: boolean
  valueKey?: string
  size?: ComponentSize
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
    change?: (value: string | number | boolean | object) => void
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
  options?: Record<string, unknown>[]
  props?: CascaderProps
  size?: ComponentSize
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

export interface SwitchComponentProps extends Partial<SwitchProps> {
  on?: {
    change?: (value: boolean | string | number) => void
  }
  style?: CSSProperties
}

export interface RateComponentProps extends Partial<RateProps> {
  on?: {
    change?: (value: number) => void
  }
  style?: CSSProperties
}

export interface ColorPickerComponentProps extends Partial<ColorPickerProps> {
  on?: {
    change?: (value: string) => void
    activeChange?: (value: string) => void
  }
  style?: CSSProperties
}

export interface TransferComponentProps extends Partial<TransferProps> {
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
  size?: ComponentSize
  name?: string
  [key: string]: any
}
export interface RadioGroupComponentProps extends Partial<RadioGroupProps> {
  options?: RadioOption[]
  /**
   * 数据源的字段别名
   */
  props?: {
    label?: string
    value?: string
    disabled?: string
  }
  on?: {
    change?: (value: string | number | boolean) => void
  }
  slots?: {
    default?: (...args: any[]) => JSX.Element[] | null
  }
  style?: CSSProperties
}

export interface RadioButtonComponentProps extends Partial<RadioButtonProps> {
  options?: RadioOption[]
  /**
   * 数据源的字段别名
   */
  props?: {
    label?: string
    value?: string
    disabled?: string
  }
  on?: {
    change?: (value: string | number | boolean) => void
  }
  slots?: {
    default?: (...args: any[]) => JSX.Element[] | null
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
  size?: ComponentSize
  name?: string
  checked?: boolean
  indeterminate?: boolean
  validateEvent?: boolean
  tabindex?: number | string
  id?: string
  controls?: boolean
  [key: string]: any
}

export interface CheckboxGroupComponentProps extends Partial<CheckboxGroupProps> {
  options?: CheckboxOption[]
  /**
   * 数据源的字段别名
   */
  props?: {
    label?: string
    value?: string
    disabled?: string
  }
  on?: {
    change?: (value: string | number | boolean) => void
  }
  slots?: {
    default?: (...args: any[]) => JSX.Element[] | null
  }
  style?: CSSProperties
}

export interface DividerComponentProps extends Partial<DividerProps> {
  on?: {
    change?: (value: number) => void
    input?: (value: number) => void
  }
  style?: CSSProperties
}

export interface DatePickerComponentProps extends Partial<DatePickerProps> {
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
  readonly?: boolean
  disabled?: boolean
  editable?: boolean
  clearable?: boolean
  size?: ComponentSize
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
  readonly?: boolean
  disabled?: boolean
  editable?: boolean
  clearable?: boolean
  size?: ComponentSize
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
  disabled?: boolean
  editable?: boolean
  clearable?: boolean
  size?: ComponentSize
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

export interface FormItemProps extends Partial<ElFormItemProps> {
  style?: CSSProperties
  slots?: {
    default?: (...args: any[]) => JSX.Element | null
    label?: (...args: any[]) => JSX.Element | null
    error?: (...args: any[]) => JSX.Element | null
  }
}

export interface UploadComponentProps extends Partial<UploadProps> {
  slots?: {
    default?: (...args: any[]) => JSX.Element | null
    trigger?: (...args: any[]) => JSX.Element | null
    tip?: (...args: any[]) => JSX.Element | null
    file?: (...args: any[]) => JSX.Element | null
  }
  style?: CSSProperties
}

export interface TreeSelectComponentProps
  extends Omit<Partial<SelectComponentProps>, 'props' | 'on' | 'slots'> {
  data?: any[]
  emptyText?: string
  nodeKey?: string
  props?: {
    children?: string
    label?: string | ((...args: any[]) => string)
    disabled?: string | ((...args: any[]) => string)
    isLeaf?: string | ((...args: any[]) => string)
    class?: string | ((...args: any[]) => string)
  }
  renderAfterExpand?: boolean
  load?: (...args: any[]) => Promise<any>
  renderContent?: (...args: any[]) => JSX.Element | null
  highlightCurrent?: boolean
  defaultExpandAll?: boolean
  expandOnClickNode?: boolean
  checkOnClickNode?: boolean
  autoExpandParent?: boolean
  defaultExpandedKeys?: any[]
  showCheckbox?: boolean
  checkStrictly?: boolean
  defaultCheckedKeys?: any[]
  currentNodeKey?: string | number
  filterNodeMethod?: (...args: any[]) => boolean
  accordion?: boolean
  indent?: number
  icon?: string | ((...args: any[]) => JSX.Element | null)
  lazy?: boolean
  draggable?: boolean
  allowDrag?: (...args: any[]) => boolean
  allowDrop?: (...args: any[]) => boolean
  on?: {
    change?: (value: string | number | boolean | object) => void
    visibleChange?: (visible: boolean) => void
    removeTag?: (tag: any) => void
    clear?: () => void
    blur?: (event: FocusEvent) => void
    focus?: (event: FocusEvent) => void
    nodeClick?: (...args: any[]) => void
    nodeContextMenu?: (...args: any[]) => void
    checkChange?: (...args: any[]) => void
    check?: (...args: any[]) => void
    currentChange?: (...args: any[]) => void
    nodeExpand?: (...args: any[]) => void
    nodeCollapse?: (...args: any[]) => void
    nodeDragStart?: (...args: any[]) => void
    nodeDragEnter?: (...args: any[]) => void
    nodeDragLeave?: (...args: any[]) => void
    nodeDragOver?: (...args: any[]) => void
    nodeDragEnd?: (...args: any[]) => void
    nodeDrop?: (...args: any[]) => void
  }
  slots?: {
    default?: (...args: any[]) => JSX.Element | null
    optionGroupDefault?: (item: SelectOption) => JSX.Element
    optionDefault?: (option: SelectOption) => JSX.Element | null
    prefix?: (...args: any[]) => JSX.Element | null
    empty?: (...args: any[]) => JSX.Element | null
  }
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
    | InputPasswordComponentProps
    | TreeSelectComponentProps
    | UploadComponentProps
    | JsonEditorProps
    | IAgreeProps
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

export interface FormProps extends Partial<ElFormProps> {
  schema?: FormSchema[]
  isCol?: boolean
  model?: Recordable
  autoSetPlaceholder?: boolean
  isCustom?: boolean
  [key: string]: any
}

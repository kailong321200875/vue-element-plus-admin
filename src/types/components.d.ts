import { CSSProperties } from 'vue'
import {
  InputProps,
  AutocompleteProps,
  InputNumberProps,
  CascaderProps,
  CascaderNode,
  CascaderValue
} from 'element-plus'
import { ElementPlusSize, ElementPlusInfoType } from './elementPlus.d'

export enum ComponentNameEnum {
  RADIO = 'Radio',
  RADIO_BUTTON = 'RadioButton',
  CHECKBOX = 'Checkbox',
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
  value?: string | number
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
  autosize?: boolean | { Pows?: numer; maxRows?: number }
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
  value?: string
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
  value?: number
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

interface SelectOption {
  label?: string
  disabled?: boolean
  value?: any
  key?: string | number
  options?: SelectOption[]
  [key: string]: any
}

export interface SelectComponentProps {
  value?: string | number | boolean | Object
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
   * label别名
   */
  labelAlias?: string

  /**
   * value别名
   */
  valueAlias?: string

  /**
   * key别名
   */
  keyAlias?: string
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
  value?: string | number | boolean | Object
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
  value?: string | number | string[] | number[] | any
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
  value?: boolean | string | number
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
  value?: number
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
  value?: string
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
  value?: any[]
  data?: Array<{ key; label; disabled }>
  filterable?: boolean
  filterPlaceholder?: string
  filterMethod?: (query: string, item: any) => boolean
  targetOrder?: string
  titles?: string[]
  buttonTexts?: string[]
  renderContent?: (h: any, option: any) => JSX.Element
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
    change?: (value: any[]) => void
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

export interface ColProps {
  span?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  tag?: string
}

export interface ComponentOptions extends Recordable {
  label?: string
  value?: any
  disabled?: boolean
  key?: string | number
  children?: ComponentOptions[]
  options?: ComponentOptions[]
}

export interface ComponentOptionsAlias {
  labelField?: string
  valueField?: string
}

export interface ComponentProps extends Recordable {
  optionsAlias?: ComponentOptionsAlias
  options?: ComponentOptions[]
  optionsSlot?: boolean
}

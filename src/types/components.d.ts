import { CSSProperties } from 'vue'
import { InputProps } from 'element-plus'

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
  size?: InputProps['size']
  prefixIcon?: string | JSX.Element | (<T>(data: T | any) => string | JSX.Element)
  suffixIcon?: string | JSX.Element | (<T>(data: T | any) => string | JSX.Element)
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
    prefix?: JSX.Element | (<T>(data: T | any) => JSX.Element)
    suffix?: JSX.Element | (<T>(data: T | any) => JSX.Element)
    prepend?: JSX.Element | (<T>(data: T | any) => JSX.Element)
    append?: JSX.Element | (<T>(data: T | any) => JSX.Element)
  }
}

type CamelCaseComponentName = keyof typeof ComponentNameEnum extends infer K
  ? K extends string
    ? K extends `${infer A}_${infer B}`
      ? `${Capitalize<Lowercase<A>>}${Capitalize<Lowercase<B>>}`
      : Capitalize<Lowercase<K>>
    : never
  : never

export type ComponentName = CamelCaseComponentName

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
  value?: FormValueType
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

import Form from './src/Form.vue'
import type { FormSchema, FormSetProps } from './src/types'
export type {
  ComponentNameEnum,
  ComponentName,
  InputComponentProps,
  AutocompleteComponentProps,
  InputNumberComponentProps,
  SelectOption,
  SelectComponentProps,
  SelectV2ComponentProps,
  CascaderComponentProps,
  SwitchComponentProps,
  RateComponentProps,
  ColorPickerComponentProps,
  TransferComponentProps,
  RadioOption,
  RadioGroupComponentProps,
  RadioButtonComponentProps,
  CheckboxOption,
  CheckboxGroupComponentProps,
  DividerComponentProps,
  DatePickerComponentProps,
  DateTimePickerComponentProps,
  TimePickerComponentProps,
  TimeSelectComponentProps,
  ColProps,
  FormSetProps,
  FormItemProps,
  FormSchema,
  FormProps,
  PlaceholderModel,
  InputPasswordComponentProps,
  TreeSelectComponentProps
} from './src/types'

export interface FormExpose {
  setValues: (data: Recordable) => void
  setProps: (props: Recordable) => void
  delSchema: (field: string) => void
  addSchema: (formSchema: FormSchema, index?: number) => void
  setSchema: (schemaProps: FormSetProps[]) => void
  formModel: Recordable
  getComponentExpose: (field: string) => any
  getFormItemExpose: (field: string) => any
}

export { Form }

import Form from './src/Form.vue'
import { ElForm } from 'element-plus'
import { FormSchema, FormSetProps } from './src/types'
export {
  PlaceholderModel,
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
  FormValueType,
  FormItemProps,
  FormSchema,
  FormProps
} from './src/types'

export interface FormExpose {
  setValues: (data: Recordable) => void
  setProps: (props: Recordable) => void
  delSchema: (field: string) => void
  addSchema: (formSchema: FormSchema, index?: number) => void
  setSchema: (schemaProps: FormSetProps[]) => void
  formModel: Recordable
  getElFormRef: () => ComponentRef<typeof ElForm>
}

export { Form }

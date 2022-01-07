import Form from './src/Form.vue'

export interface FormExpose {
  setValues: (data: FormSetValuesType[]) => void
  formModel: Recordable
}

export { Form }

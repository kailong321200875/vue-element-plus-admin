import { FormSchema, FormSetProps } from '../Form'
import Search from './src/Search.vue'

export type { SearchProps } from './src/types'

export interface SearchExpose {
  setValues: (data: Recordable) => void
  setProps: (props: Recordable) => void
  delSchema: (field: string) => void
  addSchema: (formSchema: FormSchema, index?: number) => void
  setSchema: (schemaProps: FormSetProps[]) => void
  formModel: Recordable
}

export { Search }

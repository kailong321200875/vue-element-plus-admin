import Search from './src/Search.vue'
import { ElForm } from 'element-plus'

export interface SearchExpose {
  getElFormExpose: () => Promise<ComponentRef<typeof ElForm>>
}

export { Search }

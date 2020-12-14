import type { Ref } from 'vue'
import ref from 'vue'

export interface setSidebarItem = {
  onlyOneChild: Ref<any | null>
  hasOneShowingChild: Function<boolean>
  resolvePath: Function<string>
  treeFindPath: Function<string[]>
  getFullPath: Function<string[]>
}
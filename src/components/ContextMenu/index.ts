import ContextMenu from './src/ContextMenu.vue'
import { ElDropdown } from 'element-plus'

export interface ContextMenuExpose {
  elDropdownMenuRef: ComponentRef<typeof ElDropdown>
}

export { ContextMenu }

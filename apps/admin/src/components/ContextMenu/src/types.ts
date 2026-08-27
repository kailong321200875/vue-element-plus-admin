export interface ContextMenuSchema {
  disabled?: boolean
  divided?: boolean
  icon?: string
  label: string
  command?: () => void
}

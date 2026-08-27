import { addIcon, type IconifyIcon } from '@iconify/vue/offline'

export type IconRegistry = Readonly<Record<string, IconifyIcon>>

export const registerIcons = (icons: IconRegistry) => {
  Object.entries(icons).forEach(([name, data]) => addIcon(name, data))
}

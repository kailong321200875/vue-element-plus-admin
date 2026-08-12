import type { ConfigGlobalProps } from '@/components/ConfigGlobal'
import { inject } from 'vue'

export const useConfigGlobal = () => {
  const configGlobal = inject('configGlobal', {}) as ConfigGlobalProps

  return {
    configGlobal
  }
}

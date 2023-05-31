import { ConfigGlobalTypes } from '@/components/ConfigGlobal/src/types'
import { inject } from 'vue'

export const useConfigGlobal = () => {
  const configGlobal = inject('configGlobal', {}) as ConfigGlobalTypes

  return {
    configGlobal
  }
}

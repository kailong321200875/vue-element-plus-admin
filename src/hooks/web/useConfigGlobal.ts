import { inject } from 'vue'

export function useConfigGlobal() {
  const configGlobal = inject('configGlobal', {}) as ConfigGlobalTypes

  return {
    configGlobal
  }
}

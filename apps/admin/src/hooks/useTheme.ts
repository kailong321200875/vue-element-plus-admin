import { watch } from 'vue'
import { useAppStore } from '@/store/modules/app'

export const useTheme = () => {
  const appStore = useAppStore()

  watch(
    () => appStore.isDark,
    (isDark) => {
      document.documentElement.classList.toggle('dark', isDark)
      document.documentElement.classList.toggle('light', !isDark)
    },
    { immediate: true }
  )
}

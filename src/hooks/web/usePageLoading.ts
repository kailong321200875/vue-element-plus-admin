import { useAppStoreWithOut } from '@/store/modules/app'

const appStore = useAppStoreWithOut()

export const usePageLoading = () => {
  const loadStart = () => {
    appStore.setPageLoading(true)
  }

  const loadDone = () => {
    setTimeout(() => {
      appStore.setPageLoading(false)
    }, 1000)
  }

  return {
    loadStart,
    loadDone
  }
}

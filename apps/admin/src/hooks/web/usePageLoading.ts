import { useAppStoreWithOut } from '@/store/modules/app'

export const usePageLoading = () => {
  const loadStart = () => {
    const appStore = useAppStoreWithOut()

    appStore.pageLoading = true
  }

  const loadDone = () => {
    const appStore = useAppStoreWithOut()

    appStore.pageLoading = false
  }

  return {
    loadStart,
    loadDone
  }
}

import { ref, watch } from 'vue'
import { isString } from '@/utils/validate'
import { useAppStoreWithOut } from '@/store/modules/app'
const appStore = useAppStoreWithOut()

export function useTitle(newTitle?: string) {
  const title = ref(newTitle ? `${appStore.getTitle} - ${newTitle}` : appStore.getTitle)

  watch(
    title,
    (t, o) => {
      if (isString(t) && t !== o && document) {
        document.title = t
      }
    },
    { immediate: true }
  )

  return title
}

import { watch, computed } from 'vue'
import { isString } from '@/utils/is'
import { useAppStoreWithOut } from '@/store/modules/app'
import { useI18n } from '@/hooks/web/useI18n'
import { useLocaleStore } from '@/store/modules/locale'

export const useTitle = (newTitle?: string) => {
  const { t } = useI18n()
  const appStore = useAppStoreWithOut()
  const localeStore = useLocaleStore()

  const title = computed(() => {
    return newTitle ? `${appStore.getTitle} - ${t(newTitle as string)}` : appStore.getTitle
  })

  watch(
    [title, () => localeStore.getCurrentLocale],
    () => {
      if (isString(title.value) && document) {
        document.title = title.value
      }
    },
    { immediate: true }
  )

  return title
}

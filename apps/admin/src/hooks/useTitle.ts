import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLocaleStore } from '@/store/modules/locale'
import { appConfig } from '@/config/app'

export const useTitle = () => {
  const route = useRoute()
  const localeStore = useLocaleStore()
  const { t } = useI18n()

  watch(
    [() => route.meta.title, () => localeStore.lang],
    ([title]) => {
      document.title = title ? `${appConfig.title} - ${t(title as string)}` : appConfig.title
    },
    { immediate: true }
  )
}

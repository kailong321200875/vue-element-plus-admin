import type { RouteMeta } from 'vue-router'
import { Icon } from '@vea/components'
import { useI18n } from 'vue-i18n'

export const useRenderMenuTitle = () => {
  const { t } = useI18n()

  const renderMenuTitle = (meta: RouteMeta) => {
    const { title = 'Please set title', icon } = meta

    return icon ? (
      <>
        <Icon icon={meta.icon}></Icon>
        <span class="v-menu__title truncate">{t(title as string)}</span>
      </>
    ) : (
      <span class="v-menu__title truncate">{t(title as string)}</span>
    )
  }

  return {
    renderMenuTitle
  }
}

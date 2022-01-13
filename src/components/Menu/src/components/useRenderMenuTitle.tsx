import type { RouteMeta } from 'vue-router'
import { Icon } from '@/components/Icon'
import { useI18n } from '@/hooks/web/useI18n'

export function useRenderMenuTitle() {
  function renderMenuTitle(meta: RouteMeta) {
    const { t } = useI18n()
    const { title = 'Please set title', icon } = meta

    return icon ? (
      <>
        <Icon icon={meta.icon}></Icon>
        <span>{t(title as string)}</span>
      </>
    ) : (
      <span>{t(title as string)}</span>
    )
  }

  return {
    renderMenuTitle
  }
}

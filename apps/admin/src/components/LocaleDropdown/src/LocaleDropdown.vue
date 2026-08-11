<script setup lang="ts">
  import { LocaleDropdown as BaseLocaleDropdown } from '@vea/components'
  import { useLocaleStore } from '@/store/modules/locale'
  import { useLocale } from '@/hooks/web/useLocale'
  import { isLocale, localeOptions } from '@/config/locale'
  import { propTypes } from '@/utils/propTypes'

  defineOptions({ inheritAttrs: false })

  defineProps({
    color: propTypes.string.def('')
  })

  const localeStore = useLocaleStore()

  const { changeLocale } = useLocale()

  const setLocale = (locale: string) => {
    if (isLocale(locale)) {
      changeLocale(locale)
    }
  }
</script>

<template>
  <BaseLocaleDropdown
    v-bind="$attrs"
    :model-value="localeStore.lang"
    :options="localeOptions"
    :color="color"
    @update:model-value="setLocale"
  />
</template>

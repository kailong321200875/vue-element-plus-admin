<script setup lang="ts">
import { computed } from 'vue'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { useLocaleStore } from '@/store/modules/locale'
import { useCssVar } from '@vueuse/core'
import { useLocale } from '@/hooks/web/useLocale'

const localeStore = useLocaleStore()

const langMap = computed(() => localeStore.localeMap)

const textColor = useCssVar('--el-text-color-primary', document.documentElement)

function setLang(lang: LocaleType) {
  localeStore.setLocale({
    lang
  })
  const { changeLocale } = useLocale()
  changeLocale(lang)
}
</script>

<template>
  <ElDropdown trigger="click" @command="setLang">
    <Icon icon="ion:language-sharp" :color="textColor" class="cursor-pointer" />
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem v-for="item in langMap" :key="item.lang" :command="item.lang">
          {{ item.name }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

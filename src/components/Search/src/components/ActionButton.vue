<script setup lang="ts">
import { ElButton } from 'element-plus'
import { useIcon } from '@/hooks/web/useIcon'
import { propTypes } from '@/utils/propTypes'
import { useI18n } from '@/hooks/web/useI18n'

const emit = defineEmits(['search', 'reset', 'expand'])

const { t } = useI18n()

defineProps({
  showSearch: propTypes.bool.def(true),
  showReset: propTypes.bool.def(true),
  showExpand: propTypes.bool.def(false),
  visible: propTypes.bool.def(true),
  searchLoading: propTypes.bool.def(false),
  resetLoading: propTypes.bool.def(false)
})

const onSearch = () => {
  emit('search')
}

const onReset = () => {
  emit('reset')
}

const onExpand = () => {
  emit('expand')
}
</script>

<template>
  <ElButton
    v-if="showSearch"
    type="primary"
    :loading="searchLoading"
    :icon="useIcon({ icon: 'ep:search' })"
    @click="onSearch"
  >
    {{ t('common.query') }}
  </ElButton>
  <ElButton
    v-if="showReset"
    :loading="resetLoading"
    :icon="useIcon({ icon: 'ep:refresh-right' })"
    @click="onReset"
  >
    {{ t('common.reset') }}
  </ElButton>
  <ElButton
    v-if="showExpand"
    :icon="useIcon({ icon: visible ? 'ep:arrow-down' : 'ep:arrow-up' })"
    text
    @click="onExpand"
  >
    {{ t(visible ? 'common.shrink' : 'common.expand') }}
  </ElButton>
</template>

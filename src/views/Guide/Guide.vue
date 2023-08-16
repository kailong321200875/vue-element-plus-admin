<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton } from 'element-plus'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { useDesign } from '@/hooks/web/useDesign'

const { t } = useI18n()

const { variables } = useDesign()

const driverObj = driver({
  showProgress: true,
  nextBtnText: t('common.nextLabel'),
  prevBtnText: t('common.prevLabel'),
  doneBtnText: t('common.doneLabel'),
  steps: [
    {
      element: `#${variables.namespace}-menu`,
      popover: {
        title: t('common.menu'),
        description: t('common.menuDes'),
        side: 'right'
      }
    },
    {
      element: `#${variables.namespace}-tool-header`,
      popover: {
        title: t('common.tool'),
        description: t('common.toolDes'),
        side: 'left'
      }
    },
    {
      element: `#${variables.namespace}-tags-view`,
      popover: {
        title: t('common.tagsView'),
        description: t('common.tagsViewDes'),
        side: 'bottom'
      }
    }
  ]
})

const guideStart = () => {
  driverObj.drive()
}
</script>

<template>
  <ContentWrap :title="t('guideDemo.guide')" :message="t('guideDemo.message')">
    <ElButton type="primary" @click="guideStart">{{ t('guideDemo.start') }}</ElButton>
  </ContentWrap>
</template>

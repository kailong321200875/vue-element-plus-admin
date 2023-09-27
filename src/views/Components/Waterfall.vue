<script setup lang="ts">
import { Waterfall } from '@/components/Waterfall'
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import Mock from 'mockjs'
import { ref, unref } from 'vue'
import { toAnyString } from '@/utils'

const data = ref<any>([])

const getList = () => {
  const list: any = []
  for (let i = 0; i < 20; i++) {
    list.push(
      Mock.mock({
        id: toAnyString(),
        image_uri: Mock.Random.image('@integer(100, 500)x@integer(100, 500)')
      })
    )
  }
  data.value = [...unref(data), ...list]
  console.log('【data】：', data.value)
}
getList()

const { t } = useI18n()
</script>

<template>
  <ContentWrap :title="t('router.waterfall')">
    <Waterfall
      :data="data"
      :props="{
        src: 'image_uri',
        height: 'height'
      }"
    />
  </ContentWrap>
</template>

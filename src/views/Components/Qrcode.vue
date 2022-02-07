<script setup lang="ts">
import { Qrcode } from '@/components/Qrcode'
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { computed, ref, unref } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { ElRow, ElCard, ElCol, ElMessage } from 'element-plus'
// @ts-ignore
import logoImg from '@/assets/imgs/logo.png'

const appStore = useAppStore()

const { t } = useI18n()

const title = computed(() => appStore.getTitle)

const asyncTitle = ref('')

setTimeout(() => {
  asyncTitle.value = unref(title)
}, 3000)

const codeClick = () => {
  ElMessage.info(t('qrcodeDemo.click'))
}

const disabledClick = () => {
  ElMessage.info(t('qrcodeDemo.invalid'))
}
</script>

<template>
  <ContentWrap :title="t('qrcodeDemo.qrcode')" :message="t('qrcodeDemo.qrcodeDes')">
    <ElRow :gutter="20" justify="space-between">
      <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-10px text-center">
          <div class="font-bold">{{ t('qrcodeDemo.basicUsage') }}</div>
          <Qrcode :text="title" />
        </ElCard>
      </ElCol>
      <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-10px text-center">
          <div class="font-bold">{{ t('qrcodeDemo.imgTag') }}</div>
          <Qrcode :text="title" tag="img" />
        </ElCard>
      </ElCol>
      <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-10px text-center">
          <div class="font-bold">{{ t('qrcodeDemo.style') }}</div>
          <Qrcode
            :text="title"
            :options="{
              color: {
                dark: '#55D187',
                light: '#2d8cf0'
              }
            }"
          />
        </ElCard>
      </ElCol>
      <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-10px text-center">
          <div class="font-bold">{{ t('qrcodeDemo.click') }}</div>
          <Qrcode :text="title" @click="codeClick" />
        </ElCard>
      </ElCol>
      <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-10px text-center">
          <div class="font-bold">{{ t('qrcodeDemo.asynchronousContent') }}</div>
          <Qrcode :text="asyncTitle" />
        </ElCard>
      </ElCol>
      <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-10px text-center">
          <div class="font-bold">{{ t('qrcodeDemo.invalid') }}</div>
          <Qrcode :text="title" disabled @disabled-click="disabledClick" />
        </ElCard>
      </ElCol>
      <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-10px text-center">
          <div class="font-bold">{{ t('qrcodeDemo.logoConfig') }}</div>
          <Qrcode :text="title" :logo="logoImg" />
        </ElCard>
      </ElCol>
      <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-10px text-center">
          <div class="font-bold">{{ t('qrcodeDemo.logoStyle') }}</div>
          <Qrcode
            :text="title"
            :logo="{
              src: logoImg,
              logoSize: 0.2,
              borderSize: 0.05,
              borderRadius: 50,
              bgColor: 'blue'
            }"
          />
        </ElCard>
      </ElCol>
      <ElCol :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-10px text-center">
          <div class="font-bold">{{ t('qrcodeDemo.size') }}</div>
          <Qrcode :text="title" :width="100" />
        </ElCard>
      </ElCol>
    </ElRow>
  </ContentWrap>
</template>

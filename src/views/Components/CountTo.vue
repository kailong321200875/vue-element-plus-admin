<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { CountTo } from '@/components/CountTo'
import { ElRow, ElCol, ElInputNumber, ElInput } from 'element-plus'
import { ref, unref } from 'vue'

const { t } = useI18n()

const countRef = ref<ComponentRef<typeof CountTo>>()

const startVal = ref(0)

const endVal = ref(1314512)

const duration = ref(3000)

const decimals = ref(0)

const separator = ref(',')

const prefix = ref('¥ ')

const suffix = ref(' rmb')

const autoplay = ref(false)

const start = () => {
  unref(countRef)?.start()
}

const pauseResume = () => {
  unref(countRef)?.pauseResume()
}
</script>

<template>
  <ContentWrap :title="t('countToDemo.countTo')" :message="t('countToDemo.countToDes')">
    <div class="text-center mb-40px">
      <CountTo
        ref="countRef"
        :start-val="startVal"
        :end-val="endVal"
        :duration="duration"
        :decimals="decimals"
        :separator="separator"
        :prefix="prefix"
        :suffix="suffix"
        :autoplay="autoplay"
        class="text-30px font-bold text-[var(--el-color-primary)]"
      />
    </div>
    <ElRow :gutter="20" justify="space-between">
      <ElCol :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
        <div class="flex mb-20px items-center">
          <span class="min-w-90px text-right">{{ t('countToDemo.startVal') }}：</span>
          <ElInputNumber v-model="startVal" :min="0" />
        </div>
      </ElCol>
      <ElCol :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
        <div class="flex mb-20px items-center">
          <span class="min-w-90px text-right">{{ t('countToDemo.endVal') }}：</span>
          <ElInputNumber v-model="endVal" :min="1" />
        </div>
      </ElCol>
      <ElCol :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
        <div class="flex mb-20px items-center">
          <span class="min-w-90px text-right">{{ t('countToDemo.duration') }}：</span>
          <ElInputNumber v-model="duration" :min="1000" />
        </div>
      </ElCol>
      <ElCol :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
        <div class="flex mb-20px items-center">
          <span class="min-w-90px text-right">{{ t('countToDemo.separator') }}：</span>
          <ElInput v-model="separator" />
        </div>
      </ElCol>
      <ElCol :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
        <div class="flex mb-20px items-center">
          <span class="min-w-90px text-right">{{ t('countToDemo.prefix') }}：</span>
          <ElInput v-model="prefix" />
        </div>
      </ElCol>
      <ElCol :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
        <div class="flex mb-20px items-center">
          <span class="min-w-90px text-right">{{ t('countToDemo.suffix') }}：</span>
          <ElInput v-model="suffix" />
        </div>
      </ElCol>
      <ElCol :span="24">
        <div class="text-center">
          <BaseButton type="primary" @click="start">{{ t('countToDemo.start') }}</BaseButton>
          <BaseButton @click="pauseResume">
            {{ t('countToDemo.pause') }}/{{ t('countToDemo.resume') }}
          </BaseButton>
        </div>
      </ElCol>
    </ElRow>
  </ContentWrap>
</template>

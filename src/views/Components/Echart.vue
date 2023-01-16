<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { pieOptions, barOptions, lineOptions, wordOptions } from '@/views/Dashboard/echarts-data'
import { Echart } from '@/components/Echart'
import { ElRow, ElCol, ElCard } from 'element-plus'

const { t } = useI18n()
</script>

<template>
  <ContentWrap :title="t('echartDemo.echart')" :message="t('echartDemo.echartDes')">
    <ElRow :gutter="20" justify="space-between">
      <ElCol :xl="10" :lg="10" :md="24" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-20px">
          <Echart :options="pieOptions" :height="300" />
        </ElCard>
      </ElCol>
      <ElCol :xl="14" :lg="14" :md="24" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-20px">
          <Echart :options="barOptions" :height="300" />
        </ElCard>
      </ElCol>
      <ElCol :span="24">
        <ElCard shadow="hover" class="mb-20px">
          <Echart :options="lineOptions" :height="350" />
        </ElCard>
      </ElCol>
      <ElCol :span="24">
        <ElCard shadow="hover" class="mb-20px">
          <Echart :options="wordOptions as any" :height="300" />
        </ElCard>
      </ElCol>
    </ElRow>
  </ContentWrap>
</template>

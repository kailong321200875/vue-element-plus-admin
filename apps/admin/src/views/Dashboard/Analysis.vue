<script setup lang="ts">
  import PanelGroup from './components/PanelGroup.vue'
  import { ElRow, ElCol, ElCard, ElSkeleton } from 'element-plus'
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { Echart } from '@/components/Echart'
  import { createPieOptions, createBarOptions, createLineOptions } from './echarts-data'
  import {
    getUserAccessSourceApi,
    getWeeklyUserActivityApi,
    getMonthlySalesApi
  } from '@/api/dashboard/analysis'
  import type {
    MonthlySales,
    UserAccessSource,
    WeeklyUserActivity
  } from '@/api/dashboard/analysis/types'

  const { t } = useI18n()

  const loading = ref(true)
  const userAccessSource = ref<UserAccessSource[]>([])
  const weeklyUserActivity = ref<WeeklyUserActivity[]>([])
  const monthlySales = ref<MonthlySales[]>([])

  const pieOption = computed(() => createPieOptions(t, userAccessSource.value))
  const barOption = computed(() => createBarOptions(t, weeklyUserActivity.value))
  const lineOption = computed(() => createLineOptions(t, monthlySales.value))

  const loadCharts = async () => {
    const [sourceResult, activityResult, salesResult] = await Promise.allSettled([
      getUserAccessSourceApi(),
      getWeeklyUserActivityApi(),
      getMonthlySalesApi()
    ])

    if (sourceResult.status === 'fulfilled') userAccessSource.value = sourceResult.value.data
    if (activityResult.status === 'fulfilled') weeklyUserActivity.value = activityResult.value.data
    if (salesResult.status === 'fulfilled') monthlySales.value = salesResult.value.data
    loading.value = false
  }

  void loadCharts()
</script>

<template>
  <PanelGroup />
  <ElRow :gutter="20" justify="space-between">
    <ElCol :xl="10" :lg="10" :md="24" :sm="24" :xs="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated>
          <Echart :option="pieOption" :height="300" />
        </ElSkeleton>
      </ElCard>
    </ElCol>
    <ElCol :xl="14" :lg="14" :md="24" :sm="24" :xs="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated>
          <Echart :option="barOption" :height="300" />
        </ElSkeleton>
      </ElCard>
    </ElCol>
    <ElCol :span="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated :rows="4">
          <Echart :option="lineOption" :height="350" />
        </ElSkeleton>
      </ElCard>
    </ElCol>
  </ElRow>
</template>

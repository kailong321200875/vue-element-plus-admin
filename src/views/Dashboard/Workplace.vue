<script setup lang="ts">
import { useTimeAgo } from '@/hooks/web/useTimeAgo'
import { ElRow, ElCol, ElSkeleton, ElCard, ElDivider, ElLink } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { ref, reactive } from 'vue'
import { CountTo } from '@/components/CountTo'
import { formatTime } from '@/utils'
import { Echart } from '@/components/Echart'
import { EChartsOption } from 'echarts'
import { radarOption } from './echarts-data'
import { Highlight } from '@/components/Highlight'
import {
  getCountApi,
  getProjectApi,
  getDynamicApi,
  getTeamApi,
  getRadarApi
} from '@/api/dashboard/workplace'
import type { WorkplaceTotal, Project, Dynamic, Team } from '@/api/dashboard/workplace/types'
import { set } from 'lodash-es'

const loading = ref(true)

// 获取统计数
let totalSate = reactive<WorkplaceTotal>({
  project: 0,
  access: 0,
  todo: 0
})

const getCount = async () => {
  const res = await getCountApi().catch(() => {})
  if (res) {
    totalSate = Object.assign(totalSate, res.data)
  }
}

let projects = reactive<Project[]>([])

// 获取项目数
const getProject = async () => {
  const res = await getProjectApi().catch(() => {})
  if (res) {
    projects = Object.assign(projects, res.data)
  }
}

// 获取动态
let dynamics = reactive<Dynamic[]>([])

const getDynamic = async () => {
  const res = await getDynamicApi().catch(() => {})
  if (res) {
    dynamics = Object.assign(dynamics, res.data)
  }
}

// 获取团队
let team = reactive<Team[]>([])

const getTeam = async () => {
  const res = await getTeamApi().catch(() => {})
  if (res) {
    team = Object.assign(team, res.data)
  }
}

// 获取指数
let radarOptionData = reactive<EChartsOption>(radarOption) as EChartsOption

const getRadar = async () => {
  const res = await getRadarApi().catch(() => {})
  if (res) {
    set(
      radarOptionData,
      'radar.indicator',
      res.data.map((v) => {
        return {
          name: t(v.name),
          max: v.max
        }
      })
    )
    set(radarOptionData, 'series', [
      {
        name: `xxx${t('workplace.index')}`,
        type: 'radar',
        data: [
          {
            value: res.data.map((v) => v.personal),
            name: t('workplace.personal')
          },
          {
            value: res.data.map((v) => v.team),
            name: t('workplace.team')
          }
        ]
      }
    ])
  }
}

const getAllApi = async () => {
  await Promise.all([getCount(), getProject(), getDynamic(), getTeam(), getRadar()])
  loading.value = false
}

getAllApi()

const { t } = useI18n()
</script>

<template>
  <div>
    <ElCard shadow="never">
      <ElSkeleton :loading="loading" animated>
        <ElRow :gutter="20" justify="space-between">
          <ElCol :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <div class="flex items-center">
              <img
                src="@/assets/imgs/avatar.jpg"
                alt=""
                class="w-70px h-70px rounded-[50%] mr-20px"
              />
              <div>
                <div class="text-20px">
                  {{ t('workplace.goodMorning') }}，Archer，{{ t('workplace.happyDay') }}
                </div>
                <div class="mt-10px text-14px text-gray-500">
                  {{ t('workplace.toady') }}，20℃ - 32℃！
                </div>
              </div>
            </div>
          </ElCol>
          <ElCol :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <div class="flex h-70px items-center justify-end lt-sm:mt-20px">
              <div class="px-8px text-right">
                <div class="text-14px text-gray-400 mb-20px">{{ t('workplace.project') }}</div>
                <CountTo
                  class="text-20px"
                  :start-val="0"
                  :end-val="totalSate.project"
                  :duration="2600"
                />
              </div>
              <ElDivider direction="vertical" />
              <div class="px-8px text-right">
                <div class="text-14px text-gray-400 mb-20px">{{ t('workplace.toDo') }}</div>
                <CountTo
                  class="text-20px"
                  :start-val="0"
                  :end-val="totalSate.todo"
                  :duration="2600"
                />
              </div>
              <ElDivider direction="vertical" border-style="dashed" />
              <div class="px-8px text-right">
                <div class="text-14px text-gray-400 mb-20px">{{ t('workplace.access') }}</div>
                <CountTo
                  class="text-20px"
                  :start-val="0"
                  :end-val="totalSate.access"
                  :duration="2600"
                />
              </div>
            </div>
          </ElCol>
        </ElRow>
      </ElSkeleton>
    </ElCard>
  </div>

  <ElRow class="mt-20px" :gutter="20" justify="space-between">
    <ElCol :xl="16" :lg="16" :md="24" :sm="24" :xs="24" class="mb-20px">
      <ElCard shadow="never">
        <template #header>
          <div class="flex justify-between">
            <span>{{ t('workplace.project') }}</span>
            <ElLink type="primary" :underline="false">{{ t('workplace.more') }}</ElLink>
          </div>
        </template>
        <ElSkeleton :loading="loading" animated>
          <ElRow>
            <ElCol
              v-for="(item, index) in projects"
              :key="`card-${index}`"
              :xl="8"
              :lg="8"
              :md="12"
              :sm="24"
              :xs="24"
            >
              <ElCard shadow="hover">
                <div class="flex items-center">
                  <Icon :icon="item.icon" :size="25" class="mr-10px" />
                  <span class="text-16px">{{ item.name }}</span>
                </div>
                <div class="mt-15px text-14px text-gray-400">{{ t(item.message) }}</div>
                <div class="mt-20px text-12px text-gray-400 flex justify-between">
                  <span>{{ item.personal }}</span>
                  <span>{{ formatTime(item.time, 'yyyy-MM-dd') }}</span>
                </div>
              </ElCard>
            </ElCol>
          </ElRow>
        </ElSkeleton>
      </ElCard>

      <ElCard shadow="never" class="mt-20px">
        <template #header>
          <div class="flex justify-between">
            <span>{{ t('workplace.dynamic') }}</span>
            <ElLink type="primary" :underline="false">{{ t('workplace.more') }}</ElLink>
          </div>
        </template>
        <ElSkeleton :loading="loading" animated>
          <div v-for="(item, index) in dynamics" :key="`dynamics-${index}`">
            <div class="flex items-center">
              <img
                src="@/assets/imgs/avatar.jpg"
                alt=""
                class="w-35px h-35px rounded-[50%] mr-20px"
              />
              <div>
                <div class="text-14px">
                  <Highlight :keys="item.keys.map((v) => t(v))">
                    {{ t('workplace.pushCode') }}
                  </Highlight>
                </div>
                <div class="mt-15px text-12px text-gray-400">
                  {{ useTimeAgo(item.time) }}
                </div>
              </div>
            </div>
            <ElDivider />
          </div>
        </ElSkeleton>
      </ElCard>
    </ElCol>
    <ElCol :xl="8" :lg="8" :md="24" :sm="24" :xs="24" class="mb-20px">
      <ElCard shadow="never">
        <template #header>
          <span>{{ t('workplace.shortcutOperation') }}</span>
        </template>
        <ElSkeleton :loading="loading" animated>
          <ElRow>
            <ElCol
              v-for="item in 9"
              :key="`card-${item}`"
              :xl="12"
              :lg="12"
              :md="12"
              :sm="24"
              :xs="24"
              class="mb-10px"
            >
              <ElLink type="default" :underline="false">
                {{ t('workplace.operation') }}{{ item }}
              </ElLink>
            </ElCol>
          </ElRow>
        </ElSkeleton>
      </ElCard>

      <ElCard shadow="never" class="mt-20px">
        <template #header>
          <span>xx{{ t('workplace.index') }}</span>
        </template>
        <ElSkeleton :loading="loading" animated>
          <Echart :options="radarOptionData" :height="400" />
        </ElSkeleton>
      </ElCard>

      <ElCard shadow="never" class="mt-20px">
        <template #header>
          <span>{{ t('workplace.team') }}</span>
        </template>
        <ElSkeleton :loading="loading" animated>
          <ElRow>
            <ElCol v-for="item in team" :key="`team-${item.name}`" :span="12" class="mb-20px">
              <div class="flex items-center">
                <Icon :icon="item.icon" class="mr-10px" />
                <ElLink type="default" :underline="false">
                  {{ item.name }}
                </ElLink>
              </div>
            </ElCol>
          </ElRow>
        </ElSkeleton>
      </ElCard>
    </ElCol>
  </ElRow>
</template>

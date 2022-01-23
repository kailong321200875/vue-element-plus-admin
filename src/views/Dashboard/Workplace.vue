<script setup lang="ts">
import { useTimeAgo } from '@/hooks/web/useTimeAgo'
import { ElRow, ElCol, ElSkeleton, ElCard, ElDivider, ElLink } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { ref } from 'vue'
import { CountTo } from '@/components/CountTo'
import { formatTime } from '@/utils'
import { Echart } from '@/components/Echart'
import { radarOption } from './echarts-data'
import { Highlight } from '@/components/Highlight'

interface Project {
  name: string
  icon: string
  message: string
  personal: string
  time: Date | number | string
}

interface Dynamic {
  keys: string[]
  time: Date | number | string
}

interface Team {
  name: string
  icon: string
}

const { t } = useI18n()

const projects: Project[] = [
  {
    name: 'Github',
    icon: 'akar-icons:github-fill',
    message: t('workplace.introduction'),
    personal: 'Archer',
    time: new Date()
  },
  {
    name: 'Vue',
    icon: 'logos:vue',
    message: t('workplace.introduction'),
    personal: 'Archer',
    time: new Date()
  },
  {
    name: 'Angular',
    icon: 'logos:angular-icon',
    message: t('workplace.introduction'),
    personal: 'Archer',
    time: new Date()
  },
  {
    name: 'React',
    icon: 'logos:react',
    message: t('workplace.introduction'),
    personal: 'Archer',
    time: new Date()
  },
  {
    name: 'Webpack',
    icon: 'logos:webpack',
    message: t('workplace.introduction'),
    personal: 'Archer',
    time: new Date()
  },
  {
    name: 'Vite',
    icon: 'vscode-icons:file-type-vite',
    message: t('workplace.introduction'),
    personal: 'Archer',
    time: new Date()
  }
]

const dynamics: Dynamic[] = [
  {
    keys: [t('workplace.push'), 'Github'],
    time: new Date()
  },
  {
    keys: [t('workplace.push'), 'Github'],
    time: new Date()
  },
  {
    keys: [t('workplace.push'), 'Github'],
    time: new Date()
  },
  {
    keys: [t('workplace.push'), 'Github'],
    time: new Date()
  },
  {
    keys: [t('workplace.push'), 'Github'],
    time: new Date()
  },
  {
    keys: [t('workplace.push'), 'Github'],
    time: new Date()
  }
]

const team: Team[] = [
  {
    name: 'Github',
    icon: 'akar-icons:github-fill'
  },
  {
    name: 'Vue',
    icon: 'logos:vue'
  },
  {
    name: 'Angular',
    icon: 'logos:angular-icon'
  },
  {
    name: 'React',
    icon: 'logos:react'
  },
  {
    name: 'Webpack',
    icon: 'logos:webpack'
  },
  {
    name: 'Vite',
    icon: 'vscode-icons:file-type-vite'
  }
]

const loading = ref(true)

setTimeout(() => {
  loading.value = false
}, 1000)
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
                <div class="text-20px text-700">
                  {{ t('workplace.goodMorning') }}，Archer，{{ t('workplace.happyDay') }}
                </div>
                <div class="mt-10px text-14px text-gray-500">
                  {{ t('workplace.toady') }}，20℃ - 32℃！
                </div>
              </div>
            </div>
          </ElCol>
          <ElCol :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <div class="flex h-70px items-center justify-end <sm:mt-20px">
              <div class="px-8px text-right">
                <div class="text-14px text-gray-400 mb-20px">{{ t('workplace.project') }}</div>
                <CountTo class="text-20px" :start-val="0" :end-val="40" :duration="2600" />
              </div>
              <ElDivider direction="vertical" />
              <div class="px-8px text-right">
                <div class="text-14px text-gray-400 mb-20px">{{ t('workplace.toDo') }}</div>
                <CountTo class="text-20px" :start-val="0" :end-val="10" :duration="2600" />
              </div>
              <ElDivider direction="vertical" border-style="dashed" />
              <div class="px-8px text-right">
                <div class="text-14px text-gray-400 mb-20px">{{ t('workplace.access') }}</div>
                <CountTo class="text-20px" :start-val="0" :end-val="2340" :duration="2600" />
              </div>
            </div>
          </ElCol>
        </ElRow>
      </ElSkeleton>
    </ElCard>
  </div>

  <ElRow class="mt-20px" :gutter="20" justify="space-between">
    <ElCol :xl="16" :lg="16" :md="24" :sm="24" :xs="24" class="mb-20px">
      <ElSkeleton :loading="loading" animated>
        <ElCard shadow="never">
          <template #header>
            <div class="flex justify-between">
              <span>{{ t('workplace.project') }}</span>
              <ElLink type="primary" :underline="false">{{ t('workplace.more') }}</ElLink>
            </div>
          </template>
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
                <div class="mt-15px text-14px text-gray-400">{{ item.message }}</div>
                <div class="mt-20px text-12px text-gray-400 flex justify-between">
                  <span>{{ item.personal }}</span>
                  <span>{{ formatTime(item.time, 'yyyy-MM-dd') }}</span>
                </div>
              </ElCard>
            </ElCol>
          </ElRow>
        </ElCard>
      </ElSkeleton>

      <ElSkeleton :loading="loading" animated>
        <ElCard shadow="never" class="mt-20px">
          <template #header>
            <div class="flex justify-between">
              <span>{{ t('workplace.dynamic') }}</span>
              <ElLink type="primary" :underline="false">{{ t('workplace.more') }}</ElLink>
            </div>
          </template>
          <div v-for="(item, index) in dynamics" :key="`dynamics-${index}`">
            <div class="flex items-center">
              <img
                src="@/assets/imgs/avatar.jpg"
                alt=""
                class="w-35px h-35px rounded-[50%] mr-20px"
              />
              <div>
                <div class="text-14px">
                  <Highlight :keys="item.keys"> {{ t('workplace.pushCode') }} </Highlight>
                </div>
                <div class="mt-15px text-12px text-gray-400">
                  {{ useTimeAgo(item.time) }}
                </div>
              </div>
            </div>
            <ElDivider />
          </div>
        </ElCard>
      </ElSkeleton>
    </ElCol>
    <ElCol :xl="8" :lg="8" :md="24" :sm="24" :xs="24" class="mb-20px">
      <ElSkeleton :loading="loading" animated>
        <ElCard shadow="never">
          <template #header>
            <span>{{ t('workplace.shortcutOperation') }}</span>
          </template>
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
        </ElCard>
      </ElSkeleton>

      <ElSkeleton :loading="loading" animated>
        <ElCard shadow="never" class="mt-20px">
          <template #header>
            <span>xx{{ t('workplace.index') }}</span>
          </template>
          <Echart :options="radarOption" :height="400" />
        </ElCard>
      </ElSkeleton>

      <ElSkeleton :loading="loading" animated>
        <ElCard shadow="never" class="mt-20px">
          <template #header>
            <span>{{ t('workplace.team') }}</span>
          </template>
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
        </ElCard>
      </ElSkeleton>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
  import { ElRow, ElCol, ElCard, ElSkeleton } from 'element-plus'
  import { CountTo } from '@/components/CountTo'
  import { useI18n } from 'vue-i18n'
  import { ref, reactive } from 'vue'
  import { getAnalysisTotalApi } from '@/api/dashboard/analysis'
  import type { AnalysisTotal } from '@/api/dashboard/analysis/types'

  const { t } = useI18n()

  const prefixCls = 'v-panel'

  const loading = ref(true)

  let totalState = reactive<AnalysisTotal>({
    users: 0,
    messages: 0,
    moneys: 0,
    shoppings: 0
  })

  const getCount = async () => {
    const res = await getAnalysisTotalApi()
      .catch(() => {})
      .finally(() => {
        loading.value = false
      })
    totalState = Object.assign(totalState, res?.data || {})
  }

  getCount()
</script>

<template>
  <ElRow :gutter="20" justify="space-between" :class="prefixCls">
    <ElCol :xl="6" :lg="6" :md="12" :sm="12" :xs="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated :rows="2">
          <template #default>
            <div :class="`${prefixCls}__item flex justify-between`">
              <div>
                <div
                  :class="`${prefixCls}__item--icon ${prefixCls}__item--peoples p-16px inline-block rounded-6px`"
                >
                  <Icon icon="mdi:account-group" :size="40" />
                </div>
              </div>
              <div class="flex flex-col justify-between">
                <div :class="`${prefixCls}__item--text text-16px text-gray-500 text-right`">{{
                  t('analysis.newUser')
                }}</div>
                <CountTo
                  class="text-20px font-700 text-right"
                  :start-val="0"
                  :end-val="102400"
                  :duration="2600"
                />
              </div>
            </div>
          </template>
        </ElSkeleton>
      </ElCard>
    </ElCol>

    <ElCol :xl="6" :lg="6" :md="12" :sm="12" :xs="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated :rows="2">
          <template #default>
            <div :class="`${prefixCls}__item flex justify-between`">
              <div>
                <div
                  :class="`${prefixCls}__item--icon ${prefixCls}__item--message p-16px inline-block rounded-6px`"
                >
                  <Icon icon="mdi:message-text" :size="40" />
                </div>
              </div>
              <div class="flex flex-col justify-between">
                <div :class="`${prefixCls}__item--text text-16px text-gray-500 text-right`">{{
                  t('analysis.unreadInformation')
                }}</div>
                <CountTo
                  class="text-20px font-700 text-right"
                  :start-val="0"
                  :end-val="81212"
                  :duration="2600"
                />
              </div>
            </div>
          </template>
        </ElSkeleton>
      </ElCard>
    </ElCol>

    <ElCol :xl="6" :lg="6" :md="12" :sm="12" :xs="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated :rows="2">
          <template #default>
            <div :class="`${prefixCls}__item flex justify-between`">
              <div>
                <div
                  :class="`${prefixCls}__item--icon ${prefixCls}__item--money p-16px inline-block rounded-6px`"
                >
                  <Icon icon="mdi:currency-cny" :size="40" />
                </div>
              </div>
              <div class="flex flex-col justify-between">
                <div :class="`${prefixCls}__item--text text-16px text-gray-500 text-right`">{{
                  t('analysis.transactionAmount')
                }}</div>
                <CountTo
                  class="text-20px font-700 text-right"
                  :start-val="0"
                  :end-val="9280"
                  :duration="2600"
                />
              </div>
            </div>
          </template>
        </ElSkeleton>
      </ElCard>
    </ElCol>

    <ElCol :xl="6" :lg="6" :md="12" :sm="12" :xs="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated :rows="2">
          <template #default>
            <div :class="`${prefixCls}__item flex justify-between`">
              <div>
                <div
                  :class="`${prefixCls}__item--icon ${prefixCls}__item--shopping p-16px inline-block rounded-6px`"
                >
                  <Icon icon="mdi:cart" :size="40" />
                </div>
              </div>
              <div class="flex flex-col justify-between">
                <div :class="`${prefixCls}__item--text text-16px text-gray-500 text-right`">{{
                  t('analysis.totalShopping')
                }}</div>
                <CountTo
                  class="text-20px font-700 text-right"
                  :start-val="0"
                  :end-val="13600"
                  :duration="2600"
                />
              </div>
            </div>
          </template>
        </ElSkeleton>
      </ElCard>
    </ElCol>
  </ElRow>
</template>

<style lang="less" scoped>
  @prefix-cls: v-panel;

  .@{prefix-cls} {
    &__item {
      &--peoples {
        color: #40c9c6;
      }

      &--message {
        color: #36a3f7;
      }

      &--money {
        color: #f4516c;
      }

      &--shopping {
        color: #34bfa3;
      }

      &:hover {
        :deep(.v-icon) {
          color: #fff !important;
        }
        .@{prefix-cls}__item--icon {
          transition: all 0.38s ease-out;
        }
        .@{prefix-cls}__item--peoples {
          background: #40c9c6;
        }
        .@{prefix-cls}__item--message {
          background: #36a3f7;
        }
        .@{prefix-cls}__item--money {
          background: #f4516c;
        }
        .@{prefix-cls}__item--shopping {
          background: #34bfa3;
        }
      }
    }
  }
</style>

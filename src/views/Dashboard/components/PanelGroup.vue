<script setup lang="ts">
import { ElRow, ElCol, ElCard } from 'element-plus'
import { CountTo } from '@/components/CountTo'
</script>

<template>
  <ElRow :gutter="20" class="v-panel">
    <ElCol :xl="6" :lg="6" :md="6" :sm="6" :xs="1">
      <ElCard shadow="hover">
        <div class="v-panel-item flex justify-between">
          <div>
            <div
              class="v-panel-item__icon v-panel-item__icon--peoples p-16px inline-block rounded-6px"
            >
              <Icon icon="svg-icon:peoples" :size="40" />
            </div>
          </div>
          <div class="flex flex-col justify-between">
            <div class="v-panel-item__text">新增用户</div>
            <CountTo :start-val="0" :end-val="102400" :duration="2600" />
          </div>
        </div>
      </ElCard>
    </ElCol>
  </ElRow>
</template>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-panel';

.@{prefix-cls} {
  &-item {
    &:hover {
      :deep(.v-icon) {
        color: #fff !important;
      }
      .@{prefix-cls}-item__icon {
        transition: all 0.38s ease-out;

        &--peoples {
          background: #40c9c6;
        }
      }
    }
  }
}
</style>

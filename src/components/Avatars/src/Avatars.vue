<script setup lang="ts">
import { ComponentSize, ElAvatar, ElTooltip } from 'element-plus'
import { PropType, computed } from 'vue'
import { AvatarItem } from './types'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('avatars')

const props = defineProps({
  size: {
    type: [String, Number] as PropType<ComponentSize | number>,
    default: ''
  },
  max: {
    type: Number,
    default: 5
  },
  data: {
    type: Array as PropType<AvatarItem[]>,
    default: () => []
  },
  showTooltip: {
    type: Boolean,
    default: true
  }
})

const filterData = computed(() => props.data.slice(0, props.max))
</script>

<template>
  <div :class="prefixCls" class="flex items-center">
    <template v-for="item in filterData" :key="item.url">
      <template v-if="showTooltip && item.name">
        <ElTooltip :content="item.name" placement="top">
          <ElAvatar
            :size="size"
            :src="item.url"
            class="relative"
            :style="{
              zIndex: filterData.indexOf(item)
            }"
          />
        </ElTooltip>
      </template>
      <template v-else>
        <ElAvatar
          :size="size"
          :src="item.url"
          class="relative"
          :style="{
            zIndex: filterData.indexOf(item)
          }"
        />
      </template>
    </template>

    <ElAvatar
      v-if="data.length > max"
      :style="{
        zIndex: data.length
      }"
    >
      <span>+{{ data.length - max }}</span>
    </ElAvatar>
  </div>
</template>

<style scoped lang="less">
@prefix-cls: ~'@{adminNamespace}-avatars';

.@{prefix-cls} {
  .@{elNamespace}-avatar + .@{elNamespace}-avatar {
    margin-left: -15px;
  }
}
</style>

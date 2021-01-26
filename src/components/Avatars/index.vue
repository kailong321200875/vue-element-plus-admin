<template>
  <div class="avatars-wrap">
    <template v-if="tooltip">
      <el-tooltip
        v-for="(item, $index) in avatarsData"
        :key="$index"
        :content="item.text"
        effect="dark"
        placement="top"
      >
        <div :class="showAvatar ? 'avatars-item-img' : ['avatars-item', `avatars-${item.type || 'default'}`]">
          <el-avatar v-if="showAvatar" :size="40" :src="item.url">
            <img :src="require('@/assets/img/avatar.png')">
          </el-avatar>
          <span v-else>{{ item.text.substr(0, 1) }}</span>
        </div>
      </el-tooltip>
      <div v-if="max && data.length - max > 0" :class="['avatars-item', 'avatars-item-img']">
        <span>+{{ data.length - max }}</span>
      </div>
    </template>
    <template v-else>
      <div
        v-for="(item, $index) in avatarsData"
        :key="$index"
        :class="showAvatar ? 'avatars-item-img' : ['avatars-item', `avatars-${item.type || 'default'}`]"
      >
        <el-avatar v-if="showAvatar" :size="40" :src="item.url">
          <img :src="require('@/assets/img/avatar.png')">
        </el-avatar>
        <span v-else>{{ item.text.substr(0, 1) }}</span>
      </div>
      <div v-if="max && data.length - max > 0" :class="['avatars-item', 'avatars-item-img']">
        <span>+{{ data.length - max }}</span>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { deepClone } from '@/utils'
import { DataConfig } from './types'
export default defineComponent({
  name: 'Avatars',
  props: {
    // 展示的数据
    data: {
      type: Array as PropType<DataConfig[]>,
      default: () => []
    },
    // 最大展示数量
    max: {
      type: Number as PropType<number>,
      default: 0
    },
    // 是否使用头像
    showAvatar: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    // 是否显示完整名称
    tooltip: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },
  setup(props) {
    const avatarsData = computed(() => {
      if (props.max) {
        if (props.data.length <= props.max) {
          return props.data
        } else {
          const data = deepClone(props.data).splice(0, props.max)
          return data
        }
      } else {
        return props.data
      }
    })

    return {
      avatarsData
    }
  }
})
</script>

<style lang="less" scoped>
.avatars-wrap {
  display: flex;
  .avatars-item {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    border: 1px solid #fff;
    text-align: center;
    color: #fff;
    background: #2d8cf0;
  }
  .avatars-item-img {
    display: inline-block;
    border-radius: 50%;
    .el-avatar--circle {
      border: 1px solid #fff;
    }
  }
  .avatars-item-img + .avatars-item-img {
    margin-left: -12px;
  }
  .avatars-item + .avatars-item {
    margin-left: -12px;
  }
  .avatars-default {
    color: #bae7ff;
    background: #096dd9;
  }
  .avatars-success {
    color: #f6ffed;
    background: #52c41a;
  }
  .avatars-danger {
    color: #fff1f0;
    background: #f5222d;
  }
  .avatars-warning {
    color: #fffbe6;
    background: #faad14;
  }
}
</style>

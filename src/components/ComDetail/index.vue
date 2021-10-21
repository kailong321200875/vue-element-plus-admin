<template>
  <div class="detail__wrap">
    <div v-if="title" class="detail__wrap--header" @click="toggleClick">
      <div class="detail__wrap--title">
        <div>
          {{ title }}
          <el-tooltip v-if="message" :content="message" placement="right">
            <i class="el-icon-warning-outline"></i>
          </el-tooltip>
        </div>
      </div>
      <i
        v-if="collapsed"
        :class="['el-icon-arrow-down', { 'el-icon-arrow-down-transform': !show }]"
      ></i>
    </div>
    <el-collapse-transition>
      <div v-show="show" class="detail__content" :style="contentStyleObj">
        <el-row>
          <el-col v-for="(item, $index) in schema" :key="$index" :span="item.span || 12">
            <div class="detail__content--item" :class="{ 'detail__content--flex': !vertical }">
              <div class="content__item--label" :style="labelStyleObj">
                <slot :name="item.field" :row="item">
                  {{ item.label }}
                </slot>
              </div>
              <div class="content__item--message" :style="messageStyleObj">
                <slot :name="`${item.field}Content`" :row="data">
                  {{ data[item.field] }}
                </slot>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script setup lang="ts" name="ComDetail">
import { PropType, ref, computed } from 'vue'
import { SchemaConfig } from './types'

const props = defineProps({
  // 详情标题
  title: {
    type: String as PropType<string>,
    default: ''
  },
  // 是否可折叠
  collapsed: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  // 辅助提示
  message: {
    type: String as PropType<string>,
    default: ''
  },
  // 是否需要边框
  border: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  // 需要展示的数据
  data: {
    type: Object as PropType<IObj>,
    default: () => {
      return {}
    },
    required: true
  },
  // 布局展示的数据
  schema: {
    type: Array as PropType<SchemaConfig[]>,
    default: () => [],
    required: true
  },
  // 是否标题和内容各占一行 垂直布局
  vertical: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  // 标题宽度
  labelWidth: {
    type: String as PropType<string>,
    default: '150px'
  },
  // 标题位置
  labelAlign: {
    type: String as PropType<string>,
    default: 'left'
  },
  // 边框颜色
  borderColor: {
    type: String as PropType<string>,
    default: '#f0f0f0'
  },
  // 标题背景颜色
  labelBg: {
    type: String as PropType<string>,
    default: '#fafafa'
  },
  classic: {
    type: Boolean as PropType<boolean>,
    default: false
  }
})

const show = ref<boolean>(true)
const contentStyleObj = computed(() => {
  return {
    borderTop: props.border ? `1px solid ${props.borderColor}` : '',
    borderLeft: props.border ? `1px solid ${props.borderColor}` : ''
  }
})
const labelStyleObj = computed((): any => {
  return {
    width: props.vertical ? `100%` : props.labelWidth,
    textAlign: props.labelAlign,
    backgroundColor: props.border && !props.classic ? props.labelBg : '',
    borderRight: props.border && !props.classic ? `1px solid ${props.borderColor}` : '',
    borderBottom: props.border && !props.classic ? `1px solid ${props.borderColor}` : ''
  }
})
const messageStyleObj = computed(() => {
  return {
    width: props.vertical ? `100%` : `calc(100% - ${props.labelWidth})`,
    borderRight: props.border && !props.classic ? `1px solid ${props.borderColor}` : '',
    borderBottom: props.border && !props.classic ? `1px solid ${props.borderColor}` : ''
  }
})

function toggleClick() {
  if (props.collapsed) {
    show.value = !show.value
  }
}
</script>

<style lang="less" scoped>
.detail__wrap {
  padding: 10px;
  background: #fff;
  border-radius: 2px;

  .detail__wrap--header {
    display: flex;
    height: 32px;
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: center;
    // cursor: pointer;
    .detail__wrap--title {
      position: relative;
      display: inline-block;
      margin-left: 10px;
      font-family: MicrosoftYaHei-Bold;
      font-size: 18px;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.85);

      &::after {
        position: absolute;
        top: 1px;
        left: -10px;
        width: 4px;
        height: 90%;
        background: var(--main-color);
        content: '';
      }
    }

    .el-icon-arrow-down {
      transition: all 0.2s;
    }

    .el-icon-arrow-down-transform {
      transform: rotate(-180deg);
    }
  }

  .detail__content {
    :deep(.el-row) {
      flex-wrap: wrap;
    }

    .detail__content--flex {
      display: flex;
      height: 100%;
    }

    .content__item--label {
      padding: 8px 16px;
      font-size: 14px;
      line-height: 20px;
      color: #918e8d;
    }

    .content__item--message {
      padding: 8px 16px;
      flex: 1;
      font-size: 14px;
      line-height: 20px;
      color: #606266;
      overflow-wrap: break-word;
    }
  }
}
</style>

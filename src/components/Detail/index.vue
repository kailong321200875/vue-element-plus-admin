<template>
  <div class="detail__wrap">
    <div class="detail__wrap--header" @click="toggleClick">
      <div class="detail__wrap--title">
        <div v-if="title">
          {{ title }}
          <el-tooltip
            v-if="message"
            effect="dark"
            :content="message"
            placement="right"
          >
            <i class="el-icon-warning-outline" />
          </el-tooltip>
        </div>
      </div>
      <i v-if="collapsed" :class="['el-icon-arrow-down', { 'el-icon-arrow-down-transform': !show }]" />
    </div>
    <el-collapse-transition>
      <div
        v-show="show"
        class="detail__content"
        :style="contentStyleObj"
      >
        <el-row>
          <el-col
            v-for="(item, $index) in schema"
            :key="$index"
            :span="item.span || 12"
          >
            <div
              class="detail__content--item"
              :class="{'detail__content--flex': !vertical}"
            >
              <div class="content__item--label" :style="labelStyleObj">
                <slot v-if="item.slots && item.slots.title" :name="item.slots.title" :row="item" />
                <template v-else>{{ item.label }}</template>
              </div>
              <div class="content__item--message" :style="messageStyleObj">
                <slot v-if="item.slots && item.slots.default" :name="item.slots.default" :row="data" />
                <template v-else>{{ data[item.field] }}</template>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, computed } from 'vue'
export default defineComponent({
  name: 'Detail',
  props: {
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
      type: Object as PropType<object>,
      required: true
    },
    // 布局展示的数据
    schema: {
      type: Array as PropType<any[]>,
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
    }
  },
  setup(props) {
    const show = ref<boolean>(true)

    const contentStyleObj = computed(() => {
      return {
        borderTop: props.border ? `1px solid ${props.borderColor}` : '',
        borderLeft: props.border ? `1px solid ${props.borderColor}` : ''
      }
    })

    const labelStyleObj = computed(() => {
      return {
        width: props.vertical ? `calc(100% - 33px)` : props.labelWidth,
        textAlign: props.labelAlign,
        backgroundColor: props.border ? props.labelBg : '',
        borderRight: props.border ? `1px solid ${props.borderColor}` : '',
        borderBottom: props.border ? `1px solid ${props.borderColor}` : ''
      }
    })

    const messageStyleObj = computed(() => {
      return {
        width: props.vertical ? `calc(100% - 33px)` : '100%',
        borderRight: props.border ? `1px solid ${props.borderColor}` : '',
        borderBottom: props.border ? `1px solid ${props.borderColor}` : ''
      }
    })

    function toggleClick() {
      if (props.collapsed) {
        show.value = !show.value
      }
    }

    return {
      show,
      contentStyleObj, labelStyleObj, messageStyleObj,
      toggleClick
    }
  }
})
</script>

<style lang="less" scoped>
.detail__wrap {
  background: #fff;
  border-radius: 2px;
  padding: 10px;
  .detail__wrap--header {
    display: flex;
    height: 32px;
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    .detail__wrap--title {
      display: inline-block;
      font-size: 18px;
      font-weight: 700;
      color: rgba(0, 0, 0, .85);
      position: relative;
      margin-left: 10px;
      &:after {
        content: "";
        width: 3px;
        height: 100%;
        background: #2d8cf0;
        border-radius: 2px;
        position: absolute;
        top: 1px;
        left: -10px;
      }
    }
    .el-icon-arrow-down {
      transition: all .2s;
    }
    .el-icon-arrow-down-transform {
      transform: rotate(-180deg);
    }
  }
  .detail__content {
    .detail__content--flex {
      display: flex;
      height: 100%;
    }
    .content__item--label {
      font-size: 14px;
      padding: 8px 16px;
    }
    .content__item--message {
      flex: 1;
      font-size: 14px;
      padding: 8px 16px;
      line-height: 20px;
      color: #606266;
    }
  }
}
</style>

<script setup lang="ts">
import { ElCard, ElButton } from 'element-plus'
import { propTypes } from '@/utils/propTypes'
import { useDesign } from '@/hooks/web/useDesign'
import { ref, onMounted, defineEmits } from 'vue'
import { Sticky } from '@/components/Sticky'
import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('content-wrap')

defineProps({
  title: propTypes.string.def(''),
  message: propTypes.string.def('')
})
const emit = defineEmits(['back'])
const offset = ref(85)
const contentDetailWrap = ref()
onMounted(() => {
  offset.value = contentDetailWrap.value.getBoundingClientRect().top
})
</script>

<template>
  <div class="content-detail-wrap-container" ref="contentDetailWrap" id="contentDetailWrap">
    <Sticky :offset="offset">
      <div class="detail-wrap-header">
        <div style="float: left">
          <el-button style="float: left; margin: 10px 0px 0px 10px" @click="emit('back')">
            <Icon icon="ep:arrow-left" class="mr-5px" />
            {{ t('common.back') }}
          </el-button>
        </div>
        <div style="float: right">
          <slot name="right"></slot>
        </div>
        <div>
          <slot name="title">
            <label class="detail-wrap-header-title">{{ title }}</label>
          </slot>
        </div>
      </div>
    </Sticky>
    <div style="padding: var(--app-content-padding)">
      <ElCard :class="[prefixCls, 'mb-20px']" shadow="never">
        <div>
          <slot></slot>
        </div>
      </ElCard>
    </div>
  </div>
</template>
<style lang="less">
.content-detail-wrap-container {
  position: relative;

  .detail-wrap-header {
    position: relative;
    z-index: 999 !important;
    width: 100%;
    height: 50px;
    padding-right: 20px;
    line-height: 50px;
    text-align: center;
    background: #fff;
    border-bottom: 1px solid #d0d0d0;
    transition: position 0.6s ease;

    .detail-wrap-header-title {
      font-weight: 700;
    }
  }
}
</style>

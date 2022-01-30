<script setup lang="ts">
import { Form } from '@/components/Form'
import { PropType, computed, unref, CSSProperties } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useForm } from '@/hooks/web/useForm'

const { t } = useI18n()

const props = defineProps({
  // 生成Form的布局结构数组
  schema: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  },
  // 是否需要栅格布局
  isCol: propTypes.bool.def(false),
  // 表单label宽度
  labelWidth: propTypes.oneOfType([String, Number]).def('auto'),
  // 操作按钮风格位置
  layout: propTypes.string.validate((v: string) => ['inline', 'bottom'].includes(v)).def('inline'),
  // 底部按钮的对齐方式
  buttomPosition: propTypes.string
    .validate((v: string) => ['left', 'center', 'right'].includes(v))
    .def('center'),
  showSearch: propTypes.bool.def(true),
  showReset: propTypes.bool.def(true)
})

const emit = defineEmits(['search', 'reset'])

const newSchema = computed(() => {
  if (props.layout === 'inline') {
    return props.schema.concat([
      {
        field: 'action',
        formItemProps: {
          labelWidth: '0px'
        }
      }
    ])
  } else {
    return props.schema
  }
})

const { register, elFormRef, methods } = useForm()

const search = async () => {
  const res = await unref(elFormRef)
    ?.validate()
    ?.catch(() => {})
  if (res) {
    const { getFormData } = methods
    const model = await getFormData()
    emit('search', model)
  }
}

const reset = async () => {
  unref(elFormRef)?.resetFields()
  const { getFormData } = methods
  const model = await getFormData()
  emit('reset', model)
}

const bottonButtonStyle = computed(() => {
  return {
    textAlign: props.buttomPosition
  }
}) as CSSProperties
</script>

<template>
  <Form
    :is-custom="false"
    :label-width="labelWidth"
    hide-required-asterisk
    inline
    :is-col="isCol"
    :schema="newSchema"
    @register="register"
  >
    <template #action>
      <div v-if="layout === 'inline'">
        <ElButton v-if="showSearch" type="primary" @click="search">
          <Icon icon="ep:search" class="mr-5px" />
          {{ t('common.query') }}
        </ElButton>
        <ElButton v-if="showReset" @click="reset">
          <Icon icon="ep:refresh-right" class="mr-5px" />
          {{ t('common.reset') }}
        </ElButton>
      </div>
    </template>
  </Form>

  <template v-if="layout === 'bottom'">
    <div :style="bottonButtonStyle">
      <ElButton v-if="showSearch" type="primary" @click="search">
        <Icon icon="ep:search" class="mr-5px" />
        {{ t('common.query') }}
      </ElButton>
      <ElButton v-if="showReset" @click="reset">
        <Icon icon="ep:refresh-right" class="mr-5px" />
        {{ t('common.reset') }}
      </ElButton>
    </div>
  </template>
</template>

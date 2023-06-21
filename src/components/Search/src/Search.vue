<script setup lang="tsx">
import { Form, FormSchema } from '@/components/Form'
import { PropType, computed, unref, ref, watch, onMounted } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useForm } from '@/hooks/web/useForm'
import { useIcon } from '@/hooks/web/useIcon'
import { findIndex } from '@/utils'
import { cloneDeep } from 'lodash-es'
import { initModel } from '@/components/Form/src/helper'

const { t } = useI18n()

const formExpose = ref<ComponentRef<typeof Form>>()

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
  buttonPosition: propTypes.string
    .validate((v: string) => ['left', 'center', 'right'].includes(v))
    .def('center'),
  showSearch: propTypes.bool.def(true),
  showReset: propTypes.bool.def(true),
  // 是否显示伸缩
  expand: propTypes.bool.def(false),
  // 伸缩的界限字段
  expandField: propTypes.string.def(''),
  inline: propTypes.bool.def(true),
  // 是否去除空值项
  removeNoValueItem: propTypes.bool.def(true),
  model: {
    type: Object as PropType<Recordable>,
    default: () => ({})
  }
})

const emit = defineEmits(['search', 'reset', 'register'])

const visible = ref(true)

// 表单数据
const formModel = ref<Recordable>({})

const newSchema = computed(() => {
  let schema: FormSchema[] = cloneDeep(props.schema)
  if (props.expand && props.expandField && !unref(visible)) {
    const index = findIndex(schema, (v: FormSchema) => v.field === props.expandField)
    schema.map((v, i) => {
      if (i >= index) {
        v.hidden = true
      } else {
        v.hidden = false
      }
      return v
    })
  }
  if (props.layout === 'inline') {
    schema = schema.concat([
      {
        field: 'action',
        formItemProps: {
          labelWidth: '0px',
          slots: {
            default: () => {
              return (
                <div>
                  {props.showSearch ? (
                    <ElButton type="primary" onClick={search} icon={useIcon({ icon: 'ep:search' })}>
                      {t('common.query')}
                    </ElButton>
                  ) : null}
                  {props.showReset ? (
                    <ElButton onClick={reset} icon={useIcon({ icon: 'ep:refresh-right' })}>
                      {t('common.reset')}
                    </ElButton>
                  ) : null}
                  {props.expand ? (
                    <ElButton
                      text
                      onClick={setVisible}
                      icon={useIcon({
                        icon: visible.value ? 'ant-design:up-outlined' : 'ant-design:down-outlined'
                      })}
                    >
                      {t(visible.value ? 'common.shrink' : 'common.expand')}
                    </ElButton>
                  ) : null}
                </div>
              )
            }
          }
        }
      }
    ])
  }
  return schema
})

const { register, methods } = useForm()
const { getElFormExpose, getFormData } = methods

// 监听表单结构化数组，重新生成formModel
watch(
  () => unref(newSchema),
  async (schema = []) => {
    formModel.value = initModel(schema, unref(formModel))
  },
  {
    immediate: true,
    deep: true
  }
)

const filterModel = async () => {
  const model = await getFormData()
  props.removeNoValueItem &&
    Object.keys(model).forEach((key) => {
      if (model[key] === void 0 || model[key] === '') {
        delete model[key]
      }
    })
  return model
}

const search = async () => {
  const elFormExpose = await getElFormExpose()
  await elFormExpose?.validate(async (isValid) => {
    if (isValid) {
      const model = await filterModel()
      emit('search', model)
    }
  })
}

const reset = async () => {
  const elFormExpose = await getElFormExpose()
  elFormExpose?.resetFields()
  const model = await filterModel()
  emit('reset', model)
}

const bottomButtonStyle = computed(() => {
  return {
    textAlign: props.buttonPosition as unknown as 'left' | 'center' | 'right'
  }
})

const setVisible = async () => {
  visible.value = !unref(visible)
}

onMounted(async () => {
  const elFormExpose = await getElFormExpose()
  emit('register', formExpose, elFormExpose)
})
</script>

<template>
  <Form
    ref="formExpose"
    :model="formModel"
    :is-custom="false"
    :label-width="labelWidth"
    hide-required-asterisk
    :inline="inline"
    :is-col="isCol"
    :schema="newSchema"
    @register="register"
  />

  <template v-if="layout === 'bottom'">
    <div :style="bottomButtonStyle">
      <ElButton
        v-if="showSearch"
        type="primary"
        :icon="useIcon({ icon: 'ep:search' })"
        @click="search"
      >
        {{ t('common.query') }}
      </ElButton>
      <ElButton v-if="showReset" :icon="useIcon({ icon: 'ep:refresh-right' })" @click="reset">
        {{ t('common.reset') }}
      </ElButton>
      <ElButton
        v-if="expand"
        :icon="useIcon({ icon: visible ? 'ant-design:up-outlined' : 'ant-design:down-outlined' })"
        text
        @click="setVisible"
      >
        {{ t(visible ? 'common.shrink' : 'common.expand') }}
      </ElButton>
    </div>
  </template>
</template>

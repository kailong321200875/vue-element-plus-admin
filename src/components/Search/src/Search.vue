<script setup lang="tsx">
import { Form, FormSchema } from '@/components/Form'
import { PropType, computed, unref, ref, watch, onMounted } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { useForm } from '@/hooks/web/useForm'
import { findIndex } from '@/utils'
import { cloneDeep } from 'lodash-es'
import { initModel } from '@/components/Form/src/helper'
import ActionButton from './components/ActiconButton.vue'

const formExpose = ref<ComponentRef<typeof Form>>()
const searchRef = ref()

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
  showExpand: propTypes.bool.def(false),
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
  if (props.showExpand && props.expandField && !unref(visible)) {
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
                  <ActionButton
                    showSearch={props.showSearch}
                    showReset={props.showReset}
                    showExpand={props.showExpand}
                    visible={visible.value}
                    onExpand={setVisible}
                    onReset={reset}
                    onSearch={search}
                  />
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

defineExpose({
  getElFormExpose
})
</script>

<template>
  <div ref="searchRef">
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
        <ActionButton
          :show-reset="showReset"
          :show-search="showSearch"
          :show-expand="showExpand"
          @expand="setVisible"
          @reset="reset"
          @search="search"
        />
      </div>
    </template>
  </div>
</template>

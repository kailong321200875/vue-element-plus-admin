<script lang="tsx">
import { PropType, defineComponent, ref, computed, unref, watch, onMounted } from 'vue'
import { ElForm, ElFormItem, ElRow, ElCol, ElTooltip } from 'element-plus'
import { componentMap } from './componentMap'
import { propTypes } from '@/utils/propTypes'
import { getSlot } from '@/utils/tsxHelper'
import {
  setTextPlaceholder,
  setGridProp,
  setComponentProps,
  setItemComponentSlots,
  initModel,
  setFormItemSlots
} from './helper'
import { useRenderSelect } from './components/useRenderSelect'
import { useRenderRadio } from './components/useRenderRadio'
import { useRenderCheckbox } from './components/useRenderCheckbox'
import { useDesign } from '@/hooks/web/useDesign'
import { findIndex } from '@/utils'
import { set } from 'lodash-es'
import { FormProps } from './types'
import { Icon } from '@/components/Icon'
import { FormSchema, FormSetPropsType } from '@/types/form'
import {
  ComponentNameEnum,
  SelectComponentProps,
  SelectOption,
  RadioComponentProps
} from '@/types/components.d'

const { renderSelectOptions } = useRenderSelect()
const { renderRadioOptions } = useRenderRadio()
const { renderCheckboxOptions } = useRenderCheckbox()

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('form')

export default defineComponent({
  name: 'Form',
  props: {
    // 生成Form的布局结构数组
    schema: {
      type: Array as PropType<FormSchema[]>,
      default: () => []
    },
    // 是否需要栅格布局
    isCol: propTypes.bool.def(true),
    // 表单数据对象
    model: {
      type: Object as PropType<Recordable>,
      default: () => ({})
    },
    // 是否自动设置placeholder
    autoSetPlaceholder: propTypes.bool.def(true),
    // 是否自定义内容
    isCustom: propTypes.bool.def(false),
    // 表单label宽度
    labelWidth: propTypes.oneOfType([String, Number]).def('auto')
  },
  emits: ['register'],
  setup(props, { slots, expose, emit }) {
    // element form 实例
    const elFormRef = ref<ComponentRef<typeof ElForm>>()

    // useForm传入的props
    const outsideProps = ref<FormProps>({})

    const mergeProps = ref<FormProps>({})

    const getProps = computed(() => {
      const propsObj = { ...props }
      Object.assign(propsObj, unref(mergeProps))
      return propsObj
    })

    // 表单数据
    const formModel = ref<Recordable>({})

    onMounted(() => {
      emit('register', unref(elFormRef)?.$parent, unref(elFormRef))
    })

    // 对表单赋值
    const setValues = (data: Recordable = {}) => {
      formModel.value = Object.assign(unref(formModel), data)
    }

    const setProps = (props: FormProps = {}) => {
      mergeProps.value = Object.assign(unref(mergeProps), props)
      outsideProps.value = props
    }

    const delSchema = (field: string) => {
      const { schema } = unref(getProps)

      const index = findIndex(schema, (v: FormSchema) => v.field === field)
      if (index > -1) {
        schema.splice(index, 1)
      }
    }

    const addSchema = (formSchema: FormSchema, index?: number) => {
      const { schema } = unref(getProps)
      if (index !== void 0) {
        schema.splice(index, 0, formSchema)
        return
      }
      schema.push(formSchema)
    }

    const setSchema = (schemaProps: FormSetPropsType[]) => {
      const { schema } = unref(getProps)
      for (const v of schema) {
        for (const item of schemaProps) {
          if (v.field === item.field) {
            set(v, item.path, item.value)
          }
        }
      }
    }

    const getElFormRef = (): ComponentRef<typeof ElForm> => {
      return unref(elFormRef) as ComponentRef<typeof ElForm>
    }

    expose({
      setValues,
      formModel,
      setProps,
      delSchema,
      addSchema,
      setSchema,
      getElFormRef
    })

    // 监听表单结构化数组，重新生成formModel
    watch(
      () => unref(getProps).schema,
      (schema = []) => {
        formModel.value = initModel(schema, unref(formModel))
      },
      {
        immediate: true,
        deep: true
      }
    )

    // 渲染包裹标签，是否使用栅格布局
    const renderWrap = () => {
      const { isCol } = unref(getProps)
      const content = isCol ? (
        <ElRow gutter={20}>{renderFormItemWrap()}</ElRow>
      ) : (
        renderFormItemWrap()
      )
      return content
    }

    // 是否要渲染el-col
    const renderFormItemWrap = () => {
      // hidden属性表示隐藏，不做渲染
      const { schema = [], isCol } = unref(getProps)

      return schema
        .filter((v) => !v.hidden)
        .map((item) => {
          // 如果是 Divider 组件，需要自己占用一行
          const isDivider = item.component === 'Divider'
          const Com = componentMap['Divider'] as ReturnType<typeof defineComponent>
          return isDivider ? (
            <Com {...{ contentPosition: 'left', ...item.componentProps }}>{item?.label}</Com>
          ) : isCol ? (
            // 如果需要栅格，需要包裹 ElCol
            <ElCol {...setGridProp(item.colProps)}>{renderFormItem(item)}</ElCol>
          ) : (
            renderFormItem(item)
          )
        })
    }

    // 渲染formItem
    const renderFormItem = (item: FormSchema) => {
      // 单独给只有options属性的组件做判断
      // const notRenderOptions = ['SelectV2', 'Cascader', 'Transfer']
      const componentSlots = (item?.componentProps as any)?.slots || {}
      const slotsMap: Recordable = {
        ...setItemComponentSlots(componentSlots)
      }
      // 如果是select组件，并且没有自定义模板，自动渲染options
      if (item.component === ComponentNameEnum.SELECT) {
        slotsMap.default = !componentSlots.default
          ? () => renderSelectOptions(item)
          : () => {
              return componentSlots.default(
                unref((item?.componentProps as SelectComponentProps)?.options)
              )
            }
      }

      // 虚拟列表
      if (item.component === ComponentNameEnum.SELECT_V2 && componentSlots.default) {
        slotsMap.default = ({ item }: any) => {
          return componentSlots.default(item)
        }
      }
      // if (
      //   item?.component !== 'SelectV2' &&
      //   item?.component !== 'Cascader' &&
      //   item?.componentProps?.options
      // ) {
      //   slotsMap.default = () => renderOptions(item)
      // }

      // const formItemSlots: Recordable = setFormItemSlots(slots, item.field)
      // 如果有 labelMessage，自动使用插槽渲染
      // if (item?.labelMessage) {
      //   formItemSlots.label = () => {
      //     return (
      //       <>
      //         <span>{item.label}</span>
      //         <ElTooltip placement="right" raw-content>
      //           {{
      //             content: () => <span v-html={item.labelMessage}></span>,
      //             default: () => (
      //               <Icon
      //                 icon="ep:warning"
      //                 size={16}
      //                 color="var(--el-color-primary)"
      //                 class="ml-2px relative top-1px"
      //               ></Icon>
      //             )
      //           }}
      //         </ElTooltip>
      //       </>
      //     )
      //   }
      // }
      return (
        <ElFormItem {...(item.formItemProps || {})} prop={item.field} label={item.label || ''}>
          {{
            default: () => {
              if (slots[item.field]) {
                return getSlot(slots, item.field, formModel.value)
              } else {
                const Com = componentMap[item.component as string] as ReturnType<
                  typeof defineComponent
                >

                const { autoSetPlaceholder } = unref(getProps)

                // 需要特殊处理的组件
                const specialComponents = [ComponentNameEnum.RADIO]

                if (specialComponents.findIndex((v) => v === item.component) !== -1) {
                  switch (item.component) {
                    case ComponentNameEnum.RADIO:
                      const componentProps = item.componentProps as RadioComponentProps
                      const valueAlias = componentProps?.props?.value || 'value'
                      const labelAlias = componentProps?.props?.label || 'label'
                      const disabledAlias = componentProps?.props?.disabled || 'disabled'

                      return componentProps?.options?.map((v) => {
                        return (
                          <Com
                            vModel={formModel.value[item.field]}
                            {...setComponentProps(item)}
                            label={v[valueAlias]}
                            disabled={v[disabledAlias]}
                          >
                            {v[labelAlias]}
                          </Com>
                        )
                      })
                  }
                }

                return (
                  <Com
                    vModel={formModel.value[item.field]}
                    {...(autoSetPlaceholder && setTextPlaceholder(item))}
                    {...setComponentProps(item)}
                    style={item.componentProps?.style}
                  >
                    {{ ...slotsMap }}
                  </Com>
                )
              }
            }
          }}
        </ElFormItem>
      )
    }

    // 渲染options
    // const renderOptions = (item: FormSchema) => {
    //   switch (item.component) {
    //     case ComponentNameEnum.SELECT:
    //       return renderSelectOptions(item)
    //     case ComponentNameEnum.RADIO:
    //     case 'RadioButton':
    //       return renderRadioOptions(item)
    //     case 'Checkbox':
    //     case 'CheckboxButton':
    //       return renderCheckboxOptions(item)
    //     default:
    //       break
    //   }
    // }

    // 过滤传入Form组件的属性
    const getFormBindValue = () => {
      // 避免在标签上出现多余的属性
      const delKeys = ['schema', 'isCol', 'autoSetPlaceholder', 'isCustom', 'model']
      const props = { ...unref(getProps) }
      for (const key in props) {
        if (delKeys.indexOf(key) !== -1) {
          delete props[key]
        }
      }
      return props
    }

    return () => (
      <ElForm
        ref={elFormRef}
        {...getFormBindValue()}
        model={props.isCustom ? props.model : formModel}
        class={prefixCls}
      >
        {{
          // 如果需要自定义，就什么都不渲染，而是提供默认插槽
          default: () => {
            const { isCustom } = unref(getProps)
            return isCustom ? getSlot(slots, 'default') : renderWrap()
          }
        }}
      </ElForm>
    )
  }
})
</script>

<style lang="less" scoped>
.@{elNamespace}-form.@{namespace}-form .@{elNamespace}-row {
  margin-right: 0 !important;
  margin-left: 0 !important;
}
</style>

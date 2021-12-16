<script lang="tsx">
import { PropType, defineComponent, ref, computed, unref } from 'vue'
import { ElForm, ElFormItem, ElRow, ElCol, ElOption, ElOptionGroup } from 'element-plus'
import { componentMap } from './componentMap'
import { propTypes } from '@/utils/propTypes'
import { getSlot } from '@/utils/tsxHelper'
import { setTextPlaceholder, setGridProp, setComponentProps, setItemComponentSlots } from './helper'

export default defineComponent({
  name: 'VForm',
  props: {
    // 生成Form的布局结构数组
    schema: {
      type: Array as PropType<VFormSchema[]>,
      required: true,
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
    labelWidth: propTypes.oneOfType([String, Number]).def(130)
  },
  setup(props, { slots }) {
    const formRef = ref<ComponentRef<typeof ElForm>>()
    const getProps = computed(() => props)
    const { schema, isCol, isCustom, autoSetPlaceholder } = unref(getProps)

    // 渲染包裹标签，是否使用栅格布局
    function renderWrap() {
      const content = isCol ? (
        <ElRow gutter={20}>{renderFormItemWrap()}</ElRow>
      ) : (
        renderFormItemWrap()
      )
      return content
    }

    // 是否要渲染el-col
    function renderFormItemWrap() {
      // hidden属性表示隐藏，不做渲染
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
    function renderFormItem(item: VFormSchema) {
      return (
        <ElFormItem {...(item.formItemProps || {})} prop={item.field} label={item.label}>
          {() => {
            const Com = componentMap[item.component as string] as ReturnType<typeof defineComponent>
            return (
              <Com
                {...(autoSetPlaceholder && setTextPlaceholder(item))}
                {...setComponentProps(item.componentProps)}
              >
                {{
                  default: () => (item.options ? renderOptions(item) : null),
                  ...setItemComponentSlots(slots, item?.componentProps?.slots, item.field)
                }}
              </Com>
            )
          }}
        </ElFormItem>
      )
    }

    // 渲染options
    function renderOptions(item: VFormSchema) {
      switch (item.component) {
        case 'Select':
          return renderSelectOptions(item)
        default:
          break
      }
    }

    // 渲染 select options
    function renderSelectOptions(item: VFormSchema) {
      // 如果有别名，就取别名
      const labelAlias = item.optionsField?.labelField
      return item.options?.map((option) => {
        if (option?.options?.length) {
          return (
            <ElOptionGroup label={labelAlias ? option[labelAlias] : option['label']}>
              {() => {
                return option?.options?.map((v) => {
                  return renderSelectOptionItem(item, v)
                })
              }}
            </ElOptionGroup>
          )
        } else {
          return renderSelectOptionItem(item, option)
        }
      })
    }

    // 渲染 select option item
    function renderSelectOptionItem(item: VFormSchema, option: FormOptions) {
      // 如果有别名，就取别名
      const labelAlias = item.optionsField?.labelField
      const valueAlias = item.optionsField?.valueField
      return (
        <ElOption
          label={labelAlias ? option[labelAlias] : option['label']}
          value={valueAlias ? option[valueAlias] : option['value']}
        >
          {{
            default: () =>
              // option 插槽名规则，{field}-option
              item.optionsSlot ? getSlot(slots, `${item.field}-option`, option) : null
          }}
        </ElOption>
      )
    }

    // 过滤传入Form组件的属性
    function getFormBindValue() {
      // 避免在标签上出现多余的属性
      const delKeys = ['schema', 'isCol', 'autoSetPlaceholder', 'isCustom']
      const props = { ...unref(getProps) }
      for (const key in props) {
        if (delKeys.indexOf(key) !== -1) {
          delete props[key]
        }
      }
      return props
    }

    return () => (
      <ElForm ref={formRef} {...getFormBindValue()}>
        {{
          // 如果需要自定义，就什么都不渲染，而是提供默认插槽
          default: () => (isCustom ? getSlot(slots, 'default') : renderWrap())
        }}
      </ElForm>
    )
  }
})
</script>

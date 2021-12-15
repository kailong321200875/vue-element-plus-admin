<script lang="tsx">
import { PropType, defineComponent, ref, computed, unref, watch } from 'vue'
import { ElForm, ElFormItem, ElRow, ElCol } from 'element-plus'
import { COMPONENT_MAP } from './componentMap'
import { propTypes } from '@/utils/propTypes'
import { getSlot } from '@/utils/tsxHelper'
import { setTextPlaceholder } from './helper'

export default defineComponent({
  name: 'VForm',
  props: {
    // 生成Form的布局结构数组
    schema: {
      type: Array as PropType<VFormSchema[]>,
      require: true,
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
    isCustom: propTypes.bool.def(false)
  },
  setup(props, { slots }) {
    const formRef = ref<ComponentRef<typeof ElForm>>()
    const getProps = computed(() => props)
    const { schema, isCol, isCustom, autoSetPlaceholder } = unref(getProps)
    const test = ref('')

    watch(
      () => test.value,
      (val) => {
        console.log(val)
      }
    )

    // 渲染包裹标签，是否使用栅格布局
    function renderWrap() {
      const content = isCol ? (
        <ElRow gutter={20}>
          <ElCol>{renderFormItem()}</ElCol>
        </ElRow>
      ) : (
        renderFormItem()
      )
      console.log(content)
      return content
    }

    // 渲染formItem
    function renderFormItem() {
      // hidden属性表示隐藏
      return schema
        .filter((v) => !v.hidden)
        .map((item) => {
          return (
            <ElFormItem {...(item.formItemProps || {})} prop={item.field} label={item.label}>
              {() => {
                const Com = COMPONENT_MAP[item.component as string] as ReturnType<
                  typeof defineComponent
                >
                return (
                  <Com v-model={test.value} {...(autoSetPlaceholder && setTextPlaceholder(item))}>
                    {item.options ? renderOptions() : null}
                  </Com>
                )
              }}
            </ElFormItem>
          )
        })
    }

    // 渲染options
    function renderOptions() {
      // const optionsMap = ['Radio', 'Checkbox', 'Select']
      return <div>2222</div>
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
          default: () => (isCustom ? getSlot(slots, 'default') : renderWrap())
        }}
      </ElForm>
    )
  }
})
</script>

<style lang="less" scoped></style>

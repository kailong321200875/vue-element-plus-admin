<script lang="tsx">
import { PropType, defineComponent, onMounted, ref, unref } from 'vue'
import { ElForm } from 'element-plus'
// import { COMPONENT_MAP } from './componentMap'
import { propTypes } from '@/utils/propTypes'

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
  setup() {
    const formRef = ref<ComponentRef<typeof ElForm>>()
    onMounted(() => {
      console.log(unref(formRef)?.clearValidate)
    })

    // function renderWrap() {}

    // function renderFormItem() {}

    return () => <ElForm ref={formRef}></ElForm>
  }
})
</script>

<style lang="less" scoped></style>

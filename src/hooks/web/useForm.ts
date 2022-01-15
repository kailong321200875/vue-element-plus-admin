import type { Form, FormExpose } from '@/components/Form'
import type { ElForm } from 'element-plus'
import { ref, unref, nextTick } from 'vue'

export const useForm = () => {
  // From实例
  const formRef = ref<typeof Form & FormExpose>()

  // ElForm实例
  const elFormRef = ref<ComponentRef<typeof ElForm>>()

  /**
   * @param ref Form实例
   * @param elRef ElForm实例
   */
  const register = (ref: typeof Form & FormExpose, elRef: ComponentRef<typeof ElForm>) => {
    formRef.value = ref
    elFormRef.value = elRef
  }

  const getForm = async () => {
    const form = unref(formRef)
    if (!form) {
      console.error('The form is not registered. Please use the register method to register')
    }
    await nextTick()
    return form
  }

  // 一些内置的方法
  const methods: {
    setValues: (data: FormSetValuesType[]) => void
    getFormData: () => Promise<Recordable | undefined>
    setSchema: (schemaProps: FormSetValuesType[]) => void
    addSchema: (formSchema: FormSchema, index?: number) => void
    delSchema: (index: number) => void
  } = {
    /**
     * @param field 字段
     * @param value 值
     */
    setValues: async (data: FormSetValuesType[]) => {
      const form = await getForm()
      form?.setValues(data)
    },

    /**
     * @param schemaProps 需要设置的schemaProps
     */
    setSchema: async (schemaProps: FormSetPropsType[]) => {
      const form = await getForm()
      form?.setSchema(schemaProps)
    },

    /**
     * @param formSchema 需要新增数据
     * @param index 在哪里新增
     */
    addSchema: async (formSchema: FormSchema, index?: number) => {
      const form = await getForm()
      form?.addSchema(formSchema, index)
    },

    /**
     * @param index 删除哪个数据
     */
    delSchema: async (index: number) => {
      const form = await getForm()
      form?.delSchema(index)
    },

    /**
     * @returns form data
     */
    getFormData: async (): Promise<Recordable | undefined> => {
      const form = await getForm()
      return form?.formModel || undefined
    }
  }

  return {
    register,
    elFormRef,
    methods
  }
}

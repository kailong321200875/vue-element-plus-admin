<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'
import { ref } from 'vue'
import { Dialog } from '@/components/Dialog'
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { reactive, computed } from 'vue'
import { useValidator } from '@/hooks/web/useValidator'
import { FormSchema } from '@/components/Form'
import { useDesign } from '@/hooks/web/useDesign'
import { useLockStore } from '@/store/modules/lock'

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('lock-dialog')

const { required } = useValidator()

const { t } = useI18n()

const lockStore = useLockStore()

const props = defineProps({
  modelValue: {
    type: Boolean
  }
})

const emit = defineEmits(['update:modelValue'])

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => {
    console.log('set: ', val)
    emit('update:modelValue', val)
  }
})

const dialogTitle = ref(t('lock.lockScreen'))

const rules = reactive({
  password: [required()]
})

const schema: FormSchema[] = reactive([
  {
    label: t('lock.lockPassword'),
    field: 'password',
    component: 'Input',
    componentProps: {
      type: 'password',
      showPassword: true
    }
  }
])

const { formRegister, formMethods } = useForm()

const { getFormData, getElFormExpose } = formMethods

const handleLock = async () => {
  const formExpose = await getElFormExpose()
  formExpose?.validate(async (valid) => {
    if (valid) {
      dialogVisible.value = false
      const formData = await getFormData()
      lockStore.setLockInfo({
        isLock: true,
        ...formData
      })
    }
  })
}
</script>

<template>
  <Dialog
    v-model="dialogVisible"
    width="500px"
    max-height="170px"
    :class="prefixCls"
    :title="dialogTitle"
  >
    <div class="flex flex-col items-center">
      <img src="@/assets/imgs/avatar.jpg" alt="" class="w-70px h-70px rounded-[50%]" />
      <span class="text-14px my-10px text-[var(--top-header-text-color)]">Archer</span>
    </div>
    <Form :is-col="false" :schema="schema" :rules="rules" @register="formRegister" />
    <template #footer>
      <BaseButton type="primary" @click="handleLock">{{ t('lock.lock') }}</BaseButton>
    </template>
  </Dialog>
</template>

<style lang="less" scoped>
:global(.v-lock-dialog) {
  @media (width <= 767px) {
    max-width: calc(100vw - 16px);
  }
}
</style>

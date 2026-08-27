import { computed, ref, toRaw, type Ref } from 'vue'

export type FormModel = object
export type FormField<Model extends FormModel> = Extract<keyof Model, string>
export type FormValidatorResult = string | string[] | null | undefined

export type FormValidator<Value = unknown, Model extends FormModel = FormModel> = (
  value: Value,
  values: Readonly<Model>
) => FormValidatorResult | Promise<FormValidatorResult>

export type FormRules<Model extends FormModel> = Partial<{
  [Field in FormField<Model>]:
    FormValidator<Model[Field], Model> | FormValidator<Model[Field], Model>[]
}>

export type FormErrors<Model extends FormModel> = Partial<Record<FormField<Model>, string[]>>

export type FormErrorInput<Model extends FormModel> = Partial<
  Record<FormField<Model>, string | string[] | null | undefined>
>

export interface UseFormOptions<Model extends FormModel> {
  initialValues: Model
  rules?: FormRules<Model>
}

type FieldInput<Model extends FormModel> = FormField<Model> | readonly FormField<Model>[]

const toArray = <Value>(value: Value | readonly Value[]) =>
  (Array.isArray(value) ? value : [value]) as readonly Value[]

const clone = <Model extends FormModel>(values: Model) => ({ ...values }) as Model

const message = (value: string | (() => string)) => (typeof value === 'function' ? value() : value)

export const required = (
  errorMessage: string | (() => string) = 'This field is required'
): FormValidator => {
  return (value) => {
    const empty =
      value == null ||
      (typeof value === 'string' && value.trim() === '') ||
      (Array.isArray(value) && value.length === 0)
    return empty ? message(errorMessage) : undefined
  }
}

export const useForm = <Model extends FormModel>(options: UseFormOptions<Model>) => {
  let initialValues = clone(options.initialValues)
  const values = ref(clone(initialValues)) as Ref<Model>
  const errors = ref<FormErrors<Model>>({}) as Ref<FormErrors<Model>>
  const touchedFields = ref<FormField<Model>[]>([]) as Ref<FormField<Model>[]>
  const validating = ref(false)
  const submitting = ref(false)
  const submitError = ref<unknown>(null)
  const submitCount = ref(0)

  let activeValidations = 0
  const validationVersions = new Map<FormField<Model>, number>()

  const dirtyFields = computed(() => {
    const fields = new Set([
      ...Object.keys(initialValues),
      ...Object.keys(values.value)
    ] as FormField<Model>[])
    return [...fields].filter(
      (field) => !Object.is(toRaw(values.value[field]), initialValues[field])
    )
  })
  const dirty = computed(() => dirtyFields.value.length > 0)
  const hasErrors = computed(() =>
    (Object.values(errors.value) as Array<string[] | undefined>).some(
      (messages) => messages && messages.length > 0
    )
  )

  const setValue = <Field extends FormField<Model>>(field: Field, value: Model[Field]) => {
    values.value[field] = value
  }

  const setValues = (nextValues: Partial<Model>) => {
    Object.assign(values.value, nextValues)
  }

  const touch = (fields: FieldInput<Model>) => {
    touchedFields.value = [
      ...new Set([...touchedFields.value, ...toArray(fields)])
    ] as FormField<Model>[]
  }

  const clearErrors = (fields?: FieldInput<Model>) => {
    if (!fields) {
      errors.value = {}
      return
    }

    const nextErrors = { ...errors.value }
    toArray(fields).forEach((field) => delete nextErrors[field])
    errors.value = nextErrors
  }

  const setErrors = (nextErrors: FormErrorInput<Model>) => {
    const merged = { ...errors.value }
    for (const field of Object.keys(nextErrors) as FormField<Model>[]) {
      const fieldMessages = nextErrors[field] as string | string[] | null | undefined
      if (fieldMessages == null || fieldMessages.length === 0) delete merged[field]
      else merged[field] = typeof fieldMessages === 'string' ? [fieldMessages] : fieldMessages
    }
    errors.value = merged
  }

  const validateField = async (field: FormField<Model>) => {
    touch(field)
    const configured = options.rules?.[field]
    const validators = configured
      ? (toArray(configured) as readonly FormValidator<Model[typeof field], Model>[])
      : []
    const version = (validationVersions.get(field) ?? 0) + 1
    validationVersions.set(field, version)
    activeValidations += 1
    validating.value = true

    const fieldErrors: string[] = []
    try {
      for (const validator of validators) {
        try {
          const result = await validator(values.value[field], values.value)
          if (result) fieldErrors.push(...toArray(result))
        } catch (error) {
          fieldErrors.push(error instanceof Error ? error.message : String(error))
        }
      }

      if (validationVersions.get(field) === version) {
        setErrors({ [field]: fieldErrors } as FormErrorInput<Model>)
      }
      return fieldErrors.length === 0
    } finally {
      activeValidations -= 1
      validating.value = activeValidations > 0
    }
  }

  const validate = async () => {
    const fields = Object.keys(options.rules ?? {}) as FormField<Model>[]
    const results = await Promise.all(fields.map(validateField))
    return results.every(Boolean)
  }

  const submit = async <Result>(handler: (formValues: Model) => Promise<Result> | Result) => {
    if (submitting.value) return undefined

    submitting.value = true
    submitError.value = null
    submitCount.value += 1
    try {
      if (!(await validate())) return undefined
      return await handler(clone(values.value))
    } catch (error) {
      submitError.value = error
      throw error
    } finally {
      submitting.value = false
    }
  }

  const reset = (nextValues?: Model) => {
    if (nextValues) initialValues = clone(nextValues)
    values.value = clone(initialValues)
    errors.value = {}
    touchedFields.value = []
    submitError.value = null
    validationVersions.clear()
  }

  return {
    state: {
      values,
      errors,
      touchedFields,
      dirtyFields,
      dirty,
      hasErrors,
      validating,
      submitting,
      submitError,
      submitCount
    },
    actions: {
      setValue,
      setValues,
      setErrors,
      clearErrors,
      touch,
      validateField,
      validate,
      submit,
      reset
    }
  }
}

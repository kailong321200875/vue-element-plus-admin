import router from '@/router'

export const hasPermi = (value: string) => {
  const permission = (router.currentRoute.value.meta.permission || []) as string[]
  if (!value) {
    throw new Error('Permission value is required')
  }
  if (permission.includes(value)) {
    return true
  }
  return false
}

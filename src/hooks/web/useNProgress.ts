import { watch, ref, nextTick, unref } from 'vue'
import type { NProgressOptions } from 'nprogress'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useCssVar } from '@vueuse/core'

const primaryColor = useCssVar('--el-color-primary', document.documentElement)

export function useNProgress() {
  const isLoading = ref(false)
  NProgress.configure({ showSpinner: false } as NProgressOptions)

  watch(
    () => isLoading.value,
    async (loading: boolean) => {
      loading ? NProgress.start() : NProgress.done()
      await nextTick()
      const bar = document.getElementById('nprogress')?.getElementsByClassName('bar')[0] as ElRef
      if (bar) {
        bar.style.background = unref(primaryColor.value)
      }
    }
  )

  function toggle() {
    isLoading.value = !isLoading.value
  }

  return {
    toggle
  }
}

import { ref } from 'vue'

const useClipboard = () => {
  const copied = ref(false)
  const text = ref('')
  const isSupported = ref(false)

  if (!navigator.clipboard && !document.execCommand) {
    isSupported.value = false
  } else {
    isSupported.value = true
  }

  const copy = (str: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(str).then(() => {
        text.value = str
        copied.value = true
        resetCopied()
      })
      return
    }
    const input = document.createElement('input')
    input.setAttribute('readonly', 'readonly')
    input.setAttribute('value', str)
    document.body.appendChild(input)
    input.select()
    input.setSelectionRange(0, 9999)
    if (document.execCommand('copy')) {
      text.value = str
      document.execCommand('copy')
      copied.value = true
      resetCopied()
    }
    document.body.removeChild(input)
  }

  const resetCopied = () => {
    setTimeout(() => {
      copied.value = false
    }, 1500)
  }

  return { copy, text, copied, isSupported }
}

export { useClipboard }

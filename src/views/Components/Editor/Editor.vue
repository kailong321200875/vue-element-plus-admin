<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Editor, EditorExpose } from '@/components/Editor'
import { useI18n } from '@/hooks/web/useI18n'
import { IDomEditor } from '@wangeditor/editor'
import { ref, onMounted, unref } from 'vue'

const { t } = useI18n()

const change = (editor: IDomEditor) => {
  console.log(editor.getHtml())
}

const editorRef = ref<typeof Editor & EditorExpose>()

const defaultHtml = ref('')

onMounted(async () => {
  const editor = await unref(editorRef)?.getEditorRef()
  console.log(editor)
})

setTimeout(() => {
  defaultHtml.value = '<p>hello <strong>world</strong></p>'
}, 3000)
</script>

<template>
  <ContentWrap :title="t('richText.richText')" :message="t('richText.richTextDes')">
    <Editor v-model="defaultHtml" ref="editorRef" @change="change" />
  </ContentWrap>
</template>

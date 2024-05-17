<script setup lang="tsx">
import { CodeEditor } from '@/components/CodeEditor'
import { useI18n } from '@/hooks/web/useI18n'
import { ContentWrap } from '@/components/ContentWrap'
import { ref } from 'vue'
import { BaseButton } from '@/components/Button'
import { ElDivider } from 'element-plus'
const content = ref(
  'public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}'
)
const { t } = useI18n()

const MonacoEditRef = ref<InstanceType<typeof CodeEditor>>()
</script>
<template>
  <ContentWrap :title="t('richText.codeEditor')" :message="t('richText.codeEditorDes')">
    <BaseButton @click="console.log(content)">控制台打印内容</BaseButton>
    <ElDivider />
    <div class="edit-container h-60vh">
      <CodeEditor ref="MonacoEditRef" v-model="content" language="java" />
    </div>
  </ContentWrap>
</template>

<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useClipboard } from '@/hooks/web/useClipboard'
import { ElButton, ElInput } from 'element-plus'
import { ref } from 'vue'

const { copy, copied, text, isSupported } = useClipboard()

const source = ref('')
</script>

<template>
  <ContentWrap title="useClipboard">
    <ElInput v-model="source" placeholder="请输入要复制的内容" />
    <div v-if="isSupported">
      <ElButton @click="copy(source)" type="primary" class="mt-20px">
        <span v-if="!copied">复制</span>
        <span v-else>已复制</span>
      </ElButton>
      <p>
        当前已复制: <code>{{ text || 'none' }}</code>
      </p>
    </div>
    <p v-else> 你的浏览器不支持 Clipboard API </p>
  </ContentWrap>
</template>

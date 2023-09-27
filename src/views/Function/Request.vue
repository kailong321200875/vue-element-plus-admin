<script lang="ts" setup>
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton } from 'element-plus'
import { request1, request2, request3, request4, request5 } from '@/api/request'
import { ref } from 'vue'
import request from '@/config/axios'

const { t } = useI18n()

const pending = ref<Set<string>>(new Set())

const getRequest1 = async () => {
  if (pending.value.has('/request/1')) {
    return
  }
  try {
    pending.value.add('/request/1')
    const res = await request1()
    console.log('【res】：', res)
  } catch (error) {
    console.log('【error】：', error)
  } finally {
    pending.value.delete('/request/1')
  }
}

const getRequest2 = async () => {
  if (pending.value.has('/request/2')) {
    return
  }
  try {
    pending.value.add('/request/2')
    const res = await request2()
    console.log('【res】：', res)
  } catch (error) {
    console.log('【error】：', error)
  } finally {
    pending.value.delete('/request/2')
  }
}

const getRequest3 = async () => {
  if (pending.value.has('/request/3')) {
    return
  }
  try {
    pending.value.add('/request/3')
    const res = await request3()
    console.log('【res】：', res)
  } catch (error) {
    console.log('【error】：', error)
  } finally {
    pending.value.delete('/request/3')
  }
}

const getRequest4 = async () => {
  if (pending.value.has('/request/4')) {
    return
  }
  try {
    pending.value.add('/request/4')
    const res = await request4()
    console.log('【res】：', res)
  } catch (error) {
    console.log('【error】：', error)
  } finally {
    pending.value.delete('/request/4')
  }
}

const getRequest5 = async () => {
  if (pending.value.has('/request/5')) {
    return
  }
  try {
    pending.value.add('/request/5')
    const res = await request5()
    console.log('【res】：', res)
  } catch (error) {
    console.log('【error】：', error)
  } finally {
    pending.value.delete('/request/5')
  }
}

const getAll = () => {
  getRequest1()
  getRequest2()
  getRequest3()
  getRequest4()
  getRequest5()
}

const cancelAll = () => {
  request.cancelAllRequest()
  pending.value.clear()
}

// set转数组
const setToArray = (set: Set<string>) => {
  const arr: string[] = []
  set.forEach((item) => {
    arr.push(item)
  })
  return arr
}

const clickRequest1 = () => {
  if (pending.value.has('/request/1')) {
    request.cancelRequest('/request/1')
    pending.value.delete('/request/1')
    return
  }
  getRequest1()
}

const clickRequest2 = () => {
  if (pending.value.has('/request/2')) {
    request.cancelRequest('/request/2')
    pending.value.delete('/request/2')
    return
  }
  getRequest2()
}

const clickRequest3 = () => {
  if (pending.value.has('/request/3')) {
    request.cancelRequest('/request/3')
    pending.value.delete('/request/3')
    return
  }
  getRequest3()
}

const clickRequest4 = () => {
  if (pending.value.has('/request/4')) {
    request.cancelRequest('/request/4')
    pending.value.delete('/request/4')
    return
  }
  getRequest4()
}

const clickRequest5 = () => {
  if (pending.value.has('/request/5')) {
    request.cancelRequest('/request/5')
    pending.value.delete('/request/5')
    return
  }
  getRequest5()
}
</script>

<template>
  <ContentWrap :title="t('router.request')">
    <p>正在请求的接口：{{ setToArray(pending) }}</p>
    <ElButton type="primary" @click="clickRequest1">请求/取消request1</ElButton>
    <ElButton type="primary" @click="clickRequest2">请求/取消request2</ElButton>
    <ElButton type="primary" @click="clickRequest3">请求/取消request3</ElButton>
    <ElButton type="primary" @click="clickRequest4">请求/取消request4</ElButton>
    <ElButton type="primary" @click="clickRequest5">请求/取消request5</ElButton>
    <ElButton type="primary" @click="getAll">发送五个请求</ElButton>
    <ElButton type="primary" @click="cancelAll">关闭所有请求</ElButton>
  </ContentWrap>
</template>

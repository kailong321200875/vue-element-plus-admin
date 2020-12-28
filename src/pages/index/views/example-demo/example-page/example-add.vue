<template>
  <info-write @success="success" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InfoWrite from './components/InfoWrite.vue'
import vueBus from '@/vue-bus'

export default defineComponent({
  // name: 'ExampleAdd',
  components: {
    InfoWrite
  },
  setup() {
    // 成功之后的回调
    function success(type: string) {
      // 由于使用的是页面跳转，所以只能通过vueBus去进行通信
      vueBus.$emit('success', type)
    }

    return {
      success
    }
  }
})
</script>

<style>
</style>

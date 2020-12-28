<template>
  <info-write :id="id" @success="success" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InfoWrite from './components/InfoWrite.vue'
import vueBus from '@/vue-bus'
import { useRoute } from 'vue-router'

export default defineComponent({
  // name: 'ExampleEdit',
  components: {
    InfoWrite
  },
  setup() {
    const { query } = useRoute()

    // 成功之后的回调
    function success(type: string) {
      // 由于使用的是页面跳转，所以只能通过vueBus去进行通信
      vueBus.$emit('success', type)
    }

    return {
      success,
      id: query.id
    }
  }
})
</script>

<style>
</style>

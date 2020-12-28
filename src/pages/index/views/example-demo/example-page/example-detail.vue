<template>
  <detail :id="id" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Detail from './components/Detail.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  // name: 'ExampleDetail',
  components: {
    Detail
  },
  setup() {
    const { query } = useRoute()

    return {
      id: query.id
    }
  }
})
</script>

<style>
</style>

<template>
  <div>
    <a-alert message="封装 antdv 的 Form 组件，实现查询、重置等功能，并提供了三种布局风格。" style="margin-bottom: 20px;" />
    <a-alert message="经典风格" style="margin-bottom: 20px;margin-top: 20px;" />
    <div class="searh">
      <search
        :data="classicData"
        @search-submit="searchSubmit1"
        @reset-submit="resetSubmit1"
      />
      <div>
        查询/重置后的数据：{{ formData1 }}
      </div>
    </div>

    <a-alert message="底部操作按钮风格" style="margin-bottom: 20px;margin-top: 20px;" />
    <div class="searh">
      <search
        layout="bottom"
        :data="classicData"
        @search-submit="searchSubmit2"
        @reset-submit="resetSubmit2"
      />
      <div>
        查询/重置后的数据：{{ formData2 }}
      </div>
    </div>

    <a-alert message="右侧操作按钮风格" style="margin-bottom: 20px;margin-top: 20px;" />
    <div class="searh">
      <search
        layout="right"
        :data="classicData"
        @search-submit="searchSubmit3"
        @reset-submit="resetSubmit3"
      />
      <div>
        查询/重置后的数据：{{ formData3 }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Search from '_c/Search/index.vue'
import { classicData } from './classic-data'
export default defineComponent({
  // name: 'SearchDemo',
  components: {
    Search
  },
  setup() {
    const formData1 = ref<{[key: string]: any} | null>(null)
    const formData2 = ref<{[key: string]: any} | null>(null)
    const formData3 = ref<{[key: string]: any} | null>(null)

    function searchSubmit1(data: any): void {
      formData1.value = data
    }

    function resetSubmit1(data: any): void {
      formData1.value = data
    }

    function searchSubmit2(data: any): void {
      formData2.value = data
    }

    function resetSubmit2(data: any): void {
      formData2.value = data
    }

    function searchSubmit3(data: any): void {
      formData3.value = data
    }

    function resetSubmit3(data: any): void {
      formData3.value = data
    }

    return {
      classicData,
      formData1, searchSubmit1, resetSubmit1,
      formData2, searchSubmit2, resetSubmit2,
      formData3, searchSubmit3, resetSubmit3
    }
  }
})
</script>

<style lang="less" scoped>
.searh {
  background: #fff;
  padding: 20px;
}
</style>

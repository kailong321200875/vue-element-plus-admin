<template>
  <div>
    <a-alert message="基于 vue-count-to 进行改造，支持所有 vue-count-to 参数。" style="margin-bottom: 20px;" />

    <div class="count-to">
      <count-to
        ref="countRef"
        :start-val="startVal"
        :end-val="endVal"
        :duration="duration"
        :decimals="decimals"
        :separator="separator"
        :prefix="prefix"
        :suffix="suffix"
        :autoplay="autoplay"
        class="count-to__item"
      />
    </div>
    <div class="action">
      <a-row :gutter="20">
        <a-col :span="8">
          <div class="action__item">
            <span>startVal：</span><a-input-number v-model:value="startVal" :min="0" />
          </div>
        </a-col>
        <a-col :span="8">
          <div class="action__item">
            <span>endVal：</span><a-input-number v-model:value="endVal" :min="1" />
          </div>
        </a-col>
        <a-col :span="8">
          <div class="action__item">
            <span>duration：</span><a-input-number v-model:value="duration" :min="1000" />
          </div>
        </a-col>
        <a-col :span="8">
          <div class="action__item">
            <span>separator：</span><a-input v-model:value="separator" />
          </div>
        </a-col>
        <a-col :span="8">
          <div class="action__item">
            <span>prefix：</span><a-input v-model:value="prefix" />
          </div>
        </a-col>
        <a-col :span="8">
          <div class="action__item">
            <span>suffix：</span><a-input v-model:value="suffix" />
          </div>
        </a-col>
        <a-col :span="24">
          <div style="text-align: center;margin-top: 20px;">
            <a-button type="primary" @click="start">start</a-button>
            <a-button style="margin-left: 10px;" @click="pauseResume">pause/resume</a-button>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import CountTo from '_c/CountTo/index.vue'
export default defineComponent({
  // name: 'CountToDemo',
  components: {
    CountTo
  },
  setup() {
    const countRef = ref<HTMLElement | null>(null)
    const startVal = ref<number>(0)
    const endVal = ref<number>(1314512)
    const duration = ref<number>(3000)
    const decimals = ref<number>(0)
    const separator = ref<string>(',')
    const prefix = ref<string>('¥ ')
    const suffix = ref<string>(' rmb')
    const autoplay = ref<boolean>(false)

    function start(): void {
      (unref(countRef) as any).start()
    }

    function pauseResume(): void {
      (unref(countRef) as any).pauseResume()
    }

    return {
      countRef,
      startVal,
      endVal,
      duration,
      decimals,
      separator,
      prefix,
      suffix,
      autoplay,
      start,
      pauseResume
    }
  }
})
</script>

<style lang="less" scoped>
.count-to {
  text-align: center;
  margin-top: 40px;
  &__item {
    font-size: 80px;
    color: #f6416c;
    font-weight: bold;
  }
}
.action {
  margin-top: 20px;
  &__item {
    padding: 0 15px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    &>span {
      width: 100px;
      text-align: center;
    }
    @{deep}(.ant-input-number) {
      width: 100%;
    }
  }
}
</style>

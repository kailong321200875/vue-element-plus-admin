<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="基于 vue-count-to 进行改造，支持所有 vue-count-to 参数。"
      type="info"
      style="margin-bottom: 20px"
    />

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
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="action__item">
            <span>startVal：</span><el-input-number v-model="startVal" :min="0" />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="action__item">
            <span>endVal：</span><el-input-number v-model="endVal" :min="1" />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="action__item">
            <span>duration：</span><el-input-number v-model="duration" :min="1000" />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="action__item"> <span>separator：</span><el-input v-model="separator" /> </div>
        </el-col>
        <el-col :span="8">
          <div class="action__item"> <span>prefix：</span><el-input v-model="prefix" /> </div>
        </el-col>
        <el-col :span="8">
          <div class="action__item"> <span>suffix：</span><el-input v-model="suffix" /> </div>
        </el-col>
        <el-col :span="24">
          <div style="margin-top: 20px; text-align: center">
            <el-button type="primary" @click="start">start</el-button>
            <el-button style="margin-left: 10px" @click="pauseResume">pause/resume</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts" name="CountToDemo">
import { ref, unref } from 'vue'
import CountTo from '_c/CountTo/index.vue'
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
  ;(unref(countRef) as any).start()
}

function pauseResume(): void {
  ;(unref(countRef) as any).pauseResume()
}
</script>

<style lang="less" scoped>
.count-to {
  margin-top: 40px;
  text-align: center;

  &__item {
    font-size: 80px;
    font-weight: bold;
    color: #f6416c;
  }
}

.action {
  margin-top: 20px;

  &__item {
    display: flex;
    padding: 0 15px;
    margin-bottom: 10px;
    align-items: center;

    & > span {
      display: inline-block;
      width: 120px;
      text-align: center;
    }

    :deep(.el-input-number) {
      width: 100%;
    }
  }
}
</style>

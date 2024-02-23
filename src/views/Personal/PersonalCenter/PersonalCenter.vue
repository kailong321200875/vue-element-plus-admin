<script lang="ts" setup>
import { ElCard, ElTag } from 'element-plus'
import avatar from '@/assets/imgs/avatar.jpg'
</script>

<template>
  <div>
    <ElCard
      shadow="hover"
      class="border-none! h-200px relative"
      :body-style="{
        padding: '0'
      }"
    >
      <div class="card h-140px"> </div>
      <img
        :src="avatar"
        alt="avatar"
        class="w-128px h-128px border-rd-50% bottom-[40px] left-20px absolute"
      />
      <div class="absolute left-168px bottom-70px">
        <div class="font-size-24px font-600 mb-10px color-#fff">Archer</div>
        <div class="color-#A3A6AD"> 种一棵树最好的时间是十年前，其次是现在。 </div>
      </div>
      <div class="h-60px flex items-center justify-end pr-20px">
        <ElTag class="mr-10px">前端开发</ElTag>
        <ElTag class="mr-10px">专注设计</ElTag>
        <ElTag class="mr-10px">很有想法</ElTag>
        <ElTag>时间管理</ElTag>
      </div>
    </ElCard>
  </div>
</template>

<style lang="less" scoped>
.card {
  background-image: url("~'@/assets/imgs/personal-center-bg.jpg'");
  background-position: center;
  background-size: cover;
}
</style>

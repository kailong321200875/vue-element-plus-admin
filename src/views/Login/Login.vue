<script setup lang="ts">
import { LoginForm } from './components'
import { ElCard } from 'element-plus'
// import { ThemeSwitch } from '@/components/ThemeSwitch'
// import { LocaleDropdown } from '@/components/LocaleDropdown'
// import { SizeDropdown } from '@/components/SizeDropdown'
import { useDesign } from '@/hooks/web/useDesign'
// import { useI18n } from '@/hooks/web/useI18n'

// const { t } = useI18n()

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('login')
</script>

<template>
  <div :class="prefixCls" class="h-[calc(100%)] relative">
    <div
      class="container relative h-full py-2 mx-auto flex @2xl:max-w-1600px @xl:max-w-1000px @lg:max-w-600px @md:max-w-500px @sm:max-w-500px"
    >
      <div class="flex-1 <lg:hidden">
        <img src="@/assets/svgs/login-box-bg.svg" alt="" class="w-1/2 m-auto" />
      </div>
      <div class="flex-1">
        <ElCard>
          <template #header>
            <div>
              <span>Card name</span>
            </div>
          </template>
          <LoginForm />
        </ElCard>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-login';

.@{prefix-cls} {
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-image: url('@/assets/svgs/login-light-bg.svg');
    background-position: center;
    background-repeat: no-repeat;
    content: '';
  }
}

.dark {
  .@{prefix-cls} {
    &::before {
      background-image: url('@/assets/svgs/login-dark-bg.svg');
    }
  }
}
</style>

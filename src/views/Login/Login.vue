<script setup lang="ts">
import { VThemeSwitch } from '@/components/ThemeSwitch'
import { useDesign } from '@/hooks/web/useDesign'
import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('login')
</script>

<template>
  <div :class="prefixCls" class="h-[calc(100%)] relative">
    <VThemeSwitch />
    {{ t('formDemo.default') }}
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

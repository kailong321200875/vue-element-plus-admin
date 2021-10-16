<template>
  <router-link class="app-logo" to="/" :class="{ 'app-logo--Top': layout !== 'Classic' }">
    <img :src="logoImg" />
    <div v-if="show" class="sidebar-title">{{ title }}</div>
  </router-link>
</template>

<script setup lang="ts" name="Logo">
import { ref, watch, PropType, computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()
// @ts-ignore
import logoImg from '@/assets/img/logo.png'

const props = defineProps({
  collapsed: {
    type: Boolean as PropType<boolean>,
    required: true
  }
})

const show = ref<boolean>(true)
const title = computed(() => appStore.getLogoTitle)
const layout = computed(() => appStore.getLayout)
watch(
  () => props.collapsed,
  (collapsed: boolean) => {
    if (layout.value !== 'Classic') {
      show.value = true
    } else {
      if (!collapsed) {
        setTimeout(() => {
          show.value = !collapsed
        }, 400)
      } else {
        show.value = !collapsed
      }
    }
  }
)
</script>

<style lang="less" scoped>
.app-logo {
  display: flex;
  width: 100%;
  height: var(--top-sider-height);
  cursor: pointer;
  background-color: var(--menu-background-color);
  align-items: center;

  img {
    width: 37px;
    height: 37px;
    margin-left: 14px;
  }

  .sidebar-title {
    margin-left: 12px;
    font-size: 14px;
    font-weight: 700;
    color: var(--menu-active-text-color);
    transition: 0.5s;
  }
}

.app-logo--Top {
  width: auto;
  padding: 0 5px;
  background-color: var(--top-menu-background-color);
  transition: background 0.2s;

  &:hover {
    background: #f6f6f6;
  }

  img {
    margin-left: 0;
  }

  .sidebar-title {
    color: var(--top-menu-text-color);
  }
}
</style>

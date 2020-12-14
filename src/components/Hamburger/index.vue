<template>
  <div>
    <menu-unfold-outlined
      v-if="collapsed"
      class="trigger"
      @click="toggleCollapsed(!collapsed)"
    />
    <menu-fold-outlined
      v-else
      class="trigger"
      @click="toggleCollapsed(!collapsed)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
// import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  name: 'Hamburger',
  // components: {
  //   MenuUnfoldOutlined,
  //   MenuFoldOutlined
  // },
  props: {
    collapsed: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },
  emits: ['toggleClick'],
  setup(props, { emit }) {
    function toggleCollapsed(collapsed: boolean) {
      emit('toggleClick', collapsed)
    }

    return {
      toggleCollapsed
    }
  }
})

</script>

<style lang="less" scoped>
.trigger {
  display: inline-block;
  transition: color 0.3s;
  height: @navbarHeight;
  line-height: @navbarHeight;
}
.trigger:hover {
  color: #1890ff;
}
</style>

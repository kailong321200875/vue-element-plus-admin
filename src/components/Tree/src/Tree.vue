<script lang="tsx" setup>
import { defineProps, defineEmits, ref, CSSProperties } from 'vue'
import { ElTree } from 'element-plus'

interface TreeProps {
  data: any[]
  treeProps?: Record<string, any>
  width?: string
  height?: string
}
const props = defineProps<TreeProps>()

const emit = defineEmits<{
  (e: 'node-click', nodeData: any): void
  (e: 'node-expand', nodeData: any): void
  (e: 'node-collapse', nodeData: any): void
}>()

const treeContainer = ref<any>(null)
const showTreeMenu = ref(false)
const contextNode = ref<any>(null)

const menuStyle = ref<any>({})

const defaultWidth = '300px'
const defaultHeight = '400px'

// 关闭菜单
const closeTreeMenu = () => {
  showTreeMenu.value = false
  document.removeEventListener('click', closeTreeMenu)
  document.removeEventListener('contextmenu', closeTreeMenu)
}

// 右键菜单事件处理函数
const openTreeMenu = (event: MouseEvent, data: any, _node: any, _target: HTMLElement) => {
  contextNode.value = data
  if (!treeContainer.value) return

  const containerRect = treeContainer.value.getBoundingClientRect()
  const nodeRect = (event.target as HTMLElement).getBoundingClientRect()

  // 计算菜单相对于父容器定位的坐标
  const top = nodeRect.top - containerRect.top + treeContainer.value.scrollTop
  const left = nodeRect.left - containerRect.left + treeContainer.value.scrollLeft

  menuStyle.value = {
    position: 'absolute',
    top: `${top + 20}px`,
    left: `${left + 20}px`
  }

  showTreeMenu.value = true

  // 点击其他地方或再次右键关闭菜单
  document.addEventListener('click', closeTreeMenu)
  document.addEventListener('contextmenu', closeTreeMenu)
}

// 节点点击事件
const handleNodeClick = (data: any) => {
  emit('node-click', data)
  closeTreeMenu()
}

// 节点展开事件
const handleNodeExpand = (data: any) => {
  emit('node-expand', data)
  closeTreeMenu()
}

// 节点关闭事件
const handleNodeCollapse = (data: any) => {
  emit('node-collapse', data)
  closeTreeMenu()
}

// 计算容器样式
const containerStyle: CSSProperties = {
  position: 'relative',
  overflow: 'auto',
  width: props.width ?? defaultWidth,
  height: props.height ?? defaultHeight
}
</script>
<template>
  <div class="tree-container" ref="treeContainer" :style="containerStyle">
    <ElTree
      v-bind="treeProps"
      :data="data"
      @node-click="handleNodeClick"
      @node-expand="handleNodeExpand"
      @node-collapse="handleNodeCollapse"
      @node-contextmenu="openTreeMenu"
    >
      <template #default="{ node }">
        <!-- 如果使用者提供了 render-node slot，则渲染使用者的内容 -->
        <template v-if="$slots['render-node']">
          <slot name="render-node" :node="node"></slot>
        </template>
        <!-- 否则使用默认节点显示（比如使用 node.label ）-->
        <template v-else>
          <span>{{ node.label }}</span>
        </template>
      </template>
    </ElTree>
    <div class="treeMenu" v-show="showTreeMenu" :style="menuStyle">
      <!-- 用户通过 context-menu slot 来自定义菜单内容 -->
      <slot name="context-menu" :node="contextNode" :data="contextNode">
        <!-- 如果用户不提供 context-menu slot，可给一个默认内容 -->
        <div style="padding: 8px">No menu defined</div>
      </slot>
    </div>
    <slot></slot>
  </div>
</template>
<style scoped lang="less">
.treeMenu {
  position: absolute;
  padding: 5px;
  font-size: 14px;
  color: #606266;
  background-color: rgb(255 255 255 / 90%);
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgb(0 0 0 / 40%);

  /* 移除 overflow: hidden; 或尝试不使用负的 top 值 */

  /* overflow: hidden; */

  &::after {
    position: absolute;

    /* 将箭头向上移动到菜单外部 */
    top: -6px;
    left: 50%;
    border-right: 6px solid transparent;
    border-bottom: 6px solid rgb(206 194 194);

    /* 创建一个向上的箭头 */
    border-left: 6px solid transparent;
    content: '';
    transform: translateX(-50%);
  }
}
</style>

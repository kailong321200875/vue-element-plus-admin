<script setup lang="ts">
import epIcons from './data/icons.ep'
import antIcons from './data/icons.ant-design'
import tIcons from './data/icons.tdesign'
import { useDesign } from '@/hooks/web/useDesign'
import { ElInput, ElPopover, ElScrollbar, ElTabs, ElTabPane, ElPagination } from 'element-plus'
import { useAppStore } from '@/store/modules/app'
import { computed, CSSProperties, ref, unref, watch } from 'vue'
import { nextTick } from 'vue'

const init = async (icon?: string) => {
  if (!icon) return
  const iconInfo = icon.split(':')
  iconName.value = iconInfo[0]
  const wrapIndex = icons.findIndex((item) => item.prefix === iconInfo[0])
  // 查询当前icon的索引
  const index = filterItemIcons(icons[wrapIndex].icons).findIndex((item) => item === icon)
  // 计算当前icon的页码
  await nextTick()
  currentPage.value = Math.ceil((index + 1) / unref(pageSize))
}

const modelValue = defineModel<string>()

const appStore = useAppStore()

const size = computed(() => appStore.getCurrentSize)

const iconSize = computed(() => {
  return unref(size) === 'small'
    ? 'var(--el-component-size-small)'
    : unref(size) === 'large'
      ? 'var(--el-component-size-large)'
      : 'var(--el-component-size)'
})

const iconWrapStyle = computed((): CSSProperties => {
  return {
    width: unref(iconSize),
    height: unref(iconSize),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset',
    position: 'relative',
    left: '-1px',
    cursor: 'pointer'
  }
})

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('icon-picker')

const icons = [epIcons, antIcons, tIcons]

const iconName = ref(icons[0].prefix)

const currentIconNameIndex = computed(() => {
  return icons.findIndex((item) => item.prefix === unref(iconName))
})

const tabChange = () => {
  currentPage.value = 1
}

const pageSize = ref(49)

const currentPage = ref(1)

const filterIcons = (icons: string[]) => {
  const start = (unref(currentPage) - 1) * unref(pageSize)
  const end = unref(currentPage) * unref(pageSize)
  return icons.slice(start, end)
}

watch(
  () => modelValue.value,
  async (val) => {
    await nextTick()
    val && init(val)
  },
  {
    immediate: true
  }
)

const popoverShow = () => {
  init(unref(modelValue))
}

const iconSelect = (icon: string) => {
  // 如果是同一个icon则不做处理，则相当于点击了清空按钮
  if (icon === unref(modelValue)) {
    modelValue.value = ''
    return
  }
  modelValue.value = icon
}

const search = ref('')

const filterItemIcons = (icons: string[]) => {
  return icons.filter((item) => item.includes(unref(search)))
}

const inputClear = () => {
  init(unref(modelValue))
}
</script>

<template>
  <div :class="prefixCls" class="flex justify-center items-center box">
    <ElInput disabled v-model="modelValue" clearable />
    <ElPopover
      placement="bottom"
      trigger="click"
      :width="450"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; height: 380px;"
      @show="popoverShow"
    >
      <template #reference>
        <div :style="iconWrapStyle">
          <Icon v-if="modelValue" :icon="modelValue" />
        </div>
      </template>
      <ElScrollbar class="h-[calc(100%-50px)]!">
        <ElInput
          v-model="search"
          class="mb-20px"
          clearable
          placeholder="搜索图标"
          @clear="inputClear"
        />
        <ElTabs tab-position="left" v-model="iconName" @tab-change="tabChange">
          <ElTabPane v-for="item in icons" :key="item.name" :label="item.name" :name="item.prefix">
            <div class="flex flex-wrap box-border">
              <div
                v-for="icon in filterIcons(filterItemIcons(item.icons))"
                :key="icon"
                :style="{
                  width: iconSize,
                  height: iconSize,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: `1px solid ${
                    icon === modelValue ? 'var(--el-color-primary)' : 'var(--el-border-color)'
                  }`,
                  boxSizing: 'border-box',
                  margin: '2px',
                  transition: 'all 0.3s'
                }"
                class="hover:border-color-[var(--el-color-primary)]!"
                @click="iconSelect(icon)"
              >
                <Icon
                  :icon="icon"
                  :color="icon === modelValue ? 'var(--el-color-primary)' : 'inherit'"
                />
              </div>
            </div>
          </ElTabPane>
        </ElTabs>
      </ElScrollbar>
      <div
        class="h-50px absolute bottom-0 left-0 flex items-center pl-[var(--el-popover-padding)] pr-[var(--el-popover-padding)]"
      >
        <ElPagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :pager-count="5"
          small
          :page-sizes="[100, 200, 300, 400]"
          layout="total, prev, pager, next, jumper"
          :total="filterItemIcons(icons[currentIconNameIndex].icons).length"
        />
      </div>
    </ElPopover>
  </div>
</template>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-icon-picker';

.@{prefix-cls} {
  :deep(.@{elNamespace}-input__wrapper) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>

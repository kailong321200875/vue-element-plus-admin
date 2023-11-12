<script setup lang="tsx">
import { PropType, ref } from 'vue'
import { Descriptions, DescriptionsSchema } from '@/components/Descriptions'
import { Icon } from '@/components/Icon'
import { ElTag } from 'element-plus'

defineProps({
  currentRow: {
    type: Object as PropType<any>,
    default: () => undefined
  }
})

const renderTag = (enable?: boolean) => {
  return <ElTag type={!enable ? 'danger' : 'success'}>{enable ? '启用' : '禁用'}</ElTag>
}

const detailSchema = ref<DescriptionsSchema[]>([
  {
    field: 'type',
    label: '菜单类型',
    span: 24,
    slots: {
      default: (data) => {
        const type = data.type
        return <>{type === 1 ? '菜单' : '目录'}</>
      }
    }
  },
  {
    field: 'parentName',
    label: '父级菜单'
  },
  {
    field: 'meta.title',
    label: '菜单名称'
  },
  {
    field: 'component',
    label: '组件',
    slots: {
      default: (data) => {
        const component = data.component
        return <>{component === '#' ? '顶级目录' : component === '##' ? '子目录' : component}</>
      }
    }
  },
  {
    field: 'name',
    label: '组件名称'
  },
  {
    field: 'meta.icon',
    label: '图标',
    slots: {
      default: (data) => {
        const icon = data.icon
        if (icon) {
          return (
            <>
              <Icon icon={icon} />
            </>
          )
        } else {
          return null
        }
      }
    }
  },
  {
    field: 'path',
    label: '路径'
  },
  {
    field: 'meta.activeMenu',
    label: '高亮菜单'
  },
  {
    field: 'permissionList',
    label: '按钮权限',
    span: 24,
    slots: {
      default: (data: any) => (
        <>
          {data?.permissionList?.map((v) => {
            return (
              <ElTag class="mr-1" key={v.value}>
                {v.label}
              </ElTag>
            )
          })}
        </>
      )
    }
  },
  {
    field: 'menuState',
    label: '菜单状态',
    slots: {
      default: (data) => {
        return renderTag(data.menuState)
      }
    }
  },
  {
    field: 'meta.hidden',
    label: '是否隐藏',
    slots: {
      default: (data) => {
        return renderTag(data.enableHidden)
      }
    }
  },
  {
    field: 'meta.alwaysShow',
    label: '是否一直显示',
    slots: {
      default: (data) => {
        return renderTag(data.enableDisplay)
      }
    }
  },
  {
    field: 'meta.noCache',
    label: '是否清除缓存',
    slots: {
      default: (data) => {
        return renderTag(data.enableCleanCache)
      }
    }
  },
  {
    field: 'meta.breadcrumb',
    label: '是否显示面包屑',
    slots: {
      default: (data) => {
        return renderTag(data.enableShowCrumb)
      }
    }
  },
  {
    field: 'meta.affix',
    label: '是否固定标签页',
    slots: {
      default: (data) => {
        return renderTag(data.enablePinnedTab)
      }
    }
  },
  {
    field: 'meta.noTagsView',
    label: '是否隐藏标签页',
    slots: {
      default: (data) => {
        return renderTag(data.enableHiddenTab)
      }
    }
  },
  {
    field: 'meta.canTo',
    label: '是否可跳转',
    slots: {
      default: (data) => {
        return renderTag(data.enableSkip)
      }
    }
  }
])
</script>

<template>
  <Descriptions :schema="detailSchema" :data="currentRow || {}" />
</template>

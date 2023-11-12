<script setup lang="tsx">
import { PropType, ref, unref, nextTick } from 'vue'
import { Descriptions, DescriptionsSchema } from '@/components/Descriptions'
import { ElTag, ElTree } from 'element-plus'
import { findIndex } from '@/utils'
import { getMenuListApi } from '@/api/menu'

defineProps({
  currentRow: {
    type: Object as PropType<any>,
    default: () => undefined
  }
})

const filterPermissionName = (value: string) => {
  const index = findIndex(unref(currentTreeData)?.permissionList || [], (item) => {
    return item.value === value
  })
  return (unref(currentTreeData)?.permissionList || [])[index].label ?? ''
}

const renderTag = (enable?: boolean) => {
  return <ElTag type={!enable ? 'danger' : 'success'}>{enable ? '启用' : '禁用'}</ElTag>
}

const treeRef = ref<typeof ElTree>()

const currentTreeData = ref()
const nodeClick = (treeData: any) => {
  currentTreeData.value = treeData
}

const treeData = ref<any[]>([])
const getMenuList = async () => {
  const res = await getMenuListApi()
  if (res) {
    treeData.value = res.data.list
    await nextTick()
  }
}
getMenuList()

const detailSchema = ref<DescriptionsSchema[]>([
  {
    field: 'roleName',
    label: '角色名称'
  },
  {
    field: 'status',
    label: '状态',
    slots: {
      default: (data: any) => {
        return renderTag(data.status)
      }
    }
  },
  {
    field: 'remark',
    label: '备注',
    span: 24
  },
  {
    field: 'permissionList',
    label: '菜单分配',
    span: 24,
    slots: {
      default: () => {
        return (
          <>
            <div class="flex w-full">
              <div class="flex-1">
                <ElTree
                  ref={treeRef}
                  node-key="id"
                  props={{ children: 'children', label: 'title' }}
                  highlight-current
                  expand-on-click-node={false}
                  data={treeData.value}
                  onNode-click={nodeClick}
                >
                  {{
                    default: (data) => {
                      return <span>{data?.data?.title}</span>
                    }
                  }}
                </ElTree>
              </div>
              <div class="flex-1">
                {unref(currentTreeData)
                  ? unref(currentTreeData)?.meta?.permission?.map((v: string) => {
                      return <ElTag class="ml-2 mt-2">{filterPermissionName(v)}</ElTag>
                    })
                  : null}
              </div>
            </div>
          </>
        )
      }
    }
  }
])
</script>

<template>
  <Descriptions :schema="detailSchema" :data="currentRow || {}" />
</template>

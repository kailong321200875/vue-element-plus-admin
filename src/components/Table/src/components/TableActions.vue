<script lang="tsx">
import { defineComponent, unref, computed, PropType, watch } from 'vue'
import {
  ElTooltip,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ComponentSize,
  ElPopover,
  ElTree
} from 'element-plus'
import { Icon } from '@/components/Icon'
import { useI18n } from '@/hooks/web/useI18n'
import { useAppStore } from '@/store/modules/app'
import { TableColumn } from '../types'
import { cloneDeep } from 'lodash-es'
import { eachTree } from '@/utils/tree'

const appStore = useAppStore()
const sizeMap = computed(() => appStore.sizeMap)

const { t } = useI18n()

export default defineComponent({
  name: 'TableActions',
  props: {
    columns: {
      type: Array as PropType<TableColumn[]>,
      default: () => []
    }
  },
  emits: ['refresh', 'changSize'],
  setup(props, { emit }) {
    const refresh = () => {
      emit('refresh')
    }

    const changSize = (size: ComponentSize) => {
      emit('changSize', size)
    }

    const defaultCheckeds = computed(() => {
      const checkeds: string[] = []
      eachTree(unref(columns), (item: TableColumn) => {
        if (!item.hidden) {
          checkeds.push(item.field)
        }
      })
      return checkeds
    })

    const columns = computed(() => {
      return cloneDeep(props.columns).filter((v) => {
        // 去掉type为selection的列和expand的列
        if (v.type !== 'selection' && v.type !== 'expand') {
          return v
        }
      })
    })

    watch(
      () => columns.value,
      (newColumns) => {
        console.log('columns change：', newColumns)
      },
      {
        deep: true
      }
    )

    // 在原始树形数据中更新节点位置
    function updateTreeData(treeData, draggedNode, targetNode, placement) {
      let updatedTreeData = cloneDeep(treeData) // 克隆一份原始数据以免修改原数据

      // 找到被拖拽节点和目标节点
      function findNodes(nodeId, nodes) {
        for (const node of nodes) {
          if (node?.field === nodeId) {
            return node
          }
          if (node.children && node.children.length) {
            const foundNode = findNodes(nodeId, node.children)
            if (foundNode) {
              return foundNode
            }
          }
        }
        return null
      }

      const draggedNodeToUpdate = findNodes(draggedNode?.data?.field, updatedTreeData)
      const targetNodeToUpdate = targetNode
        ? findNodes(targetNode?.data?.field, updatedTreeData)
        : null

      if (!draggedNodeToUpdate || (targetNode && !targetNodeToUpdate)) {
        // 未找到节点，可能是数据错误
        console.error('无法找到要更新的节点或目标节点')
        return treeData // 返回原数据，不做任何修改
      }

      // 在原来的位置移除被拖拽节点
      function removeNode(node) {
        const parent = updatedTreeData.find((n) => n.children.includes(node))
        if (parent) {
          parent.children = parent.children.filter((n) => n?.field !== node?.field)
        } else {
          updatedTreeData = updatedTreeData.filter((n) => n?.field !== node?.field)
        }
      }
      removeNode(draggedNodeToUpdate)

      // 将被拖拽节点插入目标节点的位置
      function insertNode(placement) {
        if (placement === 'before' || placement === 'after') {
          const parent = updatedTreeData.find((n) => n.children.includes(targetNodeToUpdate))
          const index = parent.children.findIndex((n) => n?.field === targetNodeToUpdate?.data?.id)
          const insertionIndex = placement === 'before' ? index : index + 1
          parent.children.splice(insertionIndex, 0, draggedNodeToUpdate)
        } else if (placement === 'inner') {
          targetNodeToUpdate.children.push(draggedNodeToUpdate)
        }
      }
      if (targetNode) {
        insertNode(placement)
      } else {
        // 如果 targetNode 为空，将被拖拽节点放置为根节点
        updatedTreeData.push(draggedNodeToUpdate)
      }

      return updatedTreeData
    }

    const onNodeDragEnd = (before: any, after: any, inner: string) => {
      if (inner === 'none') return
      console.log(before, after, inner)
      const cloneDeepColumns = cloneDeep(unref(props.columns))
      const newColumns = updateTreeData(cloneDeepColumns, after, before, inner)
      console.log(newColumns)
    }

    const onCheckChange = (data: TableColumn, isChecked: boolean, childrenHasChecked) => {
      console.log(data, isChecked, childrenHasChecked)
    }

    return () => (
      <>
        <div class="text-right h-28px flex items-center justify-end">
          <ElTooltip content={t('common.refresh')} placement="top">
            <Icon
              icon="ant-design:sync-outlined"
              class="cursor-pointer"
              hover-color="var(--el-color-primary)"
              onClick={refresh}
            />
          </ElTooltip>

          <ElTooltip content={t('common.size')} placement="top">
            <ElDropdown trigger="click" onCommand={changSize}>
              {{
                default: () => {
                  return (
                    <Icon
                      icon="ant-design:column-height-outlined"
                      class="cursor-pointer mr-8px ml-8px"
                      hover-color="var(--el-color-primary)"
                    />
                  )
                },
                dropdown: () => {
                  return (
                    <ElDropdownMenu>
                      {{
                        default: () => {
                          return unref(sizeMap).map((v) => {
                            return (
                              <ElDropdownItem key={v} command={v}>
                                {t(`size.${v}`)}
                              </ElDropdownItem>
                            )
                          })
                        }
                      }}
                    </ElDropdownMenu>
                  )
                }
              }}
            </ElDropdown>
          </ElTooltip>

          {/* <ElTooltip content={t('common.columnSetting')} placement="top"> */}
          <ElPopover trigger="click" placement="left">
            {{
              default: () => {
                return (
                  <div>
                    <ElTree
                      data={unref(columns)}
                      show-checkbox
                      default-checked-keys={unref(defaultCheckeds)}
                      draggable
                      node-key="field"
                      allow-drop={(_draggingNode: any, _dropNode: any, type: string) => {
                        if (type === 'inner') {
                          return false
                        } else {
                          return true
                        }
                      }}
                      onNode-drag-end={onNodeDragEnd}
                      onCheck-change={onCheckChange}
                    />
                  </div>
                )
              },
              reference: () => {
                return (
                  <Icon
                    icon="ant-design:setting-outlined"
                    class="cursor-pointer"
                    hoverColor="var(--el-color-primary)"
                  />
                )
              }
            }}
          </ElPopover>
          {/* </ElTooltip> */}
        </div>
      </>
    )
  }
})
</script>

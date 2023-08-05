<script lang="tsx">
import { defineComponent, unref, computed, PropType, watch } from 'vue'
import {
  ElTooltip,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ComponentSize
  // ElPopover,
  // ElTree
} from 'element-plus'
import { Icon } from '@/components/Icon'
import { useI18n } from '@/hooks/web/useI18n'
import { useAppStore } from '@/store/modules/app'
import { TableColumn } from '../types'
import { cloneDeep } from 'lodash-es'
// import { eachTree } from '@/utils/tree'

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

    return () => (
      <>
        <div class="text-right h-28px flex items-center justify-end">
          <ElTooltip content={t('common.refresh')} placement="top">
            <span onClick={refresh}>
              <Icon
                icon="ant-design:sync-outlined"
                class="cursor-pointer"
                hover-color="var(--el-color-primary)"
              />
            </span>
          </ElTooltip>

          <ElTooltip content={t('common.size')} placement="top">
            <ElDropdown trigger="click" onCommand={changSize}>
              {{
                default: () => {
                  return (
                    <span>
                      <Icon
                        icon="ant-design:column-height-outlined"
                        class="cursor-pointer mr-8px ml-8px"
                        hover-color="var(--el-color-primary)"
                      />
                    </span>
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
          {/* <ElPopover trigger="click" placement="left">
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
          </ElPopover> */}
          {/* </ElTooltip> */}
        </div>
      </>
    )
  }
})
</script>

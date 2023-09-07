<script lang="tsx">
import { defineComponent, unref, computed, PropType, watch, ref, nextTick } from 'vue'
import {
  ElTooltip,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ComponentSize,
  ElPopover,
  ElCheckbox,
  ElScrollbar,
  ElButton,
  ElTable
} from 'element-plus'
import { Icon } from '@/components/Icon'
import { useI18n } from '@/hooks/web/useI18n'
import { useAppStore } from '@/store/modules/app'
import { TableColumn } from '../types'
import Draggable from 'vuedraggable'
import { useRouter } from 'vue-router'
import { useStorage } from '@/hooks/web/useStorage'
import cloneDeep from 'lodash/cloneDeep'
import { propTypes } from '@/utils/propTypes'

const appStore = useAppStore()
const sizeMap = computed(() => appStore.sizeMap)

const { setStorage, getStorage, removeStorage } = useStorage()

const { t } = useI18n()

export default defineComponent({
  name: 'TableActions',
  props: {
    columns: {
      type: Array as PropType<TableColumn[]>,
      default: () => []
    },
    elTableRef: {
      type: Object as PropType<ComponentRef<typeof ElTable>>,
      default: () => {}
    },
    // 表格工具栏缓存唯一标识符
    activeUID: propTypes.string.def('')
  },
  emits: ['refresh', 'changSize'],
  setup(props, { emit }) {
    const refresh = () => {
      emit('refresh')
    }

    const changSize = (size: ComponentSize) => {
      emit('changSize', size)
    }

    const tableColumns = ref(props.columns)
    const elTableRef = ref(props.elTableRef)
    const activeUID = ref(props.activeUID)

    const oldTableColumns = cloneDeep(tableColumns.value)

    const checkAll = ref(false)
    const isIndeterminate = ref(true) // 如果为True，则表示为半选状态
    const handleCheckAllChange = (val: boolean) => {
      tableColumns.value.forEach((item) => {
        if (item.disabled !== true) {
          item.show = val
        }
      })
      isIndeterminate.value = false
    }

    const handleCheckChange = () => {
      checkAll.value = tableColumns.value.every((item) => item.show)
      if (checkAll.value) {
        isIndeterminate.value = false
      } else {
        isIndeterminate.value = tableColumns.value.some((item) => item.show)
      }
    }
    handleCheckChange()

    const { currentRoute } = useRouter()
    const fullPath = currentRoute.value.fullPath
    const cacheTableHeadersKey = `${fullPath}_${activeUID.value}`

    if (cacheTableHeadersKey) {
      const showField = JSON.parse(getStorage(cacheTableHeadersKey))
      if (showField) {
        tableColumns.value.forEach((item) => {
          if (showField.includes(item.field)) {
            item.show = true
          } else {
            item.show = false
          }
        })
      }
    }

    watch(
      () => tableColumns.value,
      async (val) => {
        const showField = val.filter((item) => item.show).map((item) => item.field)
        setStorage(cacheTableHeadersKey, JSON.stringify(showField))
        await nextTick()
        elTableRef.value?.doLayout()
      },
      {
        deep: true
      }
    )

    const resetTableColumns = async () => {
      Object.assign(tableColumns.value, cloneDeep(oldTableColumns))
      await nextTick()
      removeStorage(cacheTableHeadersKey)
    }

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

          <ElTooltip content={t('common.density')} placement="top">
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

          <ElTooltip content={t('common.columnSetting')} placement="top">
            <ElPopover trigger="click" placement="bottom">
              {{
                default: () => {
                  return (
                    <div>
                      <div style="border-bottom: 1px solid #d4d7de" class="flex justify-between">
                        <ElCheckbox
                          v-model={checkAll.value}
                          indeterminate={isIndeterminate.value}
                          onChange={handleCheckAllChange}
                        >
                          全选
                        </ElCheckbox>
                        <ElButton link onClick={resetTableColumns}>
                          重置
                        </ElButton>
                      </div>
                      <ElScrollbar max-height="400px">
                        <Draggable
                          list={tableColumns.value}
                          item-key="field"
                          v-slots={{
                            item: ({ element }) => (
                              <div>
                                <span class="cursor-move mr-10px">
                                  <Icon icon="akar-icons:drag-vertical" />
                                </span>
                                <ElCheckbox
                                  v-model={element.show}
                                  disabled={element.disabled === true}
                                  onChange={handleCheckChange}
                                >
                                  {element.label}
                                </ElCheckbox>
                              </div>
                            )
                          }}
                        ></Draggable>
                      </ElScrollbar>
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
          </ElTooltip>
        </div>
      </>
    )
  }
})
</script>

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
  ElTable,
  ElDivider
} from 'element-plus'
import { Icon } from '@/components/Icon'
import { useI18n } from '@/hooks/web/useI18n'
import { useAppStore } from '@/store/modules/app'
import { TableColumn } from '../types'
import { VueDraggable } from 'vue-draggable-plus'
import { useRouter } from 'vue-router'
import { useStorage } from '@/hooks/web/useStorage'
import cloneDeep from 'lodash/cloneDeep'
import { propTypes } from '@/utils/propTypes'
import { moveElementToIndex } from '@/utils/index'

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
    const numberColumnStatus = ref(false)

    // 获取 table columns 是否已经存在序号列，如果存在则更新初始状态，如果不存在则添加
    const numberColumnField = tableColumns.value.find((item) => item.type === 'index')
    if (numberColumnField === undefined) {
      tableColumns.value.unshift({
        field: '_serial_number',
        label: '序号',
        type: 'index',
        show: false,
        disabled: true
      })
    } else {
      numberColumnStatus.value = numberColumnField.show
    }

    // 备份最初的 table columns
    const oldTableColumns = cloneDeep(unref(tableColumns))

    const checkAll = ref(false)
    // 如果为True，则表示为半选状态
    const isIndeterminate = ref(true)

    // 全选状态改变事件
    const handleCheckAllChange = (val: boolean) => {
      tableColumns.value.forEach((item) => {
        if (item.disabled !== true) {
          item.show = val
        }
      })
      isIndeterminate.value = tableColumns.value
        .filter((item) => !item.disabled)
        .some((item) => item.show)
    }

    // 列选中状态改变事件
    const handleCheckChange = () => {
      checkAll.value = tableColumns.value
        .filter((item) => !item.disabled)
        .every((item) => item.show)
      if (checkAll.value) {
        isIndeterminate.value = false
      } else {
        isIndeterminate.value = tableColumns.value
          .filter((item) => !item.disabled)
          .some((item) => item.show)
      }
    }

    // 更新 table columns 中的序号列状态
    const updateNumberColumnStatus = (syns: boolean, status: boolean = false) => {
      const numberColumnField = tableColumns.value.find((item) => item.type === 'index')
      if (numberColumnField) {
        if (syns) {
          numberColumnStatus.value = numberColumnField.show
        } else {
          numberColumnField.show = status
        }
      }
    }

    const { currentRoute } = useRouter()
    const fullPath = currentRoute.value.fullPath
    const cacheTableHeadersKey = `${fullPath}_${activeUID.value}`

    if (cacheTableHeadersKey) {
      // 获取缓存中的 table columns 状态并覆盖到当前的 table columns 中
      const cacheData = JSON.parse(getStorage(cacheTableHeadersKey))
      if (cacheData) {
        tableColumns.value.forEach((item) => {
          const fieldData = cacheData[item.field]
          item._index = fieldData.index
          item.show = fieldData.show
          item.fixed = fieldData.fixed
        })
        tableColumns.value.sort((a, b) => a._index - b._index)
        updateNumberColumnStatus(true)
      }
    }

    watch(
      () => tableColumns.value,
      async (val) => {
        const cacheData = {}
        for (let i = 0; i < val.length; i++) {
          const item = val[i]
          cacheData[item.field] = {
            show: item.show,
            index: i,
            fixed: item.fixed
          }
        }
        setStorage(cacheTableHeadersKey, JSON.stringify(cacheData))
        handleCheckChange()
        await nextTick()
        elTableRef.value?.doLayout()
      },
      {
        deep: true
      }
    )

    watch(
      () => numberColumnStatus.value,
      async (val) => {
        updateNumberColumnStatus(false, val)
        await nextTick()
        elTableRef.value?.doLayout()
      },
      {
        deep: true
      }
    )

    // 重置所有状态
    const resetTableColumns = async () => {
      Object.assign(tableColumns.value, cloneDeep(oldTableColumns))
      updateNumberColumnStatus(true)
      await nextTick()
      // 删除缓存
      removeStorage(cacheTableHeadersKey)
    }

    // 更新元素顺序
    const updateColumnsIndex = (val) => {
      Object.assign(
        tableColumns.value,
        cloneDeep(moveElementToIndex(tableColumns.value, val.oldIndex, val.newIndex))
      )
    }

    handleCheckChange()

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
            <ElPopover trigger="click" placement="bottom" width="300px">
              {{
                default: () => {
                  return (
                    <div>
                      <div style="border-bottom: 1px solid #d4d7de" class="flex justify-between">
                        <div>
                          <ElCheckbox
                            v-model={checkAll.value}
                            indeterminate={isIndeterminate.value}
                            onChange={handleCheckAllChange}
                          >
                            {t('common.selectAll')}
                          </ElCheckbox>
                          <ElCheckbox v-model={numberColumnStatus.value}>
                            {t('common.SerialNumberColumn')}
                          </ElCheckbox>
                        </div>
                        <ElButton type="primary" link onClick={resetTableColumns}>
                          {t('common.reset')}
                        </ElButton>
                      </div>
                      <ElScrollbar max-height="400px">
                        <VueDraggable
                          modelValue={tableColumns.value}
                          onEnd={updateColumnsIndex}
                          handle=".cursor-move"
                        >
                          {tableColumns.value.map((element) => {
                            if (element.type === 'index') return null
                            return (
                              <div class="flex justify-between">
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
                                <div class="mt-7px mr-9px">
                                  <span
                                    class={element.fixed === 'left' ? 'color-[#409eff]' : ''}
                                    onClick={() => {
                                      element.fixed = element.fixed === 'left' ? undefined : 'left'
                                    }}
                                  >
                                    <Icon icon="radix-icons:pin-left" class="cursor-pointer" />
                                  </span>
                                  <ElDivider direction="vertical" />
                                  <span
                                    class={element.fixed === 'right' ? 'color-[#409eff]' : ''}
                                    onClick={() => {
                                      element.fixed =
                                        element.fixed === 'right' ? undefined : 'right'
                                    }}
                                  >
                                    <Icon icon="radix-icons:pin-right" class="cursor-pointer" />
                                  </span>
                                </div>
                              </div>
                            )
                          })}
                        </VueDraggable>
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

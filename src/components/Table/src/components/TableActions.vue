<script lang="tsx">
import { defineComponent, unref, computed, PropType } from 'vue'
import { ElTooltip, ElDropdown, ElDropdownMenu, ElDropdownItem, ComponentSize } from 'element-plus'
import { Icon } from '@/components/Icon'
import { useI18n } from '@/hooks/web/useI18n'
import { useAppStore } from '@/store/modules/app'
import { TableColumn } from '../types'

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
  setup(_, { emit }) {
    const refresh = () => {
      emit('refresh')
    }

    const changSize = (size: ComponentSize) => {
      emit('changSize', size)
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
        </div>
      </>
    )
  }
})
</script>

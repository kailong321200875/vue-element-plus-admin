<script lang="tsx">
import { defineComponent, unref, computed, ref } from 'vue'
import {
  ElTooltip,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ComponentSize,
  ElPopover,
  ClickOutside as vClickOutside
} from 'element-plus'
import { Icon } from '@/components/Icon'
import { useI18n } from '@/hooks/web/useI18n'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()
const sizeMap = computed(() => appStore.sizeMap)

const { t } = useI18n()

export default defineComponent({
  name: 'TableActions',
  directives: {
    ClickOutside: vClickOutside
  },
  emits: ['refresh', 'changSize'],
  setup(_, { emit }) {
    const refresh = () => {
      emit('refresh')
    }

    const changSize = (size: ComponentSize) => {
      emit('changSize', size)
    }

    const popoverRef = ref()
    const iconRef = ref()

    const onClickOutside = () => {
      unref(popoverRef)?.popperRef?.delayHide?.()
    }

    return () => (
      <>
        <ElPopover
          ref={popoverRef.value}
          virtualRef={iconRef.value}
          trigger="click"
          virtualTriggering
        >
          <span> Some content </span>
        </ElPopover>
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

          <ElTooltip content={t('common.columnSetting')} placement="top">
            <Icon
              ref={iconRef.value}
              icon="ant-design:setting-outlined"
              class="cursor-pointer"
              hoverColor="var(--el-color-primary)"
              vClickOutside={onClickOutside}
            />
          </ElTooltip>
        </div>
      </>
    )
  }
})
</script>

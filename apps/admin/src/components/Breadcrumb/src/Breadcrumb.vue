<script lang="tsx">
  import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
  import { computed, defineComponent } from 'vue'
  import { useRoute } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { Icon } from '@vea/components'
  import { appConfig } from '@/config/app'
  const prefixCls = 'v-breadcrumb'

  export default defineComponent({
    name: 'Breadcrumb',
    setup() {
      const route = useRoute()
      const { t } = useI18n()
      const breadcrumbList = computed(() => {
        const visibleRecords = route.matched.filter(
          (record) => !record.meta.hidden && record.meta.breadcrumb !== false
        )
        return visibleRecords.filter(
          (record, index) =>
            index === visibleRecords.length - 1 ||
            record.meta.title !== visibleRecords[index + 1]?.meta.title
        )
      })

      const renderBreadcrumb = () => {
        return breadcrumbList.value.map((record, index) => {
          const meta = record.meta
          const canNavigate = index < breadcrumbList.value.length - 1 && Boolean(record.redirect)
          return (
            <ElBreadcrumbItem
              to={canNavigate ? { path: record.path } : undefined}
              key={String(record.name ?? record.path)}
            >
              {meta.icon && appConfig.ui.breadcrumbIcon ? (
                <>
                  <Icon icon={meta.icon} class="mr-[5px]"></Icon> {t(meta.title || '')}
                </>
              ) : (
                t(meta.title || '')
              )}
            </ElBreadcrumbItem>
          )
        })
      }

      return () => (
        <ElBreadcrumb separator="/" class={`${prefixCls} flex items-center h-full ml-[10px]`}>
          {renderBreadcrumb()}
        </ElBreadcrumb>
      )
    }
  })
</script>

<style lang="less" scoped>
  @prefix-cls: el-breadcrumb;

  .@{prefix-cls} {
    :deep(&__item) {
      display: flex;
      .@{prefix-cls}__inner {
        display: flex;
        align-items: center;
        color: var(--top-header-text-color);

        &:hover {
          color: var(--el-color-primary);
        }
      }
    }

    :deep(&__item):not(:last-child) {
      .@{prefix-cls}__inner {
        color: var(--top-header-text-color);

        &:hover {
          color: var(--el-color-primary);
        }
      }
    }

    :deep(&__item):last-child {
      .@{prefix-cls}__inner {
        color: var(--el-text-color-placeholder);

        &:hover {
          color: var(--el-text-color-placeholder);
        }
      }
    }
  }
</style>

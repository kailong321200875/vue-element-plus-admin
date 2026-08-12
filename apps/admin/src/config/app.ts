export const appConfig = {
  title: import.meta.env.VITE_APP_TITLE,
  ui: {
    breadcrumb: true,
    breadcrumbIcon: true,
    hamburger: true,
    screenfull: true,
    componentSize: true,
    locale: true,
    tagsView: true,
    tagsViewIcon: true,
    logo: true,
    fixedHeader: true,
    footer: true,
    uniqueOpened: false,
    fixedMenu: false
  }
} as const

export const componentSizes = ['default', 'large', 'small'] as const

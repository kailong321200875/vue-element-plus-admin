import { defineConfig } from 'vitepress'

const repository = 'https://github.com/kailong321200875/vue-element-plus-admin'

export default defineConfig({
  lang: 'zh-CN',
  title: 'ElementAdmin v3',
  titleTemplate: ':title | ElementAdmin v3',
  description: '轻量、可扩展的 Vue 3 管理后台模板文档',
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN'
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'ElementAdmin v3',
      titleTemplate: ':title | ElementAdmin v3',
      description: 'Documentation for a lightweight and extensible Vue 3 admin template',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/guide/introduction', activeMatch: '/en/guide/' },
          {
            text: 'Core',
            link: '/en/core/dynamic-routing',
            activeMatch: '/en/core/'
          },
          {
            text: 'Capabilities',
            link: '/en/capabilities/crud',
            activeMatch: '/en/(capabilities|infrastructure)/'
          },
          {
            text: 'Development',
            link: '/en/development/mock',
            activeMatch: '/en/development/'
          }
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'Getting Started',
              items: [
                { text: 'Introduction', link: '/en/guide/introduction' },
                { text: 'Quick Start', link: '/en/guide/getting-started' },
                { text: 'Project Structure', link: '/en/guide/architecture' },
                { text: 'Configuration', link: '/en/guide/configuration' }
              ]
            }
          ],
          '/en/core/': [
            {
              text: 'Core',
              items: [
                { text: 'Dynamic Routing and Permissions', link: '/en/core/dynamic-routing' },
                { text: 'Layouts, Menus, and TagsView', link: '/en/core/layouts-and-tags' },
                { text: 'Request Management', link: '/en/core/request' },
                { text: 'State Management', link: '/en/core/state' }
              ]
            }
          ],
          '/en/capabilities/': [
            {
              text: 'Capabilities',
              items: [
                { text: 'CRUD', link: '/en/capabilities/crud' },
                { text: 'Forms', link: '/en/capabilities/form' }
              ]
            },
            {
              text: 'Infrastructure',
              items: [
                { text: 'Packages', link: '/en/infrastructure/packages' },
                { text: 'Icon Registration', link: '/en/infrastructure/icons' },
                { text: 'Internationalization and Themes', link: '/en/infrastructure/i18n-theme' },
                {
                  text: 'Element Plus and Styles',
                  link: '/en/infrastructure/element-plus-styles'
                },
                { text: 'ECharts', link: '/en/infrastructure/echarts' }
              ]
            }
          ],
          '/en/infrastructure/': [
            {
              text: 'Infrastructure',
              items: [
                { text: 'Packages', link: '/en/infrastructure/packages' },
                { text: 'Icon Registration', link: '/en/infrastructure/icons' },
                { text: 'Internationalization and Themes', link: '/en/infrastructure/i18n-theme' },
                {
                  text: 'Element Plus and Styles',
                  link: '/en/infrastructure/element-plus-styles'
                },
                { text: 'ECharts', link: '/en/infrastructure/echarts' }
              ]
            },
            {
              text: 'Capabilities',
              items: [
                { text: 'CRUD', link: '/en/capabilities/crud' },
                { text: 'Forms', link: '/en/capabilities/form' }
              ]
            }
          ],
          '/en/development/': [
            {
              text: 'Development',
              items: [
                { text: 'Mocking and API Integration', link: '/en/development/mock' },
                { text: 'Coding Standards', link: '/en/development/standards' },
                { text: 'Build and Deployment', link: '/en/development/build-deploy' },
                { text: 'FAQ', link: '/en/development/faq' }
              ]
            }
          ]
        },
        editLink: {
          pattern: `${repository}/edit/v3/apps/docs/:path`,
          text: 'Edit this page on GitHub'
        },
        outline: {
          level: [2, 3],
          label: 'On this page'
        },
        docFooter: {
          prev: 'Previous page',
          next: 'Next page'
        },
        lastUpdated: {
          text: 'Last updated'
        },
        returnToTopLabel: 'Return to top',
        sidebarMenuLabel: 'Menu',
        langMenuLabel: 'Change language',
        skipToContentLabel: 'Skip to content',
        darkModeSwitchLabel: 'Appearance',
        lightModeSwitchTitle: 'Switch to light theme',
        darkModeSwitchTitle: 'Switch to dark theme',
        notFound: {
          title: 'PAGE NOT FOUND',
          quote: 'The page you are looking for does not exist or has been moved.',
          linkLabel: 'Go to home',
          linkText: 'Take me home'
        },
        footer: {
          message: 'Keep the core for real business and stay restrained for unknown requirements.',
          copyright: 'MIT Licensed · ElementAdmin v3'
        }
      }
    }
  },
  lastUpdated: true,
  head: [['meta', { name: 'theme-color', content: '#5b5cf0' }]],
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    siteTitle: 'ElementAdmin v3',
    nav: [
      { text: '指南', link: '/guide/introduction', activeMatch: '/guide/' },
      { text: '核心能力', link: '/core/dynamic-routing', activeMatch: '/core/' },
      {
        text: '基础能力',
        link: '/capabilities/crud',
        activeMatch: '/(capabilities|infrastructure)/'
      },
      { text: '工程化', link: '/development/mock', activeMatch: '/development/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '项目介绍', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '目录与架构', link: '/guide/architecture' },
            { text: '配置与环境变量', link: '/guide/configuration' }
          ]
        }
      ],
      '/core/': [
        {
          text: '核心能力',
          items: [
            { text: '动态路由与权限', link: '/core/dynamic-routing' },
            { text: '布局、菜单与 TagsView', link: '/core/layouts-and-tags' },
            { text: 'Request 请求管理', link: '/core/request' },
            { text: '状态管理', link: '/core/state' }
          ]
        }
      ],
      '/capabilities/': [
        {
          text: '通用能力',
          items: [
            { text: 'CRUD', link: '/capabilities/crud' },
            { text: '表单', link: '/capabilities/form' }
          ]
        },
        {
          text: '基础设施',
          items: [
            { text: 'Packages 设计', link: '/infrastructure/packages' },
            { text: '图标注册', link: '/infrastructure/icons' },
            { text: '国际化与主题', link: '/infrastructure/i18n-theme' },
            { text: 'Element Plus 与样式', link: '/infrastructure/element-plus-styles' },
            { text: 'ECharts', link: '/infrastructure/echarts' }
          ]
        }
      ],
      '/infrastructure/': [
        {
          text: '基础设施',
          items: [
            { text: 'Packages 设计', link: '/infrastructure/packages' },
            { text: '图标注册', link: '/infrastructure/icons' },
            { text: '国际化与主题', link: '/infrastructure/i18n-theme' },
            { text: 'Element Plus 与样式', link: '/infrastructure/element-plus-styles' },
            { text: 'ECharts', link: '/infrastructure/echarts' }
          ]
        },
        {
          text: '通用能力',
          items: [
            { text: 'CRUD', link: '/capabilities/crud' },
            { text: '表单', link: '/capabilities/form' }
          ]
        }
      ],
      '/development/': [
        {
          text: '开发指南',
          items: [
            { text: 'Mock 与接口联调', link: '/development/mock' },
            { text: '代码规范', link: '/development/standards' },
            { text: '构建与部署', link: '/development/build-deploy' },
            { text: '常见问题', link: '/development/faq' }
          ]
        }
      ]
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '没有找到相关内容',
                resetButtonTitle: '清除查询条件',
                backButtonTitle: '关闭搜索',
                displayDetails: '显示详情',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          },
          en: {
            translations: {
              button: {
                buttonText: 'Search documentation',
                buttonAriaLabel: 'Search documentation'
              },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Reset search',
                backButtonTitle: 'Close search',
                displayDetails: 'Display details',
                footer: {
                  selectText: 'Select',
                  navigateText: 'Navigate',
                  closeText: 'Close'
                }
              }
            }
          }
        }
      }
    },
    socialLinks: [{ icon: 'github', link: repository }],
    editLink: {
      pattern: `${repository}/edit/v3/apps/docs/:path`,
      text: '在 GitHub 上编辑此页'
    },
    outline: {
      level: [2, 3],
      label: '本页内容'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    lastUpdated: {
      text: '最后更新于'
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    langMenuLabel: '切换语言',
    skipToContentLabel: '跳到正文',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    notFound: {
      title: '页面不存在',
      quote: '你访问的页面不存在或已经移动。',
      linkLabel: '返回首页',
      linkText: '回到首页'
    },
    footer: {
      message: '为真实业务保留核心，为未知需求保持克制。',
      copyright: 'MIT Licensed · ElementAdmin v3'
    }
  }
})

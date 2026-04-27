import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout, getParentLayout } from '@/utils/routerHelper'
import { NO_RESET_WHITE_LIST } from '@/constants'

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard/analysis',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'RedirectWrap',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true,
      noTagsView: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: 'router.login',
      noTagsView: true
    }
  },
  {
    path: '/personal',
    component: Layout,
    redirect: '/personal/personal-center',
    name: 'Personal',
    meta: {
      title: 'router.personal',
      hidden: true,
      canTo: true
    },
    children: [
      {
        path: 'personal-center',
        component: () => import('@/views/Personal/PersonalCenter/PersonalCenter.vue'),
        name: 'PersonalCenter',
        meta: {
          title: 'router.personalCenter',
          hidden: true,
          canTo: true
        }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/analysis',
    name: 'Dashboard',
    meta: {
      title: 'router.dashboard',
      icon: 'vi-ant-design:dashboard-filled',
      alwaysShow: true
    },
    children: [
      {
        path: 'analysis',
        component: () => import('@/views/Dashboard/Analysis.vue'),
        name: 'Analysis',
        meta: {
          title: 'router.analysis',
          noCache: true,
          affix: true
        }
      },
      {
        path: 'workplace',
        component: () => import('@/views/Dashboard/Workplace.vue'),
        name: 'Workplace',
        meta: {
          title: 'router.workplace',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/external-link',
    component: Layout,
    meta: {},
    name: 'ExternalLink',
    children: [
      {
        path: 'https://element-plus-admin-doc.cn/',
        name: 'DocumentLink',
        meta: {
          title: 'router.document',
          icon: 'vi-clarity:document-solid'
        }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    name: 'Guide',
    meta: {},
    children: [
      {
        path: 'index',
        component: () => import('@/views/Guide/Guide.vue'),
        name: 'GuideDemo',
        meta: {
          title: 'router.guide',
          icon: 'vi-cib:telegram-plane'
        }
      }
    ]
  },
  {
    path: '/components',
    component: Layout,
    name: 'ComponentsDemo',
    meta: {
      title: 'router.component',
      icon: 'vi-bx:bxs-component',
      alwaysShow: true
    },
    children: [
      {
        path: 'form',
        component: getParentLayout(),
        redirect: '/components/form/default-form',
        name: 'Form',
        meta: {
          title: 'router.form',
          alwaysShow: true
        },
        children: [
          {
            path: 'default-form',
            component: () => import('@/views/Components/Form/DefaultForm.vue'),
            name: 'DefaultForm',
            meta: {
              title: 'router.defaultForm'
            }
          },
          {
            path: 'use-form',
            component: () => import('@/views/Components/Form/UseFormDemo.vue'),
            name: 'UseForm',
            meta: {
              title: 'UseForm'
            }
          }
        ]
      },
      {
        path: 'table',
        component: getParentLayout(),
        redirect: '/components/table/default-table',
        name: 'TableDemo',
        meta: {
          title: 'router.table',
          alwaysShow: true
        },
        children: [
          {
            path: 'default-table',
            component: () => import('@/views/Components/Table/DefaultTable.vue'),
            name: 'DefaultTable',
            meta: {
              title: 'router.defaultTable'
            }
          },
          {
            path: 'use-table',
            component: () => import('@/views/Components/Table/UseTableDemo.vue'),
            name: 'UseTable',
            meta: {
              title: 'UseTable'
            }
          },
          {
            path: 'tree-table',
            component: () => import('@/views/Components/Table/TreeTable.vue'),
            name: 'TreeTable',
            meta: {
              title: 'router.treeTable'
            }
          },
          {
            path: 'table-image-preview',
            component: () => import('@/views/Components/Table/TableImagePreview.vue'),
            name: 'TableImagePreview',
            meta: {
              title: 'router.PicturePreview'
            }
          },
          {
            path: 'table-video-preview',
            component: () => import('@/views/Components/Table/TableVideoPreview.vue'),
            name: 'TableVideoPreview',
            meta: {
              title: 'router.tableVideoPreview'
            }
          },
          {
            path: 'card-table',
            component: () => import('@/views/Components/Table/CardTable.vue'),
            name: 'CardTable',
            meta: {
              title: 'router.cardTable'
            }
          }
        ]
      },
      {
        path: 'editor-demo',
        component: getParentLayout(),
        redirect: '/components/editor-demo/editor',
        name: 'EditorDemo',
        meta: {
          title: 'router.editor',
          alwaysShow: true
        },
        children: [
          {
            path: 'editor',
            component: () => import('@/views/Components/Editor/Editor.vue'),
            name: 'Editor',
            meta: {
              title: 'router.richText'
            }
          },
          {
            path: 'json-editor',
            component: () => import('@/views/Components/Editor/JsonEditor.vue'),
            name: 'JsonEditor',
            meta: {
              title: 'router.jsonEditor'
            }
          }
        ]
      },
      {
        path: 'search',
        component: () => import('@/views/Components/Search.vue'),
        name: 'Search',
        meta: {
          title: 'router.search'
        }
      },
      {
        path: 'descriptions',
        component: () => import('@/views/Components/Descriptions.vue'),
        name: 'Descriptions',
        meta: {
          title: 'router.descriptions'
        }
      },
      {
        path: 'image-viewer',
        component: () => import('@/views/Components/ImageViewer.vue'),
        name: 'ImageViewer',
        meta: {
          title: 'router.imageViewer'
        }
      },
      {
        path: 'dialog',
        component: () => import('@/views/Components/Dialog.vue'),
        name: 'Dialog',
        meta: {
          title: 'router.dialog'
        }
      },
      {
        path: 'icon',
        component: () => import('@/views/Components/Icon.vue'),
        name: 'Icon',
        meta: {
          title: 'router.icon'
        }
      },
      {
        path: 'icon-picker',
        component: () => import('@/views/Components/IconPicker.vue'),
        name: 'IconPicker',
        meta: {
          title: 'router.iconPicker'
        }
      },
      {
        path: 'echart',
        component: () => import('@/views/Components/Echart.vue'),
        name: 'Echart',
        meta: {
          title: 'router.echart'
        }
      },
      {
        path: 'count-to',
        component: () => import('@/views/Components/CountTo.vue'),
        name: 'CountTo',
        meta: {
          title: 'router.countTo'
        }
      },
      {
        path: 'qrcode',
        component: () => import('@/views/Components/Qrcode.vue'),
        name: 'Qrcode',
        meta: {
          title: 'router.qrcode'
        }
      },
      {
        path: 'highlight',
        component: () => import('@/views/Components/Highlight.vue'),
        name: 'Highlight',
        meta: {
          title: 'router.highlight'
        }
      },
      {
        path: 'infotip',
        component: () => import('@/views/Components/Infotip.vue'),
        name: 'Infotip',
        meta: {
          title: 'router.infotip'
        }
      },
      {
        path: 'input-password',
        component: () => import('@/views/Components/InputPassword.vue'),
        name: 'InputPassword',
        meta: {
          title: 'router.inputPassword'
        }
      },
      {
        path: 'waterfall',
        component: () => import('@/views/Components/Waterfall.vue'),
        name: 'waterfall',
        meta: {
          title: 'router.waterfall'
        }
      },
      {
        path: 'image-cropping',
        component: () => import('@/views/Components/ImageCropping.vue'),
        name: 'ImageCropping',
        meta: {
          title: 'router.imageCropping'
        }
      },
      {
        path: 'video-player',
        component: () => import('@/views/Components/VideoPlayer.vue'),
        name: 'VideoPlayer',
        meta: {
          title: 'router.videoPlayer'
        }
      },
      {
        path: 'avatars',
        component: () => import('@/views/Components/Avatars.vue'),
        name: 'Avatars',
        meta: {
          title: 'router.avatars'
        }
      },
      {
        path: 'i-agree',
        component: () => import('@/views/Components/IAgree.vue'),
        name: 'IAgree',
        meta: {
          title: 'router.iAgree'
        }
      }
    ]
  },
  {
    path: '/function',
    component: Layout,
    redirect: '/function/multipleTabs',
    name: 'Function',
    meta: {
      title: 'router.function',
      icon: 'vi-ri:function-fill',
      alwaysShow: true
    },
    children: [
      {
        path: 'multiple-tabs',
        component: () => import('@/views/Function/MultipleTabs.vue'),
        name: 'MultipleTabs',
        meta: {
          title: 'router.multipleTabs'
        }
      },
      {
        path: 'multiple-tabs-demo/:id',
        component: () => import('@/views/Function/MultipleTabsDemo.vue'),
        name: 'MultipleTabsDemo',
        meta: {
          hidden: true,
          title: 'router.details',
          canTo: true,
          activeMenu: '/function/multiple-tabs'
        }
      },
      {
        path: 'request',
        component: () => import('@/views/Function/Request.vue'),
        name: 'Request',
        meta: {
          title: 'router.request'
        }
      },
      {
        path: 'test',
        component: () => import('@/views/Function/Test.vue'),
        name: 'Test',
        meta: {
          title: 'router.permission',
          permission: ['add', 'edit', 'delete']
        }
      }
    ]
  },
  {
    path: '/hooks',
    component: Layout,
    redirect: '/hooks/useWatermark',
    name: 'Hooks',
    meta: {
      title: 'hooks',
      icon: 'vi-ic:outline-webhook',
      alwaysShow: true
    },
    children: [
      {
        path: 'useWatermark',
        component: () => import('@/views/hooks/useWatermark.vue'),
        name: 'UseWatermark',
        meta: {
          title: 'useWatermark'
        }
      },
      {
        path: 'useTagsView',
        component: () => import('@/views/hooks/useTagsView.vue'),
        name: 'UseTagsView',
        meta: {
          title: 'useTagsView'
        }
      },
      {
        path: 'useValidator',
        component: () => import('@/views/hooks/useValidator.vue'),
        name: 'UseValidator',
        meta: {
          title: 'useValidator'
        }
      },
      {
        path: 'useCrudSchemas',
        component: () => import('@/views/hooks/useCrudSchemas.vue'),
        name: 'UseCrudSchemas',
        meta: {
          title: 'useCrudSchemas'
        }
      },
      {
        path: 'useClipboard',
        component: () => import('@/views/hooks/useClipboard.vue'),
        name: 'UseClipboard',
        meta: {
          title: 'useClipboard'
        }
      },
      {
        path: 'useNetwork',
        component: () => import('@/views/hooks/useNetwork.vue'),
        name: 'UseNetwork',
        meta: {
          title: 'useNetwork'
        }
      }
    ]
  },
  {
    path: '/level',
    component: Layout,
    redirect: '/level/menu1/menu1-1/menu1-1-1',
    name: 'Level',
    meta: {
      title: 'router.level',
      icon: 'vi-carbon:skill-level-advanced'
    },
    children: [
      {
        path: 'menu1',
        name: 'Menu1',
        component: getParentLayout(),
        redirect: '/level/menu1/menu1-1/menu1-1-1',
        meta: {
          title: 'router.menu1'
        },
        children: [
          {
            path: 'menu1-1',
            name: 'Menu11',
            component: getParentLayout(),
            redirect: '/level/menu1/menu1-1/menu1-1-1',
            meta: {
              title: 'router.menu11',
              alwaysShow: true
            },
            children: [
              {
                path: 'menu1-1-1',
                name: 'Menu111',
                component: () => import('@/views/Level/Menu111.vue'),
                meta: {
                  title: 'router.menu111'
                }
              }
            ]
          },
          {
            path: 'menu1-2',
            name: 'Menu12',
            component: () => import('@/views/Level/Menu12.vue'),
            meta: {
              title: 'router.menu12'
            }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: () => import('@/views/Level/Menu2.vue'),
        meta: {
          title: 'router.menu2'
        }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/example-dialog',
    name: 'Example',
    meta: {
      title: 'router.example',
      icon: 'vi-ep:management',
      alwaysShow: true
    },
    children: [
      {
        path: 'example-dialog',
        component: () => import('@/views/Example/Dialog/ExampleDialog.vue'),
        name: 'ExampleDialog',
        meta: {
          title: 'router.exampleDialog'
        }
      },
      {
        path: 'example-page',
        component: () => import('@/views/Example/Page/ExamplePage.vue'),
        name: 'ExamplePage',
        meta: {
          title: 'router.examplePage'
        }
      },
      {
        path: 'example-add',
        component: () => import('@/views/Example/Page/ExampleAdd.vue'),
        name: 'ExampleAdd',
        meta: {
          title: 'router.exampleAdd',
          noTagsView: true,
          noCache: true,
          hidden: true,
          canTo: true,
          activeMenu: '/example/example-page'
        }
      },
      {
        path: 'example-edit',
        component: () => import('@/views/Example/Page/ExampleEdit.vue'),
        name: 'ExampleEdit',
        meta: {
          title: 'router.exampleEdit',
          noTagsView: true,
          noCache: true,
          hidden: true,
          canTo: true,
          activeMenu: '/example/example-page'
        }
      },
      {
        path: 'example-detail',
        component: () => import('@/views/Example/Page/ExampleDetail.vue'),
        name: 'ExampleDetail',
        meta: {
          title: 'router.exampleDetail',
          noTagsView: true,
          noCache: true,
          hidden: true,
          canTo: true,
          activeMenu: '/example/example-page'
        }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: '/error/404',
    name: 'Error',
    meta: {
      title: 'router.errorPage',
      icon: 'vi-ci:error',
      alwaysShow: true
    },
    children: [
      {
        path: '404-demo',
        component: () => import('@/views/Error/404.vue'),
        name: '404Demo',
        meta: {
          title: '404'
        }
      },
      {
        path: '403-demo',
        component: () => import('@/views/Error/403.vue'),
        name: '403Demo',
        meta: {
          title: '403'
        }
      },
      {
        path: '500-demo',
        component: () => import('@/views/Error/500.vue'),
        name: '500Demo',
        meta: {
          title: '500'
        }
      }
    ]
  },
  {
    path: '/authorization',
    component: Layout,
    redirect: '/authorization/user',
    name: 'Authorization',
    meta: {
      title: 'router.authorization',
      icon: 'vi-eos-icons:role-binding',
      alwaysShow: true
    },
    children: [
      {
        path: 'department',
        component: () => import('@/views/Authorization/Department/Department.vue'),
        name: 'Department',
        meta: {
          title: 'router.department'
        }
      },
      {
        path: 'user',
        component: () => import('@/views/Authorization/User/User.vue'),
        name: 'User',
        meta: {
          title: 'router.user'
        }
      },
      {
        path: 'menu',
        component: () => import('@/views/Authorization/Menu/Menu.vue'),
        name: 'Menu',
        meta: {
          title: 'router.menuManagement'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/Authorization/Role/Role.vue'),
        name: 'Role',
        meta: {
          title: 'router.role'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = (): void => {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !NO_RESET_WHITE_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router

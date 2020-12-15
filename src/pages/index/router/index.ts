import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { AppRouteRecordRaw } from './types'
import type { App } from 'vue'
import { getParentLayout } from './utils'

/* Layout */
const Layout = () => import('../layout/index.vue')
/* ParentView */
import ParentView from '_c/ParentView/index.vue'

/**
* redirect: noredirect        当设置 noredirect 的时候该路由在面包屑导航中不可被点击
* name:'router-name'          设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
* meta : {
    hidden: true              当设置 true 的时候该路由不会再侧边栏出现 如404，login等页面(默认 false)
    alwaysShow: true          当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式，
                              只有一个时，会将那个子路由当做根路由显示在侧边栏，
                              若你想不管路由下面的 children 声明的个数都显示你的根路由，
                              你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，
                              一直显示根路由(默认 false)
    title: 'title'            设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'          设置该路由的图标
    noCache: true             如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    breadcrumb: false         如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
    affix: true               如果设置为true，则会一直固定在tag项中(默认 false)
    noTagsView: true           如果设置为true，则不会出现在tag中(默认 false)
    activeMenu: '/dashboard'  显示高亮的路由路径
  }
**/

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('_c/Redirect/index.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true
    }
  },
  {
    path: '/404',
    component: () => import('_c/Error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404'
    }
  },
  {
    path: '/login',
    component: () => import('_p/index/views/login/index.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: '登录'
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Root',
    meta: {},
    children: [
      {
        path: 'dashboard',
        component: () => import('_p/index/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: 'dashboard',
          noCache: true,
          affix: true
        }
      }
    ]
  },
  // {
  //   path: '/external-link',
  //   component: Layout,
  //   meta: {},
  //   children: [
  //     {
  //       path: 'http://192.168.169.57/ue/2019/doc/vue-standard/dist/',
  //       meta: { title: '文档', icon: 'documentation' }
  //     }
  //   ]
  // }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  // {
  //   path: '/components-demo',
  //   component: Layout,
  //   redirect: '/components-demo/echarts',
  //   name: 'ComponentsDemo',
  //   meta: {
  //     title: '功能组件',
  //     icon: 'component',
  //     alwaysShow: true
  //   },
  //   children: [
  //     {
  //       path: 'echarts',
  //       component: () => import('_p/index/views/components-demo/echarts/index.vue'),
  //       name: 'EchartsDemo',
  //       meta: {
  //         title: '图表'
  //       }
  //     },
  //     {
  //       path: 'image',
  //       component: () => import('_p/index/views/components-demo/image/index.vue'),
  //       name: 'ImageDemo',
  //       meta: {
  //         title: '图片'
  //       }
  //     },
  //     {
  //       path: 'preview',
  //       component: () => import('_p/index/views/components-demo/preview/index.vue'),
  //       name: 'PreviewDemo',
  //       meta: {
  //         title: '图片预览'
  //       }
  //     },
  //     {
  //       path: 'scroll',
  //       component: () => import('_p/index/views/components-demo/scroll/index.vue'),
  //       name: 'ScrollDemo',
  //       meta: {
  //         title: '滚动'
  //       }
  //     },
  //     {
  //       path: 'count-to',
  //       component: () => import('_p/index/views/components-demo/count-to/index.vue'),
  //       name: 'CountToDemo',
  //       meta: {
  //         title: '数字动画'
  //       }
  //     },
  //     {
  //       path: 'search',
  //       component: () => import('_p/index/views/components-demo/search/index.vue'),
  //       name: 'SearchDemo',
  //       meta: {
  //         title: '查询'
  //       }
  //     },
  //     {
  //       path: 'button',
  //       component: () => import('_p/index/views/components-demo/button/index.vue'),
  //       name: 'ButtonDemo',
  //       meta: {
  //         title: '按钮'
  //       }
  //     },
  //     {
  //       path: 'editor',
  //       component: () => import('_p/index/views/components-demo/editor/index.vue'),
  //       name: 'EditorDemo',
  //       meta: {
  //         title: '富文本编辑器'
  //       }
  //     },
  //     {
  //       path: 'markdown',
  //       component: () => import('_p/index/views/components-demo/markdown/index.vue'),
  //       name: 'MarkdownDemo',
  //       meta: {
  //         title: 'markdown编辑器'
  //       }
  //     }
  //   ]
  // },
  // // {
  // //   path: '/table-demo',
  // //   component: Layout,
  // //   redirect: '/table-demo/basic-usage',
  // //   name: 'TableDemo',
  // //   meta: {
  // //     title: '表格',
  // //     icon: 'table',
  // //     alwaysShow: true
  // //   },
  // //   children: [
  // //     // {
  // //     //   path: 'test',
  // //     //   component: () => import('_p/index/views/table-demo/test'),
  // //     //   name: 'test',
  // //     //   meta: {
  // //     //     title: 'test'
  // //     //   }
  // //     // },
  // //     {
  // //       path: 'basic-usage',
  // //       component: () => import('_p/index/views/table-demo/basic-usage/index.vue'),
  // //       name: 'BasicUsage',
  // //       meta: {
  // //         title: '基础用法'
  // //       }
  // //     },
  // //     {
  // //       path: 'table-ellipsis',
  // //       component: () => import('_p/index/views/table-demo/table-ellipsis/index.vue'),
  // //       name: 'TableEllipsis',
  // //       meta: {
  // //         title: '单元格自动省略'
  // //       }
  // //     },
  // //     {
  // //       path: 'table-load',
  // //       component: () => import('_p/index/views/table-demo/table-load/index.vue'),
  // //       name: 'TableLoad',
  // //       meta: {
  // //         title: '远程加载数据'
  // //       }
  // //     },
  // //     {
  // //       path: 'table-border',
  // //       component: () => import('_p/index/views/table-demo/table-border/index.vue'),
  // //       name: 'TableBorder',
  // //       meta: {
  // //         title: '带边框'
  // //       }
  // //     },
  // //     {
  // //       path: 'table-merge',
  // //       component: () => import('_p/index/views/table-demo/table-merge/index.vue'),
  // //       name: 'TableMerge',
  // //       meta: {
  // //         title: '表格行/列合并'
  // //       }
  // //     },
  // //     {
  // //       path: 'custom-menu',
  // //       component: () => import('_p/index/views/table-demo/custom-menu/index.vue'),
  // //       name: 'CustomMenu',
  // //       meta: {
  // //         title: '自定义筛选菜单'
  // //       }
  // //     },
  // //     {
  // //       path: 'edit-cell',
  // //       component: () => import('_p/index/views/table-demo/edit-cell/index.vue'),
  // //       name: 'EditCell',
  // //       meta: {
  // //         title: '可编辑单元格'
  // //       }
  // //     },
  // //     {
  // //       path: 'edit-row',
  // //       component: () => import('_p/index/views/table-demo/edit-row/index.vue'),
  // //       name: 'EditRow',
  // //       meta: {
  // //         title: '可编辑行'
  // //       }
  // //     },
  // //     {
  // //       path: 'table-tree',
  // //       component: () => import('_p/index/views/table-demo/table-tree/index.vue'),
  // //       name: 'TableTree',
  // //       meta: {
  // //         title: '树形数据展示'
  // //       }
  // //     },
  // //     {
  // //       path: 'table-expanded',
  // //       component: () => import('_p/index/views/table-demo/table-expanded/index.vue'),
  // //       name: 'TableExpanded',
  // //       meta: {
  // //         title: '可展开'
  // //       }
  // //     },
  // //     {
  // //       path: 'fixed-header',
  // //       component: () => import('_p/index/views/table-demo/fixed-header/index.vue'),
  // //       name: 'FixedHeader',
  // //       meta: {
  // //         title: '固定头和列'
  // //       }
  // //     }
  // //   ]
  // // },
  // {
  //   path: '/directives-demo',
  //   component: Layout,
  //   redirect: '/directives-demo/clipboard',
  //   name: 'DirectivesDemo',
  //   meta: {
  //     title: '自定义指令',
  //     icon: 'clipboard',
  //     alwaysShow: true
  //   },
  //   children: [
  //     {
  //       path: 'clipboard',
  //       component: () => import('_p/index/views/directives-demo/clipboard/index.vue'),
  //       name: 'ClipboardDemo',
  //       meta: {
  //         title: 'Clipboard'
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/hooks-demo',
  //   component: Layout,
  //   redirect: '/hooks-demo/watermark',
  //   name: 'HooksDemo',
  //   meta: {
  //     title: 'Hooks',
  //     icon: 'international',
  //     alwaysShow: true
  //   },
  //   children: [
  //     {
  //       path: 'watermark',
  //       component: () => import('_p/index/views/hooks-demo/useWatermark/index.vue'),
  //       name: 'UseWatermarkDemo',
  //       meta: {
  //         title: 'UseWaterMark'
  //       }
  //     },
  //     {
  //       path: 'useScrollTo',
  //       component: () => import('_p/index/views/hooks-demo/useScrollTo/index.vue'),
  //       name: 'UseScrollToDemo',
  //       meta: {
  //         title: 'UseScrollTo'
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/icon',
  //   component: Layout,
  //   name: 'IconsDemo',
  //   meta: {},
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('_p/index/views/icons/index.vue'),
  //       name: 'Icons',
  //       meta: {
  //         title: '图标',
  //         icon: 'icon'
  //       }
  //     }
  //   ]
  // },
  {
    path: '/level',
    component: Layout,
    redirect: '/level/menu1/menu1-1/menu1-1-1',
    name: 'Level',
    meta: {
      title: '多级菜单缓存',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        name: 'Menu1Demo',
        component: getParentLayout('Menu1Demo'),
        redirect: '/level/menu1/menu1-1/menu1-1-1',
        meta: {
          title: 'Menu1'
        },
        children: [
          {
            path: 'menu1-1',
            name: 'Menu11Demo',
            component: getParentLayout('Menu11Demo'),
            redirect: '/level/menu1/menu1-1/menu1-1-1',
            meta: {
              title: 'Menu1-1',
              alwaysShow: true
            },
            children: [
              {
                path: 'menu1-1-1',
                name: 'Menu111Demo',
                component: () => import('_p/index/views/level/Menu111.vue'),
                meta: {
                  title: 'Menu1-1-1'
                }
              }
            ]
          },
          {
            path: 'menu1-2',
            name: 'Menu12Demo',
            component: () => import('_p/index/views/level/Menu12.vue'),
            meta: {
              title: 'Menu1-2'
            }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2Demo',
        component: () => import('_p/index/views/level/Menu2.vue'),
        meta: {
          title: 'Menu2'
        }
      }
    ]
  },
  // {
  //   path: '/example-demo',
  //   component: Layout,
  //   name: 'ExampleDemo',
  //   meta: {
  //     alwaysShow: true,
  //     icon: 'example',
  //     title: '综合实例'
  //   },
  //   children: [
  //     {
  //       path: 'example',
  //       component: () => import('_p/index/views/example-demo/example/index.vue'),
  //       name: 'Example',
  //       meta: {
  //         title: '列表综合实例'
  //       }
  //     }
  //   ]
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[]
})

export function resetRouter(): void {
  const resetWhiteNameList = [
    'RedirectRoot',
    'Redirect',
    'Login',
    'Root',
    'Dashboard',
    'Page404'
  ]
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export function setupRouter(app: App<Element>) {
  app.use(router)
}

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { AppRouteRecordRaw } from './types'
import type { App } from 'vue'
import { getParentLayout } from './utils'

/* Layout */
const Layout = () => import('../layout/index.vue')

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
    followAuth: '/dashboard'  跟随哪个路由进行权限过滤
    showMainRoute: true       设置为true即使hidden为true，也依然可以进行路由跳转(默认 false)
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
      title: '404',
      noTagsView: true
    }
  },
  {
    path: '/login',
    component: () => import('_p/index/views/login/index.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: '登录',
      noTagsView: true
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
  {
    path: '/external-link',
    component: Layout,
    meta: {},
    children: [
      {
        path: 'http://192.168.169.57/ue/2019/doc/vue-standard/dist/',
        meta: { title: '文档', icon: 'documentation' }
      }
    ]
  }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/components-demo',
    component: Layout,
    redirect: '/components-demo/echarts',
    name: 'ComponentsDemo',
    meta: {
      title: '功能组件',
      icon: 'component',
      alwaysShow: true
    },
    children: [
      {
        path: 'echarts',
        component: () => import('_p/index/views/components-demo/echarts/index.vue'),
        name: 'EchartsDemo',
        meta: {
          title: '图表'
        }
      },
      {
        path: 'preview',
        component: () => import('_p/index/views/components-demo/preview/index.vue'),
        name: 'PreviewDemo',
        meta: {
          title: '图片预览'
        }
      },
      {
        path: 'button',
        component: () => import('_p/index/views/components-demo/button/index.vue'),
        name: 'ButtonDemo',
        meta: {
          title: '按钮'
        }
      },
      {
        path: 'message',
        component: () => import('_p/index/views/components-demo/message/index.vue'),
        name: 'MessageDemo',
        meta: {
          title: '消息提示'
        }
      },
      {
        path: 'count-to',
        component: () => import('_p/index/views/components-demo/count-to/index.vue'),
        name: 'CountToDemo',
        meta: {
          title: '数字动画'
        }
      },
      {
        path: 'search',
        component: () => import('_p/index/views/components-demo/search/index.vue'),
        name: 'SearchDemo',
        meta: {
          title: '查询'
        }
      },
      {
        path: 'editor',
        component: () => import('_p/index/views/components-demo/editor/index.vue'),
        name: 'EditorDemo',
        meta: {
          title: '富文本编辑器'
        }
      },
      {
        path: 'markdown',
        component: () => import('_p/index/views/components-demo/markdown/index.vue'),
        name: 'MarkdownDemo',
        meta: {
          title: 'markdown编辑器'
        }
      },
      {
        path: 'dialog',
        component: () => import('_p/index/views/components-demo/dialog/index.vue'),
        name: 'DialogDemo',
        meta: {
          title: '弹窗'
        }
      },
      {
        path: 'more',
        component: () => import('_p/index/views/components-demo/more/index.vue'),
        name: 'MoreDemo',
        meta: {
          title: '显示更多'
        }
      },
      {
        path: 'detail',
        component: () => import('_p/index/views/components-demo/detail/index.vue'),
        name: 'DetailDemo',
        meta: {
          title: '详情组件'
        }
      }
    ]
  },
  {
    path: '/table-demo',
    component: Layout,
    redirect: '/table-demo/basic-usage',
    name: 'TableDemo',
    meta: {
      title: '表格',
      icon: 'table',
      alwaysShow: true
    },
    children: [
      // {
      //   path: 'test',
      //   component: () => import('_p/index/views/table-demo/test'),
      //   name: 'test',
      //   meta: {
      //     title: 'test'
      //   }
      // },
      {
        path: 'basic-table',
        component: () => import('_p/index/views/table-demo/basic-table/index.vue'),
        name: 'BasicTable',
        meta: {
          title: '基础表格'
        }
      },
      {
        path: 'page-table',
        component: () => import('_p/index/views/table-demo/page-table/index.vue'),
        name: 'PageTable',
        meta: {
          title: '分页表格'
        }
      },
      {
        path: 'stripe-table',
        component: () => import('_p/index/views/table-demo/stripe-table/index.vue'),
        name: 'StripeTable',
        meta: {
          title: '带斑马纹表格'
        }
      },
      {
        path: 'border-table',
        component: () => import('_p/index/views/table-demo/border-table/index.vue'),
        name: 'BorderTable',
        meta: {
          title: '带边框表格'
        }
      },
      {
        path: 'state-table',
        component: () => import('_p/index/views/table-demo/state-table/index.vue'),
        name: 'StateTable',
        meta: {
          title: '带状态表格'
        }
      },
      {
        path: 'fixed-header',
        component: () => import('_p/index/views/table-demo/fixed-header/index.vue'),
        name: 'FixedHeader',
        meta: {
          title: '固定表头'
        }
      },
      {
        path: 'fixed-column',
        component: () => import('_p/index/views/table-demo/fixed-column/index.vue'),
        name: 'FixedColumn',
        meta: {
          title: '固定列'
        }
      },
      {
        path: 'fixed-column-header',
        component: () => import('_p/index/views/table-demo/fixed-column-header/index.vue'),
        name: 'FixedColumnHeader',
        meta: {
          title: '固定列和表头'
        }
      },
      {
        path: 'fluid-height',
        component: () => import('_p/index/views/table-demo/fluid-height/index.vue'),
        name: 'FluidHeight',
        meta: {
          title: '流体高度'
        }
      },
      {
        path: 'multi-header',
        component: () => import('_p/index/views/table-demo/multi-header/index.vue'),
        name: 'MultiHeader',
        meta: {
          title: '多级表头'
        }
      },
      {
        path: 'single-choice',
        component: () => import('_p/index/views/table-demo/single-choice/index.vue'),
        name: 'SingleChoice',
        meta: {
          title: '单选'
        }
      },
      {
        path: 'multiple-choice',
        component: () => import('_p/index/views/table-demo/multiple-choice/index.vue'),
        name: 'MultipleChoice',
        meta: {
          title: '多选'
        }
      },
      {
        path: 'sort-table',
        component: () => import('_p/index/views/table-demo/sort-table/index.vue'),
        name: 'SortTable',
        meta: {
          title: '排序'
        }
      },
      {
        path: 'screen-table',
        component: () => import('_p/index/views/table-demo/screen-table/index.vue'),
        name: 'ScreenTable',
        meta: {
          title: '筛选'
        }
      },
      {
        path: 'expand-row',
        component: () => import('_p/index/views/table-demo/expand-row/index.vue'),
        name: 'ExpandRow',
        meta: {
          title: '展开行'
        }
      },
      {
        path: 'tree-and-load',
        component: () => import('_p/index/views/table-demo/tree-and-load/index.vue'),
        name: 'TreeAndLoad',
        meta: {
          title: '树形数据与懒加载'
        }
      },
      {
        path: 'custom-header',
        component: () => import('_p/index/views/table-demo/custom-header/index.vue'),
        name: 'CustomHeader',
        meta: {
          title: '自定义表头'
        }
      },
      {
        path: 'total-table',
        component: () => import('_p/index/views/table-demo/total-table/index.vue'),
        name: 'TotalTable',
        meta: {
          title: '表尾合计行'
        }
      },
      {
        path: 'merge-table',
        component: () => import('_p/index/views/table-demo/merge-table/index.vue'),
        name: 'MergeTable',
        meta: {
          title: '合并行或列'
        }
      },
      {
        path: 'custom-index',
        component: () => import('_p/index/views/table-demo/custom-index/index.vue'),
        name: 'CustomIndex',
        meta: {
          title: '自定义索引'
        }
      }
    ]
  },
  {
    path: '/directives-demo',
    component: Layout,
    redirect: '/directives-demo/clipboard',
    name: 'DirectivesDemo',
    meta: {
      title: '自定义指令',
      icon: 'clipboard',
      alwaysShow: true
    },
    children: [
      {
        path: 'clipboard',
        component: () => import('_p/index/views/directives-demo/clipboard/index.vue'),
        name: 'ClipboardDemo',
        meta: {
          title: 'Clipboard'
        }
      }
    ]
  },
  {
    path: '/hooks-demo',
    component: Layout,
    redirect: '/hooks-demo/watermark',
    name: 'HooksDemo',
    meta: {
      title: 'Hooks',
      icon: 'international',
      alwaysShow: true
    },
    children: [
      {
        path: 'watermark',
        component: () => import('_p/index/views/hooks-demo/useWatermark/index.vue'),
        name: 'UseWatermarkDemo',
        meta: {
          title: 'UseWaterMark'
        }
      },
      {
        path: 'useScrollTo',
        component: () => import('_p/index/views/hooks-demo/useScrollTo/index.vue'),
        name: 'UseScrollToDemo',
        meta: {
          title: 'UseScrollTo'
        }
      }
    ]
  },
  {
    path: '/icon',
    component: Layout,
    name: 'IconsDemo',
    meta: {},
    children: [
      {
        path: 'index',
        component: () => import('_p/index/views/icons/index.vue'),
        name: 'Icons',
        meta: {
          title: '图标',
          icon: 'icon'
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
  {
    path: '/example-demo',
    component: Layout,
    name: 'ExampleDemo',
    redirect: '/example-demo/example-dialog',
    meta: {
      alwaysShow: true,
      icon: 'example',
      title: '综合实例'
    },
    children: [
      {
        path: 'example-dialog',
        component: () => import('_p/index/views/example-demo/example-dialog/index.vue'),
        name: 'ExampleDialog',
        meta: {
          title: '列表综合实例-弹窗'
        }
      },
      {
        path: 'example-page',
        component: () => import('_p/index/views/example-demo/example-page/index.vue'),
        name: 'ExamplePage',
        meta: {
          title: '列表综合实例-页面'
        }
      },
      {
        path: 'example-add',
        component: () => import('_p/index/views/example-demo/example-page/example-add.vue'),
        name: 'ExampleAdd',
        meta: {
          title: '列表综合实例-新增',
          noTagsView: true,
          noCache: true,
          hidden: true,
          showMainRoute: true,
          activeMenu: '/example-demo/example-page'
        }
      },
      {
        path: 'example-edit',
        component: () => import('_p/index/views/example-demo/example-page/example-edit.vue'),
        name: 'ExampleEdit',
        meta: {
          title: '列表综合实例-编辑',
          noTagsView: true,
          noCache: true,
          hidden: true,
          showMainRoute: true,
          activeMenu: '/example-demo/example-page'
        }
      },
      {
        path: 'example-detail',
        component: () => import('_p/index/views/example-demo/example-page/example-detail.vue'),
        name: 'ExampleDetail',
        meta: {
          title: '列表综合实例-详情',
          noTagsView: true,
          noCache: true,
          hidden: true,
          showMainRoute: true,
          activeMenu: '/example-demo/example-page'
        }
      }
    ]
  }
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

export const checkedRoleNodes = [
  {
    path: '/components-demo',
    component: '#',
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
        component: 'pages/index/views/components-demo/echarts/index.vue',
        name: 'EchartsDemo',
        meta: {
          title: '图表'
        }
      },
      {
        path: 'preview',
        component: 'pages/index/views/components-demo/preview/index.vue',
        name: 'PreviewDemo',
        meta: {
          title: '图片预览'
        }
      },
      {
        path: 'button',
        component: 'pages/index/views/components-demo/button/index.vue',
        name: 'ButtonDemo',
        meta: {
          title: '按钮'
        }
      },
      {
        path: 'message',
        component: 'pages/index/views/components-demo/message/index.vue',
        name: 'MessageDemo',
        meta: {
          title: '消息提示'
        }
      },
      {
        path: 'count-to',
        component: 'pages/index/views/components-demo/count-to/index.vue',
        name: 'CountToDemo',
        meta: {
          title: '数字动画'
        }
      },
      {
        path: 'search',
        component: 'pages/index/views/components-demo/search/index.vue',
        name: 'SearchDemo',
        meta: {
          title: '查询'
        }
      },
      {
        path: 'editor',
        component: 'pages/index/views/components-demo/editor/index.vue',
        name: 'EditorDemo',
        meta: {
          title: '富文本编辑器'
        }
      },
      {
        path: 'markdown',
        component: 'pages/index/views/components-demo/markdown/index.vue',
        name: 'MarkdownDemo',
        meta: {
          title: 'markdown编辑器'
        }
      },
      {
        path: 'dialog',
        component: 'pages/index/views/components-demo/dialog/index.vue',
        name: 'DialogDemo',
        meta: {
          title: '弹窗'
        }
      },
      {
        path: 'more',
        component: 'pages/index/views/components-demo/more/index.vue',
        name: 'MoreDemo',
        meta: {
          title: '显示更多'
        }
      },
      {
        path: 'detail',
        component: 'pages/index/views/components-demo/detail/index.vue',
        name: 'DetailDemo',
        meta: {
          title: '详情组件'
        }
      }
    ]
  },
  {
    path: '/table-demo',
    component: '#',
    redirect: '/table-demo/basic-usage',
    name: 'TableDemo',
    meta: {
      title: '表格',
      icon: 'table',
      alwaysShow: true
    },
    children: [
      {
        path: 'basic-table',
        component: 'pages/index/views/table-demo/basic-table/index.vue',
        name: 'BasicTable',
        meta: {
          title: '基础表格'
        }
      },
      {
        path: 'page-table',
        component: 'pages/index/views/table-demo/page-table/index.vue',
        name: 'PageTable',
        meta: {
          title: '分页表格'
        }
      },
      {
        path: 'stripe-table',
        component: 'pages/index/views/table-demo/stripe-table/index.vue',
        name: 'StripeTable',
        meta: {
          title: '带斑马纹表格'
        }
      },
      {
        path: 'border-table',
        component: 'pages/index/views/table-demo/border-table/index.vue',
        name: 'BorderTable',
        meta: {
          title: '带边框表格'
        }
      },
      {
        path: 'state-table',
        component: 'pages/index/views/table-demo/state-table/index.vue',
        name: 'StateTable',
        meta: {
          title: '带状态表格'
        }
      },
      {
        path: 'fixed-header',
        component: 'pages/index/views/table-demo/fixed-header/index.vue',
        name: 'FixedHeader',
        meta: {
          title: '固定表头'
        }
      },
      {
        path: 'fixed-column',
        component: 'pages/index/views/table-demo/fixed-column/index.vue',
        name: 'FixedColumn',
        meta: {
          title: '固定列'
        }
      },
      {
        path: 'fixed-column-header',
        component: 'pages/index/views/table-demo/fixed-column-header/index.vue',
        name: 'FixedColumnHeader',
        meta: {
          title: '固定列和表头'
        }
      },
      {
        path: 'fluid-height',
        component: 'pages/index/views/table-demo/fluid-height/index.vue',
        name: 'FluidHeight',
        meta: {
          title: '流体高度'
        }
      },
      {
        path: 'multi-header',
        component: 'pages/index/views/table-demo/multi-header/index.vue',
        name: 'MultiHeader',
        meta: {
          title: '多级表头'
        }
      },
      {
        path: 'single-choice',
        component: 'pages/index/views/table-demo/single-choice/index.vue',
        name: 'SingleChoice',
        meta: {
          title: '单选'
        }
      },
      {
        path: 'multiple-choice',
        component: 'pages/index/views/table-demo/multiple-choice/index.vue',
        name: 'MultipleChoice',
        meta: {
          title: '多选'
        }
      },
      {
        path: 'sort-table',
        component: 'pages/index/views/table-demo/sort-table/index.vue',
        name: 'SortTable',
        meta: {
          title: '排序'
        }
      },
      {
        path: 'screen-table',
        component: 'pages/index/views/table-demo/screen-table/index.vue',
        name: 'ScreenTable',
        meta: {
          title: '筛选'
        }
      },
      {
        path: 'expand-row',
        component: 'pages/index/views/table-demo/expand-row/index.vue',
        name: 'ExpandRow',
        meta: {
          title: '展开行'
        }
      },
      {
        path: 'tree-and-load',
        component: 'pages/index/views/table-demo/tree-and-load/index.vue',
        name: 'TreeAndLoad',
        meta: {
          title: '树形数据与懒加载'
        }
      },
      {
        path: 'custom-header',
        component: 'pages/index/views/table-demo/custom-header/index.vue',
        name: 'CustomHeader',
        meta: {
          title: '自定义表头'
        }
      },
      {
        path: 'total-table',
        component: 'pages/index/views/table-demo/total-table/index.vue',
        name: 'TotalTable',
        meta: {
          title: '表尾合计行'
        }
      },
      {
        path: 'merge-table',
        component: 'pages/index/views/table-demo/merge-table/index.vue',
        name: 'MergeTable',
        meta: {
          title: '合并行或列'
        }
      },
      {
        path: 'custom-index',
        component: 'pages/index/views/table-demo/custom-index/index.vue',
        name: 'CustomIndex',
        meta: {
          title: '自定义索引'
        }
      }
    ]
  },
  {
    path: '/directives-demo',
    component: '#',
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
        component: 'pages/index/views/directives-demo/clipboard/index.vue',
        name: 'ClipboardDemo',
        meta: {
          title: 'Clipboard'
        }
      }
    ]
  },
  {
    path: '/hooks-demo',
    component: '#',
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
        component: 'pages/index/views/hooks-demo/useWatermark/index.vue',
        name: 'UseWatermarkDemo',
        meta: {
          title: 'UseWaterMark'
        }
      },
      {
        path: 'useScrollTo',
        component: 'pages/index/views/hooks-demo/useScrollTo/index.vue',
        name: 'UseScrollToDemo',
        meta: {
          title: 'UseScrollTo'
        }
      }
    ]
  },
  {
    path: '/icon',
    component: '#',
    name: 'IconsDemo',
    meta: {
      title: '图标',
      icon: 'icon'
    },
    children: [
      {
        path: 'index',
        component: 'pages/index/views/icons/index.vue',
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
    component: '#',
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
        component: '##Menu1Demo',
        redirect: '/level/menu1/menu1-1/menu1-1-1',
        meta: {
          title: 'Menu1'
        },
        children: [
          {
            path: 'menu1-1',
            name: 'Menu11Demo',
            component: '##Menu11Demo',
            redirect: '/level/menu1/menu1-1/menu1-1-1',
            meta: {
              title: 'Menu1-1',
              alwaysShow: true
            },
            children: [
              {
                path: 'menu1-1-1',
                name: 'Menu111Demo',
                component: 'pages/index/views/level/Menu111.vue',
                meta: {
                  title: 'Menu1-1-1'
                }
              }
            ]
          },
          {
            path: 'menu1-2',
            name: 'Menu12Demo',
            component: 'pages/index/views/level/Menu12.vue',
            meta: {
              title: 'Menu1-2'
            }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2Demo',
        component: 'pages/index/views/level/Menu2.vue',
        meta: {
          title: 'Menu2'
        }
      }
    ]
  },
  {
    path: '/example-demo',
    component: '#',
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
        component: 'pages/index/views/example-demo/example-dialog/index.vue',
        name: 'ExampleDialog',
        meta: {
          title: '列表综合实例-弹窗'
        }
      },
      {
        path: 'example-page',
        component: 'pages/index/views/example-demo/example-page/index.vue',
        name: 'ExamplePage',
        meta: {
          title: '列表综合实例-页面'
        }
      },
      {
        path: 'example-add',
        component: 'pages/index/views/example-demo/example-page/example-add.vue',
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
        component: 'pages/index/views/example-demo/example-page/example-edit.vue',
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
        component: 'pages/index/views/example-demo/example-page/example-detail.vue',
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
  },
  {
    path: '/role-demo',
    component: '#',
    redirect: '/role-demo/user',
    name: 'RoleDemo',
    meta: {
      title: '权限管理',
      icon: 'user',
      alwaysShow: true
    },
    children: [
      {
        path: 'user',
        component: 'pages/index/views/role-demo/user/index.vue',
        name: 'User',
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'role',
        component: 'pages/index/views/role-demo/role/index.vue',
        name: 'Role',
        meta: {
          title: '角色管理'
        }
      }
    ]
  }
]

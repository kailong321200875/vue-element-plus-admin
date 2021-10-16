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
        component: 'views/components-demo/echarts/index',
        name: 'EchartsDemo',
        meta: {
          title: '图表'
        }
      },
      {
        path: 'preview',
        component: 'views/components-demo/preview/index',
        name: 'PreviewDemo',
        meta: {
          title: '图片预览'
        }
      },
      {
        path: 'message',
        component: 'views/components-demo/message/index',
        name: 'MessageDemo',
        meta: {
          title: '消息提示'
        }
      },
      {
        path: 'search',
        component: 'views/components-demo/search/index',
        name: 'SearchDemo',
        meta: {
          title: '查询'
        }
      },
      {
        path: 'editor',
        component: 'views/components-demo/editor/index',
        name: 'EditorDemo',
        meta: {
          title: '富文本编辑器'
        }
      },
      // {
      //   path: 'markdown',
      //   component: 'views/components-demo/markdown/index',
      //   name: 'MarkdownDemo',
      //   meta: {
      //     title: 'markdown编辑器'
      //   }
      // },
      {
        path: 'dialog',
        component: 'views/components-demo/dialog/index',
        name: 'DialogDemo',
        meta: {
          title: '弹窗'
        }
      },
      {
        path: 'detail',
        component: 'views/components-demo/detail/index',
        name: 'DetailDemo',
        meta: {
          title: '详情组件'
        }
      },
      {
        path: 'qrcode',
        component: 'views/components-demo/qrcode/index',
        name: 'QrcodeDemo',
        meta: {
          title: '二维码组件'
        }
      },
      {
        path: 'avatars',
        component: 'views/components-demo/avatars/index',
        name: 'AvatarsDemo',
        meta: {
          title: '头像组'
        }
      },
      {
        path: 'highlight',
        component: 'views/components-demo/highlight/index',
        name: 'HighlightDemo',
        meta: {
          title: '文字高亮'
        }
      },
      {
        path: 'watermark',
        component: 'views/components-demo/watermark/index',
        name: 'WatermarkDemo',
        meta: {
          title: '水印'
        }
      },
      {
        path: 'timer',
        component: 'views/components-demo/timer/index',
        name: 'TimerDemo',
        meta: {
          title: '计时器'
        }
      },
      {
        path: 'marquee',
        component: 'views/components-demo/marquee/index',
        name: 'MarqueeDemo',
        meta: {
          title: '无缝滚动'
        }
      },
      {
        path: 'water-fall',
        component: 'views/components-demo/water-fall/index',
        name: 'WaterFallDemo',
        meta: {
          title: '瀑布流'
        }
      },
      {
        path: 'tree-select',
        component: 'views/components-demo/tree-select/index',
        name: 'TreeSelectDemo',
        meta: {
          title: '下拉树'
        }
      },
      {
        path: 'ellipsis',
        component: 'views/components-demo/ellipsis/index',
        name: 'Ellipsis',
        meta: {
          title: '省略号'
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
        component: 'views/table-demo/basic-table/index',
        name: 'BasicTable',
        meta: {
          title: '基础表格'
        }
      },
      {
        path: 'page-table',
        component: 'views/table-demo/page-table/index',
        name: 'PageTable',
        meta: {
          title: '分页表格'
        }
      },
      {
        path: 'stripe-table',
        component: 'views/table-demo/stripe-table/index',
        name: 'StripeTable',
        meta: {
          title: '带斑马纹表格'
        }
      },
      {
        path: 'border-table',
        component: 'views/table-demo/border-table/index',
        name: 'BorderTable',
        meta: {
          title: '带边框表格'
        }
      },
      {
        path: 'state-table',
        component: 'views/table-demo/state-table/index',
        name: 'StateTable',
        meta: {
          title: '带状态表格'
        }
      },
      {
        path: 'fixed-header',
        component: 'views/table-demo/fixed-header/index',
        name: 'FixedHeader',
        meta: {
          title: '固定表头'
        }
      },
      {
        path: 'fixed-column',
        component: 'views/table-demo/fixed-column/index',
        name: 'FixedColumn',
        meta: {
          title: '固定列'
        }
      },
      {
        path: 'fixed-column-header',
        component: 'views/table-demo/fixed-column-header/index',
        name: 'FixedColumnHeader',
        meta: {
          title: '固定列和表头'
        }
      },
      {
        path: 'fluid-height',
        component: 'views/table-demo/fluid-height/index',
        name: 'FluidHeight',
        meta: {
          title: '流体高度'
        }
      },
      {
        path: 'multi-header',
        component: 'views/table-demo/multi-header/index',
        name: 'MultiHeader',
        meta: {
          title: '多级表头'
        }
      },
      {
        path: 'single-choice',
        component: 'views/table-demo/single-choice/index',
        name: 'SingleChoice',
        meta: {
          title: '单选'
        }
      },
      {
        path: 'multiple-choice',
        component: 'views/table-demo/multiple-choice/index',
        name: 'MultipleChoice',
        meta: {
          title: '多选'
        }
      },
      {
        path: 'sort-table',
        component: 'views/table-demo/sort-table/index',
        name: 'SortTable',
        meta: {
          title: '排序'
        }
      },
      {
        path: 'screen-table',
        component: 'views/table-demo/screen-table/index',
        name: 'ScreenTable',
        meta: {
          title: '筛选'
        }
      },
      {
        path: 'expand-row',
        component: 'views/table-demo/expand-row/index',
        name: 'ExpandRow',
        meta: {
          title: '展开行'
        }
      },
      {
        path: 'tree-and-load',
        component: 'views/table-demo/tree-and-load/index',
        name: 'TreeAndLoad',
        meta: {
          title: '树形数据与懒加载'
        }
      },
      {
        path: 'custom-header',
        component: 'views/table-demo/custom-header/index',
        name: 'CustomHeader',
        meta: {
          title: '自定义表头'
        }
      },
      {
        path: 'total-table',
        component: 'views/table-demo/total-table/index',
        name: 'TotalTable',
        meta: {
          title: '表尾合计行'
        }
      },
      {
        path: 'merge-table',
        component: 'views/table-demo/merge-table/index',
        name: 'MergeTable',
        meta: {
          title: '合并行或列'
        }
      },
      {
        path: 'custom-index',
        component: 'views/table-demo/custom-index/index',
        name: 'CustomIndex',
        meta: {
          title: '自定义索引'
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
        component: 'views/icons/index',
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
                component: 'views/level/menu111',
                meta: {
                  title: 'Menu1-1-1'
                }
              }
            ]
          },
          {
            path: 'menu1-2',
            name: 'Menu12Demo',
            component: 'views/level/menu12',
            meta: {
              title: 'Menu1-2'
            }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2Demo',
        component: 'views/level/menu2',
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
        component: 'views/example-demo/example-dialog/index',
        name: 'ExampleDialog',
        meta: {
          title: '列表综合实例-弹窗'
        }
      },
      {
        path: 'example-page',
        component: 'views/example-demo/example-page/index',
        name: 'ExamplePage',
        meta: {
          title: '列表综合实例-页面'
        }
      },
      {
        path: 'example-add',
        component: 'views/example-demo/example-page/example-add',
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
        component: 'views/example-demo/example-page/example-edit',
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
        component: 'views/example-demo/example-page/example-detail',
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
        component: 'views/role-demo/user/index',
        name: 'User',
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'role',
        component: 'views/role-demo/role/index',
        name: 'Role',
        meta: {
          title: '角色管理'
        }
      }
    ]
  }
]

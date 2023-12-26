import Mock from 'mockjs'
import { SUCCESS_CODE } from '@/constants'

const timeout = 1000

export default [
  // 列表接口
  {
    url: '/mock/menu/list',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: {
          list: [
            {
              path: '/dashboard',
              component: '#',
              redirect: '/dashboard/analysis',
              name: 'Dashboard',
              status: Mock.Random.integer(0, 1),
              id: 1,
              type: 0,
              parentId: undefined,
              title: '首页',
              meta: {
                title: '首页',
                icon: 'ant-design:dashboard-filled',
                alwaysShow: true
              },
              children: [
                {
                  path: 'analysis',
                  component: 'views/Dashboard/Analysis',
                  name: 'Analysis',
                  status: Mock.Random.integer(0, 1),
                  id: 2,
                  type: 1,
                  parentId: 1,
                  title: '分析页',
                  permissionList: [
                    {
                      label: '新增',
                      value: 'add'
                    },
                    {
                      label: '编辑',
                      value: 'edit'
                    }
                  ],
                  meta: {
                    title: '分析页',
                    noCache: true,
                    permission: ['add', 'edit']
                  }
                },
                {
                  path: 'workplace',
                  component: 'views/Dashboard/Workplace',
                  name: 'Workplace',
                  status: Mock.Random.integer(0, 1),
                  id: 3,
                  type: 1,
                  parentId: 1,
                  title: '工作台',
                  permissionList: [
                    {
                      label: '新增',
                      value: 'add'
                    },
                    {
                      label: '编辑',
                      value: 'edit'
                    },
                    {
                      label: '删除',
                      value: 'delete'
                    }
                  ],
                  meta: {
                    title: '工作台',
                    noCache: true
                  }
                }
              ]
            },
            {
              path: '/external-link',
              component: '#',
              meta: {
                title: '文档',
                icon: 'clarity:document-solid'
              },
              name: 'ExternalLink',
              status: Mock.Random.integer(0, 1),
              id: 4,
              type: 0,
              parentId: undefined,
              title: '文档',
              children: [
                {
                  path: 'https://element-plus-admin-doc.cn/',
                  name: 'DocumentLink',
                  status: Mock.Random.integer(0, 1),
                  id: 5,
                  type: 1,
                  parentId: 4,
                  title: '文档',
                  meta: {
                    title: '文档'
                  }
                }
              ]
            },
            {
              path: '/level',
              component: '#',
              redirect: '/level/menu1/menu1-1/menu1-1-1',
              name: 'Level',
              status: Mock.Random.integer(0, 1),
              id: 6,
              type: 0,
              parentId: undefined,
              title: '菜单',
              meta: {
                title: '菜单',
                icon: 'carbon:skill-level-advanced'
              },
              children: [
                {
                  path: 'menu1',
                  name: 'Menu1',
                  component: '##',
                  status: Mock.Random.integer(0, 1),
                  id: 7,
                  type: 0,
                  parentId: 6,
                  title: '菜单1',
                  redirect: '/level/menu1/menu1-1/menu1-1-1',
                  meta: {
                    title: '菜单1'
                  },
                  children: [
                    {
                      path: 'menu1-1',
                      name: 'Menu11',
                      component: '##',
                      status: Mock.Random.integer(0, 1),
                      id: 8,
                      type: 0,
                      parentId: 7,
                      title: '菜单1-1',
                      redirect: '/level/menu1/menu1-1/menu1-1-1',
                      meta: {
                        title: '菜单1-1',
                        alwaysShow: true
                      },
                      children: [
                        {
                          path: 'menu1-1-1',
                          name: 'Menu111',
                          component: 'views/Level/Menu111',
                          status: Mock.Random.integer(0, 1),
                          id: 9,
                          type: 1,
                          parentId: 8,
                          title: '菜单1-1-1',
                          meta: {
                            title: '菜单1-1-1'
                          }
                        }
                      ]
                    },
                    {
                      path: 'menu1-2',
                      name: 'Menu12',
                      component: 'views/Level/Menu12',
                      status: Mock.Random.integer(0, 1),
                      id: 10,
                      type: 1,
                      parentId: 7,
                      title: '菜单1-2',
                      meta: {
                        title: '菜单1-2'
                      }
                    }
                  ]
                },
                {
                  path: 'menu2',
                  name: 'Menu2Demo',
                  component: 'views/Level/Menu2',
                  status: Mock.Random.integer(0, 1),
                  id: 11,
                  type: 1,
                  parentId: 6,
                  title: '菜单2',
                  meta: {
                    title: '菜单2'
                  }
                }
              ]
            },
            {
              path: '/example',
              component: '#',
              redirect: '/example/example-dialog',
              name: 'Example',
              status: Mock.Random.integer(0, 1),
              id: 12,
              type: 0,
              parentId: undefined,
              title: '综合示例',
              meta: {
                title: '综合示例',
                icon: 'ep:management',
                alwaysShow: true
              },
              children: [
                {
                  path: 'example-dialog',
                  component: 'views/Example/Dialog/ExampleDialog',
                  name: 'ExampleDialog',
                  status: Mock.Random.integer(0, 1),
                  id: 13,
                  type: 1,
                  parentId: 12,
                  title: '综合示例-弹窗',
                  permissionList: [
                    {
                      label: '新增',
                      value: 'add'
                    },
                    {
                      label: '编辑',
                      value: 'edit'
                    },
                    {
                      label: '删除',
                      value: 'delete'
                    },
                    {
                      label: '查看',
                      value: 'view'
                    }
                  ],
                  meta: {
                    title: '综合示例-弹窗'
                  }
                },
                {
                  path: 'example-page',
                  component: 'views/Example/Page/ExamplePage',
                  name: 'ExamplePage',
                  status: Mock.Random.integer(0, 1),
                  id: 14,
                  type: 1,
                  parentId: 12,
                  title: '综合示例-页面',
                  permissionList: [
                    {
                      label: '新增',
                      value: 'edit'
                    },
                    {
                      label: '编辑',
                      value: 'edit'
                    },
                    {
                      label: '删除',
                      value: 'delete'
                    },
                    {
                      label: '查看',
                      value: 'view'
                    }
                  ],
                  meta: {
                    title: '综合示例-页面'
                  }
                },
                {
                  path: 'example-add',
                  component: 'views/Example/Page/ExampleAdd',
                  name: 'ExampleAdd',
                  status: Mock.Random.integer(0, 1),
                  id: 15,
                  type: 1,
                  parentId: 12,
                  title: '综合示例-新增',
                  meta: {
                    title: '综合示例-新增',
                    noTagsView: true,
                    noCache: true,
                    hidden: true,
                    showMainRoute: true,
                    activeMenu: '/example/example-page'
                  }
                },
                {
                  path: 'example-edit',
                  component: 'views/Example/Page/ExampleEdit',
                  name: 'ExampleEdit',
                  status: Mock.Random.integer(0, 1),
                  id: 16,
                  type: 1,
                  parentId: 12,
                  title: '综合示例-编辑',
                  meta: {
                    title: '综合示例-编辑',
                    noTagsView: true,
                    noCache: true,
                    hidden: true,
                    showMainRoute: true,
                    activeMenu: '/example/example-page'
                  }
                },
                {
                  path: 'example-detail',
                  component: 'views/Example/Page/ExampleDetail',
                  name: 'ExampleDetail',
                  status: Mock.Random.integer(0, 1),
                  id: 17,
                  type: 1,
                  parentId: 12,
                  title: '综合示例-详情',
                  meta: {
                    title: '综合示例-详情',
                    noTagsView: true,
                    noCache: true,
                    hidden: true,
                    showMainRoute: true,
                    activeMenu: '/example/example-page'
                  }
                }
              ]
            }
          ]
        }
      }
    }
  }
]

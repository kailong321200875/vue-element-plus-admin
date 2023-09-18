import config from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

const { code } = config

const timeout = 1000

export default [
  // 列表接口
  {
    url: '/menu/list',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: code,
        data: {
          list: [
            {
              path: '/dashboard',
              component: '#',
              redirect: '/dashboard/analysis',
              name: 'Dashboard',
              status: Mock.Random.integer(0, 1),
              id: 1,
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
                  meta: {
                    title: '分析页',
                    noCache: true
                  }
                },
                {
                  path: 'workplace',
                  component: 'views/Dashboard/Workplace',
                  name: 'Workplace',
                  status: Mock.Random.integer(0, 1),
                  id: 3,
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
              children: [
                {
                  path: 'https://element-plus-admin-doc.cn/',
                  name: 'DocumentLink',
                  status: Mock.Random.integer(0, 1),
                  id: 5,
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
                          permission: ['edit', 'add', 'delete'],
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
                      permission: ['edit', 'add', 'delete'],
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
                  permission: ['edit', 'add', 'delete'],
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
                  permission: ['edit', 'add', 'delete'],
                  meta: {
                    title: '综合示例-弹窗',
                    permission: ['edit', 'add']
                  }
                },
                {
                  path: 'example-page',
                  component: 'views/Example/Page/ExamplePage',
                  name: 'ExamplePage',
                  status: Mock.Random.integer(0, 1),
                  id: 14,
                  permission: ['edit', 'add', 'delete'],
                  meta: {
                    title: '综合示例-页面',
                    permission: ['edit', 'add']
                  }
                },
                {
                  path: 'example-add',
                  component: 'views/Example/Page/ExampleAdd',
                  name: 'ExampleAdd',
                  status: Mock.Random.integer(0, 1),
                  id: 15,
                  permission: ['edit', 'add', 'delete'],
                  meta: {
                    title: '综合示例-新增',
                    noTagsView: true,
                    noCache: true,
                    hidden: true,
                    showMainRoute: true,
                    activeMenu: '/example/example-page',
                    permission: ['delete', 'add']
                  }
                },
                {
                  path: 'example-edit',
                  component: 'views/Example/Page/ExampleEdit',
                  name: 'ExampleEdit',
                  status: Mock.Random.integer(0, 1),
                  id: 16,
                  permission: ['edit', 'add', 'delete'],
                  meta: {
                    title: '综合示例-编辑',
                    noTagsView: true,
                    noCache: true,
                    hidden: true,
                    showMainRoute: true,
                    activeMenu: '/example/example-page',
                    permission: ['delete', 'add']
                  }
                },
                {
                  path: 'example-detail',
                  component: 'views/Example/Page/ExampleDetail',
                  name: 'ExampleDetail',
                  status: Mock.Random.integer(0, 1),
                  id: 17,
                  permission: ['edit', 'add', 'delete'],
                  meta: {
                    title: '综合示例-详情',
                    noTagsView: true,
                    noCache: true,
                    hidden: true,
                    showMainRoute: true,
                    activeMenu: '/example/example-page',
                    permission: ['delete', 'edit']
                  }
                }
              ]
            }
          ]
        }
      }
    }
  }
] as MockMethod[]

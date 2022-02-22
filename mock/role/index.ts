import { config } from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'

const { result_code } = config

const timeout = 1000

const adminList = [
  {
    path: '/level',
    component: '#',
    redirect: '/level/menu1/menu1-1/menu1-1-1',
    name: 'Level',
    meta: {
      title: 'router.level',
      icon: 'carbon:skill-level-advanced'
    },
    children: [
      {
        path: 'menu1',
        name: 'Menu1',
        component: '##',
        redirect: '/level/menu1/menu1-1/menu1-1-1',
        meta: {
          title: 'router.menu1'
        },
        children: [
          {
            path: 'menu1-1',
            name: 'Menu11',
            component: '##',
            redirect: '/level/menu1/menu1-1/menu1-1-1',
            meta: {
              title: 'router.menu11',
              alwaysShow: true
            },
            children: [
              {
                path: 'menu1-1-1',
                name: 'Menu111',
                component: 'views/Level/Menu111',
                meta: {
                  title: 'router.menu111'
                }
              }
            ]
          },
          {
            path: 'menu1-2',
            name: 'Menu12',
            component: 'views/Level/Menu12',
            meta: {
              title: 'router.menu12'
            }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2Demo',
        component: 'views/Level/Menu2',
        meta: {
          title: 'router.menu2'
        }
      }
    ]
  }
]

const testList: string[] = [
  '/level',
  '/level/menu1',
  '/level/menu1/menu1-1',
  '/level/menu1/menu1-1/menu1-1-1',
  '/level/menu1/menu1-2',
  '/level/menu2'
]

export default [
  // 列表接口
  {
    url: '/role/list',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { roleName } = query
      return {
        code: result_code,
        data: {
          list: roleName === 'admin' ? adminList : testList
        }
      }
    }
  }
] as MockMethod[]

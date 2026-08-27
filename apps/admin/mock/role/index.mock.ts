import { SUCCESS_CODE } from '@/constants'

const routes: AppCustomRouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: '#',
    redirect: '/dashboard/analysis',
    name: 'Dashboard',
    meta: {
      title: 'router.dashboard',
      icon: 'mdi:view-dashboard'
    },
    children: [
      {
        path: 'analysis',
        component: 'views/Dashboard/Analysis',
        name: 'Analysis',
        meta: {
          title: 'router.dashboard',
          icon: 'mdi:view-dashboard',
          noCache: true,
          affix: true
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
      title: 'router.level',
      icon: 'mdi:file-tree'
    },
    children: [
      {
        path: 'menu1',
        name: 'Menu1',
        component: '##',
        redirect: '/level/menu1/menu1-1/menu1-1-1',
        meta: {
          title: 'router.menu1',
          icon: 'mdi:folder-outline'
        },
        children: [
          {
            path: 'menu1-1',
            name: 'Menu11',
            component: '##',
            redirect: '/level/menu1/menu1-1/menu1-1-1',
            meta: {
              title: 'router.menu11',
              icon: 'mdi:folder-open-outline',
              alwaysShow: true
            },
            children: [
              {
                path: 'menu1-1-1',
                name: 'Menu111',
                component: 'views/Level/Menu111',
                meta: {
                  title: 'router.menu111',
                  icon: 'mdi:file-document-outline'
                }
              }
            ]
          },
          {
            path: 'menu1-2',
            name: 'Menu12',
            component: 'views/Level/Menu12',
            meta: {
              title: 'router.menu12',
              icon: 'mdi:file-document-outline'
            }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: 'views/Level/Menu2',
        meta: {
          title: 'router.menu2',
          icon: 'mdi:file-document-outline'
        }
      }
    ]
  }
]

export default [
  {
    url: '/mock/role/list',
    method: 'get',
    response: () => ({
      code: SUCCESS_CODE,
      data: routes
    })
  }
]

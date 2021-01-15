import wsCache from '@/cache'
import { Role } from './types'
import { checkedNodes, checkedkeys } from './admin-role'
import { checkedRoleNodes } from './test-role'

let List: Role[] = wsCache.get('roleList') || [
  {
    roleName: 'admin',
    id: '1',
    checkedNodes: checkedNodes,
    checkedkeys: checkedkeys
  },
  {
    roleName: 'test',
    id: '2',
    checkedNodes: checkedRoleNodes,
    checkedkeys: []
  }
]

export default [
  // 列表接口
  {
    url: 'http://mockjs.test.cn/role/list',
    type: 'get',
    response: (config: any) => {
      const {
        roleName,
        pageIndex,
        pageSize
      } = config.query

      const mockList = List.filter(item => {
        if (roleName && item.roleName.indexOf(roleName) < 0) return false
        return true
      })
      const pageList = mockList.filter((item, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1))

      return {
        code: '0000',
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },

  // 详情接口
  {
    url: 'http://mockjs.test.cn/role/detail',
    type: 'get',
    response: (config: any) => {
      const {
        id
      } = config.query
      for (const role of List) {
        if (role.id === id) {
          return {
            code: '0000',
            data: role
          }
        }
      }
    }
  },

  // 保存接口
  {
    url: 'http://mockjs.test.cn/role/save',
    type: 'post',
    response: (config: any) => {
      const data = config.body
      if (!data.id) {
        List = [data].concat(List)
        return {
          code: '0000',
          data: 'success'
        }
      } else {
        List.map(item => {
          if (item.id === data.id) {
            for (const key in item) {
              item[key] = data[key]
            }
          }
        })
        // 存在缓存中，避免刷新没有掉
        wsCache.set('roleList', List)
        return {
          code: '0000',
          data: 'success'
        }
      }
    }
  }
]

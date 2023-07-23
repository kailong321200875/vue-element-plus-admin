import config from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import { toAnyString } from '@/utils'
import Mock from 'mockjs'

const { code } = config

const departmentList: any = []

const citys = ['厦门总公司', '北京分公司', '上海分公司', '福州分公司', '深圳分公司', '杭州分公司']

for (let i = 0; i < 5; i++) {
  departmentList.push({
    // 部门名称
    departmentName: citys[i],
    id: toAnyString(),
    children: [
      {
        // 部门名称
        departmentName: '研发部',
        id: toAnyString()
      },
      {
        // 部门名称
        departmentName: '产品部',
        id: toAnyString()
      },
      {
        // 部门名称
        departmentName: '运营部',
        id: toAnyString()
      },
      {
        // 部门名称
        departmentName: '市场部',
        id: toAnyString()
      },
      {
        // 部门名称
        departmentName: '销售部',
        id: toAnyString()
      },
      {
        // 部门名称
        departmentName: '客服部',
        id: toAnyString()
      }
    ]
  })
}

export default [
  // 列表接口
  {
    url: '/department/list',
    method: 'get',
    response: () => {
      return {
        data: {
          code: code,
          data: {
            list: departmentList
          }
        }
      }
    }
  },
  {
    url: '/department/users',
    method: 'get',
    timeout: 1000,
    response: ({ query }) => {
      const { pageSize } = query
      // 根据pageSize来创建数据
      const mockList: any = []
      for (let i = 0; i < pageSize; i++) {
        mockList.push(
          Mock.mock({
            // 用户名
            username: '@cname',
            // 账号
            account: '@first',
            // 邮箱
            email: '@EMAIL',
            // 创建时间
            createTime: '@datetime',
            // 角色
            role: '@first',
            // 用户id
            id: toAnyString()
          })
        )
      }
      return {
        data: {
          code: code,
          data: {
            total: 100,
            list: mockList
          }
        }
      }
    }
  }
] as MockMethod[]

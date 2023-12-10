import { toAnyString } from '@/utils'
import { faker } from '@faker-js/faker'
import { SUCCESS_CODE } from '@/constants'

const departmentList: any = []

const citys = ['厦门总公司', '北京分公司', '上海分公司', '福州分公司', '深圳分公司', '杭州分公司']

for (let i = 0; i < 5; i++) {
  departmentList.push({
    // 部门名称
    departmentName: citys[i],
    id: toAnyString(),
    createTime: faker.date.anytime(),
    status: faker.number.int({ min: 0, max: 1 }),
    // 备注
    remark: faker.lorem.sentence(),
    children: [
      {
        // 部门名称
        departmentName: '研发部',
        createTime: faker.date.anytime(),
        // 状态
        status: faker.number.int({ min: 0, max: 1 }),
        id: toAnyString(),
        remark: faker.lorem.sentence()
      },
      {
        // 部门名称
        departmentName: '产品部',
        createTime: faker.date.anytime(),
        // 状态
        status: faker.number.int({ min: 0, max: 1 }),
        id: toAnyString(),
        remark: faker.lorem.sentence()
      },
      {
        // 部门名称
        departmentName: '运营部',
        createTime: faker.date.anytime(),
        // 状态
        status: faker.number.int({ min: 0, max: 1 }),
        id: toAnyString(),
        remark: faker.lorem.sentence()
      },
      {
        // 部门名称
        departmentName: '市场部',
        createTime: faker.date.anytime(),
        // 状态
        status: faker.number.int({ min: 0, max: 1 }),
        id: toAnyString(),
        remark: faker.lorem.sentence()
      },
      {
        // 部门名称
        departmentName: '销售部',
        createTime: faker.date.anytime(),
        // 状态
        status: faker.number.int({ min: 0, max: 1 }),
        id: toAnyString(),
        remark: faker.lorem.sentence()
      },
      {
        // 部门名称
        departmentName: '客服部',
        createTime: faker.date.anytime(),
        // 状态
        status: faker.number.int({ min: 0, max: 1 }),
        id: toAnyString(),
        remark: faker.lorem.sentence()
      }
    ]
  })
}

export default [
  // 列表接口
  {
    url: '/mock/department/list',
    method: 'get',
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: {
          list: departmentList
        }
      }
    }
  },
  {
    url: '/mock/department/table/list',
    method: 'get',
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: {
          list: departmentList,
          total: 5
        }
      }
    }
  },
  {
    url: '/mock/department/users',
    method: 'get',
    timeout: 1000,
    response: ({ query }) => {
      const { pageSize } = query
      // 根据pageSize来创建数据
      const mockList: any = []
      for (let i = 0; i < pageSize; i++) {
        mockList.push({
          // 用户名
          username: faker.person.firstName(),
          // 账号
          account: faker.person.lastName(),
          // 邮箱
          email: faker.internet.email(),
          // 创建时间
          createTime: faker.date.anytime(),
          // 用户id
          id: toAnyString()
        })
      }
      return {
        code: SUCCESS_CODE,
        data: {
          total: 100,
          list: mockList
        }
      }
    }
  },
  // 保存接口
  {
    url: '/mock/department/user/save',
    method: 'post',
    timeout: 1000,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: 'success'
      }
    }
  },
  // 删除接口
  {
    url: '/mock/department/user/delete',
    method: 'post',
    response: ({ body }) => {
      const ids = body.ids
      if (!ids) {
        return {
          code: 500,
          message: '请选择需要删除的数据'
        }
      } else {
        return {
          code: SUCCESS_CODE,
          data: 'success'
        }
      }
    }
  },
  // 保存接口
  {
    url: '/mock/department/save',
    method: 'post',
    timeout: 1000,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: 'success'
      }
    }
  },
  // 删除接口
  {
    url: '/mock/department/delete',
    method: 'post',
    response: ({ body }) => {
      const ids = body.ids
      if (!ids) {
        return {
          code: 500,
          message: '请选择需要删除的数据'
        }
      } else {
        return {
          code: SUCCESS_CODE,
          data: 'success'
        }
      }
    }
  }
]

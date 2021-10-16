const List: {
  userName: string
  password: string
  role: string
  roleId: string
}[] = [
  {
    userName: 'admin',
    password: 'admin',
    role: 'admin',
    roleId: '1'
  },
  {
    userName: 'test',
    password: 'test',
    role: 'test',
    roleId: '2'
  }
]

export default [
  // 列表接口
  {
    url: 'http://mockjs.test.cn/user/list',
    type: 'get',
    response: (config: any) => {
      const { userName, pageIndex, pageSize } = config.query

      const mockList = List.filter((item) => {
        if (userName && item.userName.indexOf(userName) < 0) return false
        return true
      })
      const pageList = mockList.filter(
        (_, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1)
      )

      return {
        code: '0000',
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },

  // 登录接口
  {
    url: 'http://mockjs.test.cn/user/login',
    type: 'post',
    response: (config: any) => {
      const data = config.body
      let hasUser = false
      for (const user of List) {
        if (user.userName === data.userName && user.password === data.passWord) {
          hasUser = true
          return {
            code: '0000',
            data: user
          }
        }
      }
      if (!hasUser) {
        return {
          code: '500',
          message: '账号或密码错误'
        }
      }
    }
  }
]

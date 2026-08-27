import { SUCCESS_CODE } from '@/constants'

const timeout = 1000

const List: {
  username: string
  password: string
  id: string
}[] = [
  {
    username: 'admin',
    password: 'admin',
    id: '1'
  },
  {
    username: 'test',
    password: 'test',
    id: '2'
  }
]

const toUserInfo = ({ username }: (typeof List)[number]) => ({ username })

export default [
  // 登录接口
  {
    url: '/mock/user/login',
    method: 'post',
    timeout,
    response: ({ body }) => {
      const data = body
      let hasUser = false
      for (const user of List) {
        if (user.username === data.username && user.password === data.password) {
          hasUser = true
          return {
            code: SUCCESS_CODE,
            data: {
              accessToken: `mock-token-${user.id}`,
              user: toUserInfo(user)
            }
          }
        }
      }
      if (!hasUser) {
        return {
          code: 500,
          message: '账号或密码错误'
        }
      }
    }
  },
  // 退出接口
  {
    url: '/mock/user/loginOut',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: null
      }
    }
  }
]

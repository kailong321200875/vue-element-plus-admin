import { config } from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'

const { result_code } = config

const timeout = 1000

export default [
  // 分析页统计接口
  {
    url: '/analysis/total',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: result_code,
        data: {
          users: 102400,
          messages: 81212,
          moneys: 9280,
          shoppings: 13600
        }
      }
    }
  }
] as MockMethod[]

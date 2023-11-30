import { SUCCESS_CODE } from '@/constants'

const delay = 600000

export default [
  {
    url: '/mock/request/1',
    method: 'GET',
    delay,
    body: () => {
      return {
        code: SUCCESS_CODE,
        data: 'request-1'
      }
    }
  },
  {
    url: '/mock/request/2',
    method: 'GET',
    delay,
    body: () => {
      return {
        code: SUCCESS_CODE,
        data: 'request-2'
      }
    }
  },
  {
    url: '/mock/request/3',
    method: 'GET',
    delay,
    body: () => {
      return {
        code: SUCCESS_CODE,
        data: 'request-3'
      }
    }
  },
  {
    url: '/mock/request/4',
    method: 'GET',
    delay,
    body: () => {
      return {
        code: SUCCESS_CODE,
        data: 'request-4'
      }
    }
  },
  {
    url: '/mock/request/5',
    method: 'GET',
    delay,
    body: () => {
      return {
        code: SUCCESS_CODE,
        data: 'request-5'
      }
    }
  },
  {
    url: '/mock/request/expired',
    method: 'GET',
    delay: 0,
    body: () => {
      return {
        code: 401,
        message: 'token expired'
      }
    }
  }
]

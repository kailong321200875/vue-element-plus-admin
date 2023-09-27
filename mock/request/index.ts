import config from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'

const timeout = 600000

const { code } = config

export default [
  {
    url: '/request/1',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: code,
        data: 'request-1'
      }
    }
  },
  {
    url: '/request/2',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: code,
        data: 'request-2'
      }
    }
  },
  {
    url: '/request/3',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: code,
        data: 'request-3'
      }
    }
  },
  {
    url: '/request/4',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: code,
        data: 'request-4'
      }
    }
  },
  {
    url: '/request/5',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: code,
        data: 'request-5'
      }
    }
  }
] as MockMethod[]

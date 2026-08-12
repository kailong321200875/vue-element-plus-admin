import request from '@/axios'
import type { RequestResult } from './types'

export const getRequestApi = (id: 1 | 2 | 3 | 4 | 5) => {
  return request.get<RequestResult>({ url: `/mock/request/${id}` })
}

export const simulateTokenExpiryApi = () => {
  return request.get<RequestResult>({ url: '/mock/request/expired' })
}

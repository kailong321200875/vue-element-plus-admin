import { fetch } from '_p/index/axios-config/axios'

interface PropsData {
  params?: any
  data?: any
}

export const loginApi = ({ data }: PropsData) => {
  return fetch({ url: '/user/login', method: 'post', data })
}

export const getRoleDetApi = ({ params }: PropsData) => {
  return fetch({ url: '/role/detail', method: 'get', params })
}

import fetch from '@/axios-config'

export const loginApi = ({ data }: FetchConfig) => {
  return fetch({ url: '/user/login', method: 'post', data })
}

export const getRoleDetApi = ({ params }: FetchConfig) => {
  return fetch({ url: '/role/detail', method: 'get', params })
}

import { fetch } from '_p/index/axios-config/axios'

interface PropsData {
  params?: any
  data?: any
}

export const getRoleListApi = ({ params }: PropsData) => {
  return fetch({ url: '/role/list', method: 'get', params })
}

export const setRoleApi = ({ data }: PropsData) => {
  return fetch({ url: '/role/save', method: 'post', data })
}

export const getRoleDetApi = ({ params }: PropsData) => {
  return fetch({ url: '/role/detail', method: 'get', params })
}

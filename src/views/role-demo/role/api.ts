import fetch from '@/axios-config'

export const getRoleListApi = ({ params }: any) => {
  return fetch({ url: '/role/list', method: 'get', params })
}

export const setRoleApi = ({ data }: any) => {
  return fetch({ url: '/role/save', method: 'post', data })
}

export const getRoleDetApi = ({ params }: any) => {
  return fetch({ url: '/role/detail', method: 'get', params })
}

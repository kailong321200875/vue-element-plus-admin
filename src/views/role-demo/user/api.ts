import fetch from '@/axios-config'

export const getUserListApi = ({ params }: any) => {
  return fetch({ url: '/user/list', method: 'get', params })
}

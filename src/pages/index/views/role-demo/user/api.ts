import { fetch } from '_@/axios-config/axios'

interface PropsData {
  params?: any
  data?: any
}

export const getUserListApi = ({ params }: PropsData): any => {
  return fetch({ url: '/user/list', method: 'get', params })
}

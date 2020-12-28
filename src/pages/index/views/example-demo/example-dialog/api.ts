import { fetch } from '_p/index/axios-config/axios'

interface PropsData {
  params?: any
  data?: any
}

export const getExampleListApi = ({ params }: PropsData): any => {
  return fetch({ url: '/example/list', method: 'get', params })
}

export const delsExampApi = ({ data }: PropsData): any => {
  return fetch({ url: '/example/delete', method: 'post', data })
}

export const setExampApi = ({ data }: PropsData): any => {
  return fetch({ url: '/example/save', method: 'post', data })
}

export const getExampDetApi = ({ params }: PropsData): any => {
  return fetch({ url: '/example/detail', method: 'get', params })
}

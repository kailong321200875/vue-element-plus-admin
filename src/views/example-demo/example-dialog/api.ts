import fetch from '@/axios-config'

export const getExampleListApi = ({ params }: any) => {
  return fetch({ url: '/example/list', method: 'get', params })
}

export const delsExampApi = ({ data }: any) => {
  return fetch({ url: '/example/delete', method: 'post', data })
}

export const setExampApi = ({ data }: any) => {
  return fetch({ url: '/example/save', method: 'post', data })
}

export const getExampDetApi = ({ params }: any) => {
  return fetch({ url: '/example/detail', method: 'get', params })
}

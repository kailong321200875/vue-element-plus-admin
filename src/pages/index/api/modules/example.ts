import { fetch } from '../../axios-config/axios'

import { AxiosPromise } from 'axios'

import { EmptyObjFun } from '@/types/glob'

interface PropsData {
  params?: any
  data?: any
}

const methods: EmptyObjFun = {
  getExampleList: function({ params }: PropsData): AxiosPromise {
    return fetch({ url: '/example/list', method: 'get', params })
  }
}

export default methods

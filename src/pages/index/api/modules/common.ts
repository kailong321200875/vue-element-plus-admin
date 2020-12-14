import { fetch } from '../../axios-config/axios'

import { AxiosPromise } from 'axios'

import { EmptyObjFun } from '@/types/glob'

interface PropsData {
  params?: any
  data?: any
}

const methods: EmptyObjFun = {
  getList: function({ params }: PropsData): AxiosPromise {
    return fetch({ url: '/getJoke', method: 'get', params })
  }
}

export default methods

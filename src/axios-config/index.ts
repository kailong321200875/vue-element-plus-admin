import request from './request'

import { useAppStoreWithOut } from '@/store/modules/app'
const appStore = useAppStoreWithOut()

import config from './config'

import { AxiosPromise } from 'axios'

const { default_headers } = config

function fetch({
  url,
  method,
  params,
  data,
  headersType,
  responseType
}: FetchConfig): AxiosPromise {
  return request({
    url: url,
    method,
    params: appStore.getRequestTime ? { time: new Date().getTime(), ...(params || {}) } : params,
    data,
    responseType: responseType,
    headers: {
      'Content-Type': headersType || default_headers
    }
  })
}

export default fetch

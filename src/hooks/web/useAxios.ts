import { service } from '@/plugins/axios'

import { AxiosPromise } from 'axios'

import { useAppStoreWithOut } from '@/store/modules/app'

import { config } from '@/config/axios'

const appStore = useAppStoreWithOut()

const { default_headers } = config

export function useAxios() {
  function request({
    url,
    method,
    params,
    data,
    headersType,
    responseType
  }: AxiosConfig): AxiosPromise {
    return service({
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

  return {
    request
  }
}

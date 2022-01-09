import { service } from '@/config/axios'

import { AxiosPromise } from 'axios'

import { config } from '@/config/axios/config'

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
      params,
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

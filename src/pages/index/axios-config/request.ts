import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

import { message } from 'ant-design-vue'

import qs from 'qs'

import config from '../config'

const { result_code, base_url } = config

export const PATH_URL: string = base_url[process.env.VUE_APP_CURENV as string]

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: PATH_URL, // api 的 base_url
  timeout: config.request_timeout // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.method === 'post' && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  (error: AxiosError) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code === result_code) {
      return response.data
    } else {
      message.error(response.data.message)
    }
  },
  (error: AxiosError) => {
    console.log('err' + error) // for debug
    message.error(error.message)
    return Promise.reject(error)
  }
)

export default service

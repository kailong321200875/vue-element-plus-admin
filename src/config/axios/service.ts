// import qs from 'qs'

import axios from 'axios'
import config from './config'
import { AxiosInstance, InternalAxiosRequestConfig, RequestConfig, AxiosResponse } from './type'

// import { ElMessage } from 'element-plus'

// const { result_code, base_url } = config

// export const PATH_URL = base_url[import.meta.env.VITE_API_BASEPATH]

// // 创建axios实例
// const service: AxiosInstance = axios.create({
//   baseURL: PATH_URL, // api 的 base_url
//   timeout: config.request_timeout // 请求超时时间
// })

// // request拦截器
// service.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     if (
//       config.method === 'post' &&
//       (config.headers as AxiosRequestHeaders)['Content-Type'] ===
//         'application/x-www-form-urlencoded'
//     ) {
//       config.data = qs.stringify(config.data)
//     }
//     // ;(config.headers as AxiosRequestHeaders)['Token'] = 'test test'
//     // get参数编码
//     if (config.method === 'get' && config.params) {
//       let url = config.url as string
//       url += '?'
//       const keys = Object.keys(config.params)
//       for (const key of keys) {
//         if (config.params[key] !== void 0 && config.params[key] !== null) {
//           url += `${key}=${encodeURIComponent(config.params[key])}&`
//         }
//       }
//       url = url.substring(0, url.length - 1)
//       config.params = {}
//       config.url = url
//     }
//     return config
//   },
//   (error: AxiosError) => {
//     // Do something with request error
//     console.log(error) // for debug
//     Promise.reject(error)
//   }
// )

// // response 拦截器
// service.interceptors.response.use(
//   (response: AxiosResponse<any>) => {
//     if (response.config.responseType === 'blob') {
//       // 如果是文件流，直接过
//       return response
//     } else if (response.data.code === result_code) {
//       return response.data
//     } else {
//       ElMessage.error(response.data.message)
//     }
//   },
//   (error: AxiosError) => {
//     console.log('err' + error) // for debug
//     ElMessage.error(error.message)
//     return Promise.reject(error)
//   }
// )

// export { service }

const { interceptors } = config
const { requestInterceptors, responseInterceptors } = interceptors

const abortControllerMap: Map<string, AbortController> = new Map()

const axiosInstance: AxiosInstance = axios.create(config)

axiosInstance.interceptors.request.use((res: InternalAxiosRequestConfig) => {
  const controller = new AbortController()
  const url = res.url || ''
  res.signal = controller.signal
  abortControllerMap.set(url, controller)
  return res
})

axiosInstance.interceptors.request.use(requestInterceptors, responseInterceptors)

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    const url = res.config.url || ''
    abortControllerMap.delete(url)
    return res.data
  },
  (err: any) => err
)

// const request = (config: RequestConfig) => {
//   return new Promise((resolve, reject) => {
//     if (config.interceptors?.requestInterceptors) {
//       config = config.interceptors.requestInterceptors(config as any)
//     }
//     axiosInstance
//       .request(config)
//       .then((res) => {
//         if (config.interceptors?.responseInterceptors) {
//           res = config.interceptors.responseInterceptors(res)
//         }

//         resolve(res)
//       })
//       .catch((err: any) => {
//         reject(err)
//       })
//   })
// }

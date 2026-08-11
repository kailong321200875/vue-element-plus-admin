import { ElMessage } from 'element-plus'
import { createRequest, isCancel, type AxiosResponse, type RequestConfig } from '@vea/request'
import { CONTENT_TYPE, REQUEST_TIMEOUT, SUCCESS_CODE } from '@/constants'
import { useUserStoreWithOut } from '@/store/modules/user'

type BusinessResponse = IResponse<unknown> & { message?: string }

const normalizeRequestKey = (url = '') => url.replace(/^\/mock(?=\/)/, '')

const client = createRequest({
  axiosConfig: {
    baseURL: import.meta.env.VITE_API_BASE_PATH,
    timeout: REQUEST_TIMEOUT
  },
  beforeRequest(config) {
    const userStore = useUserStoreWithOut()
    return {
      ...config,
      headers: {
        'Content-Type': CONTENT_TYPE,
        ...(userStore.token ? { Authorization: userStore.token } : {}),
        ...config.headers
      }
    }
  },
  transformResponse(response: AxiosResponse) {
    if (response.config.responseType === 'blob') return response

    const result = response.data as BusinessResponse
    if (result.code === SUCCESS_CODE) return result

    if (result.code === 401) void useUserStoreWithOut().logout()
    throw Object.assign(new Error(result.message || `Request failed (${result.code})`), {
      code: result.code
    })
  },
  onError(error) {
    if (!isCancel(error)) {
      ElMessage.error(error instanceof Error ? error.message : String(error))
    }
  },
  getRequestKey: (config) => normalizeRequestKey(config.url)
})

const asConfig = (option: AxiosConfig) => option as RequestConfig

export default {
  get: <T = any>(option: AxiosConfig) => client.get<IResponse<T>>(asConfig(option)),
  post: <T = any>(option: AxiosConfig) => client.post<IResponse<T>>(asConfig(option)),
  delete: <T = any>(option: AxiosConfig) => client.delete<IResponse<T>>(asConfig(option)),
  put: <T = any>(option: AxiosConfig) => client.put<IResponse<T>>(asConfig(option)),
  cancelRequest: (url: string | string[]) => {
    const keys = (Array.isArray(url) ? url : [url]).map(normalizeRequestKey)
    client.cancelRequest(keys)
  },
  cancelAllRequest: client.cancelAllRequest
}

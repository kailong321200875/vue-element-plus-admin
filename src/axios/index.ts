import service from './service'
import { CONTENT_TYPE, TRANSFORM_REQUEST_DATA } from '@/constants'
import { useUserStoreWithOut } from '@/store/modules/user'
import { objToFormData } from '@/utils'

const request = (option: AxiosConfig) => {
  const { url, method, params, data, headers, responseType } = option
  // 是否需要转换数据格式
  const transformData =
    TRANSFORM_REQUEST_DATA &&
    (headers?.['Content-Type'] || CONTENT_TYPE) === 'multipart/form-data' &&
    data
  const userStore = useUserStoreWithOut()
  return service.request({
    url: url,
    method,
    params,
    data: transformData ? objToFormData(data) : data,
    responseType: responseType,
    headers: {
      'Content-Type': CONTENT_TYPE,
      [userStore.getTokenKey ?? 'Authorization']: userStore.getToken ?? '',
      ...headers
    }
  })
}

export default {
  get: <T = any>(option: AxiosConfig) => {
    return request({ method: 'get', ...option }) as Promise<IResponse<T>>
  },
  post: <T = any>(option: AxiosConfig) => {
    return request({ method: 'post', ...option }) as Promise<IResponse<T>>
  },
  delete: <T = any>(option: AxiosConfig) => {
    return request({ method: 'delete', ...option }) as Promise<IResponse<T>>
  },
  put: <T = any>(option: AxiosConfig) => {
    return request({ method: 'put', ...option }) as Promise<IResponse<T>>
  },
  cancelRequest: (url: string | string[]) => {
    return service.cancelRequest(url)
  },
  cancelAllRequest: () => {
    return service.cancelAllRequest()
  }
}

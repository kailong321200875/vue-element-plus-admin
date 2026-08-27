import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults
} from 'axios'

type MaybePromise<Value> = Value | Promise<Value>

export interface RequestConfig<Data = unknown> extends AxiosRequestConfig<Data> {
  requestKey?: string
}

export interface CreateRequestOptions {
  axiosConfig?: CreateAxiosDefaults
  beforeRequest?: <Data>(config: RequestConfig<Data>) => MaybePromise<RequestConfig<Data>>
  transformResponse?: (response: AxiosResponse) => MaybePromise<unknown>
  onError?: (error: unknown) => MaybePromise<void>
  getRequestKey?: <Data>(config: RequestConfig<Data>) => string
}

export interface RequestClient {
  instance: AxiosInstance
  request: <Response = unknown, Data = unknown>(config: RequestConfig<Data>) => Promise<Response>
  get: <Response = unknown>(config: RequestConfig) => Promise<Response>
  post: <Response = unknown, Data = unknown>(config: RequestConfig<Data>) => Promise<Response>
  put: <Response = unknown, Data = unknown>(config: RequestConfig<Data>) => Promise<Response>
  delete: <Response = unknown, Data = unknown>(config: RequestConfig<Data>) => Promise<Response>
  cancelRequest: (key: string | readonly string[]) => void
  cancelAllRequest: () => void
}

export const createRequest = (options: CreateRequestOptions = {}): RequestClient => {
  const instance = axios.create(options.axiosConfig)
  const controllers = new Set<AbortController>()
  const controllersByKey = new Map<string, Set<AbortController>>()

  const track = (controller: AbortController, key: string) => {
    controllers.add(controller)
    if (!key) return
    const keyedControllers = controllersByKey.get(key) ?? new Set<AbortController>()
    keyedControllers.add(controller)
    controllersByKey.set(key, keyedControllers)
  }

  const untrack = (controller: AbortController, key: string) => {
    controllers.delete(controller)
    if (!key) return
    const keyedControllers = controllersByKey.get(key)
    keyedControllers?.delete(controller)
    if (keyedControllers?.size === 0) controllersByKey.delete(key)
  }

  const request = async <Response = unknown, Data = unknown>(
    config: RequestConfig<Data>
  ): Promise<Response> => {
    let prepared: RequestConfig<Data> = config
    try {
      prepared = options.beforeRequest ? await options.beforeRequest(config) : config
    } catch (error) {
      await options.onError?.(error)
      throw error
    }

    const key = prepared.requestKey ?? options.getRequestKey?.(prepared) ?? prepared.url ?? ''
    const externalSignal = prepared.signal as AbortSignal | undefined
    const controller = new AbortController()
    const abort = () => controller.abort(externalSignal?.reason)

    if (externalSignal?.aborted) abort()
    else externalSignal?.addEventListener('abort', abort, { once: true })

    const axiosConfig = { ...prepared }
    delete axiosConfig.requestKey
    track(controller, key)
    try {
      const response = await instance.request({ ...axiosConfig, signal: controller.signal })
      return (
        options.transformResponse ? await options.transformResponse(response) : response.data
      ) as Response
    } catch (error) {
      await options.onError?.(error)
      throw error
    } finally {
      externalSignal?.removeEventListener('abort', abort)
      untrack(controller, key)
    }
  }

  const cancelRequest = (key: string | readonly string[]) => {
    const keys = Array.isArray(key) ? key : [key]
    keys.forEach((item) => {
      controllersByKey.get(item)?.forEach((controller) => controller.abort())
      controllersByKey.delete(item)
    })
  }

  const cancelAllRequest = () => {
    controllers.forEach((controller) => controller.abort())
    controllers.clear()
    controllersByKey.clear()
  }

  return {
    instance,
    request,
    get: (config) => request({ ...config, method: 'get' }),
    post: (config) => request({ ...config, method: 'post' }),
    put: (config) => request({ ...config, method: 'put' }),
    delete: (config) => request({ ...config, method: 'delete' }),
    cancelRequest,
    cancelAllRequest
  }
}

export type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  RawAxiosRequestHeaders
} from 'axios'
export { isCancel } from 'axios'

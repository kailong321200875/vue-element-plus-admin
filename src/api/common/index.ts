import request from '@/config/axios'

// 获取所有字典
export const getDictApi = (): Promise<IResponse> => {
  return request.get({ url: '/dict/list' })
}

// 模拟获取某个字典
export const getDictOneApi = async (): Promise<IResponse> => {
  return request.get({ url: '/dict/one' })
}

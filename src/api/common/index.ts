import { useAxios } from '@/hooks/web/useAxios'

const request = useAxios()

// 获取所有字典
export const getDictApi = async (): Promise<IResponse> => {
  const res = await request.get({ url: '/dict/list' })
  return res && res.data
}

// 模拟获取某个字典
export const getDictOneApi = async (): Promise<IResponse> => {
  const res = await request.get({ url: '/dict/one' })
  return res && res.data
}

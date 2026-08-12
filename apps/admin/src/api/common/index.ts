import request from '@/axios'
import type { DictionaryMap, DictionaryOption } from './types'

// 获取所有字典
export const getDictionaryListApi = () => {
  return request.get<DictionaryMap>({ url: '/mock/dict/list' })
}

// 模拟获取某个字典
export const getDictionaryDetailApi = () => {
  return request.get<DictionaryOption[]>({ url: '/mock/dict/one' })
}

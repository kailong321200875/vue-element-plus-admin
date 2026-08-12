import request from '@/axios'
import type { MenuListResult } from './types'

export const getMenuListApi = () => {
  return request.get<MenuListResult>({ url: '/mock/menu/list' })
}

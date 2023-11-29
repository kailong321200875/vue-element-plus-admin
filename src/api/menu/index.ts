import request from '@/config/axios'

export const getMenuListApi = () => {
  return request.get({ url: '/mock/menu/list' })
}

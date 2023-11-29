import request from '@/config/axios'

export const getRoleListApi = () => {
  return request.get({ url: '/mock/role/table' })
}

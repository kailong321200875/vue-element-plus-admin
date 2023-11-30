import request from '@/axios'

export const getRoleListApi = () => {
  return request.get({ url: '/mock/role/table' })
}

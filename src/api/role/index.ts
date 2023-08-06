import request from '@/config/axios'

export const getRoleListApi = () => {
  return request.get({ url: '/role/table' })
}

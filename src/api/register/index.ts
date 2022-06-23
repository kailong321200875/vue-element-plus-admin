import { useAxios } from '@/hooks/web/useAxios'
import { IUserModel } from '@/api-types/user'

const request = useAxios()

export const getCodeApi = () => {
  return request.get<IResponse<string>>({ url: 'user/captcha' })
}

export const registerApi = (data: Omit<IUserModel, 'is_admin'>) => {
  return request.post<IResponse<IUserModel>>({ url: 'user/register', data })
}

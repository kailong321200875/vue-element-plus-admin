import { useAxios } from '@/hooks/web/useAxios'
import { IUserModel } from '@/api-types/user'

const request = useAxios()

export const getCodeApi = async () => {
  return (await request.get<IResponse<string>>({ url: 'user/captcha' })).data
}

export const registerApi = async (data: Omit<IUserModel, 'is_admin'>) => {
  return (await request.post<IResponse<IUserModel>>({ url: 'user/register', data })).data
}

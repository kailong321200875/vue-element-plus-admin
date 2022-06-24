import { useAxios } from '@/hooks/web/useAxios'
import { IUserModel } from '@/api-types/user'

const request = useAxios()

interface ICodeModel {
  url: string
  uuid: string
}

export const getCodeApi = async () => {
  const res = await request.get<IResponse<ICodeModel>>({ url: 'user/captcha' })
  return res && res.data
}

export const registerApi = async (data: Omit<IUserModel, 'is_admin'>) => {
  const res = await request.post<IResponse<IUserModel>>({ url: 'user/register', data })
  return res && res.data
}

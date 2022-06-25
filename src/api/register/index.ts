import { useAxios } from '@/hooks/web/useAxios'
import { IUserModel } from '@/api-types/user'

const request = useAxios()

interface ICodeModel {
  url: string
  uuid: string
}

export const getCodeApi = async (): Promise<IResponse<ICodeModel>> => {
  const res = await request.get({ url: 'user/captcha' })
  return res && res.data
}

export const registerApi = async (
  data: Omit<IUserModel, 'is_admin'>
): Promise<IResponse<IUserModel>> => {
  const res = await request.post({ url: 'user/register', data })
  return res && res.data
}

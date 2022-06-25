import { useAxios } from '@/hooks/web/useAxios'
import type {
  AnalysisTotalTypes,
  UserAccessSource,
  WeeklyUserActivity,
  MonthlySales
} from './types'

const request = useAxios()

export const getCountApi = async (): Promise<IResponse<AnalysisTotalTypes[]>> => {
  const res = await request.get({ url: '/analysis/total' })
  return res && res.data
}

export const getUserAccessSourceApi = async (): Promise<IResponse<UserAccessSource[]>> => {
  const res = await request.get({ url: '/analysis/userAccessSource' })
  return res && res.data
}

export const getWeeklyUserActivityApi = async (): Promise<IResponse<WeeklyUserActivity[]>> => {
  const res = await request.get({ url: '/analysis/weeklyUserActivity' })
  return res && res.data
}

export const getMonthlySalesApi = async (): Promise<IResponse<MonthlySales[]>> => {
  const res = await request.get({ url: '/analysis/monthlySales' })
  return res && res.data
}

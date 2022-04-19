import { useAxios } from '@/hooks/web/useAxios'
import type {
  AnalysisTotalTypes,
  UserAccessSource,
  WeeklyUserActivity,
  MonthlySales
} from './types'

const request = useAxios()

export const getCountApi = () => {
  return request.get<AnalysisTotalTypes>({ url: '/analysis/total' })
}

export const getUserAccessSourceApi = () => {
  return request.get<UserAccessSource[]>({ url: '/analysis/userAccessSource' })
}

export const getWeeklyUserActivityApi = () => {
  return request.get<WeeklyUserActivity[]>({ url: '/analysis/weeklyUserActivity' })
}

export const getMonthlySalesApi = () => {
  return request.get<MonthlySales[]>({ url: '/analysis/monthlySales' })
}

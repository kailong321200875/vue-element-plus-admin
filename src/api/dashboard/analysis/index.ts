import { useAxios } from '@/hooks/web/useAxios'
import type {
  AnalysisTotalTypes,
  UserAccessSource,
  WeeklyUserActivity,
  MonthlySales
} from './types'

const { request } = useAxios()

export const getCountApi = () => {
  return request<AnalysisTotalTypes>({ url: '/analysis/total', method: 'get' })
}

export const getUserAccessSourceApi = () => {
  return request<UserAccessSource[]>({ url: '/analysis/userAccessSource', method: 'get' })
}

export const getWeeklyUserActivityApi = () => {
  return request<WeeklyUserActivity[]>({ url: '/analysis/weeklyUserActivity', method: 'get' })
}

export const getMonthlySalesApi = () => {
  return request<MonthlySales[]>({ url: '/analysis/monthlySales', method: 'get' })
}

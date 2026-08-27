import request from '@/request'
import type { AnalysisTotal, UserAccessSource, WeeklyUserActivity, MonthlySales } from './types'

export const getAnalysisTotalApi = () => {
  return request.get<AnalysisTotal>({ url: '/mock/analysis/total' })
}

export const getUserAccessSourceApi = () => {
  return request.get<UserAccessSource[]>({ url: '/mock/analysis/userAccessSource' })
}

export const getWeeklyUserActivityApi = () => {
  return request.get<WeeklyUserActivity[]>({ url: '/mock/analysis/weeklyUserActivity' })
}

export const getMonthlySalesApi = () => {
  return request.get<MonthlySales[]>({ url: '/mock/analysis/monthlySales' })
}

import request from '@/axios'
import type { WorkplaceSummary, ProjectItem, ActivityItem, TeamItem, RadarItem } from './types'

export const getWorkplaceSummaryApi = () => {
  return request.get<WorkplaceSummary>({ url: '/mock/workplace/total' })
}

export const getProjectListApi = () => {
  return request.get<ProjectItem[]>({ url: '/mock/workplace/project' })
}

export const getActivityListApi = () => {
  return request.get<ActivityItem[]>({ url: '/mock/workplace/dynamic' })
}

export const getTeamListApi = () => {
  return request.get<TeamItem[]>({ url: '/mock/workplace/team' })
}

export const getRadarDataApi = () => {
  return request.get<RadarItem[]>({ url: '/mock/workplace/radar' })
}

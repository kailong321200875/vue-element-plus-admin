import request from '@/config/axios'
import type { WorkplaceTotal, Project, Dynamic, Team, RadarData } from './types'

export const getCountApi = (): Promise<IResponse<WorkplaceTotal>> => {
  return request.get({ url: '/workplace/total' })
}

export const getProjectApi = (): Promise<IResponse<Project>> => {
  return request.get({ url: '/workplace/project' })
}

export const getDynamicApi = (): Promise<IResponse<Dynamic[]>> => {
  return request.get({ url: '/workplace/dynamic' })
}

export const getTeamApi = (): Promise<IResponse<Team[]>> => {
  return request.get({ url: '/workplace/team' })
}

export const getRadarApi = (): Promise<IResponse<RadarData[]>> => {
  return request.get({ url: '/workplace/radar' })
}

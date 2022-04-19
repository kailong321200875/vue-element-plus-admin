import { useAxios } from '@/hooks/web/useAxios'
import type { WorkplaceTotal, Project, Dynamic, Team, RadarData } from './types'

const request = useAxios()

export const getCountApi = () => {
  return request.get<WorkplaceTotal>({ url: '/workplace/total' })
}

export const getProjectApi = () => {
  return request.get<Project[]>({ url: '/workplace/project' })
}

export const getDynamicApi = () => {
  return request.get<Dynamic[]>({ url: '/workplace/dynamic' })
}

export const getTeamApi = () => {
  return request.get<Team[]>({ url: '/workplace/team' })
}

export const getRadarApi = () => {
  return request.get<RadarData[]>({ url: '/workplace/radar' })
}

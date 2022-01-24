import { useAxios } from '@/hooks/web/useAxios'
import type { WorkplaceTotal, Project, Dynamic, Team, RadarData } from './types'

const { request } = useAxios()

export const getCountApi = () => {
  return request<WorkplaceTotal>({ url: '/workplace/total', method: 'get' })
}

export const getProjectApi = () => {
  return request<Project[]>({ url: '/workplace/project', method: 'get' })
}

export const getDynamicApi = () => {
  return request<Dynamic[]>({ url: '/workplace/dynamic', method: 'get' })
}

export const getTeamApi = () => {
  return request<Team[]>({ url: '/workplace/team', method: 'get' })
}

export const getRadarApi = () => {
  return request<RadarData[]>({ url: '/workplace/radar', method: 'get' })
}

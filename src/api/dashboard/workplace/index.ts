import { useAxios } from '@/hooks/web/useAxios'
import type { WorkplaceTotal, Project, Dynamic, Team, RadarData } from './types'

const request = useAxios()

export const getCountApi = async (): Promise<IResponse<WorkplaceTotal>> => {
  const res = await request.get({ url: '/workplace/total' })
  return res && res.data
}

export const getProjectApi = async (): Promise<IResponse<Project>> => {
  const res = await request.get({ url: '/workplace/project' })
  return res && res.data
}

export const getDynamicApi = async (): Promise<IResponse<Dynamic[]>> => {
  const res = await request.get({ url: '/workplace/dynamic' })
  return res && res.data
}

export const getTeamApi = async (): Promise<IResponse<Team[]>> => {
  const res = await request.get({ url: '/workplace/team' })
  return res && res.data
}

export const getRadarApi = async (): Promise<IResponse<RadarData[]>> => {
  const res = await request.get({ url: '/workplace/radar' })
  return res && res.data
}

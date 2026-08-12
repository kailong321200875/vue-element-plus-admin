export interface WorkplaceSummary {
  project: number
  access: number
  todo: number
}

export interface ProjectItem {
  name: string
  icon: string
  message: string
  personal: string
  time: Date | number | string
}

export interface ActivityItem {
  keys: string[]
  time: Date | number | string
}

export interface TeamItem {
  name: string
  icon: string
}

export interface RadarItem {
  personal: number
  team: number
  max: number
  name: string
}

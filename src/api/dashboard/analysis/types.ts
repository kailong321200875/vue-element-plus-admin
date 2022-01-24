export type AnalysisTotalTypes = {
  users: number
  messages: number
  moneys: number
  shoppings: number
}

export type UserAccessSource = {
  value: number
  name: string
}

export type WeeklyUserActivity = {
  value: number
  name: string
}

export type MonthlySales = {
  name: string
  estimate: number
  actual: number
}

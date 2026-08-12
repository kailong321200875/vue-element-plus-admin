export interface AnalysisTotal {
  users: number
  messages: number
  moneys: number
  shoppings: number
}

export interface UserAccessSource {
  value: number
  name: string
}

export interface WeeklyUserActivity {
  value: number
  name: string
}

export interface MonthlySales {
  name: string
  estimate: number
  actual: number
}

export interface InfoWriteParams {
  title: string
  id?: string
  author: string
  importance: string
  display_time: string
  pageviews: number
}

export interface InfoWriteRules {
  title?: any[]
  author?: any[]
  importance?: any[]
  display_time?: any[]
  pageviews?: any[]
}

export interface LoginParams {
  username: string
  password: string
}

export interface UserInfo {
  username: string
  role: string
  roleId: string
  permissions: string[]
}

export interface LoginResult {
  accessToken: string
  user: UserInfo
}

export interface UserListParams {
  pageIndex: number
  pageSize: number
  username?: string
}

export interface UserListResult {
  list: UserInfo[]
  total: number
}

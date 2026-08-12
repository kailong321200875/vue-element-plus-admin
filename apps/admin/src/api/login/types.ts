export interface LoginParams {
  username: string
  password: string
}

export interface UserInfo {
  username: string
}

export interface LoginResult {
  accessToken: string
  user: UserInfo
}

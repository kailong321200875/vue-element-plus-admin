export interface UserLoginType {
  username: string
  password: string
}

export interface UserType {
  username: string
  role: string
  roleId: string
  permissions: string[]
}

export interface LoginResult {
  accessToken: string
  user: UserType
}

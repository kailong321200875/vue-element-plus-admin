export interface DepartmentItem {
  id: string
  departmentName: string
  children?: DepartmentItem[]
}

export interface DepartmentListResponse {
  list: DepartmentItem[]
}

export interface DepartmentUserParams {
  pageSize: number
  pageIndex: number
  id: string
  username?: string
  account?: string
}

export interface DepartmentUserItem {
  id: string
  username: string
  account: string
  email: string
  createTime: string
  role: string
  department: DepartmentItem
}

export interface DepartmentUserResponse {
  list: DepartmentUserItem[]
  total: number
}

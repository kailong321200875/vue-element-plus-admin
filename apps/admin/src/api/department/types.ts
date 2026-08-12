export interface DepartmentItem {
  id: string
  departmentName: string
  children?: DepartmentItem[]
}

export interface DepartmentTreeResult {
  list: DepartmentItem[]
}

export interface DepartmentUserListParams {
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

export interface DepartmentUserListResult {
  list: DepartmentUserItem[]
  total: number
}

export interface DepartmentListResult {
  list: DepartmentItem[]
  total: number
}

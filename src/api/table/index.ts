import request from '@/axios'
import type { TableData } from './types'

interface Result {
  list: TableData[]
  total: number
}

// 生成模拟数据的辅助函数
const generateMockData = (count: number): TableData[] => {
  const stages = ['开发阶段', '测试阶段', '生产阶段', '验证阶段', '量产阶段']
  const carTypes = ['SUV', '轿车', 'MPV', '跑车', '新能源']
  const creators = ['张三', '李四', '王五', '赵六', '钱七']

  return Array.from({ length: count }, (_, index) => ({
    ProjectId: `PRJ${String(index + 1).padStart(3, '0')}`,
    ProjectStage: stages[Math.floor(Math.random() * stages.length)],
    CarType: carTypes[Math.floor(Math.random() * carTypes.length)],
    Creator: creators[Math.floor(Math.random() * creators.length)],
    CreateTime: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    id: index + 1
  }))
}

export const getTableListApi = (params: any): Promise<IResponse<Result>> => {
  const mockData = generateMockData(100)
  const { pageIndex = 1, pageSize = 10 } = params
  const start = (pageIndex - 1) * pageSize
  const end = start + pageSize

  return Promise.resolve({
    code: 0,
    data: {
      list: mockData.slice(start, end),
      total: mockData.length
    }
  })

  // 如果要切换到真实API，只需取消注释下面的代码
  // return request.get({ url: '/mock/example/list', params })
}

export const getCardTableListApi = (params: any) => {
  return request.get({ url: '/mock/card/list', params })
}

export const getTreeTableListApi = (params: any) => {
  return request.get({ url: '/mock/example/treeList', params })
}

export const saveTableApi = (data: Partial<TableData>): Promise<IResponse> => {
  return request.post({ url: '/mock/example/save', data })
}

export const getTableDetApi = (id: string): Promise<IResponse<TableData>> => {
  return request.get({ url: '/mock/example/detail', params: { id } })
}

export const delTableListApi = (ids: string[] | number[]): Promise<IResponse> => {
  return request.post({ url: '/mock/example/delete', data: { ids } })
}

import Mock from 'mockjs'
import { toAnyString } from '@/utils'

const List: any[] = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: toAnyString(),
    timestamp: +Mock.Random.date('T'),
    author: '@first',
    reviewer: '@first',
    title: '@title(5, 10)',
    content_short: 'mock data',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft', 'deleted'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    image_uri,
    platforms: ['a-platform']
  }))
}

export default [
  {
    url: 'http://mockjs.test.cn/example/list',
    type: 'get',
    response: (config: any) => {
      const { title, pageIndex, pageSize } = config.query

      const mockList = List.filter(item => {
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })
      const pageList = mockList.filter((item, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1))

      return {
        code: '0000',
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },

  {
    url: 'http://mockjs.test.cn/example/delete',
    type: 'post',
    response: (config: any) => {
      return {
        code: '0000',
        data: '删除成功'
      }
    }
  },

  {
    url: 'http://mockjs.test.cn/example/detail',
    type: 'get',
    response: (config: any) => {
      const { id } = config.query
      for (const example of List) {
        if (example.id === id) {
          return {
            code: '0000',
            data: example
          }
        }
      }
    }
  },

  {
    url: 'http://mockjs.test.cn/example/save',
    type: 'post',
    response: (config: any) => {
      return {
        code: '0000',
        data: 'success'
      }
    }
  }
]

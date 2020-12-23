import Mock from 'mockjs'
import { toAnyString } from '@/utils'

let List: any[] = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
// const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: toAnyString(),
    // timestamp: +Mock.Random.date('T'),
    author: '@first',
    title: '@title(5, 10)',
    content: baseContent,
    importance: '@integer(1, 3)',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
    // image_uri
  }))
}

export default [
  // 列表接口
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

  // 删除接口
  {
    url: 'http://mockjs.test.cn/example/delete',
    type: 'post',
    response: (config: any) => {
      const ids = config.body.ids
      if (!ids) {
        return {
          code: '500',
          message: '请选择需要删除的数据'
        }
      } else {
        let i = List.length
        while (i--) {
          if (ids.indexOf(List[i].id) !== -1) {
            List.splice(i, 1)
          }
        }
        return {
          code: '0000',
          data: 'success'
        }
      }
    }
  },

  // 详情接口
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

  // 保存接口
  {
    url: 'http://mockjs.test.cn/example/save',
    type: 'post',
    response: (config: any) => {
      const data = config.body
      if (!data.id) {
        List = [Object.assign(data, { id: toAnyString(), importance: Number(data.importance) })].concat(List)
        return {
          code: '0000',
          data: 'success'
        }
      } else {
        List.map(item => {
          if (item.id === data.id) {
            for (const key in item) {
              if (key === 'importance') {
                item[key] = Number(data[key])
              } else {
                item[key] = data[key]
              }
            }
          }
        })
        return {
          code: '0000',
          data: 'success'
        }
      }
    }
  }
]

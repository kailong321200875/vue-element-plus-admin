import Mock from 'mockjs'
import { SUCCESS_CODE } from '@/constants'
import { toAnyString } from '@/utils'

const timeout = 1000
const count = 100

const baseContent =
  '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'

interface ListProps {
  id: string
  author: string
  title: string
  content: string
  importance: number
  display_time: any
  pageviews: number
  image_uri: string
  video_uri?: string
}

interface TreeListProps {
  id: string
  author: string
  title: string
  content: string
  importance: number
  display_time: any
  image_uri: string
  pageviews: number
  video_uri?: string
  children?: TreeListProps[]
}

let List: ListProps[] = []

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: toAnyString(),
      // timestamp: +Mock.Random.date('T'),
      author: '@first',
      title: '@title(5, 10)',
      content: baseContent,
      importance: '@integer(1, 3)',
      display_time: '@datetime',
      pageviews: '@integer(100, 500)',
      image_uri: Mock.Random.image('@integer(100, 500)x@integer(100, 500)'),
      video_uri:
        '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4'
    })
  )
}

const treeList: TreeListProps[] = []

for (let i = 0; i < count; i++) {
  treeList.push(
    Mock.mock({
      id: toAnyString(),
      // timestamp: +Mock.Random.date('T'),
      author: '@first',
      title: '@title(5, 10)',
      content: baseContent,
      importance: '@integer(1, 3)',
      display_time: '@datetime',
      pageviews: '@integer(300, 5000)',
      image_uri: Mock.Random.image('@integer(100, 500)x@integer(100, 500)'),
      children: [
        {
          id: toAnyString(),
          // timestamp: +Mock.Random.date('T'),
          author: '@first',
          title: '@title(5, 10)',
          content: baseContent,
          importance: '@integer(1, 3)',
          display_time: '@datetime',
          pageviews: '@integer(300, 5000)',
          image_uri: Mock.Random.image('@integer(100, 500)x@integer(100, 500)'),
          children: [
            {
              id: toAnyString(),
              // timestamp: +Mock.Random.date('T'),
              author: '@first',
              title: '@title(5, 10)',
              content: baseContent,
              importance: '@integer(1, 3)',
              display_time: '@datetime',
              pageviews: '@integer(300, 5000)',
              image_uri: Mock.Random.image('@integer(100, 500)x@integer(100, 500)')
            },
            {
              id: toAnyString(),
              // timestamp: +Mock.Random.date('T'),
              author: '@first',
              title: '@title(5, 10)',
              content: baseContent,
              importance: '@integer(1, 3)',
              display_time: '@datetime',
              pageviews: '@integer(300, 5000)',
              image_uri: Mock.Random.image('@integer(100, 500)x@integer(100, 500)')
            }
          ]
        },
        {
          id: toAnyString(),
          // timestamp: +Mock.Random.date('T'),
          author: '@first',
          title: '@title(5, 10)',
          content: baseContent,
          importance: '@integer(1, 3)',
          display_time: '@datetime',
          pageviews: '@integer(300, 5000)',
          image_uri: Mock.Random.image('@integer(100, 500)x@integer(100, 500)')
        },
        {
          id: toAnyString(),
          // timestamp: +Mock.Random.date('T'),
          author: '@first',
          title: '@title(5, 10)',
          content: baseContent,
          importance: '@integer(1, 3)',
          display_time: '@datetime',
          pageviews: '@integer(300, 5000)',
          image_uri: Mock.Random.image('@integer(100, 500)x@integer(100, 500)')
        },
        {
          id: toAnyString(),
          // timestamp: +Mock.Random.date('T'),
          author: '@first',
          title: '@title(5, 10)',
          content: baseContent,
          importance: '@integer(1, 3)',
          display_time: '@datetime',
          pageviews: '@integer(300, 5000)',
          image_uri: Mock.Random.image('@integer(100, 500)x@integer(100, 500)')
        }
      ]
      // image_uri
    })
  )
}

const cardList = [
  {
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    name: 'Alipay',
    desc: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
  },
  {
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
    name: 'Angular',
    desc: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
  },
  {
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
    name: 'Bootstrap',
    desc: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
  },
  {
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
    name: 'React',
    desc: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
  },
  {
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
    name: 'Vue',
    desc: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
  },
  {
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png',
    name: 'Webpack',
    desc: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
  }
]

export default [
  // 树形列表接口
  {
    url: '/mock/example/treeList',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { title, pageIndex, pageSize } = query
      const mockList = treeList.filter((item) => {
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })
      const pageList = mockList.filter(
        (_, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1)
      )
      return {
        code: SUCCESS_CODE,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },
  // 列表接口
  {
    url: '/mock/example/list',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { title, pageIndex, pageSize } = query
      const mockList = List.filter((item) => {
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })
      const pageList = mockList.filter(
        (_, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1)
      )
      return {
        code: SUCCESS_CODE,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },
  // 保存接口
  {
    url: '/mock/example/save',
    method: 'post',
    timeout,
    response: ({ body }) => {
      if (!body.id) {
        List = [
          Object.assign(body, {
            id: toAnyString()
          })
        ].concat(List)
        return {
          code: SUCCESS_CODE,
          data: 'success'
        }
      } else {
        List.map((item) => {
          if (item.id === body.id) {
            for (const key in item) {
              item[key] = body[key]
            }
          }
        })
        return {
          code: SUCCESS_CODE,
          data: 'success'
        }
      }
    }
  },
  // 详情接口
  {
    url: '/mock/example/detail',
    method: 'get',
    response: ({ query }) => {
      const { id } = query
      for (const example of List) {
        if (example.id === id) {
          return {
            code: SUCCESS_CODE,
            data: example
          }
        }
      }
    }
  },
  // 删除接口
  {
    url: '/mock/example/delete',
    method: 'post',
    response: ({ body }) => {
      const ids = body.ids
      if (!ids) {
        return {
          code: 500,
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
          code: SUCCESS_CODE,
          data: 'success'
        }
      }
    }
  },
  {
    url: '/mock/card/list',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { name, pageIndex, pageSize } = query
      const mockList = cardList.filter((item) => {
        if (name && item.name.indexOf(name) < 0) return false
        return true
      })
      const pageList = mockList.filter(
        (_, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1)
      )
      return {
        code: SUCCESS_CODE,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  }
]

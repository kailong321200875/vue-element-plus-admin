import config from '@/config/axios/config'

const { code } = config

const delay = 1000

const dictObj: Recordable = {
  importance: [
    {
      value: 0,
      label: 'tableDemo.commonly'
    },
    {
      value: 1,
      label: 'tableDemo.good'
    },
    {
      value: 2,
      label: 'tableDemo.important'
    }
  ]
}

export default [
  // 字典接口
  {
    url: '/mock/dict/list',
    method: 'GET',
    delay,
    body: () => {
      return {
        code: code,
        data: dictObj
      }
    }
  },
  // 获取某个字典
  {
    url: '/mock/dict/one',
    method: 'GET',
    delay,
    body: () => {
      return {
        code: code,
        data: [
          {
            label: 'test1',
            value: 0
          },
          {
            label: 'test2',
            value: 1
          },
          {
            label: 'test3',
            value: 2
          }
        ]
      }
    }
  }
]

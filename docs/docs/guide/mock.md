# Mock 与联调

## Mock

本项目中的接口采用的是`Mock.js`配合`axios`进行接口对接模拟，默认是所有环境下都开启`mock`。如需不需要，可以删除`src/main.ts`中引入`mock`的代码。

具体配置代码可查看`src/mock/index.ts`

::: warning 注意
自定义`mock`接口的时候，可能会出现跨域的问题，这时候开发者可以自行在`vite.config.ts`中自行代理。

Mock的模拟请求，在浏览器中是看不到请求记录的，这点也是一个弊端，开发者只能通过代码打印的形式去查看返回的结果，后续考虑还有没有更优的方案。
:::

`mock`接口的写法可参考`src/mock/example/index.ts`

```javaScript
import Mock from 'mockjs'
import { toAnyString } from '@/utils'

let List: any[] = []
const count = 100

const baseContent =
  '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'

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
      pageviews: '@integer(300, 5000)'
      // image_uri
    })
  )
}

export default [
  // 列表接口
  {
    url: 'http://mockjs.test.cn/example/list',
    type: 'get',
    response: (config: any) => {
      const { title, pageIndex, pageSize } = config.query

      const mockList = List.filter((item) => {
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })
      const pageList = mockList.filter(
        (item, index) =>
          index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1)
      )

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
        List = [
          Object.assign(data, {
            id: toAnyString(),
            importance: Number(data.importance)
          })
        ].concat(List)
        return {
          code: '0000',
          data: 'success'
        }
      } else {
        List.map((item) => {
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

```

## Axios

本项目中的所有接口请求都是基于[axios.js](https://github.com/axios/axios)来进行的。

为了便于后期的维护，本项目中对`axios`进行了二次封装，从而可以对接口请求进行统一拦截。

### 配置项

同时，可供了一些`axios`的全局配置，具体代码`src/axios-config/config.ts`，开发者可自行更改扩展。

```typeScript
/**
 * request全局配置
 */

const config: {
  base_url: {
    base: string
    dev: string
    pro: string
    test: string
  }
  result_code: number | string
  default_headers:
    | 'application/json'
    | 'application/x-www-form-urlencoded'
    | 'multipart/form-data'
  request_timeout: number
} = {
  /**
   * api请求基础路径
   */
  base_url: {
    // 开发环境接口前缀
    base: 'http://mockjs.test.cn',

    // 打包开发环境接口前缀
    dev: 'http://mockjs.test.cn',

    // 打包生产环境接口前缀
    pro: 'http://mockjs.test.cn',

    // 打包测试环境接口前缀
    test: 'http://mockjs.test.cn'
  },

  /**
   * 接口成功返回状态码
   */
  result_code: '0000',

  /**
   * 接口请求超时时间
   */
  request_timeout: 60000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  default_headers: 'application/json'
}

export default config
```

### 请求方法

为了便于维护，本项目中对所有请求方式的接口进行封装，开发者只需要参数对应参数即可使用如`get`、`post`请求。

具体代码`src/axios-config/index.ts`，开发者可自行更改扩展。

```typeScript
import request from './request'

import { appStore } from '@/store/modules/app'

import config from './config'

import { AxiosPromise, ResponseType } from 'axios'

const { default_headers } = config

export interface Config {
  params?: any
  data?: any
  url?: string
  method?: 'get' | 'post' | 'delete' | 'put'
  headersType?: string
  responseType?: ResponseType
}

function fetch({
  url,
  method,
  params,
  data,
  headersType,
  responseType
}: Config): AxiosPromise {
  return request({
    url: url,
    method,
    params: appStore.requestTime
      ? { time: new Date().getTime(), ...(params || {}) }
      : params,
    data,
    responseType: responseType,
    headers: {
      'Content-Type': headersType || default_headers
    }
  })
}

export default fetch

```

### 请求拦截

具体代码`src/axios-config/request.ts`，开发者可自行更改扩展。

``` javascript
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

import { Message } from '_c/Message'

import qs from 'qs'

import config from './config'

const { result_code, base_url } = config

export const PATH_URL = base_url[import.meta.env.VITE_API_BASEPATH as string]

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: PATH_URL, // api 的 base_url
  timeout: config.request_timeout // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (
      config.method === 'post' &&
      (config.headers as any)['Content-Type'] === 'application/x-www-form-urlencoded'
    ) {
      config.data = qs.stringify(config.data)
    }
    // get参数编码
    if (config.method === 'get' && config.params) {
      let url = config.url as string
      url += '?'
      const keys = Object.keys(config.params)
      for (const key of keys) {
        if (config.params[key] !== void 0 && config.params[key] !== null) {
          url += `${key}=${encodeURIComponent(config.params[key])}&`
        }
      }
      url = url.substring(0, url.length - 1)
      config.params = {}
      config.url = url
    }
    return config
  },
  (error: AxiosError) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    if (response.config.responseType === 'blob') {
      // 如果是文件流，直接过
      return response
    } else if (response.data.code === result_code) {
      return response.data
    } else {
      Message.error(response.data.message)
    }
  },
  (error: AxiosError) => {
    console.log('err' + error) // for debug
    Message.error(error.message)
    return Promise.reject(error)
  }
)

export default service

```

## Api管理

在之前，我一直在纠结，`api`接口到底是集中管理，还是分模块各自管理，在之后的几个公司项目的实践中，在项目越来越大，一个模块有可能调用了几十个接口，那这时候在集中管理`api`，会导致`api`的来源不明确，不利于查找对应`api`接口。所以现在比较偏向分模块进行`api`管理，这样更便于后期的维护，各模块只关心和维护模块中使用的`api`接口。

```typeScript
import fetch from '@/axios-config'

export const loginApi = ({ data }: any) => {
  return fetch({ url: '/user/login', method: 'post', data })
}

export const getRoleDetApi = ({ params }: any) => {
  return fetch({ url: '/role/detail', method: 'get', params })
}

```

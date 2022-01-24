import { config } from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'

const { result_code } = config

const timeout = 1000

export default [
  // 获取统计
  {
    url: '/workplace/total',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: result_code,
        data: {
          project: 40,
          access: 2340,
          todo: 10
        }
      }
    }
  },
  // 获取项目
  {
    url: '/workplace/project',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: result_code,
        data: [
          {
            name: 'Github',
            icon: 'akar-icons:github-fill',
            message: 'workplace.introduction',
            personal: 'Archer',
            time: new Date()
          },
          {
            name: 'Vue',
            icon: 'logos:vue',
            message: 'workplace.introduction',
            personal: 'Archer',
            time: new Date()
          },
          {
            name: 'Angular',
            icon: 'logos:angular-icon',
            message: 'workplace.introduction',
            personal: 'Archer',
            time: new Date()
          },
          {
            name: 'React',
            icon: 'logos:react',
            message: 'workplace.introduction',
            personal: 'Archer',
            time: new Date()
          },
          {
            name: 'Webpack',
            icon: 'logos:webpack',
            message: 'workplace.introduction',
            personal: 'Archer',
            time: new Date()
          },
          {
            name: 'Vite',
            icon: 'vscode-icons:file-type-vite',
            message: 'workplace.introduction',
            personal: 'Archer',
            time: new Date()
          }
        ]
      }
    }
  },
  // 获取动态
  {
    url: '/workplace/dynamic',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: result_code,
        data: [
          {
            keys: ['workplace.push', 'Github'],
            time: new Date()
          },
          {
            keys: ['workplace.push', 'Github'],
            time: new Date()
          },
          {
            keys: ['workplace.push', 'Github'],
            time: new Date()
          },
          {
            keys: ['workplace.push', 'Github'],
            time: new Date()
          },
          {
            keys: ['workplace.push', 'Github'],
            time: new Date()
          },
          {
            keys: ['workplace.push', 'Github'],
            time: new Date()
          }
        ]
      }
    }
  },
  // 获取团队信息
  {
    url: '/workplace/team',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: result_code,
        data: [
          {
            name: 'Github',
            icon: 'akar-icons:github-fill'
          },
          {
            name: 'Vue',
            icon: 'logos:vue'
          },
          {
            name: 'Angular',
            icon: 'logos:angular-icon'
          },
          {
            name: 'React',
            icon: 'logos:react'
          },
          {
            name: 'Webpack',
            icon: 'logos:webpack'
          },
          {
            name: 'Vite',
            icon: 'vscode-icons:file-type-vite'
          }
        ]
      }
    }
  },
  // 获取指数
  {
    url: '/workplace/radar',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: result_code,
        data: [
          { name: 'workplace.quote', max: 65, personal: 42, team: 50 },
          { name: 'workplace.contribution', max: 160, personal: 30, team: 140 },
          { name: 'workplace.hot', max: 300, personal: 20, team: 28 },
          { name: 'workplace.yield', max: 130, personal: 35, team: 35 },
          { name: 'workplace.follow', max: 100, personal: 80, team: 90 }
        ]
      }
    }
  }
] as MockMethod[]

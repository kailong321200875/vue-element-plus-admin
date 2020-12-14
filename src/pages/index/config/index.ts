/**
 * 全局配置
 */
import { ConfigOptions } from './types'

const config: ConfigOptions = {
  /**
   * 配置显示在浏览器标签的title
   */
  title: 'vue-antdv-admin',

  /**
   * 是否显示标签页
   */
  has_tags: true,

  /**
   * 是否显示logo
   */
  show_logo: true,

  /**
   * logo标题
   */
  logo_title: 'vue-antdv-admin',

  /**
   * 横纵布局 Classic(经典) Top(头部) LeftTop(左侧顶部)
   */
  layout: 'Test',

  /**
   * 主题色 light(明亮) dark(暗黑)
   */
  theme: 'dark',

  /**
   * api请求基础路径
   */
  base_url: {
    // 开发环境接口前缀
    // dev: 'https://api.apiopen.top',
    dev: 'http://mockjs.test.cn',
    // 生产环境接口前缀
    pro: 'http://mockjs.test.cn',
    // 测试环境接口前缀
    test: 'http://mockjs.test.cn'
  },

  /**
   * 接口成功返回状态码
   */
  result_code: '0000',

  /**
   * 接口请求超时时间
   */
  request_timeout: 5000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  default_headers: 'application/json',

  /**
   * 登录信息存储字段-建议每个项目换一个字段，避免与其他项目冲突
   */
  user_info: 'userInfo'
}

export default config

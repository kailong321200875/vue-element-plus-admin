module.exports = {
  title: 'vue-element-plus-admin',
  description: '种一棵树最好的时间是十年前，其次就是现在。',
  base: process.argv[2] === 'dev' ? '/' : '/dist-doc/', // 这是部署到github相关的配置
  // base: '/',
  // base: '/dist-doc2.0/',
  // base: '/ue/2019/doc/vue-standard/dist/',
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    search: true, // 是否开启搜索
    searchMaxSuggestions: 10, // 搜索最大条数
    // 侧边栏
    sidebar: {
      '/guide/': [
        {
          title: '基础',
          collapsable: false,
          children: [
            '/guide/',
            '/guide/quick-start',
            '/guide/configuration',
            '/guide/router',
            '/guide/mock'
          ]
        },
        {
          title: '进阶',
          collapsable: false,
          children: ['/guide/standard', '/guide/style', '/guide/role']
        }
      ],
      '/components/': [
        {
          title: '组件',
          collapsable: false,
          children: ['/components/']
        },
        {
          title: '全局组件',
          collapsable: false,
          children: [
            '/components/svg-icon',
            '/components/com-table',
            '/components/com-search',
            '/components/com-dialog',
            '/components/com-detail'
          ]
        },
        {
          title: '普通组件',
          collapsable: false,
          children: [
            '/components/echart',
            '/components/preview',
            '/components/avatars',
            '/components/highlight',
            '/components/editor',
            '/components/qrcode'
          ]
        }
      ]
    },
    // 导航栏
    nav: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: '指南',
        link: '/guide/'
      },
      {
        text: '功能组件',
        link: '/components/'
      },
      {
        text: '更新日志',
        link: '/changLog/changLog'
      },
      {
        text: '预览',
        link: 'http://8.133.179.48:4000/dist-pro/'
      },
      {
        text: 'Github',
        link: 'https://github.com/kailong321200875/vue-element-plus-admin'
      },
      {
        text: 'Gitee',
        link: 'https://gitee.com/kailong110120130/vue-element-plus-admin'
      }
    ]
  },
  plugins: [
    [
      'vuepress-plugin-typescript',
      {
        tsLoaderOptions: {
          // ts-loader 的所有配置项
        }
      }
    ]
  ]
}

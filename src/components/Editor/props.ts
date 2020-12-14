import { PropType } from 'vue'
import { message } from 'ant-design-vue'
import { oneOf } from '@/utils'

import { Config } from './types'

export const editorProps = {
  // 基础配置
  config: {
    type: Object as PropType<Config>,
    default: () => {
      return {
        height: 500,
        zIndex: 500,
        placeholder: '请输入文本',
        focus: false,
        onchangeTimeout: 500,
        customAlert: (s: string, t: string) => {
          switch (t) {
          case 'success':
            message.success(s)
            break
          case 'info':
            message.info(s)
            break
          case 'warning':
            message.warning(s)
            break
          case 'error':
            message.error(s)
            break
          default:
            message.info(s)
            break
          }
        },
        menus: [
          'head',
          'bold',
          'fontSize',
          'fontName',
          'italic',
          'underline',
          'strikeThrough',
          'indent',
          'lineHeight',
          'foreColor',
          'backColor',
          'link',
          'list',
          'justify',
          'quote',
          'emoticon',
          'image',
          'video',
          'table',
          'code',
          'splitLine',
          'undo',
          'redo'
        ],
        colors: [
          '#000000',
          '#eeece0',
          '#1c487f',
          '#4d80bf'
        ],
        fontNames: [
          '黑体',
          '仿宋',
          '楷体',
          '标楷体',
          '华文仿宋',
          '华文楷体',
          '宋体',
          '微软雅黑',
          'Arial',
          'Tahoma',
          'Verdana',
          'Times New Roman',
          'Courier New'
        ],
        lineHeights: ['1', '1.15', '1.6', '2', '2.5', '3'],
        showFullScreen: true
      }
    }
  },
  // 绑定的值的类型, enum: ['html', 'text']
  valueType: {
    type: String as PropType<string>,
    default: 'html',
    validator: (val: string) => {
      return oneOf(val, ['html', 'text'])
    }
  },
  // 文本内容
  value: {
    type: String as PropType<string>,
    default: ''
  }
}

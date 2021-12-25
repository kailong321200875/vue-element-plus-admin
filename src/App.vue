<script setup lang="ts">
import { reactive, ref, onMounted, markRaw } from 'vue'
import { ElConfigProvider, ElIcon } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// import en from 'element-plus/lib/locale/lang/en'
import { VFrom } from '@/components/Form'
import Calendar from '~icons/ep/calendar'
import Check from '~icons/ep/check'
import Close from '~icons/ep/close'
import ChatRound from '~icons/ep/chatRound'
import ChatLineRound from '~icons/ep/chatLineRound'
import ChatDotRound from '~icons/ep/chatDotRound'
import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

const restaurants = ref<Recordable[]>([])
const querySearch = (queryString: string, cb: Fn) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  // call callback function to return suggestions
  cb(results)
}
const createFilter = (queryString: string) => {
  return (restaurant: Recordable) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}
const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' }
  ]
}
const handleSelect = (item: Recordable) => {
  console.log(item)
}
onMounted(() => {
  restaurants.value = loadAll()
})

const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const options = ref<FormOptions[]>(
  Array.from({ length: 1000 }).map((_, idx) => ({
    value: `Option ${idx + 1}`,
    label: `${initials[idx % 10]}${idx}`
  }))
)
const options2 = ref<FormOptions[]>(
  Array.from({ length: 10 }).map((_, idx) => {
    const label = idx + 1
    return {
      value: `Group ${label}`,
      label: `Group ${label}`,
      options: Array.from({ length: 10 }).map((_, idx) => ({
        value: `Option ${idx + 1 + 10 * label}`,
        label: `${initials[idx % 10]}${idx + 1 + 10 * label}`
      }))
    }
  })
)

const options3: FormOptions[] = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency'
          },
          {
            value: 'feedback',
            label: 'Feedback'
          },
          {
            value: 'efficiency',
            label: 'Efficiency'
          },
          {
            value: 'controllability',
            label: 'Controllability'
          }
        ]
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation'
          },
          {
            value: 'top nav',
            label: 'Top Navigation'
          }
        ]
      }
    ]
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout'
          },
          {
            value: 'color',
            label: 'Color'
          },
          {
            value: 'typography',
            label: 'Typography'
          },
          {
            value: 'icon',
            label: 'Icon'
          },
          {
            value: 'button',
            label: 'Button'
          }
        ]
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio'
          },
          {
            value: 'checkbox',
            label: 'Checkbox'
          },
          {
            value: 'input',
            label: 'Input'
          },
          {
            value: 'input-number',
            label: 'InputNumber'
          },
          {
            value: 'select',
            label: 'Select'
          },
          {
            value: 'cascader',
            label: 'Cascader'
          },
          {
            value: 'switch',
            label: 'Switch'
          },
          {
            value: 'slider',
            label: 'Slider'
          },
          {
            value: 'time-picker',
            label: 'TimePicker'
          },
          {
            value: 'date-picker',
            label: 'DatePicker'
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker'
          },
          {
            value: 'upload',
            label: 'Upload'
          },
          {
            value: 'rate',
            label: 'Rate'
          },
          {
            value: 'form',
            label: 'Form'
          }
        ]
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table'
          },
          {
            value: 'tag',
            label: 'Tag'
          },
          {
            value: 'progress',
            label: 'Progress'
          },
          {
            value: 'tree',
            label: 'Tree'
          },
          {
            value: 'pagination',
            label: 'Pagination'
          },
          {
            value: 'badge',
            label: 'Badge'
          }
        ]
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert'
          },
          {
            value: 'loading',
            label: 'Loading'
          },
          {
            value: 'message',
            label: 'Message'
          },
          {
            value: 'message-box',
            label: 'MessageBox'
          },
          {
            value: 'notification',
            label: 'Notification'
          }
        ]
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu'
          },
          {
            value: 'tabs',
            label: 'Tabs'
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb'
          },
          {
            value: 'dropdown',
            label: 'Dropdown'
          },
          {
            value: 'steps',
            label: 'Steps'
          }
        ]
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog'
          },
          {
            value: 'tooltip',
            label: 'Tooltip'
          },
          {
            value: 'popover',
            label: 'Popover'
          },
          {
            value: 'card',
            label: 'Card'
          },
          {
            value: 'carousel',
            label: 'Carousel'
          },
          {
            value: 'collapse',
            label: 'Collapse'
          }
        ]
      }
    ]
  }
]

function generateData() {
  const data: {
    value: number
    desc: string
    disabled: boolean
  }[] = []
  for (let i = 1; i <= 15; i++) {
    data.push({
      value: i,
      desc: `Option ${i}`,
      disabled: i % 4 === 0
    })
  }
  return data
}

const schema = reactive<VFormSchema[]>([
  {
    field: 'field1',
    label: t('formDemo.input'),
    component: 'Divider'
  },
  {
    field: 'field2',
    label: t('formDemo.default'),
    component: 'Input'
  },
  {
    field: 'field3',
    label: `${t('formDemo.icon')}1`,
    component: 'Input',
    componentProps: {
      suffixIcon: markRaw(Calendar),
      prefixIcon: markRaw(Calendar)
    }
  },
  {
    field: 'field4',
    label: `${t('formDemo.icon')}2`,
    component: 'Input',
    componentProps: {
      slots: {
        suffix: true,
        prefix: true
      }
    }
  },
  {
    field: 'field5',
    label: t('formDemo.mixed'),
    component: 'Input',
    componentProps: {
      slots: {
        prepend: true,
        append: true
      }
    }
  },
  {
    field: 'field6',
    label: t('formDemo.textarea'),
    component: 'Input',
    componentProps: {
      type: 'textarea',
      rows: 1
    }
  },
  {
    field: 'field7',
    label: t('formDemo.autocomplete'),
    component: 'Divider'
  },
  {
    field: 'field8',
    label: t('formDemo.default'),
    component: 'Autocomplete',
    componentProps: {
      fetchSuggestions: querySearch,
      onSelect: handleSelect
    }
  },
  {
    field: 'field9',
    label: t('formDemo.slot'),
    component: 'Autocomplete',
    componentProps: {
      fetchSuggestions: querySearch,
      onSelect: handleSelect,
      slots: {
        default: true
      }
    }
  },
  {
    field: 'field10',
    component: 'Divider',
    label: t('formDemo.inputNumber')
  },
  {
    field: 'field11',
    label: t('formDemo.default'),
    component: 'InputNumber',
    value: 0
  },
  {
    field: 'field12',
    label: t('formDemo.position'),
    component: 'InputNumber',
    componentProps: {
      controlsPosition: 'right'
    },
    value: 0
  },
  {
    field: 'field13',
    label: t('formDemo.select'),
    component: 'Divider'
  },
  {
    field: 'field14',
    label: t('formDemo.default'),
    component: 'Select',
    options: [
      {
        label: '选项1',
        value: '1'
      },
      {
        label: '选项2',
        value: '2'
      }
    ]
  },
  {
    field: 'field15',
    label: t('formDemo.slot'),
    component: 'Select',
    options: [
      {
        label: '选项1',
        value: '1'
      },
      {
        label: '选项2',
        value: '2'
      }
    ],
    optionsSlot: true
  },
  {
    field: 'field16',
    label: t('formDemo.group'),
    component: 'Select',
    options: [
      {
        label: '选项1',
        options: [
          {
            label: '选项1-1',
            value: '1-1'
          },
          {
            label: '选项1-2',
            value: '1-2'
          }
        ]
      },
      {
        label: '选项2',
        options: [
          {
            label: '选项2-1',
            value: '2-1'
          },
          {
            label: '选项2-2',
            value: '2-2'
          }
        ]
      }
    ]
  },
  {
    field: 'field17',
    label: `${t('formDemo.group')}${t('formDemo.slot')}`,
    component: 'Select',
    options: [
      {
        label: '选项1',
        options: [
          {
            label: '选项1-1',
            value: '1-1'
          },
          {
            label: '选项1-2',
            value: '1-2'
          }
        ]
      },
      {
        label: '选项2',
        options: [
          {
            label: '选项2-1',
            value: '2-1'
          },
          {
            label: '选项2-2',
            value: '2-2'
          }
        ]
      }
    ],
    optionsSlot: true
  },
  {
    field: 'field18',
    label: `${t('formDemo.selectV2')}`,
    component: 'Divider'
  },
  {
    field: 'field19',
    label: t('formDemo.default'),
    component: 'SelectV2',
    options: options.value
  },
  {
    field: 'field20',
    label: t('formDemo.slot'),
    component: 'SelectV2',
    options: options.value,
    componentProps: {
      slots: {
        default: true
      }
    }
  },
  {
    field: 'field21',
    label: t('formDemo.group'),
    component: 'SelectV2',
    options: options2.value
  },
  {
    field: 'field22',
    label: `${t('formDemo.group')}${t('formDemo.slot')}`,
    component: 'SelectV2',
    options: options2.value,
    componentProps: {
      slots: {
        default: true
      }
    }
  },
  {
    field: 'field23',
    label: t('formDemo.cascader'),
    component: 'Divider'
  },
  {
    field: 'field24',
    label: t('formDemo.default'),
    component: 'Cascader',
    options: options3
  },
  {
    field: 'field25',
    label: t('formDemo.slot'),
    component: 'Cascader',
    options: options3,
    componentProps: {
      slots: {
        default: true
      }
    }
  },
  {
    field: 'field26',
    label: t('formDemo.switch'),
    component: 'Divider'
  },
  {
    field: 'field27',
    label: t('formDemo.default'),
    component: 'Switch',
    value: false
  },
  {
    field: 'field28',
    label: t('formDemo.icon'),
    component: 'Switch',
    value: false,
    componentProps: {
      activeIcon: markRaw(Check),
      inactiveIcon: markRaw(Close)
    }
  },
  {
    field: 'field29',
    label: t('formDemo.rate'),
    component: 'Divider'
  },
  {
    field: 'field30',
    label: t('formDemo.default'),
    component: 'Rate',
    value: null
  },
  {
    field: 'field31',
    label: t('formDemo.icon'),
    component: 'Rate',
    value: null,
    componentProps: {
      voidIcon: markRaw(ChatRound),
      icons: [markRaw(ChatRound), markRaw(ChatLineRound), markRaw(ChatDotRound)]
    }
  },
  {
    field: 'field32',
    label: t('formDemo.colorPicker'),
    component: 'Divider'
  },
  {
    field: 'field33',
    label: t('formDemo.default'),
    component: 'ColorPicker'
  },
  {
    field: 'field34',
    label: t('formDemo.transfer'),
    component: 'Divider'
  },
  {
    field: 'field35',
    label: t('formDemo.default'),
    component: 'Transfer',
    componentProps: {
      props: {
        key: 'value',
        label: 'desc',
        disabled: 'disabled'
      },
      data: generateData()
    },
    value: [],
    colProps: {
      xl: 12
    }
  },
  {
    field: 'field36',
    label: t('formDemo.slot'),
    component: 'Transfer',
    componentProps: {
      props: {
        key: 'value',
        label: 'desc',
        disabled: 'disabled'
      },
      leftDefaultChecked: [2, 3],
      rightDefaultChecked: [1],
      data: generateData(),
      slots: {
        default: true
      }
    },
    value: [1],
    colProps: {
      xl: 12
    }
  },
  {
    field: 'field37',
    label: `${t('formDemo.render')}`,
    component: 'Transfer',
    componentProps: {
      props: {
        key: 'value',
        label: 'desc',
        disabled: 'disabled'
      },
      leftDefaultChecked: [2, 3],
      rightDefaultChecked: [1],
      data: generateData(),
      renderContent: (h: Fn, option: Recordable) => {
        return h('span', null, `${option.value} - ${option.desc}`)
      }
    },
    value: [1],
    colProps: {
      xl: 12
    }
  }
])

setTimeout(() => {
  if (schema[2].componentProps) {
    schema[2].componentProps.placeholder = 'test'
    console.log(schema[2])
  }
}, 3000)
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <VFrom :schema="schema">
      <template #field4-prefix>
        <ElIcon class="el-input__icon"><Calendar /></ElIcon>
      </template>
      <template #field4-suffix>
        <ElIcon class="el-input__icon"><Calendar /></ElIcon>
      </template>

      <template #field5-prepend> Http:// </template>
      <template #field5-append> .com </template>

      <template #field9-default="{ item }">
        <div class="value">{{ item.value }}</div>
        <span class="link">{{ item.link }}</span>
      </template>

      <template #field15-option="{ item }">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; font-size: 13px; color: var(--el-text-color-secondary)">
          {{ item.value }}
        </span>
      </template>

      <template #field17-option="{ item }">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; font-size: 13px; color: var(--el-text-color-secondary)">
          {{ item.value }}
        </span>
      </template>

      <template #field20-default="{ item }">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; font-size: 13px; color: var(--el-text-color-secondary)">
          {{ item.value }}
        </span>
      </template>

      <template #field22-default="{ item }">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; font-size: 13px; color: var(--el-text-color-secondary)">
          {{ item.value }}
        </span>
      </template>

      <template #field25-default="{ node, data }">
        <span>{{ data.label }}</span>
        <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
      </template>

      <template #field36-default="{ option }">
        <span>{{ option.value }} - {{ option.desc }}</span>
      </template>
    </VFrom>
  </ElConfigProvider>
</template>

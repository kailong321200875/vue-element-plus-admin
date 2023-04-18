<script setup lang="ts">
import { Form } from '@/components/Form'
import { reactive, ref, onMounted, computed } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useIcon } from '@/hooks/web/useIcon'
import { ContentWrap } from '@/components/ContentWrap'
import { useAppStore } from '@/store/modules/app'
import { FormSchema } from '@/types/form'
import { ComponentOptions } from '@/types/components'

const appStore = useAppStore()

const { t } = useI18n()

const isMobile = computed(() => appStore.getMobile)

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
const options = ref<ComponentOptions[]>(
  Array.from({ length: 1000 }).map((_, idx) => ({
    value: `Option ${idx + 1}`,
    label: `${initials[idx % 10]}${idx}`
  }))
)
const options2 = ref<ComponentOptions[]>(
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

const options3: ComponentOptions[] = [
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

const generateData = () => {
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

const holidays = [
  '2021-10-01',
  '2021-10-02',
  '2021-10-03',
  '2021-10-04',
  '2021-10-05',
  '2021-10-06',
  '2021-10-07'
]

const isHoliday = ({ dayjs }) => {
  return holidays.includes(dayjs.format('YYYY-MM-DD'))
}

const schema = reactive<FormSchema[]>([
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
      suffixIcon: useIcon({ icon: 'ep:calendar' }),
      prefixIcon: useIcon({ icon: 'ep:calendar' })
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
    componentProps: {
      options: [
        {
          disabled: true,
          label: 'option1',
          value: '1'
        },
        {
          label: 'option2',
          value: '2'
        }
      ]
    }
  },
  {
    field: 'field15',
    label: t('formDemo.slot'),
    component: 'Select',
    componentProps: {
      options: [
        {
          label: 'option1',
          value: '1'
        },
        {
          label: 'option2',
          value: '2'
        }
      ],
      optionsSlot: true
    }
  },
  {
    field: 'field16',
    label: t('formDemo.selectGroup'),
    component: 'Select',
    componentProps: {
      options: [
        {
          label: 'option1',
          options: [
            {
              disabled: true,
              label: 'option1-1',
              value: '1-1'
            },
            {
              label: 'option1-2',
              value: '1-2'
            }
          ]
        },
        {
          label: 'option2',
          options: [
            {
              label: 'option2-1',
              value: '2-1'
            },
            {
              label: 'option2-2',
              value: '2-2'
            }
          ]
        }
      ]
    }
  },
  {
    field: 'field17',
    label: `${t('formDemo.selectGroup')}${t('formDemo.slot')}`,
    component: 'Select',
    componentProps: {
      options: [
        {
          label: 'option1',
          options: [
            {
              label: 'option1-1',
              value: '1-1',
              disabled: true
            },
            {
              label: 'option1-2',
              value: '1-2'
            }
          ]
        },
        {
          label: 'option2',
          options: [
            {
              label: 'option2-1',
              value: '2-1'
            },
            {
              label: 'option2-2',
              value: '2-2'
            }
          ]
        }
      ],
      optionsSlot: true
    }
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
    componentProps: {
      options: options.value
    }
  },
  {
    field: 'field20',
    label: t('formDemo.slot'),
    component: 'SelectV2',
    componentProps: {
      options: options.value,
      slots: {
        default: true
      }
    }
  },
  {
    field: 'field21',
    label: t('formDemo.selectGroup'),
    component: 'SelectV2',
    componentProps: {
      options: options2.value
    }
  },
  {
    field: 'field22',
    label: `${t('formDemo.selectGroup')}${t('formDemo.slot')}`,
    component: 'SelectV2',
    componentProps: {
      options: options2.value,
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
    componentProps: {
      options: options3
    }
  },
  {
    field: 'field25',
    label: t('formDemo.slot'),
    component: 'Cascader',
    componentProps: {
      options: options3,
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
      activeIcon: useIcon({ icon: 'ep:check' }),
      inactiveIcon: useIcon({ icon: 'ep:close' })
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
      voidIcon: useIcon({ icon: 'ep:chat-round' }),
      icons: [
        useIcon({ icon: 'ep:chat-round' }),
        useIcon({ icon: 'ep:chat-line-round' }),
        useIcon({ icon: 'ep:chat-dot-round' })
      ]
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
      span: 24
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
      span: 24
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
      span: 24
    }
  },
  {
    field: 'field38',
    label: t('formDemo.radio'),
    component: 'Divider'
  },
  {
    field: 'field39',
    label: t('formDemo.default'),
    component: 'Radio',
    componentProps: {
      options: [
        {
          disabled: true,
          label: 'option-1',
          value: '1'
        },
        {
          label: 'option-2',
          value: '2'
        }
      ]
    }
  },
  {
    field: 'field40',
    label: t('formDemo.button'),
    component: 'RadioButton',
    componentProps: {
      options: [
        {
          disabled: true,
          label: 'option-1',
          value: '1'
        },
        {
          label: 'option-2',
          value: '2'
        }
      ]
    }
  },
  {
    field: 'field41',
    label: t('formDemo.checkbox'),
    component: 'Divider'
  },
  {
    field: 'field42',
    label: t('formDemo.default'),
    component: 'Checkbox',
    value: [],
    componentProps: {
      options: [
        {
          disabled: true,
          label: 'option-1',
          value: '1'
        },
        {
          label: 'option-2',
          value: '2'
        },
        {
          label: 'option-3',
          value: '23'
        }
      ]
    }
  },
  {
    field: 'field43',
    label: t('formDemo.button'),
    component: 'CheckboxButton',
    value: [],
    componentProps: {
      options: [
        {
          disabled: true,
          label: 'option-1',
          value: '1'
        },
        {
          label: 'option-2',
          value: '2'
        },
        {
          label: 'option-3',
          value: '23'
        }
      ]
    }
  },
  {
    field: 'field44',
    component: 'Divider',
    label: t('formDemo.slider')
  },
  {
    field: 'field45',
    component: 'Slider',
    label: t('formDemo.default'),
    value: 0
  },
  {
    field: 'field46',
    component: 'Divider',
    label: t('formDemo.datePicker')
  },
  {
    field: 'field47',
    component: 'DatePicker',
    label: t('formDemo.default'),
    componentProps: {
      type: 'date'
    }
  },
  {
    field: 'field48',
    component: 'DatePicker',
    label: t('formDemo.shortcuts'),
    componentProps: {
      type: 'date',
      disabledDate: (time: Date) => {
        return time.getTime() > Date.now()
      },
      shortcuts: [
        {
          text: t('formDemo.today'),
          value: new Date()
        },
        {
          text: t('formDemo.yesterday'),
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
          }
        },
        {
          text: t('formDemo.aWeekAgo'),
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
          }
        }
      ]
    }
  },
  {
    field: 'field49',
    component: 'DatePicker',
    label: t('formDemo.week'),
    componentProps: {
      type: 'week',
      format: `[${t('formDemo.week')}] ww`
    }
  },
  {
    field: 'field50',
    component: 'DatePicker',
    label: t('formDemo.year'),
    componentProps: {
      type: 'year'
    }
  },
  {
    field: 'field51',
    component: 'DatePicker',
    label: t('formDemo.month'),
    componentProps: {
      type: 'month'
    }
  },
  {
    field: 'field52',
    component: 'DatePicker',
    label: t('formDemo.dates'),
    componentProps: {
      type: 'dates'
    }
  },
  {
    field: 'field53',
    component: 'DatePicker',
    label: t('formDemo.daterange'),
    componentProps: {
      type: 'daterange'
    }
  },
  {
    field: 'field54',
    component: 'DatePicker',
    label: t('formDemo.monthrange'),
    componentProps: {
      type: 'monthrange'
    }
  },
  {
    field: 'field55',
    component: 'DatePicker',
    label: t('formDemo.slot'),
    componentProps: {
      type: 'date',
      format: 'YYYY/MM/DD',
      valueFormat: 'YYYY-MM-DD',
      slots: {
        default: true
      }
    }
  },
  {
    field: 'field56',
    component: 'Divider',
    label: t('formDemo.dateTimePicker')
  },
  {
    field: 'field57',
    component: 'DatePicker',
    label: t('formDemo.default'),
    componentProps: {
      type: 'datetime'
    }
  },
  {
    field: 'field58',
    component: 'DatePicker',
    label: t('formDemo.shortcuts'),
    componentProps: {
      type: 'datetime',
      shortcuts: [
        {
          text: t('formDemo.today'),
          value: new Date()
        },
        {
          text: t('formDemo.yesterday'),
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
          }
        },
        {
          text: t('formDemo.aWeekAgo'),
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
          }
        }
      ]
    }
  },
  {
    field: 'field59',
    component: 'DatePicker',
    label: t('formDemo.dateTimerange'),
    componentProps: {
      type: 'datetimerange'
    }
  },
  {
    field: 'field60',
    component: 'Divider',
    label: t('formDemo.timePicker')
  },
  {
    field: 'field61',
    component: 'TimePicker',
    label: t('formDemo.default')
  },
  {
    field: 'field62',
    component: 'Divider',
    label: t('formDemo.timeSelect')
  },
  {
    field: 'field63',
    component: 'TimeSelect',
    label: t('formDemo.default')
  }
])
</script>

<template>
  <ContentWrap :title="t('formDemo.defaultForm')" :message="t('formDemo.formDes')">
    <Form :schema="schema" label-width="auto" :label-position="isMobile ? 'top' : 'right'">
      <template #field4-prefix>
        <Icon icon="ep:calendar" class="el-input__icon" />
      </template>
      <template #field4-suffix>
        <Icon icon="ep:calendar" class="el-input__icon" />
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

      <template #field55-default="cell">
        <div class="cell" :class="{ current: cell.isCurrent }">
          <span class="text">{{ cell.text }}</span>
          <span v-if="isHoliday(cell)" class="holiday"></span>
        </div>
      </template>
    </Form>
  </ContentWrap>
</template>

<style lang="less" scoped>
.cell {
  height: 30px;
  padding: 3px 0;
  box-sizing: border-box;

  .text {
    position: absolute;
    left: 50%;
    display: block;
    width: 24px;
    height: 24px;
    margin: 0 auto;
    line-height: 24px;
    border-radius: 50%;
    transform: translateX(-50%);
  }

  &.current {
    .text {
      color: #fff;
      background: purple;
    }
  }

  .holiday {
    position: absolute;
    bottom: 0px;
    left: 50%;
    width: 6px;
    height: 6px;
    background: red;
    border-radius: 50%;
    transform: translateX(-50%);
  }
}
</style>

<script setup lang="tsx">
import { Form } from '@/components/Form'
import { reactive, ref, onMounted, computed } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { ContentWrap } from '@/components/ContentWrap'
import { useAppStore } from '@/store/modules/app'
import { SelectOption, RadioOption, CheckboxOption, FormSchema } from '@/components/Form'
import {
  ElOption,
  ElOptionGroup,
  ElRadio,
  ElRadioButton,
  ElCheckbox,
  ElCheckboxButton,
  ElInput,
  ElMessage,
  ElMessageBox,
  ElIcon
} from 'element-plus'
import { getDictOneApi } from '@/api/common'
import { Icon } from '@/components/Icon'
import { BaseButton } from '@/components/Button'

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
let timeout: NodeJS.Timeout
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value

  clearTimeout(timeout)
  timeout = setTimeout(() => {
    cb(results)
  }, 3000 * Math.random())
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
const options = ref(
  Array.from({ length: 1000 }).map((_, idx) => ({
    value: `Option ${idx + 1}`,
    label: `${initials[idx % 10]}${idx}`
  }))
)
const options2 = ref(
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

const options3 = [
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

const treeSelectData = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1'
          }
        ]
      }
    ]
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1'
          }
        ]
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1'
          }
        ]
      }
    ]
  },
  {
    value: '3',
    label: 'Level one 3',
    children: [
      {
        value: '3-1',
        label: 'Level two 3-1',
        children: [
          {
            value: '3-1-1',
            label: 'Level three 3-1-1'
          }
        ]
      },
      {
        value: '3-2',
        label: 'Level two 3-2',
        children: [
          {
            value: '3-2-1',
            label: 'Level three 3-2-1'
          }
        ]
      }
    ]
  }
]

// 模拟远程加载
const getTreeSelectData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(treeSelectData)
    }, 3000)
  })
}

let id = 0

const imageUrl = ref('')

const schema = reactive<FormSchema[]>([
  {
    field: 'field1',
    label: t('formDemo.input'),
    component: 'Divider'
  },
  {
    field: 'field2',
    label: t('formDemo.default'),
    component: 'Input',
    componentProps: {
      formatter: (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      parser: (value) => value.replace(/\$\s?|(,*)/g, '')
    }
  },
  {
    field: 'field3',
    label: `${t('formDemo.icon')}1`,
    component: 'Input',
    componentProps: {
      suffixIcon: <Icon icon="vi-ep:calendar" />,
      prefixIcon: <Icon icon="vi-ep:share" />
    }
  },
  {
    field: 'field4',
    label: `${t('formDemo.icon')}2`,
    component: 'Input',
    componentProps: {
      slots: {
        suffix: () => {
          return <Icon icon="vi-ep:share" />
        },
        prefix: () => <Icon icon="vi-ep:calendar" />
      }
    }
  },
  {
    field: 'field5',
    label: t('formDemo.mixed'),
    component: 'Input',
    componentProps: {
      slots: {
        prepend: () => <Icon icon="vi-ep:calendar" />,
        append: () => <Icon icon="vi-ep:share" />
      }
    }
  },
  {
    field: 'input-field7',
    label: t('formDemo.password'),
    component: 'Input',
    componentProps: {
      showPassword: true
    }
  },
  {
    field: 'field6',
    label: t('formDemo.textarea'),
    component: 'Input',
    componentProps: {
      type: 'textarea',
      rows: 2
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
      on: {
        select: handleSelect
      }
    }
  },
  {
    field: 'field9',
    label: t('formDemo.slot'),
    component: 'Autocomplete',
    componentProps: {
      fetchSuggestions: querySearch,
      on: {
        select: handleSelect
      },
      slots: {
        default: ({ item }) => {
          return (
            <>
              <div class="value">{item?.value}</div>
              <span class="link">{item?.link}</span>
            </>
          )
        }
      }
    }
  },
  {
    field: 'autocomplete-field10',
    label: t('formDemo.remoteSearch'),
    component: 'Autocomplete',
    componentProps: {
      fetchSuggestions: querySearchAsync,
      on: {
        select: handleSelect
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
    value: 10
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
      slots: {
        default: (options: SelectOption[]) => {
          if (options.length) {
            return options?.map((v) => {
              return <ElOption key={v.value} label={v.label} value={v.value} />
            })
          } else {
            return null
          }
        },
        prefix: () => <Icon icon="vi-ep:calendar" />
      }
    }
  },
  {
    field: 'select-field18',
    label: t('formDemo.optionSlot'),
    component: 'Select',
    componentProps: {
      options: [
        {
          value: 'Beijing',
          label: 'Beijing'
        },
        {
          value: 'Shanghai',
          label: 'Shanghai'
        },
        {
          value: 'Nanjing',
          label: 'Nanjing'
        },
        {
          value: 'Chengdu',
          label: 'Chengdu'
        },
        {
          value: 'Shenzhen',
          label: 'Shenzhen'
        },
        {
          value: 'Guangzhou',
          label: 'Guangzhou'
        }
      ],
      slots: {
        optionDefault: (option: SelectOption) => {
          return (
            <>
              <span style="float: left">{option.label}</span>
              <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px;">
                {option.value}
              </span>
            </>
          )
        }
      }
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
    label: `${t('formDemo.selectGroup')} ${t('formDemo.slot')}`,
    component: 'Select',
    componentProps: {
      options: [
        {
          label: 'option1',
          options: [
            {
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
      ],
      slots: {
        optionGroupDefault: (option: SelectOption) => {
          return (
            <ElOptionGroup key={option.label} label={`${option.label} ${option.label}`}>
              {option?.options?.map((v) => {
                return <ElOption key={v.value} label={v.label} value={v.value} />
              })}
            </ElOptionGroup>
          )
        }
      }
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
      value: undefined,
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
        default: (option: SelectOption) => {
          return (
            <>
              <span style="margin-right: 8px">{option?.label}</span>
              <span style="color: var(--el-text-color-secondary); font-size: 13px">
                {option?.value}
              </span>
            </>
          )
        }
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
    label: `${t('formDemo.selectGroup')} ${t('formDemo.slot')}`,
    component: 'SelectV2',
    componentProps: {
      options: options2.value,
      slots: {
        default: (option: SelectOption) => {
          return (
            <>
              <span style="margin-right: 8px">{option?.label}</span>
              <span style="color: var(--el-text-color-secondary); font-size: 13px">
                {option?.value}
              </span>
            </>
          )
        }
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
      options: options3,
      props: {
        multiple: true
      }
    }
  },
  {
    field: 'field25',
    label: t('formDemo.slot'),
    component: 'Cascader',
    componentProps: {
      options: options3,
      slots: {
        default: ({ data, node }) => {
          return (
            <>
              <span>{data.label}</span>
              {!node.isLeaf ? <span> ({data.children.length}) </span> : null}
            </>
          )
        }
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
      activeIcon: <Icon icon="ep:check" />,
      inactiveIcon: <Icon icon="ep:close" />
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
    value: 0
  },
  {
    field: 'field31',
    label: t('formDemo.icon'),
    component: 'Rate',
    value: null,
    componentProps: {
      voidIcon: <Icon icon="vi-ep:chat-round" />,
      icons: [
        <Icon icon="vi-ep:chat-round" />,
        <Icon icon="vi-ep:chat-line-round" />,
        <Icon icon="vi-ep:chat-dot-round" />
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
        label: 'desc'
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
        label: 'desc'
      },
      filterable: true,
      leftDefaultChecked: [2, 3],
      rightDefaultChecked: [1],
      titles: ['Source', 'Target'],
      buttonTexts: ['To Left', 'To Right'],
      format: {
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      },
      data: generateData(),
      slots: {
        default: ({ option }) => {
          return (
            <span>
              {option.value} - {option.desc}
            </span>
          )
        },
        leftFooter: () => {
          return (
            <BaseButton class="transfer-footer" size="small">
              Operation
            </BaseButton>
          )
        },
        rightFooter: () => {
          return (
            <BaseButton class="transfer-footer" size="small">
              Operation
            </BaseButton>
          )
        }
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
      renderContent: (h, option) => {
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
    field: 'field39-2',
    label: t('formDemo.radioGroup'),
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          // disabled: true,
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
    field: 'field39-3',
    label: `${t('formDemo.radioGroup')} ${t('formDemo.slot')}`,
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          // disabled: true,
          label: 'option-1',
          value: '1'
        },
        {
          label: 'option-2',
          value: '2'
        }
      ],
      slots: {
        default: (options: RadioOption[]) => {
          return options?.map((v) => {
            return <ElRadio label={v.label + `(${v.value})`} value={v.value} />
          })
        }
      }
    }
  },
  {
    field: 'field40',
    label: t('formDemo.button'),
    component: 'RadioButton',
    componentProps: {
      options: [
        {
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
    field: 'field40-1',
    label: `${t('formDemo.button')} ${t('formDemo.slot')}`,
    component: 'RadioButton',
    componentProps: {
      options: [
        {
          label: 'option-1',
          value: '1'
        },
        {
          label: 'option-2',
          value: '2'
        }
      ],
      slots: {
        default: (options: RadioOption[]) => {
          return options?.map((v) => {
            return <ElRadioButton label={v.label + `(${v.value})`} value={v.value} />
          })
        }
      }
    }
  },
  {
    field: 'field41',
    label: t('formDemo.checkbox'),
    component: 'Divider'
  },
  {
    field: 'field42-2',
    label: t('formDemo.checkboxGroup'),
    component: 'CheckboxGroup',
    value: [],
    componentProps: {
      options: [
        {
          label: 'option-1',
          value: '1'
        },
        {
          label: 'option-2',
          value: '2'
        },
        {
          label: 'option-3',
          value: '3'
        }
      ]
    }
  },
  {
    field: 'field42-3',
    label: `${t('formDemo.checkboxGroup')} ${t('formDemo.slot')}`,
    component: 'CheckboxGroup',
    value: [],
    componentProps: {
      options: [
        {
          label: 'option-1',
          value: '1'
        },
        {
          label: 'option-2',
          value: '2'
        },
        {
          label: 'option-3',
          value: '3'
        }
      ],
      slots: {
        default: (options: CheckboxOption[]) => {
          return options?.map((v) => {
            return <ElCheckbox label={v.label + `(${v.value})`} value={v.value} />
          })
        }
      }
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
    field: 'field43-1',
    label: `${t('formDemo.button')} ${t('formDemo.slot')}`,
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
      ],
      slots: {
        default: (options: CheckboxOption[]) => {
          return options?.map((v) => {
            return <ElCheckboxButton label={v.label + `(${v.value})`} value={v.value} />
          })
        }
      }
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
    field: 'field47-1',
    component: 'DatePicker',
    label: t('formDemo.slot'),
    value: '2021-10-29',
    componentProps: {
      type: 'date',
      slots: {
        default: (cell: any) => {
          return (
            <div class={{ cell: true, current: cell.isCurrent }}>
              <span class="text">{cell.text}</span>
              {isHoliday(cell) ? <span class="holiday" /> : null}
            </div>
          )
        }
      }
    }
  },
  {
    field: 'field49',
    component: 'DatePicker',
    label: t('formDemo.week'),
    componentProps: {
      type: 'week',
      format: `[${t('formDemo.week')}]`
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
  },
  {
    field: 'field64',
    component: 'Divider',
    label: t('formDemo.richText')
  },
  {
    field: 'field65',
    component: 'Editor',
    value: 'hello world',
    label: t('formDemo.default'),
    colProps: {
      span: 24
    }
  },
  {
    field: 'field66',
    component: 'Divider',
    label: t('formDemo.inputPassword')
  },
  {
    field: 'field67',
    component: 'InputPassword',
    label: t('formDemo.default'),
    componentProps: {
      strength: true
    }
  },
  {
    field: 'field68',
    component: 'Divider',
    label: `${t('formDemo.form')} ${t('formDemo.slot')}`
  },
  {
    field: 'field69',
    component: 'Input',
    label: `label`,
    formItemProps: {
      slots: {
        label: ({ label }) => {
          return (
            <div class="custom-label">
              <span class="label-text">custom {label}</span>
            </div>
          )
        }
      }
    }
  },
  {
    field: 'field69-1',
    component: 'Input',
    label: `custom formItem`,
    formItemProps: {
      slots: {
        default: (formModel: any) => {
          return <ElInput v-model={formModel['field69-1']} />
        }
      }
    }
  },
  {
    field: 'field70',
    component: 'Divider',
    label: `${t('formDemo.remoteLoading')}`
  },
  {
    field: 'field71',
    label: `${t('formDemo.select')}`,
    component: 'Select',
    componentProps: {
      options: []
    },
    // 远程加载option
    optionApi: async () => {
      const res = await getDictOneApi()
      return res.data
    }
  },
  {
    field: 'field72',
    label: `${t('formDemo.selectV2')}`,
    component: 'SelectV2',
    componentProps: {
      options: []
    },
    // 远程加载option
    optionApi: async () => {
      const res = await getDictOneApi()
      return res.data
    }
  },
  {
    field: 'field73',
    label: `${t('formDemo.checkboxGroup')}`,
    component: 'CheckboxGroup',
    componentProps: {
      options: []
    },
    // 远程加载option
    optionApi: async () => {
      const res = await getDictOneApi()
      return res.data
    }
  },
  {
    field: 'field74',
    label: `${t('formDemo.radioGroup')}`,
    component: 'RadioGroup',
    componentProps: {
      options: []
    },
    // 远程加载option
    optionApi: async () => {
      const res = await getDictOneApi()
      return res.data
    }
  },
  {
    field: 'field82',
    label: `${t('formDemo.treeSelect')}`,
    component: 'TreeSelect',
    // 远程加载option
    optionApi: async () => {
      const res = await getTreeSelectData()
      return res
    }
  },
  {
    field: 'field75',
    component: 'Divider',
    label: `${t('formDemo.treeSelect')}`
  },
  {
    field: 'field76',
    component: 'TreeSelect',
    label: `${t('formDemo.default')}`,
    componentProps: {
      renderAfterExpand: false,
      data: treeSelectData
    }
  },
  {
    field: 'field76',
    component: 'TreeSelect',
    label: `${t('formDemo.showCheckbox')}`,
    componentProps: {
      renderAfterExpand: false,
      showCheckbox: true,
      data: treeSelectData
    }
  },
  {
    field: 'field77',
    component: 'TreeSelect',
    label: `${t('formDemo.selectAnyLevel')}`,
    componentProps: {
      renderAfterExpand: false,
      showCheckbox: true,
      checkStrictly: true,
      checkOnClickNode: true,
      data: treeSelectData
    }
  },
  {
    field: 'field78',
    component: 'TreeSelect',
    label: `${t('formDemo.multiple')}`,
    componentProps: {
      renderAfterExpand: false,
      multiple: true,
      showCheckbox: true,
      checkStrictly: true,
      checkOnClickNode: true,
      data: treeSelectData
    }
  },
  {
    field: 'field79',
    component: 'TreeSelect',
    label: `${t('formDemo.filterable')}`,
    componentProps: {
      renderAfterExpand: false,
      multiple: true,
      filterable: true,
      showCheckbox: true,
      checkStrictly: true,
      checkOnClickNode: true,
      filterNodeMethod: (value, data) => data.label.includes(value),
      data: treeSelectData
    }
  },
  {
    field: 'field80',
    component: 'TreeSelect',
    label: `${t('formDemo.customContent')}`,
    componentProps: {
      renderAfterExpand: false,
      multiple: true,
      filterable: true,
      showCheckbox: true,
      checkStrictly: true,
      checkOnClickNode: true,
      filterNodeMethod: (value, data) => data.label.includes(value),
      slots: {
        default: ({ data: { label } }) => {
          return (
            <>
              {label}
              <span style="color: gray">(suffix)</span>
            </>
          )
        }
      },
      data: treeSelectData
    }
  },
  {
    field: 'field81',
    component: 'TreeSelect',
    label: `${t('formDemo.lazyLoad')}`,
    componentProps: {
      renderAfterExpand: false,
      lazy: true,
      load: (node, resolve) => {
        if (node.isLeaf) return resolve([])

        setTimeout(() => {
          resolve([
            {
              value: ++id,
              label: `lazy load node${id}`
            },
            {
              value: ++id,
              label: `lazy load node${id}`,
              isLeaf: true
            }
          ])
        }, 400)
      },
      multiple: true,
      filterable: true,
      showCheckbox: true,
      checkStrictly: true,
      checkOnClickNode: true,
      filterNodeMethod: (value, data) => data.label.includes(value),
      slots: {
        default: ({ data: { label } }) => {
          return (
            <>
              {label}
              <span style="color: gray">(suffix)</span>
            </>
          )
        }
      },
      data: treeSelectData
    }
  },
  {
    field: 'field82',
    component: 'Divider',
    label: `${t('formDemo.upload')}`
  },
  {
    field: 'field83',
    component: 'Upload',
    label: `${t('formDemo.default')}`,
    componentProps: {
      limit: 3,
      action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
      fileList: [
        {
          name: 'element-plus-logo.svg',
          url: 'https://element-plus.org/images/element-plus-logo.svg'
        },
        {
          name: 'element-plus-logo2.svg',
          url: 'https://element-plus.org/images/element-plus-logo.svg'
        }
      ],
      multiple: true,
      onPreview: (uploadFile) => {
        console.log(uploadFile)
      },
      onRemove: (file) => {
        console.log(file)
      },
      beforeRemove: (uploadFile) => {
        return ElMessageBox.confirm(`Cancel the transfer of ${uploadFile.name} ?`).then(
          () => true,
          () => false
        )
      },
      onExceed: (files, uploadFiles) => {
        ElMessage.warning(
          `The limit is 3, you selected ${files.length} files this time, add up to ${
            files.length + uploadFiles.length
          } totally`
        )
      },
      slots: {
        default: () => <BaseButton type="primary">Click to upload</BaseButton>,
        tip: () => <div class="el-upload__tip">jpg/png files with a size less than 500KB.</div>
      }
    }
  },
  {
    field: 'field84',
    component: 'Upload',
    label: `${t('formDemo.userAvatar')}`,
    componentProps: {
      action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
      showFileList: false,
      onSuccess: (_response, uploadFile) => {
        imageUrl.value = URL.createObjectURL(uploadFile.raw!)
      },
      beforeUpload: (rawFile) => {
        if (rawFile.type !== 'image/jpeg') {
          ElMessage.error('Avatar picture must be JPG format!')
          return false
        } else if (rawFile.size / 1024 / 1024 > 2) {
          ElMessage.error('Avatar picture size can not exceed 2MB!')
          return false
        }
        return true
      },
      slots: {
        default: () => (
          <>
            {imageUrl.value ? <img src={imageUrl.value} class="avatar" /> : null}
            {!imageUrl.value ? (
              <ElIcon class="avatar-uploader-icon" size="large">
                add
              </ElIcon>
            ) : null}
          </>
        )
      }
    }
  },
  {
    field: 'field85',
    component: 'Divider',
    label: t('formDemo.jsonEditor')
  },
  {
    field: 'field86',
    component: 'JsonEditor',
    label: t('formDemo.default'),
    value: {
      a: 1,
      b: 2
    }
  },
  {
    field: 'field87',
    component: 'Divider',
    label: t('formDemo.iconPicker')
  },
  {
    field: 'field88',
    component: 'IconPicker',
    label: t('formDemo.default'),
    value: 'vi-tdesign:archway'
  },
  {
    field: 'field89',
    component: 'Divider',
    label: t('formDemo.iAgree')
  },
  {
    field: 'field90',
    component: 'IAgree',
    label: t('formDemo.default'),
    componentProps: {
      text: '我同意《用户协议》',
      link: [
        {
          text: '《用户协议》',
          url: 'https://element-plus.org/'
        }
      ]
    }
  }
])
</script>

<template>
  <ContentWrap :title="t('formDemo.defaultForm')" :message="t('formDemo.formDes')">
    <Form :schema="schema" label-width="auto" :label-position="isMobile ? 'top' : 'right'" />
  </ContentWrap>
</template>

<style lang="less">
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
      background: #626aef;
    }
  }

  .holiday {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 6px;
    height: 6px;
    background: var(--el-color-danger);
    border-radius: 50%;
    transform: translateX(-50%);
  }
}

.transfer-footer {
  padding: 6px 5px;
  margin-left: 15px;
}

.el-upload {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  transition: var(--el-transition-duration-fast);
}

.el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  width: 178px;
  height: 178px;
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
</style>

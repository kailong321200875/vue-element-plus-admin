<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { ElConfigProvider, ElIcon } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// import en from 'element-plus/lib/locale/lang/en'
import { VFrom } from '@/components/Form'
import Calendar from '~icons/ep/calendar'
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
      suffixIcon: Calendar,
      prefixIcon: Calendar
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
    componentProps: {
      text: t('formDemo.inputNumber')
    }
  },
  {
    field: 'field11',
    label: t('formDemo.default'),
    component: 'InputNumber'
  },
  {
    field: 'field11',
    label: t('formDemo.position'),
    component: 'InputNumber',
    componentProps: {
      controlsPosition: 'right'
    }
  },
  {
    field: 'field12',
    label: t('formDemo.select'),
    component: 'Divider'
  },
  {
    field: 'field13',
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
    field: 'field14',
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
    field: 'field15',
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
    field: 'field16',
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
    field: 'field17',
    label: `${t('formDemo.selectV2')}`,
    component: 'Divider'
  },
  {
    field: 'field18',
    label: t('formDemo.default'),
    component: 'SelectV2',
    options: options.value
  },
  {
    field: 'field18',
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
    field: 'field19',
    label: t('formDemo.group'),
    component: 'SelectV2',
    options: options2.value
  },
  {
    field: 'field20',
    label: `${t('formDemo.group')}${t('formDemo.slot')}`,
    component: 'SelectV2',
    options: options2.value,
    componentProps: {
      slots: {
        default: true
      }
    }
  }
])
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

      <template #field14-option="{ item }">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; font-size: 13px; color: var(--el-text-color-secondary)">
          {{ item.value }}
        </span>
      </template>

      <template #field16-option="{ item }">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; font-size: 13px; color: var(--el-text-color-secondary)">
          {{ item.value }}
        </span>
      </template>

      <template #field18-default="{ item }">
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
    </VFrom>
  </ElConfigProvider>
</template>

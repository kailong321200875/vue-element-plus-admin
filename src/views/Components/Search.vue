<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Search } from '@/components/Search'
import { reactive, ref, unref } from 'vue'
import { getDictOneApi } from '@/api/common'
import { FormSchema } from '@/components/Form'
import { useSearch } from '@/hooks/web/useSearch'

const { t } = useI18n()

const { searchRegister, searchMethods } = useSearch()
const { setSchema, setProps, setValues, getFormData } = searchMethods

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

const schema = reactive<FormSchema[]>([
  {
    field: 'field1',
    label: t('formDemo.input'),
    component: 'Input'
  },
  {
    field: 'field2',
    label: t('formDemo.select'),
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
      on: {
        change: (value: string) => {
          console.log(value)
        }
      }
    }
  },
  {
    field: 'field3',
    label: t('formDemo.radio'),
    component: 'RadioGroup',
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
    field: 'field5',
    component: 'DatePicker',
    label: t('formDemo.datePicker'),
    componentProps: {
      type: 'date'
    }
  },
  {
    field: 'field6',
    component: 'TimeSelect',
    label: t('formDemo.timeSelect')
  },
  {
    field: 'field8',
    label: t('formDemo.input'),
    component: 'Input'
  },
  {
    field: 'field9',
    label: t('formDemo.input'),
    component: 'Input'
  },
  {
    field: 'field10',
    label: t('formDemo.input'),
    component: 'Input'
  },
  {
    field: 'field11',
    label: t('formDemo.input'),
    component: 'Input'
  },
  {
    field: 'field12',
    label: t('formDemo.input'),
    component: 'Input'
  },
  {
    field: 'field13',
    label: t('formDemo.input'),
    component: 'Input'
  },
  {
    field: 'field14',
    label: t('formDemo.input'),
    component: 'Input'
  },
  {
    field: 'field15',
    label: t('formDemo.input'),
    component: 'Input'
  },
  {
    field: 'field16',
    label: t('formDemo.input'),
    component: 'Input'
  },
  {
    field: 'field17',
    label: t('formDemo.input'),
    component: 'Input'
  },
  {
    field: 'field18',
    label: t('formDemo.input'),
    component: 'Input'
  },
  {
    field: 'field19',
    label: `${t('formDemo.treeSelect')}`,
    component: 'TreeSelect',
    // 远程加载option
    optionApi: async () => {
      const res = await getTreeSelectData()
      return res
    }
  }
])

const isGrid = ref(false)

const changeGrid = (grid: boolean) => {
  setProps({
    isCol: grid
  })
  // isGrid.value = grid
}

const layout = ref('inline')

const changeLayout = () => {
  layout.value = unref(layout) === 'inline' ? 'bottom' : 'inline'
}

const buttonPosition = ref('left')

const changePosition = (position: string) => {
  layout.value = 'bottom'
  buttonPosition.value = position
}

const getDictOne = async () => {
  const res = await getDictOneApi()
  if (res) {
    setSchema([
      {
        field: 'field2',
        path: 'componentProps.options',
        value: res.data
      }
    ])
  }
}

const handleSearch = async (data: any) => {
  const formData = await getFormData()
  console.log(formData)
  console.log(data)
}

const delRadio = () => {
  setSchema([
    {
      field: 'field3',
      path: 'remove',
      value: true
    }
  ])
}

const restoreRadio = () => {
  setSchema([
    {
      field: 'field3',
      path: 'remove',
      value: false
    }
  ])
}

const setValue = () => {
  setValues({
    field1: 'Joy'
  })
}

const searchLoading = ref(false)
const changeSearchLoading = () => {
  searchLoading.value = true
  setTimeout(() => {
    searchLoading.value = false
  }, 2000)
}

const resetLoading = ref(false)
const changeResetLoading = () => {
  resetLoading.value = true
  setTimeout(() => {
    resetLoading.value = false
  }, 2000)
}
</script>

<template>
  <ContentWrap
    :title="`${t('searchDemo.search')} ${t('searchDemo.operate')}`"
    style="margin-bottom: 20px"
  >
    <BaseButton @click="changeGrid(true)">{{ t('searchDemo.grid') }}</BaseButton>
    <BaseButton @click="changeGrid(false)">
      {{ t('searchDemo.restore') }} {{ t('searchDemo.grid') }}
    </BaseButton>

    <BaseButton @click="changeLayout">
      {{ t('searchDemo.button') }} {{ t('searchDemo.position') }}
    </BaseButton>

    <BaseButton @click="changePosition('left')">
      {{ t('searchDemo.bottom') }} {{ t('searchDemo.position') }}-{{ t('searchDemo.left') }}
    </BaseButton>
    <BaseButton @click="changePosition('center')">
      {{ t('searchDemo.bottom') }} {{ t('searchDemo.position') }}-{{ t('searchDemo.center') }}
    </BaseButton>
    <BaseButton @click="changePosition('right')">
      {{ t('searchDemo.bottom') }} {{ t('searchDemo.position') }}-{{ t('searchDemo.right') }}
    </BaseButton>
    <BaseButton @click="getDictOne">
      {{ t('formDemo.select') }} {{ t('searchDemo.dynamicOptions') }}
    </BaseButton>
    <BaseButton @click="delRadio">{{ t('searchDemo.deleteRadio') }}</BaseButton>
    <BaseButton @click="restoreRadio">{{ t('searchDemo.restoreRadio') }}</BaseButton>
    <BaseButton @click="setValue">{{ t('formDemo.setValue') }}</BaseButton>

    <BaseButton @click="changeSearchLoading">
      {{ t('searchDemo.search') }} {{ t('searchDemo.loading') }}
    </BaseButton>
    <BaseButton @click="changeResetLoading">
      {{ t('searchDemo.reset') }} {{ t('searchDemo.loading') }}
    </BaseButton>
  </ContentWrap>

  <ContentWrap :title="t('searchDemo.search')" :message="t('searchDemo.searchDes')">
    <Search
      :schema="schema"
      :is-col="isGrid"
      :layout="layout"
      :button-position="buttonPosition"
      :search-loading="searchLoading"
      :reset-loading="resetLoading"
      show-expand
      expand-field="field6"
      @search="handleSearch"
      @reset="handleSearch"
      @register="searchRegister"
    />
  </ContentWrap>
</template>

<style lang="less" scoped>
.el-button {
  margin-top: 10px;
}
</style>

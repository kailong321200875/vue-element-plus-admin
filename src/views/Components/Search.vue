<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Search } from '@/components/Search'
import { reactive, ref, unref } from 'vue'
import { ElButton } from 'element-plus'
import { getDictOneApi } from '@/api/common'
import { FormSchema } from '@/components/Form'
import { useSearch } from '@/hooks/web/useSearch'

const { t } = useI18n()

const { register, methods } = useSearch()
const { setSchema } = methods

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
  }
])

const isGrid = ref(false)

const changeGrid = (grid: boolean) => {
  isGrid.value = grid
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
        path: 'componentPorps.options',
        value: res.data
      }
    ])
  }
}

const handleSearch = (data: any) => {
  console.log(data)
}
</script>

<template>
  <ContentWrap
    :title="`${t('searchDemo.search')} ${t('searchDemo.operate')}`"
    style="margin-bottom: 20px"
  >
    <ElButton @click="changeGrid(true)">{{ t('searchDemo.grid') }}</ElButton>
    <ElButton @click="changeGrid(false)">
      {{ t('searchDemo.restore') }} {{ t('searchDemo.grid') }}
    </ElButton>

    <ElButton @click="changeLayout">
      {{ t('searchDemo.button') }} {{ t('searchDemo.position') }}
    </ElButton>

    <ElButton @click="changePosition('left')">
      {{ t('searchDemo.bottom') }} {{ t('searchDemo.position') }}-{{ t('searchDemo.left') }}
    </ElButton>
    <ElButton @click="changePosition('center')">
      {{ t('searchDemo.bottom') }} {{ t('searchDemo.position') }}-{{ t('searchDemo.center') }}
    </ElButton>
    <ElButton @click="changePosition('right')">
      {{ t('searchDemo.bottom') }} {{ t('searchDemo.position') }}-{{ t('searchDemo.right') }}
    </ElButton>
    <ElButton @click="getDictOne">
      {{ t('searchDemo.dynamicOptions') }}
    </ElButton>
  </ContentWrap>

  <ContentWrap :title="t('searchDemo.search')" :message="t('searchDemo.searchDes')">
    <Search
      :schema="schema"
      :is-col="isGrid"
      :layout="layout"
      :button-position="buttonPosition"
      expand
      expand-field="field6"
      @search="handleSearch"
      @reset="handleSearch"
      @register="register"
    />
  </ContentWrap>
</template>

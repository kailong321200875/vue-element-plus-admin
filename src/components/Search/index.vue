<template>
  <div :class="{ search__col: layout === 'right' }">
    <a-row :gutter="20">
      <a-col :span="layout === 'right' ? 22 : 24">
        <a-form
          ref="ruleForm"
          layout="inline"
          :model="formInline"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          :label-align="labelAlign"
          :hide-required-mark="hideRequiredMark"
          @submit.prevent
        >
          <a-form-item
            v-for="(item, $index) in data"
            :key="$index"
            :label="item.label"
            :name="item.field"
            :rules="item.rules"
          >
            <template v-if="item.type === 'switch'">
              <a-switch
                v-model:checked="formInline[item.field]"
                :size="item.size"
                :checked-children="item.checkedChildren"
                :un-checked-children="item.unCheckedChildren"
                @change="((val) => {changeVal(val, item)})"
              />
            </template>

            <template v-if="item.type === 'input'">
              <a-input
                v-model:value="formInline[item.field]"
                :size="item.size"
                :maxlength="item.maxlength"
                :placeholder="item.placeholder"
                :addon-before="item.addonBefore"
                :addon-after="item.addonAfter"
                :allow-clear="item.allowClear"
                @change="((val) => {changeVal(val, item)})"
              />
            </template>

            <template v-if="item.type === 'select'">
              <a-select
                v-model:value="formInline[item.field]"
                :size="item.size"
                :placeholder="item.placeholder"
                :allow-clear="item.allowClear"
                style="min-width: 201px;"
                @change="((val) => {changeVal(val, item)})"
              >
                <a-select-option
                  v-for="v in item.options"
                  :key="item.optionValue ? v[item.optionValue] : v.value"
                  :value="item.optionValue ? v[item.optionValue] : v.value"
                >
                  {{ item.optionLabel ? v[item.optionLabel] : v.title }}
                </a-select-option>
              </a-select>
            </template>

            <template v-if="item.type === 'radio'">
              <a-radio-group
                v-model:value="formInline[item.field]"
                :size="item.size"
                @change="((val) => {changeVal(val, item)})"
              >
                <template v-if="item.radioType === 'radio'">
                  <a-radio
                    v-for="v in item.options"
                    :key="item.optionValue ? v[item.optionValue] : v.value"
                    :value="item.optionValue ? v[item.optionValue] : v.value"
                  >
                    {{ item.optionLabel ? v[item.optionLabel] : v.label }}
                  </a-radio>
                </template>
                <template v-else-if="item.radioType === 'button'">
                  <a-radio-button
                    v-for="v in item.options"
                    :key="item.optionValue ? v[item.optionValue] : v.value"
                    :value="item.optionValue ? v[item.optionValue] : v.value"
                  >
                    {{ item.optionLabel ? v[item.optionLabel] : v.label }}
                  </a-radio-button>
                </template>
              </a-radio-group>
            </template>

            <template v-if="item.type === 'treeSelect'">
              <a-tree-select
                v-model:value="formInline[item.field]"
                :size="item.size"
                :dropdown-style="item.dropdownStyle"
                :tree-data="item.options"
                :placeholder="item.placeholder"
                :tree-checkable="item.treeCheckable"
                :max-tag-count="item.maxTagCount"
                :tree-default-expand-all="item.treeDefaultExpandAll"
                :allow-clear="item.allowClear"
                style="min-width: 201px;"
                @change="((val) => {changeVal(val, item)})"
              >
                <template #title="{ title }">
                  <span>{{ title }}</span>
                </template>
              </a-tree-select>
            </template>

            <template v-if="item.type === 'datePicker'">
              <a-date-picker
                v-model:value="formInline[item.field]"
                :format="item.format"
                :mode="item.mode"
                :value-format="item.valueFormat"
                :placeholder="item.placeholder"
                :size="item.size"
                :allow-clear="item.allowClear"
                :disabled-date="item.disabledDate"
                :disabled-time="item.disabledDateTime"
                :show-time="item.showTime"
                @change="((val) => {changeVal(val, item)})"
              />
            </template>

            <template v-if="item.type === 'monthPicker'">
              <a-month-picker
                v-model:value="formInline[item.field]"
                :format="item.format"
                :mode="item.mode"
                :value-format="item.valueFormat"
                :placeholder="item.placeholder"
                :size="item.size"
                :allow-clear="item.allowClear"
                :disabled-date="item.disabledDate"
                :disabled-time="item.disabledDateTime"
                :show-time="item.showTime"
                @change="((val) => {changeVal(val, item)})"
              />
            </template>

            <template v-if="item.type === 'rangePicker'">
              <a-range-picker
                v-model:value="formInline[item.field]"
                :format="item.format"
                :mode="item.mode"
                :value-format="item.valueFormat"
                :placeholder="item.placeholder"
                :size="item.size"
                :allow-clear="item.allowClear"
                :disabled-date="item.disabledDate"
                :disabled-time="item.disabledDateTime"
                :show-time="item.showTime"
                :ranges="item.ranges"
                @change="((val) => {changeVal(val, item)})"
              />
            </template>

            <template v-if="item.type === 'weekPicker'">
              <a-week-picker
                v-model:value="formInline[item.field]"
                :format="item.format"
                :mode="item.mode"
                :value-format="item.valueFormat"
                :placeholder="item.placeholder"
                :size="item.size"
                :allow-clear="item.allowClear"
                :disabled-date="item.disabledDate"
                :disabled-time="item.disabledDateTime"
                :show-time="item.showTime"
                @change="((val) => {changeVal(val, item)})"
              />
            </template>
          </a-form-item>
          <a-form-item v-if="data.length > 0 && layout === 'classic'">
            <a-button
              type="primary"
              @click="submitForm"
            >
              <template #icon>
                <SearchOutlined />
              </template>
              查询
            </a-button>
            <a-button
              v-if="showReset"
              @click="resetForm"
            >
              <template #icon>
                <ReloadOutlined />
              </template>
              重置
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="layout === 'right' ? 2 : 24">
        <div
          v-if="data.length > 0 && (layout === 'bottom' || layout === 'right')"
          class="search__bottom"
          :class="{ 'search__bottom--col': layout === 'right' }"
        >
          <div class="search__bottom--button">
            <a-button
              type="primary"
              @click="submitForm"
            >
              <template #icon>
                <SearchOutlined />
              </template>
              查询
            </a-button>
          </div>
          <div class="search__bottom--button">
            <a-button
              v-if="showReset"
              :style="{
                'margin-left': layout !== 'right' ? '15px' : '0',
                'margin-top': layout === 'right' ? '27px' : '0'
              }"
              @click="resetForm"
            >
              <template #icon>
                <ReloadOutlined />
              </template>
              重置
            </a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref, unref } from 'vue'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  name: 'Search',
  components: {
    SearchOutlined,
    ReloadOutlined
  },
  props: {
    // label 标签布局，同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}
    labelCol: {
      type: Object as PropType<{ span: number }>,
      default: () => {}
    },
    // 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol
    wrapperCol: {
      type: Object as PropType<{ span: number }>,
      default: () => {}
    },
    // label 标签的文本对齐方式
    labelAlign: {
      type: String as PropType<'left' | 'right'>,
      default: 'right'
    },
    // 隐藏所有表单项的必选标记
    hideRequiredMark: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    // 表单数据对象
    data: {
      type: Object as PropType<{ [key: string]: any }>,
      default: () => {}
    },
    // 表单验证规则
    rules: {
      type: Object as PropType<{ [key: number]: any }>,
      default: () => []
    },
    // 是否显示重置按钮
    showReset: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    // 是否显示导出按钮
    showExport: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    // 风格
    layout: {
      type: String as PropType<'classic' | 'bottom' | 'right'>,
      default: 'classic'
    }
  },
  emits: ['search-submit', 'reset-submit', 'change'],
  setup(props, { emit }) {
    const ruleForm = ref<HTMLElement | null>(null)
    const formInline = ref<{ [key: string]: any }>({})
    watch(
      () => props.data,
      (data) => {
        initForm(data)
      },
      {
        deep: true,
        immediate: true
      }
    )

    function initForm(data: any): void {
      for (const v of data) {
        formInline.value[v.field] = formInline.value[v.field] || v.value
      }
    }

    async function submitForm(): Promise<void> {
      const form = unref(ruleForm) as any
      if (!form) return
      try {
        const data = await form.validate()
        if (data) {
          emit('search-submit', data)
        }
      } catch (err) {
        console.log(err)
      }
    }

    async function resetForm(): Promise<void> {
      const form = unref(ruleForm) as any
      if (!form) return
      await form.resetFields()
      emit('reset-submit', formInline.value)
    }

    function changeVal(val: any, item: any): void {
      if (item.onChange) {
        emit('change', {
          field: item.field,
          value: formInline.value[item.field]
        })
      }
    }

    return {
      ruleForm,
      formInline,
      submitForm,
      resetForm,
      changeVal
    }
  }
})
</script>

<style lang="less" scoped>
.ant-form-inline {
  .ant-form-item {
    min-height: 60px;
  }
  .ant-form-item-with-help {
    margin-bottom: 0;
  }
}
.search__bottom {
  text-align: center;
  padding-bottom: 20px;
  .search__bottom--button {
    display: inline-block;
  }
}
.search__bottom--col {
  padding-bottom: 0;
  margin-top: 5px;
  position: relative;
  .search__bottom--button {
    display: inline-block;
  }
}
.search__bottom--col::before {
  content: "";
  width: 1px;
  height: 100%;
  border-left: 1px solid #d9d9d9;
  position: absolute;
  top: 0;
  left: 0;
}
</style>

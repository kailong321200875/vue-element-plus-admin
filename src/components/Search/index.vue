<template>
  <div :class="{ search__col: layout === 'right' }">
    <el-row :gutter="20">
      <el-col :span="layout === 'right' ? 22 : 24">
        <el-form
          ref="ruleForm"
          inline
          :model="formInline"
          :rules="rules"
          :label-width="labelWidth"
          :label-position="labelPosition"
          :hide-required-asterisk="hideRequiredAsterisk"
          @submit.prevent
        >
          <el-form-item
            v-for="(item, $index) in data"
            :key="$index"
            :label="item.label"
            :prop="item.field"
            :rules="item.rules"
          >
            <template v-if="item.itemType === 'switch'">
              <el-switch
                v-model="formInline[item.field]"
                v-bind="{...getItemBindValue(item)}"
                @change="((val) => {changeVal(val, item)})"
              />
            </template>

            <template v-if="item.itemType === 'input'">
              <el-input
                v-model="formInline[item.field]"
                v-bind="{...getItemBindValue(item)}"
                @change="((val) => {changeVal(val, item)})"
              />
            </template>

            <template v-if="item.itemType === 'select'">
              <el-select
                v-model="formInline[item.field]"
                v-bind="{...getItemBindValue(item)}"
                @change="((val) => {changeVal(val, item)})"
              >
                <el-option
                  v-for="v in item.options"
                  :key="item.optionValue ? v[item.optionValue] : v.value"
                  :value="item.optionValue ? v[item.optionValue] : v.value"
                  :label="item.optionLabel ? v[item.optionLabel] : v.title"
                />
              </el-select>
            </template>

            <template v-if="item.itemType === 'radio'">
              <el-radio-group
                v-model="formInline[item.field]"
                @change="((val) => {changeVal(val, item)})"
              >
                <template v-if="item.radioType === 'radio'">
                  <el-radio
                    v-for="v in item.options"
                    :key="item.optionValue ? v[item.optionValue] : v.value"
                    v-bind="{...getItemBindValue(item)}"
                    :label="item.optionValue ? v[item.optionValue] : v.value"
                  >
                    {{ item.optionLabel ? v[item.optionLabel] : v.label }}
                  </el-radio>
                </template>
                <template v-else-if="item.radioType === 'button'">
                  <el-radio-button
                    v-for="v in item.options"
                    :key="item.optionValue ? v[item.optionValue] : v.value"
                    v-bind="{...getItemBindValue(item)}"
                    :label="item.optionValue ? v[item.optionValue] : v.value"
                  >
                    {{ item.optionLabel ? v[item.optionLabel] : v.label }}
                  </el-radio-button>
                </template>
              </el-radio-group>
            </template>

            <!-- element近期会新增treeSelect组件，所以不打算在自己维护一套。等待ing -->
            <!-- <template v-if="item.itemType === 'treeSelect'">
              <el-tree-select
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
              </el-tree-select>
            </template> -->

            <template v-if="item.itemType === 'timePicker'">
              <el-time-picker
                v-model="formInline[item.field]"
                v-bind="{...getItemBindValue(item)}"
                @change="((val) => {changeVal(val, item)})"
              />
            </template>

            <template v-if="item.itemType === 'timeSelect'">
              <el-time-select
                v-model="formInline[item.field]"
                v-bind="{...getItemBindValue(item)}"
                @change="((val) => {changeVal(val, item)})"
              />
            </template>

            <template v-if="item.itemType === 'datePicker' || item.itemType === 'dateTimePicker'">
              <el-date-picker
                v-model="formInline[item.field]"
                v-bind="{...getItemBindValue(item)}"
                @change="((val) => {changeVal(val, item)})"
              />
            </template>
          </el-form-item>
          <el-form-item v-if="data.length > 0 && layout === 'classic'">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="submitForm"
            >
              查询
            </el-button>
            <el-button
              v-if="showReset"
              icon="el-icon-refresh-right"
              @click="resetForm"
            >
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="layout === 'right' ? 2 : 24">
        <div
          v-if="data.length > 0 && (layout === 'bottom' || layout === 'right')"
          class="search__bottom"
          :class="{ 'search__bottom--col': layout === 'right' }"
        >
          <div class="search__bottom--button">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="submitForm"
            >
              查询
            </el-button>
          </div>
          <div class="search__bottom--button">
            <el-button
              v-if="showReset"
              :style="{
                'margin-left': layout !== 'right' ? '15px' : '0',
                'margin-top': layout === 'right' ? '27px' : '0'
              }"
              icon="el-icon-refresh-right"
              @click="resetForm"
            >
              重置
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref, unref } from 'vue'
import { deepClone } from '@/utils'
export default defineComponent({
  name: 'Search',
  props: {
    // 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。
    labelWidth: {
      type: String as PropType<string>,
      default: ''
    },
    labelPosition: {
      type: String as PropType<'right' | 'left' | 'top'>,
      default: 'right'
    },
    // 隐藏所有表单项的必选标记
    hideRequiredAsterisk: {
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

    function getItemBindValue(item: any) {
      const delArr: string[] = ['label', 'itemType', 'value', 'field']
      const obj = deepClone(item)
      for (const key in obj) {
        if (delArr.indexOf(key) !== -1) {
          delete obj[key]
        }
      }
      return obj
    }

    function initForm(data: any): void {
      for (const v of data) {
        formInline.value[v.field] = formInline.value[v.field] || v.value
      }
    }

    async function submitForm(): Promise<void> {
      const form = unref(ruleForm) as any
      if (!form) return
      try {
        form.validate((valid: boolean) => {
          if (valid) {
            console.log(valid)
            emit('search-submit', unref(formInline))
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } catch (err) {
        console.log(err)
      }
    }

    async function resetForm(): Promise<void> {
      const form = unref(ruleForm) as any
      if (!form) return
      await form.resetFields()
      emit('reset-submit', unref(formInline))
    }

    function changeVal(val: any, item: any): void {
      if (item.onChange) {
        emit('change', {
          field: item.field,
          value: unref(formInline.value[item.field])
        })
      }
    }

    return {
      getItemBindValue,
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

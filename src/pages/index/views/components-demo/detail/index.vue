<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="详情组件。"
      type="info"
      style="margin-bottom: 20px;"
    />

    <com-detail
      :data="data"
      :schema="schema"
      title="基础示例"
      message="辅助文字"
    />

    <com-detail
      title="不可折叠"
      :data="data"
      :schema="schema"
      :collapsed="false"
      message="辅助文字"
      style="margin-top: 20px;"
    />

    <com-detail
      title="没有辅助文字"
      :data="data"
      :schema="schema"
      style="margin-top: 20px;"
    />

    <com-detail
      title="没有边框"
      :data="data"
      :schema="schema"
      :border="false"
      style="margin-top: 20px;"
    />

    <com-detail
      title="垂直布局"
      :data="data"
      :vertical="true"
      :schema="schema"
      style="margin-top: 20px;"
    />

    <el-form
      ref="formRef"
      :hide-required-asterisk="true"
      :model="form"
      :rules="rules"
      style="margin-top: 20px;"
    >
      <com-detail
        title="与表单结合并自定义插槽"
        :data="form"
        :schema="fromSchema"
      >
        <template #title="scope">
          <span class="is-required-item">{{ scope.row.label }}</span>
        </template>
        <template #titleDefault>
          <el-form-item prop="title">
            <el-input v-model="form.title" placeholder="请输入标题" />
          </el-form-item>
        </template>

        <template #author="scope">
          <span class="is-required-item">{{ scope.row.label }}</span>
        </template>
        <template #authorDefault>
          <el-form-item prop="author">
            <el-input v-model="form.author" placeholder="请输入作者" />
          </el-form-item>
        </template>

        <template #time="scope">
          <span class="is-required-item">{{ scope.row.label }}</span>
        </template>
        <template #timeDefault>
          <el-form-item prop="display_time">
            <el-date-picker
              v-model="form.display_time"
              type="datetime"
              placeholder="请选择创建时间"
              style="width: 100%;"
            />
          </el-form-item>
        </template>

        <template #importance="scope">
          <span class="is-required-item">{{ scope.row.label }}</span>
        </template>
        <template #importanceDefault>
          <el-form-item prop="importance">
            <el-select v-model="form.importance" placeholder="请选择重要性" style="width: 100%;">
              <el-option label="重要" value="3" />
              <el-option label="良好" value="2" />
              <el-option label="一般" value="1" />
            </el-select>
          </el-form-item>
        </template>

        <template #pageviews="scope">
          <span class="is-required-item">{{ scope.row.label }}</span>
        </template>
        <template #pageviewsDefault>
          <el-form-item prop="pageviews">
            <el-input-number
              v-model="form.pageviews"
              :min="0"
              :max="99999999"
              style="width: 100%;"
            />
          </el-form-item>
        </template>
      </com-detail>
      <div style="margin-top: 15px;text-align: center;">
        <el-button type="primary" @click="saveData">保存(控制台查看数据)</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, unref } from 'vue'
import { InfoWriteParams, InfoWriteRules } from './types'

const data: any = {
  username: 'chenkl',
  nickName: '梦似花落。',
  age: 26,
  phone: '13655971xxxx',
  email: '502431556@qq.com',
  addr: '这是一个很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的地址',
  sex: '男',
  certy: '35058319940712xxxx'
}
const schema: any[] = [
  {
    field: 'username',
    label: '用户名'
  },
  {
    field: 'nickName',
    label: '昵称'
  },
  {
    field: 'phone',
    label: '联系电话'
  },
  {
    field: 'email',
    label: '邮箱'
  },
  {
    field: 'addr',
    label: '地址',
    span: 24
  }
]

const requiredRule = {
  required: true,
  message: '该项为必填项'
}

const fromSchema: any[] = [
  {
    field: 'title',
    label: '标题',
    span: 24,
    slots: {
      title: 'title',
      default: 'titleDefault'
    }
  },
  {
    field: 'author',
    label: '作者',
    slots: {
      title: 'author',
      default: 'authorDefault'
    }
  },
  {
    field: 'display_time',
    label: '创建时间',
    slots: {
      title: 'time',
      default: 'timeDefault'
    }
  },
  {
    field: 'importance',
    label: '重要性',
    slots: {
      title: 'importance',
      default: 'importanceDefault'
    }
  },
  {
    field: 'pageviews',
    label: '阅读数',
    slots: {
      title: 'pageviews',
      default: 'pageviewsDefault'
    }
  }
]

export default defineComponent({
  // name: 'DetailDemo',
  setup() {
    const formRef = ref<HTMLElement | null>(null)

    const form = reactive<InfoWriteParams>({
      id: '', // id
      author: '', // 作者
      title: '', // 标题
      importance: '', // 重要性
      display_time: '', // 创建时间
      pageviews: 0 // 阅读数
    })

    const rules = reactive<InfoWriteRules>({
      title: [requiredRule],
      author: [requiredRule],
      importance: [requiredRule],
      display_time: [requiredRule],
      pageviews: [requiredRule]
    })

    function saveData() {
      const formRefWrap = unref(formRef as any)
      try {
        formRefWrap.validate(async(valid: boolean) => {
          if (valid) {
            const formData = unref(form)
            console.log(formData)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } catch (err) {
        console.log(err)
      }
    }

    return {
      data, schema,
      formRef, form, fromSchema, rules, saveData
    }
  }
})
</script>

<style>
</style>

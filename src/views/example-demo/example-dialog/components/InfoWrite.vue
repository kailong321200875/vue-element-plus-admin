<template>
  <div>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item prop="title" label="标题">
            <el-input v-model="form.title" placeholder="请输入标题" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="author" label="作者">
            <el-input v-model="form.author" placeholder="请输入作者" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="display_time" label="创建时间">
            <el-date-picker
              v-model="form.display_time"
              type="datetime"
              placeholder="请选择创建时间"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="importance" label="重要性">
            <el-select v-model="form.importance" placeholder="请选择重要性" style="width: 100%">
              <el-option label="重要" value="3" />
              <el-option label="良好" value="2" />
              <el-option label="一般" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="pageviews" label="阅读数">
            <el-input-number
              v-model="form.pageviews"
              :min="0"
              :max="99999999"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="content" label="内容">
            <editor ref="editorRef" :value="form.content" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="dialong__button--wrap">
      <el-button @click="close">取消</el-button>
      <el-button :loading="subLoading" type="primary" @click="setListData">保存</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="IfnoWrite">
import { PropType, reactive, ref } from 'vue'
import { setExampApi, getExampDetApi } from '../api'
import Editor from '_c/Editor/index.vue'
import { Message } from '_c/Message'

const requiredRule: {
  required: boolean
  message: string
} = {
  required: true,
  message: '该项为必填项'
}

const props = defineProps({
  info: {
    type: Object as PropType<Nullable<IObj>>,
    default: () => null
  }
})

const emit = defineEmits(['success', 'close'])

const editorRef = ref<Nullable<HTMLElement>>(null)
const formRef = ref<Nullable<HTMLElement>>(null)

const subLoading = ref<boolean>(false)
const form = reactive<IObj>({
  id: '', // id
  author: '', // 作者
  title: '', // 标题
  content: '', // 内容
  importance: '', // 重要性
  display_time: '', // 创建时间
  pageviews: 0 // 阅读数
})
const rules = reactive<IObj>({
  title: [requiredRule],
  author: [requiredRule],
  content: [requiredRule],
  importance: [requiredRule],
  display_time: [requiredRule],
  pageviews: [requiredRule]
})

async function getDet() {
  if (props.info) {
    const id = props.info.id
    try {
      const res: any = await getExampDetApi({
        params: {
          id: id
        }
      })
      if (res) {
        for (const key in form) {
          if (key === 'importance') {
            form[key] = (res.data[key] as number).toString()
          } else {
            form[key] = res.data[key]
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
}

// 新增或者编辑
function setListData() {
  try {
    subLoading.value = true
    form.content = (editorRef.value as any).getHtml()
    ;(formRef.value as any).validate(async (valid) => {
      if (valid) {
        const res = await setExampApi({
          data: form
        })
        if (res) {
          Message.success(form.id ? '编辑成功' : '新增成功')
          emit('success', form.id ? 'edit' : 'add')
        }
      } else {
        console.log('error submit!!')
        return false
      }
    })
  } catch (err) {
    console.log(err)
  } finally {
    subLoading.value = false
  }
}

function close() {
  emit('close')
}

getDet()
</script>

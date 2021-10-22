<template>
  <div>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="130px">
      <el-row>
        <el-col :span="24">
          <el-form-item prop="roleName" label="角色名">
            <el-input v-model="form.roleName" disabled placeholder="请输入角色名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色权限">
            <el-tree
              ref="tree"
              :check-strictly="false"
              :expand-on-click-node="false"
              :data="routesData as any"
              :props="defaultProps as any"
              accordion
              node-key="path"
              highlight-current
              class="permission-tree"
              @node-click="handleNodeClick"
            />
          </el-form-item>
        </el-col>
        <el-col v-if="seletTreeData" :span="12">
          <el-form-item label="title">
            <el-input v-model="seletTreeData.title" />
          </el-form-item>
          <el-form-item label="component">
            <el-input v-model="seletTreeData.component" />
          </el-form-item>
          <el-form-item label="redirect">
            <el-input v-model="seletTreeData.redirect" />
          </el-form-item>
          <el-form-item label="activeMenu">
            <el-input v-model="seletTreeData.meta.activeMenu" />
          </el-form-item>
          <el-form-item label="name">
            <el-input v-model="seletTreeData.name" />
          </el-form-item>
          <el-form-item label="icon">
            <el-input v-model="seletTreeData.meta.icon" />
          </el-form-item>
          <el-form-item label="hidden">
            <el-switch v-model="seletTreeData.meta.hidden" />
          </el-form-item>
          <el-form-item label="alwaysShow">
            <el-switch v-model="seletTreeData.meta.alwaysShow" />
          </el-form-item>
          <el-form-item label="noCache">
            <el-switch v-model="seletTreeData.meta.noCache" />
          </el-form-item>
          <el-form-item label="breadcrumb">
            <el-switch v-model="seletTreeData.meta.breadcrumb" />
          </el-form-item>
          <el-form-item label="affix">
            <el-switch v-model="seletTreeData.meta.affix" />
          </el-form-item>
          <el-form-item label="noTagsView">
            <el-switch v-model="seletTreeData.meta.noTagsView" />
          </el-form-item>
          <el-form-item label="showMainRoute">
            <el-switch v-model="seletTreeData.meta.showMainRoute" />
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

<script setup lang="ts" name="InfoWrite2">
import { PropType, computed, nextTick, reactive, ref } from 'vue'
import { setRoleApi, getRoleDetApi } from '../api'
import { Message } from '_c/Message'
import { AppRouteRecordRaw } from '@/router/types'

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

const tree = ref<Nullable<HTMLElement>>(null)
const formRef = ref<Nullable<HTMLElement>>(null)
const subLoading = ref<boolean>(false)
const form = reactive<IObj>({
  id: '', // id
  roleName: '', // 角色名
  checkedNodes: [], // 被选中的节点
  checkedkeys: [] // 被选中的keys
})
const rules = reactive<IObj>({
  roleName: [requiredRule]
})
const routes = ref<IObj>([])
const defaultProps = reactive<IObj>({
  children: 'children',
  label: 'title'
})
const seletTreeData = ref<Nullable<IObj>>(null)
const routesData = computed(() => routes.value)

async function getDet() {
  if (props.info) {
    const id = props.info.id
    try {
      const res: any = await getRoleDetApi({
        params: {
          id: id
        }
      })
      if (res) {
        console.log(res)
        for (const key in form) {
          form[key] = res.data[key]
        }
        routes.value = generateRoutes(form.checkedNodes)
        nextTick(() => {
          ;(tree.value as any).setCheckedKeys(form.checkedkeys)
        })
      }
    } catch (e) {
      console.log(e)
    }
  }
}

// 树形点击
function handleNodeClick(data: IObj) {
  seletTreeData.value = data
}

// 新增或者编辑
function setListData() {
  try {
    subLoading.value = true
    ;(formRef.value as any).validate(async (valid) => {
      if (valid) {
        console.log(routesData.value)
        // 获取所有被选中节点
        // const checkedNodes = this.$refs.tree.getCheckedNodes(false, true).filter(v => {
        //   if (v.path.includes('/')) return v
        // })
        // // 获取所有被选中的keys，便于渲染是否选中
        // this.form.checkedkeys = this.$refs.tree.getCheckedKeys()
        // console.log(JSON.stringify(this.form.checkedkeys))

        // this.form.checkedNodes = this.getFilterNodes(checkedNodes)
        // console.log(JSON.stringify(this.form.checkedNodes))
        const res = await setRoleApi({
          data: Object.assign(form, { checkedNodes: routesData.value })
        })
        if (res) {
          Message.success(
            form.id ? '编辑成功，请重新退出登录后查看效果' : '新增成功，请重新退出登录后查看效果'
          )
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

// 树形渲染过滤
function generateRoutes(routes: AppRouteRecordRaw[]) {
  const res: AppRouteRecordRaw[] = []

  for (const route of routes) {
    const data: AppRouteRecordRaw = {
      path: route.path,
      name: route.name,
      redirect: route.redirect || '',
      title: (route as any).title || (route.meta && route.meta.title),
      component: (route as any).component || '',
      meta: {
        title: (route as any).title || (route.meta && route.meta.title),
        alwaysShow: route.meta && route.meta.alwaysShow,
        hidden: route.meta && route.meta.hidden,
        icon: route.meta && route.meta.icon,
        noCache: route.meta && route.meta.noCache,
        breadcrumb: route.meta && route.meta.breadcrumb,
        affix: route.meta && route.meta.affix,
        noTagsView: route.meta && route.meta.noTagsView,
        activeMenu: route.meta && route.meta.activeMenu,
        showMainRoute: route.meta && route.meta.showMainRoute
      }
    }
    // recursive child routes
    if (route.children) {
      data.children = generateRoutes(route.children)
    }
    res.push(data)
  }
  return res
}

getDet()
</script>

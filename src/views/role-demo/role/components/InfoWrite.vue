<template>
  <div>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item prop="roleName" label="角色名">
            <el-input v-model="form.roleName" disabled placeholder="请输入角色名" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="角色权限">
            <el-tree
              ref="tree"
              :check-strictly="false"
              :data="routesData as any"
              :props="defaultProps as any"
              show-checkbox
              accordion
              node-key="path"
              highlight-current
              class="permission-tree"
            />
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

<script setup lang="ts" name="InfoWrite">
import { PropType, computed, nextTick, reactive, ref } from 'vue'
import path from 'path-browserify'
import { setRoleApi, getRoleDetApi } from '../api'
import { asyncRouterMap } from '@/router'
import { isExternal } from '@/utils/validate'
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
        for (const key in form) {
          form[key] = res.data[key]
        }
        nextTick(() => {
          ;(tree.value as any).setCheckedKeys(form.checkedkeys)
        })
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
    ;(formRef.value as any).validate(async (valid) => {
      if (valid) {
        // 获取所有被选中节点，由于是前端渲染，所以只要保存一维数组就行
        form.checkedNodes = (tree.value as any).getCheckedNodes(false, true)
        console.log(JSON.stringify(form.checkedNodes))
        // 获取所有被选中的keys，便于渲染是否选中
        form.checkedkeys = (tree.value as any).getCheckedKeys()
        console.log(JSON.stringify(form.checkedkeys))
        const res = await setRoleApi({
          data: form
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

function generateRoutes(routes: AppRouteRecordRaw[], basePath = '/') {
  const res: AppRouteRecordRaw[] = []

  for (let route of routes) {
    // skip some route
    if (route.meta && route.meta.hidden) {
      continue
    }

    const onlyOneShowingChild = onlyOneShowingChildFn(
      route.children,
      route,
      path.resolve(basePath, route.path)
    )

    if (route.children && onlyOneShowingChild && !(route.meta && route.meta.alwaysShow)) {
      route = onlyOneShowingChild
    }

    const data = {
      path: isExternal(route.path) ? route.path : path.resolve(basePath, route.path),
      title: route.meta && route.meta.title,
      name: route.name
    }
    // recursive child routes
    if (route.children) {
      ;(data as any).children = generateRoutes(route.children, data.path)
    }
    res.push(data as any)
  }
  return res
}

function onlyOneShowingChildFn(
  children: AppRouteRecordRaw[] = [],
  parent: AppRouteRecordRaw,
  basePath: string
) {
  let onlyOneChild: Nullable<AppRouteRecordRaw | any> = null
  const showingChildren = children.filter((item) => !(item.meta && item.meta.hidden))
  // When there is only one child route, the child route is displayed by default
  if (showingChildren.length === 1) {
    onlyOneChild = showingChildren[0]
    onlyOneChild.path = isExternal(onlyOneChild.path)
      ? onlyOneChild.path
      : path.resolve(basePath, onlyOneChild.path)
    return onlyOneChild
  }

  // Show parent if there are no child route to display
  if (showingChildren.length === 0) {
    onlyOneChild = { ...parent, path: '', noShowingChildren: true }
    return onlyOneChild
  }

  return false
}

function close() {
  emit('close')
}

const oldRoutes = [...asyncRouterMap]
routes.value = generateRoutes(oldRoutes)
getDet()
</script>

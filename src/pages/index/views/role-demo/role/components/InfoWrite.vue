<template>
  <div>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
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
              :data="routesData"
              :props="defaultProps"
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

<script lang="ts">
import path from 'path'
import { defineComponent, PropType, ref, reactive, nextTick, unref } from 'vue'
import { setRoleApi, getRoleDetApi } from '../api'
import { asyncRouterMap } from '_@/router'
import { AppRouteRecordRaw } from '_@/router/types'
import { isExternal } from '@/utils/validate'
import { Message } from '_c/Message'

const requiredRule = {
  required: true,
  message: '该项为必填项'
}

interface Form {
  id: String
  roleName: String
  checkedNodes: any[]
  checkedkeys: any[]
}

interface Rules {
  roleName: any[]
}

interface DefaultProps {
  children: String
  label: String
}

export default defineComponent({
  name: 'InfoWrite',
  props: {
    info: {
      type: Object as PropType<object>,
      default: () => null
    }
  },
  emits: ['success', 'close'],
  setup(props, { emit }) {
    const tree = ref<HTMLElement | null>(null)
    const formRef = ref<HTMLElement | null>(null)

    const subLoading = ref<boolean>(false)

    let form = reactive<Form>({
      id: '', // id
      roleName: '', // 角色名
      checkedNodes: [], // 被选中的节点
      checkedkeys: [] // 被选中的keys
    })

    const rules = reactive<Rules>({
      roleName: [requiredRule]
    })

    const defaultProps = reactive<DefaultProps>({
      children: 'children',
      label: 'title'
    })

    const routesData = ref<any[]>(generateRoutes([...asyncRouterMap]))

    async function getDet(): Promise<void> {
      if (props.info) {
        const id = (props.info as any).id
        try {
          const res = await getRoleDetApi({
            params: {
              id: id
            }
          })
          if (res) {
            const formData = {}
            for (const key in form) {
              formData[key] = res.data[key]
            }
            form = Object.assign(form, formData)
            nextTick(() => {
              const treeRef = unref(tree as any)
              treeRef.setCheckedKeys(form.checkedkeys)
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
        const formRefWrap = unref(formRef as any)
        formRefWrap.validate(async(valid: boolean) => {
          if (valid) {
            const treeRef = unref(tree as any)
            // 获取所有被选中节点，由于是前端渲染，所以只要保存一维数组就行
            form.checkedNodes = treeRef.getCheckedNodes(false, true)
            console.log(JSON.stringify(form.checkedNodes))
            // 获取所有被选中的keys，便于渲染是否选中
            form.checkedkeys = treeRef.getCheckedKeys()
            console.log(JSON.stringify(form.checkedkeys))
            const res = await setRoleApi({
              data: form
            })
            if (res) {
              Message.success(form.id ? '编辑成功，请重新退出登录后查看效果' : '新增成功，请重新退出登录后查看效果')
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

    function generateRoutes(routes: AppRouteRecordRaw[], basePath = '/') {
      const res: any[] = []

      for (let route of routes) {
        // skip some route
        if (route.meta.hidden) { continue }

        const oneShowingChild = onlyOneShowingChild(route.children, route, path.resolve(basePath, route.path))

        if (route.children && oneShowingChild && !route.meta.alwaysShow) {
          route = oneShowingChild
        }

        const data = {
          path: isExternal(route.path) ? route.path : path.resolve(basePath, route.path),
          title: route.meta && route.meta.title,
          name: route.name
        }
        // recursive child routes
        if (route.children) {
          (data as any).children = generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    }

    function onlyOneShowingChild(children: AppRouteRecordRaw[] = [], parent: AppRouteRecordRaw, basePath: string) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.meta.hidden)
      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = isExternal(onlyOneChild.path) ? onlyOneChild.path : path.resolve(basePath, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    }

    getDet()

    return {
      formRef,
      routesData,
      tree,
      subLoading,
      form,
      rules,
      defaultProps,
      getDet,
      close,
      setListData
    }
  }
})
</script>

<style>
</style>

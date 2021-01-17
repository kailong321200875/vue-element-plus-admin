<template>
  <div>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="130px"
    >
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
              :data="routesData"
              :props="defaultProps"
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

<script lang="ts">
import { setRoleApi, getRoleDetApi } from '../api'
import { defineComponent, PropType, ref, reactive, nextTick, unref } from 'vue'
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
  name: 'InfoWrite2',
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

    const routesData = ref<any[]>([])

    const seletTreeData = ref<any>(null) // 选中的菜单

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
            routesData.value = generateRoutes(form.checkedNodes)
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
            const res = await setRoleApi({
              data: Object.assign(form, { checkedNodes: routesData })
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

    // 树形点击
    function handleNodeClick(data: any) {
      seletTreeData.value = data
    }

    function close() {
      emit('close')
    }

    function generateRoutes(routes: any[]) {
      const res: any[] = []

      for (const route of routes) {
        const data: any = {
          path: route.path,
          title: route.title || (route.meta && route.meta.title),
          name: route.name,
          redirect: route.redirect || '',
          component: route.component || '',
          meta: {
            hidden: route.meta && route.meta.hidden,
            alwaysShow: route.meta && route.meta.alwaysShow,
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

    return {
      formRef,
      routesData,
      tree,
      subLoading,
      form,
      rules,
      defaultProps,
      getDet,
      handleNodeClick,
      close,
      setListData,
      seletTreeData
    }
  }
})

</script>

<style>
</style>

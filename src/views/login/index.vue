<script lang="tsx">
import { defineComponent, ref, unref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'
import { usePermissionStore } from '@/store/modules/permission'
import { useAppStore } from '@/store/modules/app'
import { ElNotification } from 'element-plus'
import { useCache } from '@/hooks/web/useCache'
const { wsCache } = useCache()

interface FormModule {
  userName: string
  passWord: string
}

export default defineComponent({
  name: 'Login',
  setup() {
    const appStore = useAppStore()
    const permissionStore = usePermissionStore()
    const { currentRoute, addRoute, push } = useRouter()
    const loginForm = ref<Nullable<HTMLElement>>(null)
    const loading = ref<boolean>(false)
    const redirect = ref<string>('')
    const form = reactive<FormModule>({
      userName: '',
      passWord: ''
    })
    const rules = reactive<IObj>({
      userName: [{ required: true, message: '请输入账号' }],
      passWord: [{ required: true, message: '请输入密码' }]
    })

    watch(
      () => currentRoute.value,
      (route: RouteLocationNormalizedLoaded) => {
        redirect.value = route?.query?.redirect as string
      },
      {
        immediate: true
      }
    )

    async function login(): Promise<void> {
      const formWrap = unref(loginForm) as any
      if (!formWrap) return
      formWrap.validate(async (valid: boolean) => {
        if (valid) {
          try {
            loading.value = true
            // 模拟登录接口之后返回角色信息
            wsCache.set(appStore.getUserInfo, form)
            permissionStore.generateRoutes().then(() => {
              permissionStore.getAddRouters.forEach(async (route) => {
                await addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
              })
              permissionStore.setIsAddRouters(true)
              push({ path: redirect.value || '/' })
            })
          } finally {
            loading.value = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

    ElNotification({
      title: '提示',
      message: '账号 admin 为 前端 控制路由权限，账号 test 为 后端 控制路由权限。密码与账号相同',
      duration: 60000
    })

    return () => {
      return (
        <div
          class="login-wrap"
          onKeydown={(event) => {
            if (event.code !== 'Enter') return
            // 停止事件传播
            event.stopPropagation()
            // 阻止该元素默认的 keyup 事件
            event.preventDefault()
            login()
          }}
        >
          <div class="login-con">
            <el-card class="box-card">
              {{
                header: () => <span class="login--header">登录</span>,
                default: () => (
                  <el-form ref={loginForm} model={form} rules={rules} class="login-form">
                    <el-form-item prop="userName">
                      <el-input
                        v-model={form.userName}
                        placeholder="请输入账号 admin or test"
                        class="form--input"
                      >
                        {{
                          prefix: () => (
                            <span class="svg-container">
                              <svg-icon icon-class="user" />
                            </span>
                          )
                        }}
                      </el-input>
                    </el-form-item>
                    <el-form-item prop="passWord">
                      <el-input
                        v-model={form.passWord}
                        show-password={true}
                        minlength={3}
                        maxlength={18}
                        placeholder="请输入密码 admin or test"
                        class="form--input"
                      >
                        {{
                          prefix: () => (
                            <span class="svg-container">
                              <svg-icon icon-class="password" />
                            </span>
                          )
                        }}
                      </el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button
                        loading={loading.value}
                        type="primary"
                        class="login--button"
                        onClick={login}
                      >
                        登录
                      </el-button>
                    </el-form-item>
                  </el-form>
                )
              }}
            </el-card>
          </div>
        </div>
      )
    }
  }
})
</script>

<style lang="less" scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/img/login-bg.jpg');
  background-position: center;
  background-size: cover;

  .box-card {
    width: 400px;

    .login--header {
      font-size: 24px;
      font-weight: 600;
    }

    .svg-container {
      display: inline-block;
      width: 30px;
      color: #889aa4;
      vertical-align: middle;
    }

    .form--input {
      width: 100%;

      :deep(.el-input__inner) {
        padding-left: 40px;
      }
    }

    .login--button {
      width: 100%;
    }
  }

  .login-con {
    position: absolute;
    top: 50%;
    right: 160px;
    transform: translateY(-60%);
  }
}
</style>

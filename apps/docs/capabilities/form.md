# 表单

`@vea/hooks` 的 `useForm` 管理值、校验、脏状态、提交和重置，不绑定 Element Plus，也不提供一套配置化表单 DSL。登录页、弹窗表单和移动端表单可以共用相同逻辑，但保留各自的布局与交互。

## 基本用法

```ts
import { required, useForm } from '@vea/hooks'

interface LoginForm {
  username: string
  password: string
}

const { state, actions } = useForm<LoginForm>({
  initialValues: {
    username: 'admin',
    password: 'admin'
  },
  rules: {
    username: required('请输入用户名'),
    password: [required('请输入密码'), (value) => (value.length < 5 ? '密码至少 5 位' : undefined)]
  }
})

const signIn = () =>
  actions.submit(async (values) => {
    await login(values)
  })
```

Element Plus 只负责渲染：

```vue
<el-form @submit.prevent="signIn">
  <el-form-item :error="state.errors.value.username?.[0]">
    <el-input
      :model-value="state.values.value.username"
      @update:model-value="actions.setValue('username', $event)"
      @blur="actions.validateField('username')"
    />
  </el-form-item>

  <el-button native-type="submit" :loading="state.submitting.value">
    登录
  </el-button>
</el-form>
```

项目登录与注册页已经使用这一模式。

## 状态

| 状态                   | 含义                             |
| ---------------------- | -------------------------------- |
| `values`               | 当前字段值                       |
| `errors`               | 每个字段的错误消息数组           |
| `touchedFields`        | 已触碰或校验过的字段             |
| `dirtyFields`、`dirty` | 相对初始值发生变化的字段与总状态 |
| `hasErrors`            | 当前是否存在字段错误             |
| `validating`           | 是否有校验正在运行               |
| `submitting`           | 是否正在提交                     |
| `submitError`          | 提交处理器抛出的错误             |
| `submitCount`          | 尝试提交的次数                   |

## 动作

| 动作                     | 作用                                 |
| ------------------------ | ------------------------------------ |
| `setValue(field, value)` | 更新单个字段                         |
| `setValues(partial)`     | 批量合并字段                         |
| `touch(fields)`          | 标记字段已触碰                       |
| `validateField(field)`   | 校验单个字段                         |
| `validate()`             | 并行校验所有配置了规则的字段         |
| `setErrors(errors)`      | 写入服务端或业务错误                 |
| `clearErrors(fields?)`   | 清理部分或全部错误                   |
| `submit(handler)`        | 校验通过后提交                       |
| `reset(values?)`         | 恢复初始值，或替换下一次使用的初始值 |

## 校验器

校验器收到当前字段值和完整表单值，可以返回一条、多条或空错误，也可以返回 Promise：

```ts
const confirmPassword = (value: string, values: RegisterForm) => {
  return value === values.password ? undefined : '两次密码不一致'
}

const uniqueUsername = async (value: string) => {
  const exists = await checkUsername(value)
  return exists ? '用户名已存在' : undefined
}
```

同一字段可以配置多个校验器。异步校验发生竞态时，只有最后一次校验结果会写回状态，较慢的旧结果不会覆盖新输入。

`required()` 将 `null`、`undefined`、空白字符串和空数组视为空值，错误消息可以传字符串或函数；函数适合在运行时读取 i18n 文案：

```ts
password: required(() => t('common.required'))
```

## 服务端错误

请求成功到达后端但字段不合法时，把错误写回对应字段：

```ts
try {
  await actions.submit(save)
} catch (error) {
  if (isValidationError(error)) {
    actions.setErrors(error.fields)
  }
}
```

全局网络错误仍由 Request 层处理；`setErrors` 只承接与字段对应的业务反馈。

## 提交与防重复

`submit()` 会先进入 submitting 状态，再执行全表单校验。正在提交时重复调用会直接返回 `undefined`，因此按钮同时绑定 `state.submitting` 即可防止双击提交。

处理器收到的是当前值的浅拷贝，不会把可变表单对象直接交给 API。

## 重置

```ts
actions.reset() // 回到创建 useForm 时的值
actions.reset(user) // 替换初始值，适合编辑另一条数据
```

重置会同时清空错误、触碰状态、提交错误和异步校验版本。

## 使用边界

当前实现按顶层字段进行浅比较和浅拷贝。嵌套对象发生内部突变时，`dirtyFields` 可能无法识别；复杂嵌套模型应整体替换字段，或在业务层拆成扁平表单。

不要为了减少几行模板再包装一层 `BaseForm`。只有多个应用确实共享同一段交互规则时，才把那段逻辑提到 Hook；展示结构留在页面更容易维护。

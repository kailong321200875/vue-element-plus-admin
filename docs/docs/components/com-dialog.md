# ComDialog 弹窗

为了保证 `弹窗` 样式的统一性，对 `element-ui` 的 `Dialog` 组件进行二次封装。

`ComDialog` 组件位于`src/components/Dialog`

## 使用

``` vue
<com-dialog v-model="visible" title="提示">
  <div style="height: 1000px;">
    我是弹窗内容
  </div>
  <template #footer>
    <el-button @click="visible = false">取消</el-button>
    <el-button type="primary" @click="visible = false">确定</el-button>
  </template>
</com-dialog>
```

## Attributes

::: tip 提示
除以下参数外，官方文档内的 `Attributes` 都支持，具体可以参考 [element Dailog](https://element.eleme.cn/#/zh-CN/component/dialog)
:::

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|---------- |-------- |---------- |---------- |---------- |
| showFullscreen | 是否显示全屏按钮 | boolean | false/true | true |
| draggable | 是否可拖拽 | boolean | false/true | true |
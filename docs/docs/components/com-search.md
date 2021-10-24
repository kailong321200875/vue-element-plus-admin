# ComSearch 查询

针对常用的查询业务场景，对 `element` 的 `Form` 组件进行二次封装。

只需传入 `data` 即可渲染整个查询组件。

`Search` 组件代码位于`src/components/Search`

## 使用

``` vue
<div class="searh">
  <com-search
    :data="data"
    @search-submit="searchSubmit"
    @reset-submit="resetSubmit"
  />
</div>
```

## Attributes

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|---------- |-------- |---------- |---------- |---------- |
| labelWidth | 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。 | string | — | - |
| labelPosition | 表单域标签的宽度的文字布局 | string | left/center/right | right |
| hideRequiredAsterisk | 隐藏所有表单项的必选标记 | boolean | true/false | false |
| data | 表单数据，详见[下表](#Data) | array | — | [] |
| rules | 表单验证规则 | object | — | — |
| showReset | 是否显示重置按钮 | boolean | false/true | true |
| layout | 布局风格 | string | right/bottom/classic | classic |

### <span id="Data">Data</span>

::: tip 提示
除以下参数外，官方文档内的 `表单组件` 的 `Attributes` 也都支持，具体可以参考 [form-item](https://element.eleme.cn/#/zh-CN/component/form)
:::

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|---------- |-------- |---------- |---------- |---------- |
| field | 每个查询项的字段名 | string | — | — |
| label | 每个查询项的标题 | string | — | — |
| value | 每个查询项的值 | any | — | — |
| itemType | 每个查询项的类型，根据此值渲染不同的组件，开发者可以进行扩展 | string | switch/input/select/radio/datePicker | — |
| onChange | 是否为当前项进行数据变化监听 | boolean | true/false | false |

## Events

| 事件名 | 说明 | 参数 |
|---------- |-------- |-------- |
| searchSubmit | 点击查询时的回调事件 | data |
| resetSubmit | 点击重置时的回调事件 | data |
| change | 查询项改变时的回调事件 | { field, value } |

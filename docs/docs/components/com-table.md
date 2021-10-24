# ComTable 表格

对 `element-ui` 中的 `Table` 组件进行二次封装，并把 `分页` 给结合进 `ComTable` 组件中。

数据渲染采用的是数据驱动，只需传入 `columns` 和 `data` 就可以进行最简单的数据展示。

`ComTable` 组件代码位于`src/components/Table`

更多示例，可以查看在线预览。

## 使用

```vue
<template>
  <div>
    <com-table :columns="columns" :data="tableData" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const columns = [
  {
    field: 'date',
    label: '日期'
  },
  {
    field: 'name',
    label: '姓名'
  },
  {
    field: 'address',
    label: '地址'
  }
]

const tableData = [
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }
]

export default defineComponent({
  setup() {
    return {
      columns,
      tableData
    }
  }
})
</script>

<style></style>
```

## Attributes

::: tip 提示
除以下参数外，官方文档内的 `Attributes` 也都支持，具体可以参考 [element Table](https://element.eleme.cn/#/zh-CN/component/table)
:::

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| columns | 表格列的配置描述，具体项见[下表](#Columns) | array | — | [] |
| data | 需要渲染的表格数据 | array | — | [] |
| selection | 是否多选 | boolean | true | false |
| pagination | 是否展示分页，默认为 false，如果为 object 类型，则支持[element Pagination](https://element.eleme.cn/#/zh-CN/component/pagination)所有参数 | object/boolean | — | false |
| reserveSelection | 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key） | boolean | true | false |

## Columns<span id="Columns"></span>

::: tip 提示
除以下参数外，官方文档内的 `Table-column` 的 `Attributes` 也都支持，具体可以参考 [element Table](https://element.eleme.cn/#/zh-CN/component/table)
:::

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| field | 每列需要展示的字段名 | string | — | — |
| label | 每列的表头名 | string | — | — |
| slots | 使用 columns 时，可以通过该属性配置支持 slot 的属性，如 slots: { header: 'XXX', default: 'xxx' } | object | — | — |

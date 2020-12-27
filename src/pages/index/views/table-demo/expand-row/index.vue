<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="基于 Element 的 Table 组件进行二次封装，实现数据驱动，支持所有 Table 参数 -- 展开行"
      type="info"
      style="margin-bottom: 20px;"
    />
    <com-table
      ref="multipleTable"
      v-loading="loading"
      :columns="columns"
      :data="tableData"
    >
      <template #id="scope">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ scope.row.name }}</span>
          </el-form-item>
          <el-form-item label="所属店铺">
            <span>{{ scope.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ scope.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ scope.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ scope.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ scope.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ scope.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </com-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

const columns = [
  {
    field: 'id',
    type: 'expand',
    slots: {
      default: 'id'
    }
  },
  {
    field: 'id',
    label: '商品ID'
  },
  {
    field: 'name',
    label: '商品名称'
  },
  {
    field: 'desc',
    label: '描述'
  }
]

const tableData = [
  {
    id: '12987122',
    name: '好滋好味鸡蛋仔',
    category: '江浙小吃、小吃零食',
    desc: '荷兰优质淡奶，奶香浓而不腻',
    address: '上海市普陀区真北路',
    shop: '王小虎夫妻店',
    shopId: '10333'
  }, {
    id: '12987123',
    name: '好滋好味鸡蛋仔',
    category: '江浙小吃、小吃零食',
    desc: '荷兰优质淡奶，奶香浓而不腻',
    address: '上海市普陀区真北路',
    shop: '王小虎夫妻店',
    shopId: '10333'
  }, {
    id: '12987125',
    name: '好滋好味鸡蛋仔',
    category: '江浙小吃、小吃零食',
    desc: '荷兰优质淡奶，奶香浓而不腻',
    address: '上海市普陀区真北路',
    shop: '王小虎夫妻店',
    shopId: '10333'
  }, {
    id: '12987126',
    name: '好滋好味鸡蛋仔',
    category: '江浙小吃、小吃零食',
    desc: '荷兰优质淡奶，奶香浓而不腻',
    address: '上海市普陀区真北路',
    shop: '王小虎夫妻店',
    shopId: '10333'
  }
]

export default defineComponent({
  // name: 'ExpandRow',
  setup() {
    const loading = ref<boolean>(true)
    setTimeout(() => {
      loading.value = false
    }, 1000)

    return {
      columns,
      tableData,
      loading
    }
  }
})
</script>

<style lang="less" scoped>
@{deep}(.demo-table-expand) {
  font-size: 0;
  label {
    width: 90px;
    color: #99a9bf;
  }
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>

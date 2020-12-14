<template>
  <div class="editable-cell">
    <div v-if="editable" class="editable-cell-input-wrapper">
      <a-input v-model:value="value" @pressEnter="check" />
      <check-outlined class="editable-cell-icon-check" @click="check" />
    </div>
    <div v-else class="editable-cell-text-wrapper">
      {{ value || ' ' }}
      <edit-outlined class="editable-cell-icon" @click="edit" />
    </div>
  </div>
</template>

<script lang="ts">
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue'
import { defineComponent, PropType, ref } from 'vue'
export default defineComponent({
  name: 'EditableCell',
  components: {
    CheckOutlined,
    EditOutlined
  },
  props: {
    text: {
      type: String as PropType<string>,
      default: ''
    },
    onChange: {
      type: Function as PropType<Function | null>,
      default: null
    }
  },
  setup(props, { emit }) {
    const value = ref<string>(props.text)
    const editable = ref<boolean>(false)

    function handleChange(e: any) {
      const value = e.target.value
      value.value = value
    }
    function check() {
      editable.value = false
      emit('change', value.value)
    }
    function edit() {
      editable.value = true
    }

    return {
      value, editable,
      check, edit
    }
  }
})
</script>

<style lang="less" scoped>
.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    line-height: 18px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>

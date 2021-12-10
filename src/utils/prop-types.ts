import { createTypes, VueTypesInterface } from 'vue-types'

// 自定义扩展vue-types
type PropTypes = VueTypesInterface & {}

const propTypes: PropTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined,
  array: undefined
})

// 需要自定义扩展的类型
// see: https://dwightjack.github.io/vue-types/advanced/extending-vue-types.html#the-extend-method
propTypes.extend([])

export { propTypes }

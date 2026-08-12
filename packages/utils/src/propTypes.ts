/**
 * Vue Props 类型定义
 */
import { VueTypeValidableDef, VueTypesInterface, createTypes, toValidableType } from 'vue-types'
import type { CSSProperties } from 'vue'

type PropTypes = VueTypesInterface & {
  readonly style: VueTypeValidableDef<CSSProperties>
}

const newPropTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined
}) as PropTypes

class propTypes extends newPropTypes {
  static get style(): VueTypeValidableDef<CSSProperties> {
    return toValidableType('style', {
      type: [String, Object]
    })
  }
}

export { propTypes }

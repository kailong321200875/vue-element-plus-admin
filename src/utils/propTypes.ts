import VueTypes, { toType } from 'vue-types'
import { CSSProperties, PropType } from 'vue'

class propTypes extends VueTypes {
  static get style() {
    return toType('style', {
      type: [String, Object] as PropType<[string | CSSProperties]>,
      default: undefined
    })
  }
}

export { propTypes }

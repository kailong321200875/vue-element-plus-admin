import { propTypes } from '@/utils/propTypes'

export const vConfigGlobalProps = {
  size: propTypes.oneOf(['default', 'medium', 'small', 'mini']).def('default')
}

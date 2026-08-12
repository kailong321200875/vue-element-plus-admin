/**
 * @vea/hooks - Vue Element Plus Admin 通用 Hooks
 */

export { useWatermark } from './useWatermark'
export { useClipboard } from './useClipboard'
export { useNetwork } from './useNetwork'
export { useStorage } from './useStorage'
export { useEventBus } from './useEventBus'
export { useScrollTo } from './useScrollTo'
export type { ScrollToParams } from './useScrollTo'
export { useCrud } from './useCrud'
export type {
  CrudKey,
  CrudListParams,
  CrudListResult,
  CrudMutationOptions,
  CrudMutation,
  CrudPagination,
  CrudQuery,
  CrudRefreshOptions,
  CrudRequestContext,
  CrudRequestScope,
  CrudResetOptions,
  CrudService,
  UseCrudOptions
} from './useCrud'
export { required, useForm } from './useForm'
export type {
  FormErrorInput,
  FormErrors,
  FormField,
  FormModel,
  FormRules,
  FormValidator,
  FormValidatorResult,
  UseFormOptions
} from './useForm'

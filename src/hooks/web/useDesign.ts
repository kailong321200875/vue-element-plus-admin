import variables from '@/styles/variables.module.less'

export function useDesign() {
  const lessVariables = variables

  /**
   * @param scope 类名
   * @returns 返回空间名-类名
   */
  function getPrefixCls(scope: string) {
    return `${lessVariables.namespace}-${scope}`
  }

  return {
    variables: lessVariables,
    getPrefixCls
  }
}

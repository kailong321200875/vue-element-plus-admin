import { EmptyObj } from '@/types/glob'

const modulesFiles: any = require.context('./modules', true, /\.ts$/)

const modules: EmptyObj = modulesFiles.keys().reduce((modules: EmptyObj, modulePath: string): Object => {
  const moduleName: string = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value: EmptyObj = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default {
  ...modules
}

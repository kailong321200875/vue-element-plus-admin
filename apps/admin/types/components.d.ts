declare module 'vue' {
  export interface GlobalComponents {
    Icon: (typeof import('@vea/components'))['Icon']
    Permission: (typeof import('../src/components/Permission/index'))['Permission']
    ElButton: (typeof import('element-plus'))['ElButton']
  }
}

export {}

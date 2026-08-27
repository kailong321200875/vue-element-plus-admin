declare module 'vue' {
  export interface GlobalComponents {
    Icon: (typeof import('@vea/components'))['Icon']
  }
}

export {}

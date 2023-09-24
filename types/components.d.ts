declare module 'vue' {
  export interface GlobalComponents {
    Icon: (typeof import('../components/Icon/src/Icon.vue'))['default']
    Permission: (typeof import('../components/Permission/src/Permission.vue'))['default']
  }
}

export {}

declare module 'vue' {
  export interface GlobalComponents {
    BfFrom: typeof import('../components/Form/src/BfForm.vue')['default']
  }
}

export {}

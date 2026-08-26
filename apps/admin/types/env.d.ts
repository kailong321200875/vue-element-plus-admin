/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}

declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_API_BASE_PATH: string
    readonly VITE_BASE_PATH: string
    readonly VITE_SOURCEMAP: string
    readonly VITE_OUT_DIR: string
    readonly VITE_USE_MOCK: string
    readonly VITE_USE_CSS_SPLIT: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

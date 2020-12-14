// 多页模版子接口
export interface PageItemModule {
  template: string,
  title?: string
}

// 多页模版接口
export interface PagesModule {
  [key: string]: PageItemModule
}

// 多页入口模版子接口
export interface EntryItemModule extends PageItemModule {
  entry: string,
  chunks: string[]
}

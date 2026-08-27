import { defineStore } from 'pinia'
import { store } from '../index'
import type { LoginResult, UserInfo } from '@/api/login/types'
import { usePermissionStore } from './permission'
import { useTagsViewStore } from './tagsView'
import router, { resetRouter } from '@/router'

interface UserState {
  userInfo?: UserInfo
  token: string
  rememberMe: boolean
  rememberedUsername: string
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      userInfo: undefined,
      token: '',
      rememberMe: true,
      rememberedUsername: ''
    }
  },
  getters: {
    isAuthenticated(): boolean {
      return Boolean(this.token && this.userInfo)
    }
  },
  actions: {
    setSession({ accessToken, user }: LoginResult) {
      this.token = accessToken
      this.userInfo = user
    },
    rememberUsername(username: string, remember: boolean) {
      this.rememberMe = remember
      this.rememberedUsername = remember ? username : ''
    },
    clearSession() {
      this.token = ''
      this.userInfo = undefined
      usePermissionStore().reset()
      useTagsViewStore().removeAllViews(false)
      resetRouter()
    },
    async logout() {
      this.clearSession()
      await router.replace('/login')
    }
  },
  persist: {
    key: 'vea-session-v1',
    pick: ['token', 'userInfo', 'rememberMe', 'rememberedUsername']
  }
})

export const useUserStoreWithOut = () => {
  return useUserStore(store)
}

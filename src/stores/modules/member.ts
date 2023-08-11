import type { LoginResult } from '@/types/memeber'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useMemberStore = defineStore('member', () => {
  // 会员信息
  const profile = ref<LoginResult>()

  // 保存会员信息，登录时使用
  const setProfile = (val: LoginResult) => {
    profile.value = val
  }

  // 清理会员信息，退出时使用
  const clearProfile = () => {
    profile.value = undefined
  }

  // 记得 return
  return {
    profile,
    setProfile,
    clearProfile,
  }
},
  {
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, val) {
          return uni.setStorageSync(key, val)
        },
      },
    },
  },
)

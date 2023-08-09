

<template>
  <view class="index">index</view>
  <uni-card>
    <view>
      信息：{{memberStore.profile}}
    </view>
  </uni-card>
  <button @tap="memberStore.setProfile( 'ww1w' )" size="mini" plain type="primary">保存用户信息</button>
  <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">删除用户信息</button>
  <button @tap="getData" size="mini" plain type="warn">请求</button>
</template>
<script setup lang="ts">
import { useMemberStore } from '@/stores/modules/member'
import '@/utils/http'
const memberStore = useMemberStore()
const getData = () => {
  uni.request({ method: 'GET', url: '/home/banner' })
}
//
</script>
<style lang="scss">
//
</style>

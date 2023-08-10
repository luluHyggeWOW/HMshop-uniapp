

<template>
  <CustomNavbar></CustomNavbar>
  <XtxSwiper :list="bannerList"></XtxSwiper>
  <view class="index">index</view>
</template>
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { useMemberStore } from '@/stores/modules/member'
import { http } from '@/utils/http'
import CustomNavbar from './componets/CustomNavbar.vue'
import { getHomeBannerAPI } from '@/services/home'
import { ref, onMounted } from 'vue'
import type { BannerItem } from '@/types/home'
const memberStore = useMemberStore()
let bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}
onLoad(() => {
  getHomeBannerData()
  console.log('onload')
})

//
</script>
<style lang="scss">
//
</style>

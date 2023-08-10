

<template>
  <CustomNavbar></CustomNavbar>
  <scroll-view refresher-enabled="true" :refresher-triggered="isTriggered" @refresherrefresh="onRefresherrefresh"
    @scrolltolower="onScrolltolower" class="scroll-view" scroll-y>
    <PageSkeleton v-if="isLoading" />
    <template v-else>
      <XtxSwiper :list="bannerList"></XtxSwiper>
      <CategoryPanel :list="categoryList" />
      <HotPanel :list="hotList" />
      <XtxGuess ref="guessRef"></XtxGuess>
    </template>
  </scroll-view>

</template>
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { useMemberStore } from '@/stores/modules/member'
import { http } from '@/utils/http'
import CustomNavbar from './componets/CustomNavbar.vue'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import { ref, onMounted } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import CategoryPanel from './componets/CategoryPanel.vue'
import HotPanel from './componets/HotPanel.vue'
import type { XtxGuessInstance } from '@/types/components'
import PageSkeleton from './componets/PageSkeleton.vue'
const memberStore = useMemberStore()
let bannerList = ref<BannerItem[]>([])
let categoryList = ref<CategoryItem[]>([])
let hotList = ref<HotItem[]>([])
let guessRef = ref<XtxGuessInstance>()
let isTriggered = ref<boolean>(false)
let isLoading = ref<boolean>(false)
const getHomeBannerData = async () => {
  let res = await getHomeBannerAPI()
  bannerList.value = res.result
}
const getHomeCategoryData = async () => {
  let res = await getHomeCategoryAPI()
  categoryList.value = res.result
}
const getHomeHotPanelData = async () => {
  let res = await getHomeHotAPI()
  hotList.value = res.result
}
const onScrolltolower = () => {
  guessRef.value?.getMore()
}
const onRefresherrefresh = async () => {
  isTriggered.value = true
  guessRef.value?.resetData()
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomeHotPanelData(),
    guessRef.value?.getMore(),
  ])
  isTriggered.value = false
}
onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotPanelData()])
  isLoading.value = false
})

//
</script>
<style lang="scss">
page {
  height: 100%;
  display: fiex;
  background: #f7f7f7;
  flex-direction: column;
  .scroll-view {
    flex: 1;
  }
}
</style>

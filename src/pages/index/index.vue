

<template>
  <CustomNavbar></CustomNavbar>
  <scroll-view class="scroll-view" scroll-y>
    <XtxSwiper :list="bannerList"></XtxSwiper>
    <CategoryPanel :list="categoryList" />
    <HotPanel :list="hotList" />
    <XtxGuess></XtxGuess>
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
import CategoryPanel from '@/components/CategoryPanel.vue'
import HotPanel from '@/components/HotPanel.vue'
const memberStore = useMemberStore()
let bannerList = ref<BannerItem[]>([])
let categoryList = ref<CategoryItem[]>([])
let hotList = ref<HotItem[]>([])
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
onLoad(() => {
  getHomeBannerData()
  getHomeCategoryData()
  getHomeHotPanelData()
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

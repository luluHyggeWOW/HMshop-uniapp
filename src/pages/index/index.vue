

<template>
  <CustomNavbar></CustomNavbar>
  <XtxSwiper></XtxSwiper>
  <view class="index">index</view>

</template>
<script setup lang="ts">
import { useMemberStore } from '@/stores/modules/member'
import { http } from '@/utils/http'
import CustomNavbar from './componets/CustomNavbar.vue'
const memberStore = useMemberStore()

//
</script>
<style lang="scss">
//
</style>

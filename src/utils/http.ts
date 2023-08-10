import { useMemberStore } from '@/stores/modules/member'

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
const memberStore = useMemberStore()
export const httpInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    options.timeout = 5000
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    let token = memberStore.profile?.token
    if (token) {
      options.header.Authorizetion = token
    }
    console.log(options);
  }
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)
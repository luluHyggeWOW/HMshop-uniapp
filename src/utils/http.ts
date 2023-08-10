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
interface Data<T> {
  code: string,
  msg: string,
  result: T
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)
export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        } else if (res.statusCode == 401) {
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误'
          })
        }

      },
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误'
        })
        reject(err)
      }
    })
  })
}
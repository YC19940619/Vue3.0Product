import { Message } from 'element-ui'
import router from '@/router'
import Store from '@/store'
import { refreshToken } from '@/assets/api/login'
const CheckToken = () => {
  return (target: any, name: any, descriptor: any) => {
    let method = descriptor.value
    descriptor.value = async (...arg:any) => {
      let res = await method(...arg)
      if (res.code.includes('ACCESS_TOKEN_EXPIRES')) { // token失效
        let refreshData = await refreshToken()
        if (refreshData.code === 'SUCCESS') { // 成功获取新的token
          let token = Store.state.token
          token.access_token = refreshData.data.access_token
          Store.commit('changeToken', token)
          return method.apply(target, arg) // 再次执行
        } else {
          Message.error('重新登录')
          router.push('/login')
          return false
        }
      } else { // 如果没失效 直接返回结果
        return res
      }
    }
    return descriptor
  }
}
export {
  CheckToken
}

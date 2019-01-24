import { $post, $get } from '@/assets/scripts/axios'
import { Auth, UserMe, RefreshToken, LogOut } from '@/assets/scripts/interfaces'
import { CheckToken } from '@/assets/scripts/decorator'
import Store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
class User {
  refreshToken () {
    return $get(RefreshToken, {
      refresh_token: Store.state.token.refresh_token
    }, false)
  }
  signIn (account:string, password:string) { // 登录
    return $post(Auth, {
      account,
      password,
      sys: 'admin'
    }, false)
  }
  logOut () {
    $post(LogOut, {
      access_token: Store.state.token.access_token,
      refresh_token: Store.state.token.refresh_token
    }, false).then(res => {
      if (res.code === 'SUCCESS') {
        Store.commit('changeToken', {})
        router.push('/login')
        Message({
          type: 'success',
          message: '退出成功!'
        })
      } else {
        Message.error('退出失败')
      }
    })
  }
}
const user = new User()
const signIn = user.signIn
const refreshToken = user.refreshToken
const logOut = user.logOut
export {
  signIn,
  refreshToken,
  logOut
}

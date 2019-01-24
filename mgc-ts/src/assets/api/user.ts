import { $patch, $get } from '@/assets/scripts/axios'
import { UserMe } from '@/assets/scripts/interfaces'
import { CheckToken } from '@/assets/scripts/decorator'

class User {
  @CheckToken()
  getUserInfo () {
    return $get(UserMe, {}, true)
  }
  @CheckToken()// 参数变成了数组
  modifyPassword (password:string) {
    return $patch(UserMe, { password }, true)
  }
  @CheckToken()// 参数变成了数组
  modifyUserInfo (data:object) {
    return $patch(UserMe, data, true)
  }
  @CheckToken()// 参数变成了数组
  modifyHeadImage (headImage:string) {
    return $patch(UserMe, { head_image: headImage }, true)
  }
}
const user = new User()
const getUserInfo = user.getUserInfo
const modifyPassword = user.modifyPassword
const modifyUserInfo = user.modifyUserInfo
const modifyHeadImage = user.modifyHeadImage
export {
  getUserInfo,
  modifyPassword,
  modifyUserInfo,
  modifyHeadImage
}

let token:any = localStorage.getItem('token')
let userInfo:any = localStorage.getItem('userInfo')
token = JSON.parse(token) || {}
userInfo = JSON.parse(userInfo) || {}
export default {
  token,
  userInfo
}

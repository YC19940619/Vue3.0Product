const changeToken = (state:any, token:object) => {
  state.token = token
  localStorage.setItem('token', JSON.stringify(token))
}
const changeUserInfo = (state:any, userInfo:object) => {
  state.userInfo = userInfo
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
}
export default {
  changeToken,
  changeUserInfo
}

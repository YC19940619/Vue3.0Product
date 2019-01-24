console.log(process.env)
const Api: string = process.env.VUE_APP_Api
const Pallet: string = process.env.VUE_APP_Pallet
const Model: string = process.env.VUE_APP_Model
console.log(Api)
console.log(Pallet)
console.log(Model)
// const storeAuth = `${UsersDomainL}/store/auth` //  门店登录
const Auth = `${Api}/auth` // 登录
const UserMe = `${Api}/users/me` // 获取用户信息
const RefreshToken = `${Api}/auth/refresh_token` // 刷新token
const LogOut = `${Api}/auth/logout` // 注销登录
const Roles = `${Api}/rear/roles` // 角色
const Permissions = `${Api}/rear/permissions` // 权限
const AdminStyles = `${Pallet}/admin/styles` // 款式
const AdminRfids = `${Pallet}/admin/rfids` // 存货
const Erpsync = `${Pallet}/admin/erpsync`
const Users = `${Api}/rear/users` // 用户
const Stores = `${Api}/rear/stores` // 店铺
export {
  Auth,
  UserMe,
  RefreshToken,
  LogOut,
  Roles,
  Permissions,
  AdminStyles,
  AdminRfids,
  Erpsync,
  Users,
  Stores
}

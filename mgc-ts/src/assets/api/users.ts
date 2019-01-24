import { $patch, $get, $post, $delete, $put } from '@/assets/scripts/axios'
import { Users } from '@/assets/scripts/interfaces'
import { CheckToken } from '@/assets/scripts/decorator'

class UsersMoudle {
  @CheckToken()
  ViewUsersList (params:object) {
    return $get(Users, params, true)
  }
  @CheckToken()
  AddUser (data:object) {
    return $post(Users, data, true)
  }
  @CheckToken()
  DeleteUser (userId:any) {
    return $delete(`${Users}/${userId}`, {}, true)
  }
  @CheckToken()
  ChangeUser (userId:any, data:any) {
    return $put(`${Users}/${userId}`, data, true)
  }
  @CheckToken()
  ChangePasswordFnc (userId:any, data:any) {
    return $patch(`${Users}/${userId}`, data, true)
  }
}
const usersMoudle = new UsersMoudle()
const ViewUsersList = usersMoudle.ViewUsersList
const AddUserFunc = usersMoudle.AddUser
const DeleteUser = usersMoudle.DeleteUser
const ChangeUser = usersMoudle.ChangeUser
const ChangePasswordFnc = usersMoudle.ChangePasswordFnc
export {
  ViewUsersList,
  AddUserFunc,
  DeleteUser,
  ChangeUser,
  ChangePasswordFnc
}

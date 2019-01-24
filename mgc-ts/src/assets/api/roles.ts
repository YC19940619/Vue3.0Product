import { $patch, $get, $post, $delete, $put } from '@/assets/scripts/axios'
import { Roles, Permissions } from '@/assets/scripts/interfaces'
import { CheckToken } from '@/assets/scripts/decorator'

class Role {
  @CheckToken()
  viewRoles (params:object) { // 查看角色列表
    return $get(Roles, params, true)
  }
  @CheckToken()
  viewPermissions () { // 查看权限列表
    return $get(Permissions, {}, true)
  }
  @CheckToken()
  addRoles (data:any) { // 添加角色
    return $post(Roles, data, true)
  }
  @CheckToken()
  deleteRole (rid:any) { // 删除角色
    return $delete(`${Roles}/${rid}`, {}, true)
  }
  @CheckToken()
  viewRole (rid:any) { // 查看角色
    return $get(`${Roles}/${rid}`, {}, true)
  }
  @CheckToken()
  changeRolePermissions (rid:any, permissions:any) { // 修改角色权限
    return $patch(`${Roles}/${rid}`, { permissions }, true)
  }
  @CheckToken()
  changeRoleInfo (rid:any, roleInfo:object) { // 修改角色权限
    return $put(`${Roles}/${rid}`, roleInfo, true)
  }
}
const RoleMoudle = new Role()
const viewRoles = RoleMoudle.viewRoles
const viewPermissions = RoleMoudle.viewPermissions
const addRoles = RoleMoudle.addRoles
const deleteRole = RoleMoudle.deleteRole
const viewRole = RoleMoudle.viewRole
const changeRolePermissions = RoleMoudle.changeRolePermissions
const changeRoleInfo = RoleMoudle.changeRoleInfo
export {
  viewRoles,
  viewPermissions,
  addRoles,
  deleteRole,
  viewRole,
  changeRolePermissions,
  changeRoleInfo
}

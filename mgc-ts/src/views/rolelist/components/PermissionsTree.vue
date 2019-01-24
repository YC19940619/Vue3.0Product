<template>
  <div class="tree-box">
    <el-tree
      ref="tree"
      :default-checked-keys="defaultCheckKeys"
      :data="Permissions"
      :default-expand-all="defaultExpandAll"
      :highlight-current="true"
      :check-strictly="true"
      show-checkbox
      :check-on-click-node="false"
      :accordion="true"
      node-key="id"
      :props="defaultProps">
    </el-tree>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { viewPermissions } from '@/assets/api/roles'
@Component
export default class PermissionsTree extends Vue {
  @Prop({ type: Array, default: [] }) defaultCheckKeys!:Array<any>
  @Prop({ type: Boolean, default: false }) disabled!:boolean
  @Prop({ type: Boolean, default: false }) defaultExpandAll!:boolean
  Permissions = null
  defaultProps = {
    children: 'children',
    label: 'name'
  }
  mounted () {
    viewPermissions().then((res:any) => {
      if (res) {
        if (this.disabled) {
          res.data.forEach((item:any) => {
            item.disabled = true
          })
        }
        this.PermissionsSort(res.data)
      }
    })
  }
  close () { // 关闭时清空
    this.setCheckedKeys([])
  }
  setCheckedKeys (keys:Array<any>) { // 设置
    (this.$refs.tree as any).setCheckedKeys(keys)
    console.log(keys)
  }
  getCheckedKeys () { // 获取
    return (this.$refs.tree as any).getCheckedKeys()
  }
  PermissionsSort (Permissions:any) {
    let NewPermissions:any = []
    Permissions.forEach((item:any) => {
      if (item.parent) {
      } else {
        NewPermissions.push(this.PermissionsChildrenSort(item, Permissions))
      }
    })
    this.Permissions = NewPermissions
  }
  PermissionsChildrenSort (Permission:any, Permissions:any) {
    Permission.children = []
    Permissions.forEach((item:any) => {
      if (Permission.id === item.parent) { // 若果是子权限 就继续走
        Permission.children.push(this.PermissionsChildrenSort(item, Permissions)) // 全部都不符合就不走了
      }
    })
    return Permission
  }
}
</script>

<style lang="stylus" scoped>
.tree-box
  max-height:500px
  overflow-y auto
</style>

<template>
  <el-dialog title="角色所有权限" :visible.sync="changePermissionVisible" width="400px" :close-on-click-modal="false" :before-close="closeChangePermissionVisible">
    <permissions-tree ref="viewPermissionsTree" :defaultCheckKeys="defaultCheckKeys" :defaultExpandAll="true"></permissions-tree>
    <div style="overflow: hidden"><el-button type="primary" @click="changePermissions" class="change-btn" size="mini">确认修改</el-button></div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import PermissionsTree from './PermissionsTree.vue'
import { changeRolePermissions } from '@/assets/api/roles'
@Component({
  components: {
    PermissionsTree
  }
})
export default class ChangeRolePermission extends Vue {
  @Prop({ type: Boolean, default: false }) changePermissionVisible!:boolean
  @Prop({ type: Array, default: [] }) defaultCheckKeys!:Array<any>
  @Prop({ default: null }) rid!:any
  @Emit('closeChangePermissionVisible')
  closeChangePermissionVisible () {
    (this.$refs.viewPermissionsTree as any).setCheckedKeys([]) // 每次关闭重置信息
    return false
  }
  changePermissions () {
    const permissions = (this.$refs.viewPermissionsTree as any).getCheckedKeys([]).join(',') // 获取权限信息
    changeRolePermissions(this.rid, permissions).then((res) => {
      if (res) {
        switch (res.code) {
          case 'SUCCESS':
            this.$message.success('权限修改成功')
            break
          default:
            this.$message.error('权限修改失败')
        }
        this.closeChangePermissionVisible()
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
  .change-btn
    float right
    margin-top 20px
</style>

<template>
  <el-dialog title="角色所有权限" :visible.sync="viewPermissionVisible" width="400px" :close-on-click-modal="false" :before-close="closeViewPermissionVisible">
    <permissions-tree ref="viewPermissionsTree" :defaultCheckKeys="defaultCheckKeys" :disabled="true" :defaultExpandAll="true"></permissions-tree>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import PermissionsTree from './PermissionsTree.vue'
@Component({
  components: {
    PermissionsTree
  }
})
export default class ViewRolePermission extends Vue {
  @Prop({ type: Boolean, default: false }) viewPermissionVisible!:boolean
  @Prop({ type: Array, default: [] }) defaultCheckKeys!:Array<any>
  @Emit('closeViewPermissionVisible')
  closeViewPermissionVisible () {
    (this.$refs.viewPermissionsTree as any).setCheckedKeys([]) // 每次关闭重置信息
    return false
  }
  closeInnerVisible () {
    (this.$refs.viewPermissionsTree as any).setCheckedKeys([]) // 每次关闭重置信息
  }
}
</script>

<style lang="stylus" scoped>
</style>

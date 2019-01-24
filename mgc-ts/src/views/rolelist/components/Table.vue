<template>
  <div>
    <el-table
      class="table"
      :height="tableHeight"
      :data="rolesData"
      style="width: 100%"
      :header-cell-style="headerStyle"
      :default-sort = "{prop: 'date', order: 'descending'}"
    >
      <el-table-column
        prop="id"
        border
        label="#"
        sortable
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名称"
        sortable
        width="180">`
      </el-table-column>
      <el-table-column
        prop="codename"
        label="编号"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="description"
        label="角色描述"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="sys_create"
        label="是否可编辑"
        sortable>
      </el-table-column>
      <el-table-column label="操作" width="400">
        <template slot-scope="scope" >
          <template v-if="scope.row.sys_create === '可编辑'">
            <el-button size="mini" type="primary" v-if="viewRolePermission" @click="handleRole(scope.$index, scope.row, 'viewPermission')">查看权限</el-button>
            <el-button size="mini" type="warning" v-if="changeRolePermission" @click="handleRole(scope.$index, scope.row, 'changePermission')">修改权限</el-button>
            <el-button size="mini" type="warning" v-if="changeRolePermission" @click="handleRole(scope.$index, scope.row, 'changeInfo')">编辑信息</el-button>
            <el-button size="mini" type="danger" v-if="deleteRolePermission" @click="handleDeleteRole(scope.$index, scope.row)">删除角色</el-button>
          </template>
          <template v-else>
            <el-button size="mini" type="primary" v-if="viewRolePermission" @click="handleRole(scope.$index, scope.row, 'viewPermission')">查看权限</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <view-role-permission
      :defaultCheckKeys="defaultCheckKeys"
      :viewPermissionVisible="viewPermissionVisible"
      @closeViewPermissionVisible="viewPermissionVisible = false">
    </view-role-permission>
    <change-role-permission
      :defaultCheckKeys="defaultCheckKeys"
      :changePermissionVisible="changePermissionVisible"
      :rid="rid"
      @closeChangePermissionVisible="changePermissionVisible = false">
    </change-role-permission>
    <change-info :rid="rid" :changeInfoVisible="changeInfoVisible" :roleInfo="roleInfo" @changeRoleInfo="changeRoleInfo" @closeChangeInfo="changeInfoVisible=false"></change-info>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { checkPermission } from '@/assets/scripts/common'
import { deleteRole, viewRole } from '@/assets/api/roles'
import ViewRolePermission from './ViewRolePermission.vue'
import ChangeRolePermission from './ChangeRolePermission.vue'
import ChangeInfo from './ChangeInfo.vue'
@Component({
  components: {
    ViewRolePermission,
    ChangeRolePermission,
    ChangeInfo
  }
})
export default class Table extends Vue {
  @Prop({ default: 500 }) tableHeight!:any
  @Prop({ default: {} }) rolesData!:any
  defaultCheckKeys:Array<any> = [] // 默认选中的权限
  viewPermissionVisible:boolean = false // 查看权限dialog
  changePermissionVisible:boolean = false // 编辑权限dialog
  changeInfoVisible:boolean = false // 编辑信息dialog
  rid:any = null // 当前角色id
  roleInfo:object = {} // 当前角色信息
  headerStyle:object = { // 表头样式
    background: '#eef1f6'
  }
  mounted () {}
  @Emit()
  changeRoleInfo () {
    this.changeInfoVisible = false
  }
  handleRole (index:any, row:any, type:string) { // 查看角色权限
    viewRole(row.id).then((res:any) => {
      if (res) {
        if (res.code === 'SUCCESS') {
          this.defaultCheckKeys = []
          res.data.permission.forEach((item:any) => {
            this.defaultCheckKeys.push(item.id)
          })
          this.rid = row.id
          switch (type) {
            case 'viewPermission':
              this.viewPermissionVisible = true
              break
            case 'changePermission':
              this.changePermissionVisible = true
              break
            case 'changeInfo':
              this.roleInfo = {
                name: res.data.name,
                description: res.data.description,
                codename: res.data.codename
              }
              this.changeInfoVisible = true
              break
          }
        } else {
          this.$message.error('查询失败')
        }
      }
    })
  }
  handleDeleteRole (index:any, row:any) { // 删除角色
    this.$confirm('删除后无法恢复，是否确认删除', '操作', {
      distinguishCancelAndClose: true,
      confirmButtonText: '确认',
      cancelButtonText: '放弃'
    }).then(() => {
      deleteRole(row.id).then((res:any) => {
        if (res) {
          switch (res.code) {
            case 'SUCCESS':
              this.$message.success('删除成功')
              this.$emit('delete-role-succ')
              break
            case 'user.ROLE_NOT_EXIST':
              this.$message.error('角色不存在')
              break
            case 'user.ROLE_NOT_ALLOW_MODIFY':
              this.$message.error('系统角色无法删除')
              break
            case 'user.ROLE_ISUSED':
              this.$message.error('角色已被用户使用')
              break
            case 'user.PERMISSION_DENIED':
              this.$message.error('权限不足')
              break
            default:
              this.$message.error('删除失败')
          }
        }
      }).catch((err:any) => {
        console.log(err)
      })
    })
  }
  get deleteRolePermission () {
    return checkPermission('delete_role')
  }
  get changeRolePermission () {
    return checkPermission('change_role')
  }
  get viewRolePermission () {
    return checkPermission('view_role')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

</style>

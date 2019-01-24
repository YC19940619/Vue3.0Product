<template>
  <div>
    <el-table
      class="table"
      :height="tableHeight"
      :data="usersData"
      style="width: 100%"
      :header-cell-style="headerStyle"
      :default-sort = "{prop: 'date', order: 'descending'}"
    >
      <el-table-column prop="account" label="登录名" fixed sortable width="100"></el-table-column>
      <el-table-column prop="nickname" label="用户昵称" fixed sortable width="250">`</el-table-column>
      <el-table-column prop="role__name" label="角色名称" width="100" sortable></el-table-column>
      <el-table-column prop="sex" label="性别" sortable width="80"></el-table-column>
      <el-table-column prop="phone_num" label="手机号" width="120" sortable></el-table-column>
      <el-table-column prop="create_time" label="创建时间" sortable width="180"></el-table-column>
      <el-table-column prop="is_active" label="账户状态" sortable width="100"></el-table-column>
      <el-table-column prop="sys_create" label="是否可编辑" sortable min-width="120"></el-table-column>
      <el-table-column label="操作" width="300" fixed="right">
        <template slot-scope="scope" >
          <template v-if="scope.row.sys_create === '可编辑'">
            <el-button size="mini" type="warning" v-if="changeUserPermission" @click="changeUser(scope.row)">编辑信息</el-button>
            <el-button size="mini" type="warning" v-if="changeUserPermission"  @click="changePassword(scope.row)">重置密码</el-button>
            <el-button size="mini" type="danger" v-if="deleteUserPermission" @click="deleteUser(scope.row.id)">删除</el-button>
          </template>
          <template v-else>
            <el-button size="mini" type="warning" disabled>编辑信息</el-button>
            <el-button size="mini" type="warning" disabled>重置密码</el-button>
            <el-button size="mini" type="danger" disabled>删除</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <user-change @closeChangeUserInfoDialog="closeChangeUserInfoDialog" :ChangeUserInfoVisible="ChangeUserInfoVisible" :userInfo="userInfo"></user-change>
    <change-password :passwordVisible="passwordVisible" @closePasswordDialog="passwordVisible = false" :userInfo="userInfo"></change-password>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import UserChange from './UserChange.vue'
import ChangePassword from './ChangePassword.vue'
import { checkPermission } from '@/assets/scripts/common'
import { DeleteUser } from '@/assets/api/users'
@Component({
  components: {
    UserChange,
    ChangePassword
  }
})
export default class Table extends Vue {
  @Prop({ default: 500 }) tableHeight!:any
  @Prop() usersData!:any
  passwordVisible:boolean = false
  ChangeUserInfoVisible:boolean = false
  userInfo = null
  headerStyle:object = { // 表头样式
    background: '#eef1f6'
  }
  mounted () {}
  changePassword (row:any) {
    this.userInfo = row
    this.passwordVisible = true
  }
  deleteUser (userId:any) {
    this.$confirm('删除后无法恢复，是否确认删除', '操作', {
      distinguishCancelAndClose: true,
      confirmButtonText: '确认',
      cancelButtonText: '放弃'
    }).then(() => {
      console.log(userId)
      DeleteUser(userId).then((res:any) => {
        if (res) {
          switch (res.code) {
            case 'SUCCESS':
              this.$message.success('删除成功')
              this.$emit('delete-user-succ')
              break
            default:
              this.$message.error('删除失败')
          }
        }
      })
    }).catch(() => {})
  }
  changeUser (row:any) {
    this.ChangeUserInfoVisible = true
    this.userInfo = row
  }
  @Emit('closeChangeUserInfoDialog')
  closeChangeUserInfoDialog () {
    this.ChangeUserInfoVisible = false
  }
  get changeUserPermission () {
    return checkPermission('change_user')
  }
  get deleteUserPermission () {
    return checkPermission('delete_user')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

</style>

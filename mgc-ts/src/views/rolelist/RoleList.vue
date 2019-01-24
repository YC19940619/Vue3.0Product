<template>
  <div class="container">
    <div class="header">
      <bread-crumb></bread-crumb>
      <div class="keywordSearch">
        <el-input class="search-input" placeholder="请输入查询内容" v-model="keyword"></el-input>
        <el-button class="search-btn" type="primary" icon="el-icon-search" @click="keywordChange">查询</el-button>
        <el-button class="all-btn" type="primary" @click="removeKeyword">全部</el-button>
        <el-button class="add-btn" type="primary" @click="dialogTableVisible = true" v-if="addRolePermission">新增</el-button>
      </div>
    </div>
    <div class="table-container" ref="tableContainer">
      <Table :tableHeight="tableHeight" :rolesData="rolesData" @delete-role-succ="getData" @change-role-info="getData"></Table>
    </div>
    <Pagination :currentPage="currentPage" :pageSize="pageSize" :pageCount="pageCount" @sizeChange="sizeChange" @currentChange="currentChange"></Pagination>
    <add-dialog
      :dialogTableVisible="dialogTableVisible"
      @add-permissions-succ="getData"
      @closeDialogTableVisible="closeDialogTableVisible">
    </add-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BreadCrumb from '@/components/BreadCrumb.vue'
import Pagination from '@/components/Pagination.vue'
import Table from './components/Table.vue'
import AddDialog from './components/AddDialog.vue'
import { viewRoles } from '@/assets/api/roles'
import { checkPermission } from '@/assets/scripts/common'
@Component({
  components: {
    BreadCrumb,
    Pagination,
    Table,
    AddDialog
  }
})
export default class RoleList extends Vue {
  rolesData:any = null // 表格数据
  tableHeight = 0 // 表格高度
  dialogTableVisible = false // 是否显示
  pageSize:number = 10 // 每页条数
  currentPage:number = 1 // 当前页码
  keyword:string = '' // 搜索字段
  pageCount:number = 1 // 总页数
  mounted () {
    this.getData()
  }
  getData () {
    viewRoles({
      per_page: this.pageSize,
      page: this.currentPage,
      keyword: this.keyword
    }).then((res:any) => {
      if (res) {
        if (res.code === 'SUCCESS') {
          this.viewRolesSucc(res)
        } else if (res.code === 'user.PERMISSION_DENIED') {
          this.$message.error('权限不足')
        } else {
          this.$message.error('查询失败，请重新登录')
        }
      }
    }).catch((err:any) => {
      console.log(err)
    })
  }
  viewRolesSucc (res:any) {
    this.pageCount = res.num_page
    res.data.forEach((item:any) => {
      if (item.sys_create) {
        item.sys_create = '不可编辑'
      } else {
        item.sys_create = '可编辑'
      }
    })
    this.rolesData = res.data
    this.tableHeight = (this.$refs.tableContainer as any).offsetHeight
  }
  sizeChange (val:number) {
    this.pageSize = val
    this.removeKeyword()
  }
  currentChange (val:number) {
    this.currentPage = val
    this.removeKeyword()
  }
  keywordChange () {
    this.currentPage = 1
    this.getData()
  }
  removeKeyword () {
    this.keyword = ''
    this.getData()
  }
  closeDialogTableVisible (dialogTableVisible:boolean) {
    this.dialogTableVisible = dialogTableVisible
  }
  get addRolePermission () {
    return checkPermission('add_role')
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/styles/maxins.styl"
  .container
    FlexContainer()
    .header
      width: 100%
      padding: 2px 0
      margin-bottom: 20px
      .keywordSearch
        float right
        height: 100%
        .search-input
          width:200px
        .search-btn
          margin-left:10px
          height: 40px
    .table-container
      flex:1
    .role-info
      width:80%
</style>

<template>
  <div class="container">
    <div class="header">
      <bread-crumb></bread-crumb>
      <div class="keywordSearch">
        <el-input class="search-input" placeholder="请输入查询内容" v-model="keyword"></el-input>
        <el-button class="search-btn" type="primary" icon="el-icon-search" @click="keywordSearch">查询</el-button>
        <el-button class="all-btn" type="primary" @click="allSearch">全部</el-button>
        <el-button class="add-btn" type="primary" @click="AddProductVisible=true" v-if="addRolePermission">新增款式</el-button>
      </div>
    </div>
    <div class="table-container" ref="tableContainer">
      <Table :tableHeight="tableHeight" :stylesData="stylesData" @close-change-info="getData"></Table>
    </div>
    <Pagination :currentPage="currentPage" :pageSize="pageSize" :pageCount="pageCount" @sizeChange="sizeChange" @currentChange="currentChange"></Pagination>
    <add-product :AddProductVisible="AddProductVisible" @closeAddProductDialog="closeAddProductDialog"></add-product>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Pagination from '@/components/Pagination.vue'
import BreadCrumb from '@/components/BreadCrumb.vue'
import Table from './components/Table.vue'
import AddProduct from './components/AddProduct.vue'
import { viewStyles } from '@/assets/api/products'
import { checkPermission } from '@/assets/scripts/common'
@Component({
  components: {
    BreadCrumb,
    Table,
    Pagination,
    AddProduct
  }
})
export default class ProductList extends Vue {
  AddProductVisible:boolean = false
  pageSize:number = 10 // 每页条数
  currentPage:number = 1 // 当前页码
  keyword:string = '' // 搜索字段
  pageCount:number = 1 // 总页数
  tableHeight:any = 0 // 表格高度
  stylesData:any =null
  mounted () {
    this.getData()
  }
  getData () {
    viewStyles({
      per_page: this.pageSize,
      page: this.currentPage,
      q: this.keyword
    }).then((res:any) => {
      if (res) {
        if (res.code === 'SUCCESS') {
          this.viewStylesSucc(res)
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
  viewStylesSucc (res:any) {
    this.stylesData = res.data
    this.pageCount = res.pages
    this.tableHeight = (this.$refs.tableContainer as any).offsetHeight
  }
  sizeChange (val:any) {
    this.pageSize = val
    this.getData()
  }
  currentChange (val:any) {
    this.currentPage = val
    this.getData()
  }
  keywordSearch () {
    this.currentPage = 1
    this.getData()
  }
  allSearch () {
    this.currentPage = 1
    this.keyword = ''
    this.getData()
  }
  closeAddProductDialog () {
    this.AddProductVisible = false
    this.getData()
  }
  get addRolePermission () {
    return checkPermission('add_product')
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
</style>

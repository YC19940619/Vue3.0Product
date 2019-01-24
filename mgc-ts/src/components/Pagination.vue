<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    layout="sizes, prev, pager, next, jumper"
    background
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :current-page="currentPage"
    :page-count="pageCount">
  </el-pagination>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
@Component
export default class Pagination extends Vue {
  pageSizes:Array<any> = [10, 20, 30, 40]
  @Prop({ type: Number, default: 10 }) pageSize!:number
  @Prop({ type: Number, default: 1 }) currentPage!:number
  @Prop({ type: Number, default: 1 }) pageCount!:number
  @Emit('sizeChange')
  handleSizeChange (val:any) {
    return val
  }
  @Emit('currentChange')
  handleCurrentChange (val:any) {
    return val
  }
}
</script>

<style lang="stylus" scoped>
  .el-pagination
    margin: 20px auto;
</style>

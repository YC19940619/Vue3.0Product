<template>
  <el-dialog title="查看同步日志" width="900px" :visible.sync="ErpSyncVisible" :close-on-click-modal="false" :before-close="closeErpSyncDialog">
    <el-table
      class="table"
      height="500"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      :data="logData"
      :header-cell-style="headerStyle"
      v-loading="loading"
      :default-sort = "{prop: 'date', order: 'descending'}"
    >
      <el-table-column prop="AutoId" label="编号" sortable></el-table-column>
      <el-table-column prop="cInvCode" label="存货编码/rfid" sortable width="200px"></el-table-column>
      <el-table-column prop="cInvName" label="商品名称" width="200px" sortable></el-table-column>
      <el-table-column prop="iPrice" label="价格" sortable></el-table-column>
      <el-table-column prop="cEntStd" label="款式编号" sortable></el-table-column>
      <el-table-column
        prop="ret"
        label="插入结果"
        sortable
      >
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import { ViewErpSyncLog } from '@/assets/api/products'
@Component
export default class ErpSyncLog extends Vue {
  @Prop({ type: Boolean, default: false }) ErpSyncVisible!:boolean
  @Prop() sid!:any
  logData:any = null
  loading:boolean = false
  headerStyle:object = { // 表头样式
    background: '#eef1f6'
  }
  @Emit('closeErpSyncDialog')
  closeErpSyncDialog () {}
  tableRowClassName (res:any) {
    let row = res.row
    if (row.ret === '成功') {
      return 'success-row'
    } else if (row.ret === '失败') {
      return 'warning-row'
    } else if (row.ret === '已存在') {
      return 'warning-row'
    }
    return ''
  }
  getData () {
    if (this.sid) {
      this.loading = true
      ViewErpSyncLog(this.sid).then((res:any) => {
        if (res) {
          switch (res.code) {
            case 'SUCCESS':
              res.data.forEach((item:any) => {
                switch (item.ret) {
                  case 0:
                    item.ret = '失败'
                    break
                  case 1:
                    item.ret = '成功'
                    break
                  case 2:
                    item.ret = '已存在'
                    break
                }
              })
              this.logData = res.data
              break
            default:
              this.$message.error('查询失败')
          }
        }
        this.loading = false
      })
    }
  }
  @Watch('sid')
  sidChange (val: any, oldVal: any) {
    this.getData()
  }
}
</script>

<style lang="stylus" scoped>
  .el-table >>> .success-row
    background #f0f9eb
  .el-table >>> .warning-row
    background oldlace
</style>

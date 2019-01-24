<template>
  <div>
    <el-table
      class="table"
      :height="tableHeight"
      :data="stylesData"
      style="width: 100%"
      :header-cell-style="headerStyle"
      :default-sort = "{prop: 'date', order: 'descending'}"
    >
      <el-table-column prop="id" label="#" sortable width="80"></el-table-column>
      <el-table-column prop="startid" label="开始id" sortable></el-table-column>
      <el-table-column prop="lastid" label="结束id" sortable></el-table-column>
      <el-table-column prop="total" label="总数" sortable></el-table-column>
      <el-table-column prop="success" label="成功数" sortable></el-table-column>
      <el-table-column prop="fail" label="失败数" sortable></el-table-column>
      <el-table-column prop="create_time" width="200" label="创建时间" sortable></el-table-column>
      <el-table-column prop="wait_time" label="耗时" sortable>
        <template slot-scope="scope" >
          {{`${scope.row.wait_time}秒`}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope" >
          <el-button size="mini" type="primary" @click="viewLog(scope.row.id)">查看日志</el-button>
        </template>
      </el-table-column>
    </el-table>
    <erp-sync-log :ErpSyncVisible="ErpSyncVisible" @closeErpSyncDialog="ErpSyncVisible = false" :sid="sid"></erp-sync-log>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import ErpSyncLog from './ErpSyncLog.vue'
@Component({
  components: { ErpSyncLog }
})
export default class Table extends Vue {
  @Prop({ default: 500 }) tableHeight!:any
  @Prop({ default: {} }) stylesData!:any
  ErpSyncVisible:boolean = false
  sid:any = null
  headerStyle:object = { // 表头样式
    background: '#eef1f6'
  }
  styleInfo:object = {}
  mounted () {}
  viewLog (sid:any) {
    this.sid = sid
    this.ErpSyncVisible = true
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

</style>

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
      <el-table-column prop="id" fixed label="#" sortable width="80"></el-table-column>
      <el-table-column prop="name" fixed label="款式名称" width="180" sortable></el-table-column>
      <el-table-column prop="serial" fixed label="款式编号" width="120"  sortable></el-table-column>
      <el-table-column prop="series" label="所属系列" width="120" sortable></el-table-column>
      <el-table-column prop="star" label="明星" sortable></el-table-column>
      <el-table-column prop="theme" label="主题" sortable></el-table-column>
      <el-table-column prop="quarter" label="季度" sortable></el-table-column>
      <el-table-column prop="tag_price" label="价格" sortable></el-table-column>
      <el-table-column prop="cert_code" label="证书码" width="180" sortable></el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="180" sortable></el-table-column>
      <el-table-column prop="update_time" label="更新时间" width="180" sortable></el-table-column>
      <el-table-column label="操作" fixed="right" width="250" v-if="changePermission">
        <template slot-scope="scope" >
            <el-button size="mini" type="warning" @click="changeInfo(scope.$index, scope.row)">编辑信息</el-button>
          <el-button size="mini" type="warning" @click="BindStock(scope.$index, scope.row)">绑定存货编码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <change-info :changeInfoVisible="changeInfoVisible" @closeChangeInfo="closeChangeInfo" :styleInfo="styleInfo"></change-info>
    <bind-stock :BindStockVisible="BindStockVisible" :serial="serial" @closeBindStockDialog="closeBindStockDialog"></bind-stock>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { checkPermission } from '@/assets/scripts/common'
import ChangeInfo from './ChangeInfo.vue'
import BindStock from './BindStock.vue'
@Component({
  components: {
    ChangeInfo,
    BindStock
  }
})
export default class Table extends Vue {
  @Prop({ default: 500 }) tableHeight!:any
  @Prop({ default: {} }) stylesData!:any
  changeInfoVisible:boolean = false
  BindStockVisible:boolean = false
  serial = null
  headerStyle:object = { // 表头样式
    background: '#eef1f6'
  }
  styleInfo:object = {}
  mounted () {}
  get changePermission () { // 编辑权限
    return checkPermission('change_product')
  }
  changeInfo (index:any, row:any) {
    this.changeInfoVisible = true
    this.styleInfo = row
  }
  BindStock (index:any, row:any) {
    this.BindStockVisible = true
    this.serial = row.serial
  }
  closeBindStockDialog () {
    this.BindStockVisible = false
  }
  @Emit()
  closeChangeInfo () {
    this.changeInfoVisible = false
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

</style>

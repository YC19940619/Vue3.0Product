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
      <el-table-column prop="name" width="200px" label="款式名称" sortable></el-table-column>
      <el-table-column prop="serial" label="款式编号" sortable></el-table-column>
      <el-table-column prop="rfid" label="存货编号" sortable></el-table-column>
      <el-table-column prop="is_buy" label="是否售出" sortable></el-table-column>
      <el-table-column prop="is_active" label="是否霸屏" sortable></el-table-column>
      <el-table-column prop="create_time" label="创建时间" sortable></el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope" v-if="changeProductPermission">
        <el-button size="mini" type="warning" @click="changeStock(scope.$index, scope.row)">编辑</el-button>
      </template>
      </el-table-column>
    </el-table>
    <change-stock :ChangeStockVisible="ChangeStockVisible" :rid="rid" :stockInfo="stockInfo" @closeChangeStockDialog="closeChangeStockDialog"></change-stock>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { checkPermission } from '@/assets/scripts/common'
import ChangeStock from './ChangeStock.vue'
@Component({
  components: {
    ChangeStock
  }
})
export default class Table extends Vue {
  @Prop({ default: 500 }) tableHeight!:any
  @Prop({ default: {} }) stylesData!:any
  ChangeStockVisible = false
  headerStyle:object = { // 表头样式
    background: '#eef1f6'
  }
  stockInfo:object = {}
  rid = null
  mounted () {}
  changeStock (index:any, row:any) {
    this.stockInfo = row
    this.rid = row.id
    this.ChangeStockVisible = true
  }
  @Emit('close-change-info')
  closeChangeStockDialog () {
    this.ChangeStockVisible = false
  }
  get changeProductPermission () {
    return checkPermission('change_product')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

</style>

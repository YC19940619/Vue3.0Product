<template>
  <div>
    <el-table
      class="table"
      :height="tableHeight"
      :data="storesData"
      style="width: 100%"
      :header-cell-style="headerStyle"
      :default-sort = "{prop: 'date', order: 'descending'}"
    >
      <el-table-column
        prop="serial"
        border
        label="门店编号"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="门店名称"
        sortable
        width="240">`
      </el-table-column>
      <el-table-column
        label="门店logo"
        sortable
        width="120">
        <template slot-scope="scope" >
          <img style="display:block;width: 30px;" :src="logo(scope.row.logo)">
        </template>
      </el-table-column>
      <el-table-column
        prop="owner_name"
        label="所有者姓名"
        sortable
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="owner_phone"
        label="所有者手机号"
        sortable
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="addr"
        label="门店地址"
        sortable
        width="300"
      >
      </el-table-column>
      <el-table-column
        prop="is_active"
        label="店铺状态"
        min-width="100"
        sortable>
        <template slot-scope="scope" >
          <template v-if="scope.row.is_active">正常</template>
          <template v-else>禁用</template>
        </template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        sortable
        width="180">
      </el-table-column>
      <!--<el-table-column label="操作" width="400">-->
        <!--<template slot-scope="scope" >-->
          <!--<template v-if="scope.row.sys_create === '可编辑'">-->
            <!--<el-button size="mini" type="primary" v-if="viewRolePermission" @click="handleRole(scope.$index, scope.row, 'viewPermission')">查看权限</el-button>-->
            <!--<el-button size="mini" type="warning" v-if="changeRolePermission" @click="handleRole(scope.$index, scope.row, 'changePermission')">修改权限</el-button>-->
            <!--<el-button size="mini" type="warning" v-if="changeRolePermission" @click="handleRole(scope.$index, scope.row, 'changeInfo')">编辑信息</el-button>-->
            <!--<el-button size="mini" type="danger" v-if="deleteRolePermission" @click="handleDeleteRole(scope.$index, scope.row)">删除角色</el-button>-->
          <!--</template>-->
          <!--<template v-else>-->
            <!--<el-button size="mini" type="primary" v-if="viewRolePermission" @click="handleRole(scope.$index, scope.row, 'viewPermission')">查看权限</el-button>-->
          <!--</template>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { checkPermission, dataimgsrc } from '../../../assets/scripts/common'
@Component({
  components: {}
})
export default class Table extends Vue {
  @Prop({ default: 500 }) tableHeight!:any
  @Prop({ default: {} }) storesData!:any
  headerStyle:object = { // 表头样式
    background: '#eef1f6'
  }
  mounted () {}
  // get deleteRolePermission () {
  //   return checkPermission('delete_role')
  // }
  // get changeRolePermission () {
  //   return checkPermission('change_role')
  // }
  // get viewRolePermission () {
  //   return checkPermission('view_role')
  // }
  logo (src:any) {
    return dataimgsrc(src)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

</style>

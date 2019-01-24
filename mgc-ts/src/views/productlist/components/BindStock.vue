<template>
  <el-dialog title="绑定产品" append-to-body :visible.sync="BindStockVisible" width="400px" :close-on-click-modal="false" :before-close="closeBindStockDialog">
    <el-form size="mini" :model="stockInfo" status-icon :rules="stockRules" ref="stockInfo" label-width="100px" class="user-info" >
      <el-form-item label="存货编号" prop="rfid">
        <el-input type="text" v-model="stockInfo.rfid" placeholder="请输入款式名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="价格/元" prop="price" required>
        <el-input type="number" v-model="stockInfo.price" placeholder="请输入价格"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('stockInfo')">绑定产品</el-button>
        <el-button @click="resetForm('stockInfo')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { AddRfid } from '@/assets/api/products'
@Component
export default class AddProduct extends Vue {
  @Prop({ default: false }) BindStockVisible!:boolean
  @Prop({ default: '' }) serial!:any
  stockInfo:object = {
    rfid: '',
    price: 0
  }
  stockRules:object = { // 表单校验规则
    rfid: [
      { required: true, validator: this.checkRfid, trigger: 'blur' }
    ],
    price: [
      { required: true, validator: this.checkPrice, trigger: 'blur' }
    ]
  }
  checkPrice (rule:any, value:any, callback:any) {
    if (value === '') {
      callback(new Error('请输入价格'))
    } else if (value < 0) {
      callback(new Error('价格不能为负数'))
    } else {
      callback()
    }
  }
  checkRfid (rule:any, value:any, callback:any) {
    const reg = /^[0-9A-Za-z]+$/
    if (value === '') {
      callback(new Error('请输入存货编号'))
    } else if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入由英文或数字组成的存货编号'))
    }
  }
  submitForm (formName:any) { // 提交表单
    (this.$refs[formName] as any).validate((valid:any) => {
      if (valid) { // 校验成功
        this.bindStock()
      } else { // 校验失败
        return false
      }
    })
  }
  resetForm (formName:any) { // 重置表单
    (this.$refs[formName] as any).resetFields()
  }
  bindStock () {
    console.log(this.stockInfo)
    console.log(this.serial)
    AddRfid({ ...this.stockInfo, style_serial: this.serial }).then((res:any) => {
      if (res) {
        switch (res.code) {
          case 'SUCCESS':
            this.$message.success('添加成功')
            this.closeBindStockDialog()
            break
          case 'commodity.DUPLICATE_RFID':
            this.$message.error('存货编号已存在')
            break
          default:
            this.$message.error('绑定失败')
        }
      }
    })
  }
  @Emit('closeBindStockDialog')
  closeBindStockDialog () { // 关闭模态框
    this.resetForm('stockInfo') // 每次关闭重置信息
  }
}
</script>

<style lang="stylus" scoped>
  .user-info
    width:300px
    margin:0 auto
  .inner-dialog >>> .el-dialog__body
    overflow hidden
  .create-role
    margin-top:20px
    float: right
  .el-radio
    width: 40%
    display inline-block
    margin:5px 10px!important
</style>

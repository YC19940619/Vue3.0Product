<template>
  <el-dialog title="修改产品" append-to-body :visible.sync="ChangeStockVisible" width="600px" :close-on-click-modal="false" :before-close="closeChangeStockDialog">
    <el-form size="mini" :model="stockInfo" status-icon :rules="stockRules" ref="stockInfo" label-width="100px" class="user-info" >
      <el-form-item label="款式编号" prop="serial">
        <el-input type="text" v-model="stockInfo.serial" placeholder="请输入款式编号" clearable></el-input>
      </el-form-item>
      <el-form-item label="存货编号" prop="rfid">
        <el-input type="text" v-model="stockInfo.rfid" placeholder="请输入款式名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="价格/元" prop="price" required>
        <el-input type="number" v-model="stockInfo.price" placeholder="请输入价格"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('stockInfo')">提交</el-button>
        <el-button @click="resetForm('stockInfo')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { ChnageRfid } from '@/assets/api/products'
@Component
export default class AddProduct extends Vue {
  @Prop({ default: false }) ChangeStockVisible!:boolean
  @Prop({ default: {
    serial: '',
    rfid: '',
    price: 0
  } }) stockInfo!:any
  @Prop() rid!:any
  stockRules:object = { // 表单校验规则
    serial: [
      { required: true, validator: this.checkSerial, trigger: 'blur' }
    ],
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
  checkSerial (rule:any, value:any, callback:any) {
    const reg = /^[0-9A-Za-z]+$/
    if (value === '') {
      callback(new Error('请输入款式编号'))
    } else if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入由英文或数字组成的款式编号'))
    }
  }
  submitForm (formName:any) { // 提交表单
    (this.$refs[formName] as any).validate((valid:any) => {
      if (valid) { // 校验成功
        this.changeStock()
      } else { // 校验失败
        return false
      }
    })
  }
  resetForm (formName:any) { // 重置表单
    (this.$refs[formName] as any).resetFields()
  }
  changeStock () {
    console.log(this.stockInfo)
    ChnageRfid(this.rid, {
      style_serial: this.stockInfo.serial,
      rfid: this.stockInfo.rfid,
      price: this.stockInfo.price
    }).then((res:any) => {
      if (res) {
        switch (res.code) {
          case 'SUCCESS':
            this.$message.success('修改成功')
            this.closeChangeStockDialog()
            break
          case 'commodity.STYLE_NOT_EXIST':
            this.$message.error('款号不存在')
            break
          case 'commodity.DUPLICATE_RFID':
            this.$message.error('存货编号已存在')
            break
          default:
            this.$message.error('修改失败')
        }
      }
    })
  }
  @Emit('closeChangeStockDialog')
  closeChangeStockDialog () { // 关闭模态框
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

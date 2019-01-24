<template>
  <el-dialog title="新增商品款式" :visible.sync="AddProductVisible" width="600px" :close-on-click-modal="false" :before-close="closeAddProductDialog">
    <el-form size="mini" :model="productInfo" status-icon :rules="productRules" ref="productInfo" label-width="100px" class="user-info" >
      <el-form-item label="款式名称" prop="name">
        <el-input type="text" v-model="productInfo.name" placeholder="请输入款式名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="款式编号" prop="serial" required>
        <el-input type="text" v-model="productInfo.serial" placeholder="请输入款式编号" clearable></el-input>
      </el-form-item>
      <el-form-item label="价格/元" prop="tag_price" required>
        <el-input type="number" v-model="productInfo.tag_price" placeholder="请输入价格"></el-input>
      </el-form-item>
      <el-form-item label="证书码" prop="cert_code">
        <el-input v-model.number="productInfo.cert_code" placeholder="请输入证书码" clearable></el-input>
      </el-form-item>
      <el-form-item label="主题" prop="theme">
        <el-input v-model.number="productInfo.theme" placeholder="请输入主体" clearable></el-input>
      </el-form-item>
      <el-form-item label="系列" prop="series">
        <el-input v-model.number="productInfo.series" placeholder="请输入系列" clearable></el-input>
      </el-form-item>
      <el-form-item label="明星" prop="star">
        <el-input v-model.number="productInfo.star" placeholder="请输入明星" clearable></el-input>
      </el-form-item>
      <el-form-item label="季度" prop="quarter">
        <el-input v-model.number="productInfo.quarter" placeholder="请输入季度" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('productInfo')">提交信息</el-button>
        <el-button @click="resetForm('productInfo')">重置</el-button>
      </el-form-item>
    </el-form>
    <bind-stock :serial="productInfo.serial" :BindStockVisible="BindStockVisible" @closeBindStockDialog="closeBindStockDialog"></bind-stock>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { addStyle } from '@/assets/api/products'
import BindStock from './BindStock.vue'
@Component({
  components: {
    BindStock
  }
})
export default class AddProduct extends Vue {
  @Prop({ default: false }) AddProductVisible!:boolean
  BindStockVisible = false
  productInfo:object = {
    name: '',
    serial: '',
    tag_price: 0,
    cert_code: '',
    theme: '',
    series: '',
    star: '',
    quarter: ''
  }
  productRules:object = { // 表单校验规则
    name: [
      { required: true, message: '请输入款式名称', trigger: 'blur' }
    ],
    serial: [
      { required: true, validator: this.checkSerial, trigger: 'blur' }
    ],
    tag_price: [
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
        this.createProduct()
      } else { // 校验失败
        return false
      }
    })
  }
  resetForm (formName:any) { // 重置表单
    (this.$refs[formName] as any).resetFields()
  }
  createProduct () {
    addStyle({ ...this.productInfo }).then((res:any) => {
      if (res) {
        switch (res.code) {
          case 'SUCCESS':
            this.$message.success('添加款式成功')
            this.BindStockVisible = true // 绑定存货
            break
          case 'commodity.DUPLICATE_SERIAL':
            this.$message.error('款式已存在')
            break
          default:
            this.$message.error('添加失败')
        }
      }
    })
  }
  @Emit('closeAddProductDialog')
  closeAddProductDialog () { // 关闭模态框
    this.resetForm('productInfo') // 每次关闭重置信息
  }
  closeBindStockDialog () { // 关闭绑定模态框
    this.BindStockVisible = false
    this.closeAddProductDialog()
  }
}
</script>

<style lang="stylus" scoped>
  .user-info
    width:400px
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

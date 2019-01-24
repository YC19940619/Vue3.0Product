<template>
  <el-dialog title="修改款式信息" :visible.sync="changeInfoVisible" width="600px" :close-on-click-modal="false" :before-close="closeChangeInfo">
    <el-form size="mini" :model="styleInfo" status-icon :rules="styleRules" ref="styleInfo" label-width="100px" class="style-info" >
      <el-form-item label="款式名称" prop="name" required>
        <el-input type="text" v-model="styleInfo.name" placeholder="请输入款式名称"></el-input>
      </el-form-item>
      <el-form-item label="款式编号" prop="serial" required>
        <el-input type="text" v-model="styleInfo.serial" placeholder="请输入款式编号"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="tag_price" required>
        <el-input type="number" v-model="styleInfo.tag_price" placeholder="请输入款式价格"></el-input>
      </el-form-item>
      <el-form-item label="证书码" prop="cert_code">
        <el-input type="number" v-model="styleInfo.cert_code" placeholder="请输入款式证书码"></el-input>
      </el-form-item>
      <el-form-item label="所属系列" prop="series" >
        <el-input type="text" v-model="styleInfo.series" placeholder="请输入所属系列"></el-input>
      </el-form-item>
      <el-form-item label="代表明星" prop="star" >
        <el-input type="text" v-model="styleInfo.star" placeholder="请输入代表明星"></el-input>
      </el-form-item>
      <el-form-item label="季度" prop="quarter" >
        <el-input type="text" v-model="styleInfo.quarter" placeholder="请输入季度"></el-input>
      </el-form-item>
      <el-form-item label="主题" prop="theme" >
        <el-input type="text" v-model="styleInfo.theme" placeholder="请输入主题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('styleInfo')">提交信息</el-button>
        <el-button @click="resetForm('styleInfo')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { changeStyle } from '@/assets/api/products'
@Component
export default class ChangeInfo extends Vue {
  @Prop({ default: false }) changeInfoVisible!:boolean
  @Prop() styleInfo!:any
  styleRules:object = { // 表单校验规则
    name: [
      { validator: this.checkName, trigger: 'blur' }
    ],
    serial: [
      { validator: this.checkSerial, trigger: 'blur' }
    ],
    tag_price: [
      { validator: this.checkPrice, trigger: 'blur' }
    ]
  }
  @Emit('closeChangeInfo')
  closeChangeInfo () { // 关闭模态框
    this.resetForm('styleInfo') // 每次关闭重置信息
  }
  checkName (rule:any, value:any, callback:any) {
    if (value === '') {
      callback(new Error('请输入款式名称'))
    } else {
      callback()
    }
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
    if (value === '') {
      callback(new Error('请输入款式编号'))
    } else {
      callback()
    }
  }
  submitForm (formName:any) { // 提交表单
    (this.$refs[formName] as any).validate((valid:any) => {
      console.log(valid)
      if (valid) { // 校验成功
        changeStyle(this.styleInfo.id, { ...this.styleInfo }).then((res:any) => {
          if (res) {
            switch (res.code) {
              case 'SUCCESS':
                this.$message.success('信息修改成功')
                break
              default:
                this.$message.error('信息修改失败')
            }
            this.closeChangeInfo()
          }
        })
      } else { // 校验失败
        return false
      }
    })
  }
  resetForm (formName:any) { // 重置表单
    (this.$refs[formName] as any).resetFields()
  }
}
</script>

<style lang="stylus" scoped>
  .style-info
    width:400px
    margin:0 auto
</style>

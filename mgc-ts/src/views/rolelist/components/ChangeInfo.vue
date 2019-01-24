<template>
  <el-dialog title="修改信息" :visible.sync="changeInfoVisible" width="600px" :close-on-click-modal="false" :before-close="closeChangeInfo">
    <el-form size="mini" :model="roleInfo" status-icon :rules="roleRules" ref="roleInfo" label-width="100px" class="role-info" >
      <el-form-item label="角色名称" prop="name" required>
        <el-input type="text" v-model="roleInfo.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="编码" prop="codename" required>
        <el-input type="text" v-model="roleInfo.codename" placeholder="请输入编码"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="description" required>
        <el-input v-model.number="roleInfo.description" placeholder="请输入角色描述"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('roleInfo')">提交信息</el-button>
        <el-button @click="resetForm('roleInfo')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { changeRoleInfo } from '@/assets/api/roles'
@Component
export default class ChangeInfo extends Vue {
  @Prop({ default: false }) changeInfoVisible!:boolean
  @Prop() rid!:any
  @Prop({ default: {
    name: '',
    codename: '',
    description: ''
  } }) roleInfo!:object
  roleRules:object = { // 表单校验规则
    name: [
      { validator: this.checkName, trigger: 'blur' }
    ],
    codename: [
      { validator: this.checkCodename, trigger: 'blur' }
    ],
    description: [
      { validator: this.checkDescription, trigger: 'blur' }
    ]
  }
  @Emit('closeChangeInfo')
  closeChangeInfo () { // 关闭模态框
    this.resetForm('roleInfo') // 每次关闭重置信息
    return false
  }
  @Emit('changeRoleInfo')
  changeRoleInfo () { // 关闭模态框
    this.resetForm('roleInfo') // 每次关闭重置信息
  }
  checkName (rule:any, value:any, callback:any) {
    const reg = /^[\u0391-\uFFE5A-Za-z]+$/
    if (value === '') {
      callback(new Error('请输入姓名'))
    } else if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入由汉字和英文组成的姓名'))
    }
  }
  checkCodename (rule:any, value:any, callback:any) {
    const reg = /^[a-z_]+$/
    if (value === '') {
      callback(new Error('请输入编码'))
    } else if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入由小写英文和下划线组成的编码'))
    }
  }
  checkDescription (rule:any, value:any, callback:any) {
    if (value === '') {
      callback(new Error('请输入角色描述'))
    } else {
      callback()
    }
  }
  submitForm (formName:any) { // 提交表单
    (this.$refs[formName] as any).validate((valid:any) => {
      if (valid) { // 校验成功
        console.log(this.roleInfo)
        changeRoleInfo(this.rid, { ...this.roleInfo }).then((res:any) => {
          if (res) {
            switch (res.code) {
              case 'SUCCESS':
                this.$message.success('信息修改成功')
                break
              default:
                this.$message.error('信息修改失败')
            }
            this.changeRoleInfo()
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
  .role-info
    width:400px
    margin:0 auto
  .inner-dialog >>> .el-dialog__body
    overflow hidden
  .create-role
    margin-top:20px
    float: right
</style>

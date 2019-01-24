<template>
  <el-dialog title="重置密码" :visible.sync="passwordVisible" width="600px" :close-on-click-modal="false" :before-close="closePasswordDialog">
    <el-form size="mini" :model="password" status-icon :rules="passwordRules" ref="password" label-width="100px" class="user-info" >
      <el-form-item label="新密码" prop="first_password" required>
        <el-input type="password" v-model="password.first_password" placeholder="请输入新密码" clearable></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="second_password" required>
        <el-input type="password" v-model="password.second_password" placeholder="请输入再次输入新密码" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('password')">提交信息</el-button>
        <el-button @click="resetForm('password')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { ChangePasswordFnc } from '@/assets/api/users'
@Component
export default class ChangePassword extends Vue {
  @Prop({ default: false }) passwordVisible!:boolean
  @Prop() userInfo!:any
  password:object = {
    first_password: '',
    second_password: ''
  }
  passwordRules:object = { // 表单校验规则
    first_password: [
      { validator: this.checkPassword, trigger: 'blur' }
    ],
    second_password: [
      { validator: this.checkPassword, trigger: 'blur' }
    ]
  }
  checkPassword (rule:any, value:any, callback:any) {
    if (value.length < 6 || value.length > 20) {
      callback(new Error('请输入6-20位密码'))
    } else {
      callback()
    }
  }
  submitForm (formName:any) { // 提交表单
    (this.$refs[formName] as any).validate((valid:any) => {
      if (valid) { // 校验成功
        this.changePassword()
      } else { // 校验失败
        return false
      }
    })
  }
  resetForm (formName:any) { // 重置表单
    (this.$refs[formName] as any).resetFields()
  }
  changePassword () {
    ChangePasswordFnc(this.userInfo.id, { ...this.password }).then((res:any) => {
      if (res) {
        switch (res.code) {
          case 'SUCCESS':
            this.$message.success('修改成功')
            this.closePasswordDialog()
            break
          case 'user.TWOPASSWORDS_NOT_MATCH':
            this.$message.error('两次密码不匹配')
            break
          case 'user.INVALID_PASSWORD':
            this.$message.error('密码不合法')
            break
          default:
            this.$message.error('重置失败')
        }
      }
    })
  }
  @Emit('closePasswordDialog')
  closePasswordDialog () { // 关闭模态框
    this.resetForm('password') // 每次关闭重置信息
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

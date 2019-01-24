<template>
  <el-dialog title="新增角色" :visible.sync="UserInfoVisible" width="600px" :close-on-click-modal="false" :before-close="closeUserInfoDialog">
    <el-form size="mini" :model="userInfo" status-icon :rules="userRules" ref="userInfo" label-width="100px" class="user-info" >
      <el-form-item label="登录名" prop="account" required>
        <el-input type="text" v-model="userInfo.account" placeholder="请输入姓名" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password" required>
        <el-input type="password" v-model="userInfo.password" placeholder="请输入密码" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname" required>
        <el-input v-model="userInfo.nickname" placeholder="请输入昵称" clearable></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone_num">
        <el-input v-model.number="userInfo.phone_num" placeholder="请输入手机号" clearable></el-input>
      </el-form-item>
      <el-form-item label="选择角色" prop="role_id" required>
        <el-radio-group v-model="userInfo.role_id">
          <el-radio class="role-radio" :key="item.id" :label="item.id" v-for="item in roles">{{item.name}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userInfo')">提交信息</el-button>
        <el-button @click="resetForm('userInfo')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { viewRoles } from '@/assets/api/roles'
import { AddUserFunc } from '@/assets/api/users'
@Component
export default class UserInfo extends Vue {
  @Prop({ default: false }) UserInfoVisible!:boolean
  roles:Array<any> = []
  userInfo:object = {
    account: '',
    password: '',
    nickname: '',
    phone_num: '',
    role_id: ''
  }
  userRules:object = { // 表单校验规则
    account: [
      { validator: this.checkAccount, trigger: 'blur' }
    ],
    password: [
      { validator: this.checkPassword, trigger: 'blur' }
    ],
    nickname: [
      { validator: this.checkNickname, trigger: 'blur' }
    ],
    phone_num: [
      { validator: this.phoneNum, trigger: 'blur' }
    ],
    role_id: [
      { required: true, message: '请选择一个角色', trigger: 'change' }
    ]
  }
  mounted () {
    this.getRoles()
  }
  checkAccount (rule:any, value:any, callback:any) {
    if (value.length < 4 || value.length > 20) {
      callback(new Error('请输入4-20位账号'))
    } else {
      callback()
    }
  }
  checkPassword (rule:any, value:any, callback:any) {
    if (value.length < 6 || value.length > 20) {
      callback(new Error('请输入6-20位密码'))
    } else {
      callback()
    }
  }
  checkNickname (rule:any, value:any, callback:any) {
    const reg = /^[\u0391-\uFFE5A-Za-z]+$/
    if (value === '') {
      callback(new Error('请输入昵称'))
    } else if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入由汉字和英文组成的姓名'))
    }
  }
  phoneNum (rule:any, value:any, callback:any) {
    const reg = /^1[34578]\d{9}$/ // 手机号正则
    if (reg.test(value) || value === '') {
      callback()
    } else if (!reg.test(value)) {
      callback(new Error('请输入合法的手机号'))
    } else {
      callback()
    }
  }
  submitForm (formName:any) { // 提交表单
    (this.$refs[formName] as any).validate((valid:any) => {
      if (valid) { // 校验成功
        this.createUser()
      } else { // 校验失败
        return false
      }
    })
  }
  resetForm (formName:any) { // 重置表单
    (this.$refs[formName] as any).resetFields()
  }
  createUser () {
    AddUserFunc({ ...this.userInfo }).then((res:any) => {
      if (res) {
        switch (res.code) {
          case 'SUCCESS':
            this.$message.success('添加成功')
            this.closeUserInfoDialog()
            break
          case 'user.ACCOUNT_EXIST':
            this.$message.error('账户已存在')
            break
          case 'user.PHONENUM_EXIST':
            this.$message.error('手机号已存在')
            break
          default:
            this.$message.error('添加失败')
        }
      }
    })
  }
  @Emit('closeUserInfoDialog')
  closeUserInfoDialog () { // 关闭模态框
    this.resetForm('userInfo') // 每次关闭重置信息
  }
  getRoles () {
    viewRoles({
      per_page: 50,
      page: 1,
      keyword: ''
    }).then((res:any) => {
      if (res) {
        if (res.code === 'SUCCESS') {
          this.roles = res.data
        }
      }
    })
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

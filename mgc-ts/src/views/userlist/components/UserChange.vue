<template>
  <el-dialog title="修改角色信息" :visible.sync="ChangeUserInfoVisible" width="600px" :close-on-click-modal="false" :before-close="closeChangeUserInfoDialog">
    <el-form v-if="userInfo" size="mini" :model="userInfo" status-icon :rules="userRules" ref="userInfo" label-width="100px" class="user-info" >
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
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import { viewRoles } from '@/assets/api/roles'
import { ChangeUser } from '@/assets/api/users'
@Component
export default class UserChange extends Vue {
  @Prop({ default: false }) ChangeUserInfoVisible!:boolean
  @Prop({ default: {
    nickname: '',
    phone_num: '',
    role_id: ''
  } }) userInfo!:any
  roles:Array<any> = []
  userRules:object = { // 表单校验规则
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
        this.changeUser()
      } else { // 校验失败
        return false
      }
    })
  }
  resetForm (formName:any) { // 重置表单
    (this.$refs[formName] as any).resetFields()
  }
  changeUser () {
    ChangeUser(this.userInfo.id, { ...this.userInfo }).then((res:any) => {
      if (res) {
        switch (res.code) {
          case 'SUCCESS':
            this.$message.success('修改成功')
            this.closeChangeUserInfoDialog()
            break
          case 'user.ACCOUNT_EXIST':
            this.$message.error('账户已存在')
            break
          case 'user.PHONENUM_EXIST':
            this.$message.error('手机号已存在')
            break
          default:
            this.$message.error('修改失败')
        }
      }
    })
  }
  @Emit('closeChangeUserInfoDialog')
  closeChangeUserInfoDialog () { // 关闭模态框
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
  @Watch('userInfo')
  changeRoleID () {
    this.roles.forEach((item:any) => {
      switch (item.name) {
        case this.userInfo.role__name:
          this.userInfo['role_id'] = item.id
          break
      }
    })
    console.log(this.userInfo)
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

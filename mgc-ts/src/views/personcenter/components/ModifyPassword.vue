<template>
  <div class="box">
    <div class="info">
      <div class="left">旧密码：</div>
      <div class="right"><el-input type="password" v-model="oldPassword"  placeholder="请输入旧密码"></el-input></div>
    </div>
    <div class="info">
      <div class="left">新密码：</div>
      <div class="right"><el-input type="password" v-model="newPassword"  placeholder="请输入新密码"></el-input></div>
    </div>
    <div class="info">
      <div class="left">确认密码：</div>
      <div class="right"><el-input type="password" v-model="confirmNewPassword"  placeholder="再次输入新密码"></el-input></div>
    </div>
    <el-row class="btnarr">
      <el-button type="warning" @click="reset">清空</el-button>
      <el-button type="primary" @click="modify">确认修改</el-button>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { modifyPassword } from '@/assets/api/user'
import { State } from 'vuex-class'
@Component
export default class ModifyPassword extends Vue {
  oldPassword:string = ''
  newPassword:string = ''
  confirmNewPassword:string = ''
  reset () {
    this.oldPassword = ''
    this.newPassword = ''
    this.confirmNewPassword = ''
  }
  modify () {
    if (this.oldPassword.length <= 0) {
      this.$message.error('请输入旧密码')
    } else if (this.newPassword.length < 6 || this.newPassword.length > 20) {
      this.$message.error('请输入6-20位新密码')
    } else if (this.newPassword !== this.confirmNewPassword) {
      this.$message.error('两次密码不一致')
    } else {
      modifyPassword(`${this.oldPassword},${this.newPassword},${this.confirmNewPassword}`).then(res => {
        switch (res.code) {
          case 'SUCCESS':
            this.$message.success('修改成功')
            break
          case 'user.OLDPASSWORD_INCORRECT':
            this.$message.error('原密码不正确')
            break
          case 'user.TWOPASSWORDS_NOT_MATCH':
            this.$message.error('两次密码不一致')
            break
          case 'user.PASSWORD_FORMAT_ERROR':
            this.$message.error('请输入6-20位密码')
            break
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .box
    padding 20px
    box-sizing border-box
    .btnarr
      margin-top: 50px
      width: 300px
      display flex
      justify-content space-between
    .info
      width: 100%
      height: 45px
      line-height 45px
      overflow hidden
      margin-bottom:10px
      .left
        float: left
        width: 100px
        font-size 16px
        text-align right
      .right
        float left
        font-size 16px
</style>

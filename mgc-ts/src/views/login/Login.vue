<template>
  <div class="login-mask">
    <div class="login">
      <div class="login-title">梦工场管理平台</div>
      <div class="login-content">
        <el-input placeholder="请输入账号" v-model="account" class="login-int" @keydown.enter.native="handleLogin">
          <template slot="prepend"><span class="iconfont">&#xe61c;</span></template>
        </el-input>
        <el-input type="password" placeholder="请输入密码" v-model="password" class="login-int" @keydown.enter.native="handleLogin">
          <template slot="prepend"><span class="iconfont">&#xe64c;</span></template>
        </el-input>
        <el-button type="primary" class="login-btn" @click="handleLogin">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { signIn } from '@/assets/api/login'
import { getUserInfo } from '@/assets/api/user'
import { State, Mutation } from 'vuex-class'
import { dataimgsrc } from '@/assets/scripts/common'
@Component({
  props: [],
  components: {}
})
export default class Login extends Vue {
  @State token!:object
  @Mutation changeToken!:Function
  @Mutation changeUserInfo!:Function
  account: string = ''
  password: string = ''
  mounted () {}
  handleLogin () {
    if (!this.account || !this.password) {
      this.$message.warning('请输入账号或密码')
    } else {
      signIn(this.account, this.password).then(res => {
        switch (res.code) {
          case 'SUCCESS':
            res.message = '登录成功'
            res.type = 'success'
            this.handleLoginSucc(res.data)
            break
          case 'user.INVALID_ACCOUNT' :
            res.message = '账号输入错误'
            res.type = 'warning'
            break
          case 'user.PASSWORD_NOT_MATCH' :
            res.message = '密码输入错误'
            res.type = 'warning'
            break
          case 'user.SYS_REFUSED' :
            res.message = '该用户不允许登录此系统！'
            res.type = 'warning'
            break
          default :
            res.message = '登录失败'
            res.type = 'error'
        }
        this.$message({
          message: res.message,
          type: res.type
        })
      })
    }
  }
  handleLoginSucc (res:any) {
    this.changeToken(res)
    getUserInfo().then(res => {
      if (res) {
        res.data.head_image = dataimgsrc(res.data.head_image)
        this.changeUserInfo(res.data)
        this.$router.push('/')
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
  .login-mask
    height 100%
    background url("~assets/images/loginBJ.jpg") no-repeat center center
    background-size cover
    .login
      position: absolute;
      left: 50%;
      top: 50%;
      width: 350px;
      margin: -190px 0 0 -175px;
      border-radius: 5px;
      background: rgba(0,0,0,.3);
      overflow: hidden;
      .login-title
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
      .login-content
        width: 100%
        height: 100%
        box-sizing border-box
        padding:30px 30px
        .login-btn
          width: 100%
          margin:0 auto
          display block
          font-size 12px
        .login-int
          margin-bottom:30px
        .login-int >>> .el-input-group__prepend
          padding: 0 12px
        .login-int >>> .el-input__inner
          font-size 12px
</style>

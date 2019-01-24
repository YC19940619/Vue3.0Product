<template>
    <div class="header-container">
      <div class="iconfont" :class="{active:headerCollapse}" @click="changeCollapse">&#xe604;</div>
      <el-dropdown class="person" @command="handleCommand">
        <div class="person-info el-dropdown-link">
          <img :src="this.userInfo.head_image"><i class="el-icon-caret-bottom el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="个人中心">个人中心</el-dropdown-item>
          <el-dropdown-item command="退出登录">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import { logOut } from '@/assets/api/login'
@Component
export default class Header extends Vue {
  @Prop({ type: Boolean, default: false }) isCollapse!:boolean
  @State userInfo!:object
  @Mutation changeToken!:Function
  headerCollapse = this.isCollapse
  mounted () {
    console.log(this.$route.matched)
  }
  @Emit()
  changeCollapse () {
    this.headerCollapse = !this.headerCollapse
    return this.headerCollapse
  }
  handleCommand (command:string) {
    switch (command) {
      case '个人中心':
        this.$router.push('/personcenter/personinfo')
        break
      case '退出登录':
        this['$confirm']('退出登录后无法保存当前页面信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          logOut()
        })
        break
    }
  }
}
</script>

<style lang="stylus" scoped>
.header-container
  height: 60px
  .iconfont
    height: 60px
    line-height: 60px
    text-align center
    color: #000
    font-size 22px
    transition all .3s
    float: left
  .iconfont.active
    transform rotate(-90deg)
  .person
    float:right
    height:60px
    .person-info
      height:60px
      img
        width:40px
        height:40px
        margin:10px auto
        cursor: pointer;
        border-radius: 10px;
</style>

<template>
  <div>
    <!--<div class="logoName">-->
      <!--<img v-if="isCollapse" src="@/assets/images/logo.png">-->
      <!--<template v-else>梦工场后台管理</template>-->
    <!--</div>-->
    <el-menu
      :default-active="this.$route.path"
      :unique-opened="true"
      :router="true"
      class="nav"
      background-color="#242F42"
      text-color="#fff"
      :collapse="isCollapse"
    >
      <el-menu-item index="/home">
          <i class="iconfont">&#xe667;</i>
          <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu :key="item.name" v-for="item in checkSildes" :index="item.path">
        <template slot="title">
          <i class="iconfont" v-if="item.meta.icon" v-html="item.meta.icon"></i>
          <span slot="title">{{item.meta.name}}</span>
        </template>
        <el-menu-item :key="itemChild.name" v-for="itemChild in item.children" :index="item.path +'/'+ itemChild.path">{{itemChild.meta.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { checkPermission } from '@/assets/scripts/common'
import routes from '@/router/route'
@Component
export default class Aside extends Vue {
  @Prop({ type: Boolean, default: false }) isCollapse!:boolean
  slides = routes
  get checkSildes ():any {
    let slides:any = []
    this.slides.forEach((item:any) => {
      if (!item.meta.hidden && checkPermission(item.meta.permission)) { // 显示导航
        let itemchildren:any = []
        item.children.forEach((itemchild:any) => {
          if (!itemchild.meta.hidden && checkPermission(itemchild.meta.permission)) {
            itemchildren.push(itemchild)
          }
        })
        item.children = itemchildren
        if (item.children.length > 0) {
          slides.push(item)
        }
      }
    })
    return slides
  }
  mounted () {
    // console.log(this.$route.path)
  }
}
</script>

<style lang="stylus" scoped>
  .logoName
    width:100%
    text-align center
    height:80px
    line-height:80px
    color: #fff
    font-size 18px
    background: #242F42;
    img
      height:40px
      width:40px
      margin:20px auto
  .iconfont
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
  .el-menu--collapse
    width:80px
  .nav:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

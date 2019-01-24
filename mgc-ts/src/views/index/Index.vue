<template>
  <el-container class="container">
    <el-aside style="width: auto;background: #242F42">
      <Aside :isCollapse="isCollapse"></Aside>
    </el-aside>
    <el-container>
      <el-header><Header :isCollapse="isCollapse" @change-collapse="changeCollapse"></Header></el-header>
      <el-main>
        <!--<bread-crumb></bread-crumb>-->
        <router-view></router-view>
      </el-main>
      <!--<el-footer>Footer</el-footer>-->
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Aside from './components/Aside.vue'
import Header from './components/Header.vue'
import BreadCrumb from '@/components/BreadCrumb.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Aside,
    Header,
    BreadCrumb
  }
})
export default class Index extends Vue {
  isCollapse:boolean = false // 侧边栏展开状态
  mounted () {}
  changeCollapse (isCollapse:boolean) {
    this.isCollapse = isCollapse
  }
}
</script>

<style lang="stylus" scoped>
.container
  height:100%
  .el-header
    border-bottom:1px solid #eee
  .el-main
    display flex
    flex-direction column
</style>

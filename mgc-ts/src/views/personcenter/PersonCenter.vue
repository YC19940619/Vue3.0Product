<template>
  <el-tabs type="border-card" class="person-center">
    <el-tab-pane label="个人信息"><person-info></person-info></el-tab-pane>
    <el-tab-pane label="修改基本信息"><modify-info></modify-info></el-tab-pane>
    <el-tab-pane label="修改密码"><modify-password></modify-password></el-tab-pane>
    <el-tab-pane label="修改头像"><modify-head-image></modify-head-image></el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PersonInfo from './components/PersonInfo.vue'
import ModifyPassword from './components/ModifyPassword.vue'
import ModifyInfo from './components/ModifyInfo.vue'
import ModifyHeadImage from './components/ModifyImage.vue'
@Component({
  components: {
    PersonInfo,
    ModifyPassword,
    ModifyInfo,
    ModifyHeadImage
  }
})
export default class PersonCenter extends Vue {
}
</script>

<style lang="stylus" scoped>
  .person-center
    height:500px
</style>

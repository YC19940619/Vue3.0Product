<template>
  <div class="box">
    <div class="info"><div class="left">头像：</div><div class="right"><img class="head-img" :src="userInfo.head_image"/></div></div>
    <div class="info"><div class="left">昵称：</div><div class="right">{{userInfo.nickname}}</div></div>
    <div class="info"><div class="left">手机号：</div><div class="right">{{userInfo.phone_num || '暂无'}}</div></div>
    <div class="info"><div class="left">性别：</div><div class="right">{{userInfo.sex}}</div></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
@Component
export default class PersonInfo extends Vue {
  @State userInfo!:object
}

</script>

<style lang="stylus" scoped>
  .box
    padding: 20px
    box-sizing border-box
    .info
      width: 100%
      line-height 40px
      overflow hidden
      margin-bottom:10px
      .left
        float: left
        width: 80px
        font-size 16px
      .right
        float left
        font-size 16px
        img
          height: 80px
          border-radius 10px
</style>

<template>
  <div class="box">
    <el-upload
      class="avatar-uploader"
      action=""
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import { modifyHeadImage, getUserInfo } from '@/assets/api/user'
import { base64, dataimgsrc } from '@/assets/scripts/common'
@Component
export default class ModifyHeadImage extends Vue {
  imageUrl:string = ''
  @State UserInfo !: any
  @Mutation changeUserInfo !: Function
  handleAvatarSuccess (res:any, file:any) {
    this.imageUrl = URL.createObjectURL(file.raw)
  }
  beforeAvatarUpload (file:any) {
    const isJPG = ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isJPG) {
      this.$message.error('上传头像图片只能是 JPG 格式!')
    }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!')
    }
    // return isJPG && isLt2M
    base64(file).then((base:any) => {
      modifyHeadImage(base).then((res:any) => {
        console.log(res)
        if (res.code === 'SUCCESS') {
          this.$message.success('上传成功')
          getUserInfo().then(res => {
            if (res) {
              res.data.head_image = dataimgsrc(res.data.head_image)
              this.imageUrl = dataimgsrc(res.data.head_image)
              this.changeUserInfo(res.data)
            }
          })
        } else if (res.code === 'user.INVALID_HEAD_IMAGE') {
          this.$message.warning('图片不合法')
        } else {
          this.$message.error('上传失败')
        }
      }).catch((err:any) => {
        console.log(err)
      })
    }).catch((err:any) => {
      console.log(err)
    })
    return false
  }
}
</script>

<style lang="stylus" scoped>
  .box
    display:block;
  .box >>> .avatar-uploader .el-upload {
    width: 178px;
    height: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .box >>> .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<template>
  <el-dialog title="新增角色" :visible.sync="dialogTableVisible" width="600px" :close-on-click-modal="false" :before-close="closeDialogTableVisible">
    <el-form size="mini" :model="roleInfo" status-icon :rules="roleRules" ref="roleInfo" label-width="100px" class="role-info" >
      <el-form-item label="角色名称" prop="name" required>
        <el-input type="text" v-model="roleInfo.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="编码" prop="codename" required>
        <el-input type="text" v-model="roleInfo.codename" placeholder="请输入编码"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="description" required>
        <el-input v-model.number="roleInfo.description" placeholder="请输入角色描述"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('roleInfo')">提交信息</el-button>
        <el-button @click="resetForm('roleInfo')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      :close-on-click-modal="false"
      class="inner-dialog"
      width="400px"
      title="权限"
      :visible.sync="innerVisible"
      append-to-body
      style="overflow: hidden"
      @close="closeInnerVisible"
    >
      <permissions-tree ref="permissionsTree" :defaultCheckKeys="defaultCheckKeys"></permissions-tree>
      <el-button type="primary" @click="createRole" class="create-role" size="mini">创建角色</el-button>
    </el-dialog>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import PermissionsTree from './PermissionsTree.vue'
import { addRoles } from '@/assets/api/roles'
@Component({
  components: {
    PermissionsTree
  }
})
export default class AddDialog extends Vue {
  @Prop({ default: false }) dialogTableVisible!:boolean
  innerVisible:boolean = false
  defaultCheckKeys:any = []
  roleInfo:object = {
    name: '',
    codename: '',
    description: ''
  }
  roleRules:object = { // 表单校验规则
    name: [
      { validator: this.checkName, trigger: 'blur' }
    ],
    codename: [
      { validator: this.checkCodename, trigger: 'blur' }
    ],
    description: [
      { validator: this.checkDescription, trigger: 'blur' }
    ]
  }
  createRole () {
    const permissions = (this.$refs.permissionsTree as any).getCheckedKeys().join(',')
    addRoles({
      ...this.roleInfo,
      permissions
    }).then((res:any) => {
      if (res) {
        switch (res.code) {
          case 'SUCCESS':
            this.addPermissionsSucc(res)
            break
          case 'user.CODENAME_OR_NAME_EXIST':
            this.$message.error('姓名或编码已存在')
            break
          default:
            this.$message.error('创建失败')
        }
      }
    })
  }
  @Emit()
  addPermissionsSucc (res:any) {
    this.$message.success('创建成功')
    this.innerVisible = false
    this.closeDialogTableVisible()
  }
  @Emit('closeDialogTableVisible')
  closeDialogTableVisible () { // 关闭模态框
    this.resetForm('roleInfo') // 每次关闭重置信息
    return false
  }
  closeInnerVisible () {
    (this.$refs.permissionsTree as any).setCheckedKeys([]) // 每次关闭重置信息
  }
  checkName (rule:any, value:any, callback:any) {
    const reg = /^[\u0391-\uFFE5A-Za-z]+$/
    if (value === '') {
      callback(new Error('请输入姓名'))
    } else if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入由汉字和英文组成的姓名'))
    }
  }
  checkCodename (rule:any, value:any, callback:any) {
    const reg = /^[a-z_]+$/
    if (value === '') {
      callback(new Error('请输入编码'))
    } else if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入由小写英文和下划线组成的编码'))
    }
  }
  checkDescription (rule:any, value:any, callback:any) {
    if (value === '') {
      callback(new Error('请输入角色描述'))
    } else {
      callback()
    }
  }
  submitForm (formName:any) { // 提交表单
    (this.$refs[formName] as any).validate((valid:any) => {
      if (valid) { // 校验成功
        this.innerVisible = true
      } else { // 校验失败
        return false
      }
    })
  }
  resetForm (formName:any) { // 重置表单
    (this.$refs[formName] as any).resetFields()
  }
  submitSucc () {
    console.log(this.roleInfo)
  }
}
</script>

<style lang="stylus" scoped>
  .role-info
    width:400px
    margin:0 auto
  .inner-dialog >>> .el-dialog__body
    overflow hidden
  .create-role
    margin-top:20px
    float: right
</style>

import Store from '@/store'
const Api: string = process.env.VUE_APP_Api
const dataimgsrc = (src:string):string => { // 图片地址
  if (!src.includes('http')) {
    if (src.includes('media')) {
      src = `${Api}${src}`
    } else {
      src = `${Api}/media/${src}`
    }
  }
  return src
}
const base64 = (file:any) => { // 获取64位编码
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e:any) {
      resolve(e.currentTarget.result) // 这个就是base64编码了
    }
  })
}

const checkPermission = (permission:any) => { // 权限
  const permissions = Store.state.userInfo.permissions
  if (permissions.includes(permission) || !permission) {
    return true
  } else {
    return false
  }
}
export {
  dataimgsrc,
  base64,
  checkPermission
}

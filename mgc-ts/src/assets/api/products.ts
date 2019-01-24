import { $patch, $get, $post, $delete, $put } from '@/assets/scripts/axios'
import { AdminStyles, AdminRfids, Erpsync } from '@/assets/scripts/interfaces'
import { CheckToken } from '@/assets/scripts/decorator'

class Products {
  @CheckToken()
  viewStyles (params:object) { // 查看款式列表
    return $get(AdminStyles, params, true)
  }
  @CheckToken()
  changeStyle (sid:any, data:any) { // 修改单个款式
    return $put(`${AdminStyles}/${sid}`, data, true)
  }
  @CheckToken()
  addStyle (data:any) { // 修改单个款式
    return $post(AdminStyles, data, true)
  }
  @CheckToken()
  viewRfids (params:object) { // 查看存货列表
    return $get(AdminRfids, params, true)
  }
  @CheckToken()
  viewErpsyncs (params:object) { // 查看erp同步记录
    return $get(Erpsync, params, true)
  }
  @CheckToken()
  ErpSync () { // 开始同步erp
    return $post(Erpsync, {}, true)
  }
  @CheckToken()
  ViewErpSyncLog (sid:any) { // 开始同步erp
    return $get(`${Erpsync}/${sid}/log`, {}, true)
  }
  @CheckToken()
  ChnageRfid (rid:any, data:any) { // 修改存货
    return $put(`${AdminRfids}/${rid}`, data, true)
  }
  @CheckToken()
  AddRfid (data:object) { // 查看存货列表
    return $post(AdminRfids, data, true)
  }
}
const ProductsMoudle = new Products()
const viewStyles = ProductsMoudle.viewStyles
const changeStyle = ProductsMoudle.changeStyle
const viewRfids = ProductsMoudle.viewRfids
const viewErpsyncs = ProductsMoudle.viewErpsyncs
const StartErpSync = ProductsMoudle.ErpSync
const ViewErpSyncLog = ProductsMoudle.ViewErpSyncLog
const ChnageRfid = ProductsMoudle.ChnageRfid
const addStyle = ProductsMoudle.addStyle
const AddRfid = ProductsMoudle.AddRfid
export {
  viewStyles,
  changeStyle,
  viewRfids,
  viewErpsyncs,
  StartErpSync,
  ViewErpSyncLog,
  ChnageRfid,
  addStyle,
  AddRfid
}

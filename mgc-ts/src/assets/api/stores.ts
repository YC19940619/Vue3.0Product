import { $patch, $get, $post, $delete, $put } from '@/assets/scripts/axios'
import { Stores } from '@/assets/scripts/interfaces'
import { CheckToken } from '@/assets/scripts/decorator'

class StoresMoudle {
  @CheckToken()
  ViewStoresList (params:object) {
    return $get(Stores, params, true)
  }
}
const SM = new StoresMoudle()
const ViewStoresList = SM.ViewStoresList
export {
  ViewStoresList
}

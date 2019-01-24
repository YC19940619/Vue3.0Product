import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
Vue.use(Vuex)
const index = new Vuex.Store({
  state,
  mutations,
  actions: {}
})

export default index

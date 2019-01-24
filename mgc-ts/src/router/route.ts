import Login from '../views/login/Login.vue'
import Index from '../views/index/Index.vue'
import Home from '../views/home/Home.vue'
import ErpSync from '../views/erpsync/ErpSync.vue'
import FeedList from '../views/feedlist/FeedList.vue'
import FinanceOrderList from '../views/financeorderlist/FinanceOrderList.vue'
import OrderList from '../views/orderlist/OrderList.vue'
import ProductList from '../views/productlist/ProductList.vue'
import RoleList from '../views/rolelist/RoleList.vue'
import StockList from '../views/stocklist/StockList.vue'
import StoreList from '../views/storelist/StoreList.vue'
import UserList from '../views/userlist/UserList.vue'
import PersonCenter from '../views/personcenter/PersonCenter.vue'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      auth: false,
      hidden: true,
      name: '登录',
      icon: false,
      permission: false
    }
  },
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: Index,
    meta: {
      auth: true,
      icon: '&#xe667;',
      name: '首页',
      hidden: true,
      permission: false
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          auth: true,
          icon: '&#xe667;',
          name: '首页',
          hidden: false,
          permission: false
        }
      }
    ]
  },
  {
    path: '/personcenter',
    name: 'personcenter',
    component: Index,
    meta: {
      auth: true,
      icon: false,
      name: '个人中心',
      hidden: true,
      permission: false
    },
    children: [
      {
        path: 'personinfo',
        name: 'personinfo',
        component: PersonCenter,
        meta: {
          auth: true,
          icon: false,
          name: '个人信息',
          hidden: true,
          permission: false
        }
      }
    ]
  },
  {
    path: '/roleManage',
    name: 'roleManage',
    component: Index,
    meta: {
      auth: true,
      icon: '&#xea62;',
      name: '角色管理',
      hidden: false,
      permission: 'role_admin'
    },
    children: [
      {
        path: 'rolelist',
        name: 'rolelist',
        component: RoleList,
        meta: {
          auth: true,
          icon: false,
          name: '角色列表',
          hidden: false,
          permission: 'view_role'
        }
      }
    ]
  },
  {
    path: '/userManage',
    name: 'userManage',
    component: Index,
    meta: {
      auth: true,
      icon: '&#xe61c;',
      name: '用户管理',
      hidden: false,
      permission: 'user_admin'
    },
    children: [
      {
        path: 'userlist',
        name: 'userlist',
        component: UserList,
        meta: {
          auth: true,
          icon: false,
          name: '用户列表',
          hidden: false,
          permission: 'view_user'
        }
      }
    ]
  },
  {
    path: '/storeManage',
    name: 'storeManage',
    component: Index,
    meta: {
      auth: true,
      icon: '&#xe61b;',
      name: '门店管理',
      hidden: false,
      permission: 'mch_admin'
    },
    children: [
      {
        path: 'storelist',
        name: 'storelist',
        component: StoreList,
        meta: {
          auth: true,
          icon: false,
          name: '门店列表',
          hidden: false,
          permission: 'view_mch'
        }
      }
    ]
  },
  {
    path: '/orderManage',
    name: 'orderManage',
    component: Index,
    meta: {
      auth: true,
      icon: '&#xe60b;',
      name: '订单管理',
      hidden: false,
      permission: 'order_admin'
    },
    children: [
      {
        path: 'orderlist',
        name: 'orderlist',
        component: OrderList,
        meta: {
          auth: true,
          icon: false,
          name: '订单列表',
          hidden: false,
          permission: 'view_order'
        }
      }
    ]
  },
  {
    path: '/productManage',
    name: 'productManage',
    component: Index,
    meta: {
      auth: true,
      icon: '&#xe634;',
      name: '商品管理',
      hidden: false,
      permission: 'product_admin'
    },
    children: [
      {
        path: 'productlist',
        name: 'productlist',
        component: ProductList,
        meta: {
          auth: true,
          icon: false,
          name: '款式列表',
          hidden: false,
          permission: 'view_product'
        }
      },
      {
        path: 'stocklist',
        name: 'stocklist',
        component: StockList,
        meta: {
          auth: true,
          icon: false,
          name: '存货列表',
          hidden: false,
          permission: 'view_product'
        }
      },
      {
        path: 'erpsync',
        name: 'erpsync',
        component: ErpSync,
        meta: {
          auth: true,
          icon: false,
          name: 'erp同步',
          hidden: false,
          permission: 'erp_sync'
        }
      }
    ]
  },
  {
    path: '/financeManage',
    name: 'financeManage',
    component: Index,
    meta: {
      auth: true,
      icon: '&#xe627;',
      name: '财务管理',
      hidden: false,
      permission: 'finance_admin'
    },
    children: [
      {
        path: 'financeorderlist',
        name: 'financeorderlist',
        component: FinanceOrderList,
        meta: {
          auth: true,
          icon: false,
          name: '订单列表',
          hidden: false,
          permission: 'view_order'
        }
      }
    ]
  },
  {
    path: '/feedManage',
    name: 'feedManage',
    component: Index,
    meta: {
      auth: true,
      icon: '&#xe60a;',
      name: '反馈管理',
      hidden: false,
      permission: false
    },
    children: [
      {
        path: 'feedlist',
        name: 'feedlist',
        component: FeedList,
        meta: {
          auth: true,
          icon: false,
          name: '反馈列表',
          hidden: false,
          permission: false
        }
      }
    ]
  }
]

export default routes

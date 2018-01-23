import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/main'
//import Main from '@/components/ware-info/wi-main'

import pClass from '@/components/class/class'
import gClass from '@/components/class/gclass'
import userCenter from '@/components/user-center/user-center'
import myOrder from '@/components/user-center/order/myorder'
import refundOrder from '@/components/user-center/order/refund-order'
import orderInfo from '@/components/user-center/order/order-info/order-info'
import userInfo from '@/components/user-center/user-info/ui-main'
import defaultAddress from '@/components/user-center/user-info/list-info/defaultAddress/default-address'
import addressForm from '@/components/user-center/user-info/list-info/defaultAddress/addressForm/default-address-form'
import details from '@/components/ware-info/wi-main'
import commentPage from '@/components/ware-info/comment'
import commentList from '@/components/ware-info/commentList'
import userLogin from '@/components/user-login/user-login'
import shopCart from '@/components/shopCart/shopCart'
import register from '@/components/register/register'
import submitOrder from '@/components/user-center/order/submit-order'
import myComment from '@/components/user-center/myComment/myComment'
import writeComment from '@/components/user-center/myComment/writeComment/writeComment'

import store from '../vuex/store'

Vue.use(Router)

const router = new Router({
    routes: [
    	{
            path: "/",
            redirect: "/Main"
        },
        {
            path: '/Main',
            name: 'Main',
            component: Main
        },
        {
            path: "/pClass/gClass/:num",
            component: gClass
        },
        {
            path: "/pClass/gClass/keyWord=/:key",
            component: gClass
        },
        {
            path: '/pClass/gClass/details/:goodsCode',
            name: 'details',
            component: details
        },
        {
            path: '/details/comment/:comIds',
            name: 'commentPage',
            component: commentPage
        },
        {
            path: '/comment/commentList/:commentGoods',
            name: 'commentList',
            component: commentList
        },
        {
            path: '/pClass',
            name: 'pClass',
            component: pClass
        },
        {
            path: '/user',
            name: 'userCenter',
            component: userCenter,
        },
        {
            path: '/user/myComment',
            name: 'myComment',
            meta: { auth: true },
            component: myComment,
        },
        {
            path: '/myComment/writeComment/:commentParams',
            name: 'writeComment',
            component: writeComment,
        },
        {
            path: "/user/myorder/:order",
            name: 'myOrder',
            meta: { auth: true },
            component: myOrder,
        },
        {
            path: "/user/myorder/orderInfo/:orderType",
            name: 'orderInfo',
            meta: { auth: true },
            component: orderInfo,
        },
        {
            path: "/user/submitOrder/:Way",
            name: 'submitOrder',
            meta: { auth: true },
            component: submitOrder,
        },
        {
            path: "/user/userInfo",
            name: 'userInfo',
            meta: { auth: true },
            component: userInfo,
        },
        {
            path: "/user/defaultaddress",
            name: 'defaultAddress',
            meta: { auth: true },
            component: defaultAddress,
        },
        {
            path: "/user/defaultaddress/form/:addressIds",
            name: 'addressForm',
            meta: { auth: true },
            component: addressForm
        },
        {
            path: '/shopCart',
            name: 'shopCart',
            meta: { auth: true },
            component: shopCart
        },
        {
            path: '/userLogin',
            name: 'userLogin',
            component: userLogin
        },
        {
            path: '/register',
            name: 'register',
            component: register
        }
    ]
})


router.beforeEach((to, from, next) => {

    if (to.meta.auth) { // 判断该路由是否需要登录权限
        if (store.state.token == '1') { // 通过vuex state获取当前的token是否存在
            next();
        } else {
            next({
                path: '/userLogin', // 跳转到登录页面
                query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，用于登录成功后回到登录前页面
            });
        }
    } else {
        next();
    };

})

export default router;
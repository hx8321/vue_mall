/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * imgUrl :  新的图片服务地址
 * 
 */

let baseUrl = 'http://192.168.1.199/app';
let imgUrl = 'http://192.168.1.199';
let routerMode = 'history';
//let imgBaseUrl = 'http://images.cangdu.org/';


if (process.env.NODE_ENV == 'development') {

} else if (process.env.NODE_ENV == 'production') {

    // baseUrl = 'http://cangdu.org:8001';
}

export {
    baseUrl,
    imgUrl,
    routerMode,
//  imgBaseUrl,
}
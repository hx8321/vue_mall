import axiosAjax from '@/config/axios.js'

//添加购物车
const addShopCartDt = async(params) => {
    let result;
    await axiosAjax("/shoppingCart/addShoppingCartGoods", params, "POST").then(function(response) {
        if (response.data.retCode == "000000") {
            result = "添加成功";
        } else if (response.data.retCode == "700001") {
            result = "数量已超过单位限制";
        } else if (response.data.retCode == "500001") {
            result = "商品已下架";
        } else if (response.data.retCode == "600001") {
            result = "库存不足";
        }else{
        	result = "服务器异常，请稍后再试";
        }
    }).catch(function(err) {
        result = "服务器异常，请稍后再试";
    });
    return result;
}

//删除地址
const deleteAddressDt = async(userId, addressId) => {
    let result;
    await axiosAjax("/address/delete", { "userId": userId, "addressId": addressId }, "POST").then(function(response) {
        if (response.data.retCode == "000000") {
            result = true;
        } else if (response.data.retCode == "999999") {
            result = false;
        }
    }).catch(function(err) {
        result = false;
    });
    return result;
}

//更新地址
const upAddressDt = async(url, params) => {
    let result;
    await axiosAjax(url, params, "POST").then(function(response) {
        if (response.data.retCode == "000000") {
            result = true;
        } else{
            result = false;
        }
    }).catch(function(err) {
        result = false;
    });
    return result;
}

//提交订单
const addOrderDt = async(params) => {
    let result = { "retCode": "000000", "retMsg": "提交订单成功","data":"null"};
    await axiosAjax("/order/add", params, "POST").then(function(response) {
        result.data = response.data.data;
        result.retCode = response.data.retCode;
        result.retMsg = response.data.retMsg.replace(" ", "");
    }).catch(function(err) {
        result = false;
    });
    return result;
}

//删除购物车
const deleteShopCartDt= async(params) => {
    let result;
    await axiosAjax("/shoppingCart/deleteShoppingGoods", params, "POST").then(function(response) {
        if(response.data.retCode == '000000'){
			result = true;
		}else{
			result = false;
		}
    }).catch(function(err) {
        result = false;
    });
    return result;
}

//取消订单
const cancelOrder= async(params) => {
    let result;
    await axiosAjax("/order/cancel", params, "POST").then(function(response) {
        if(response.data.retCode == '000000'){
			result = true;
		}else{
			result = false;
		}
    }).catch(function(err) {
        result = false;
    });
    return result;
}

//删除订单
const deleteOrder= async(type,params) => {
    let result;
    await axiosAjax("/order/del/"+type, params, "POST").then(function(response) {
        if(response.data.retCode == '000000'){
			result = true;
		}else{
			result = false;
		}
    }).catch(function(err) {
        result = false;
    });
    return result;
}

//支付
const orderPay= async(params) => {
    let result;
    await axiosAjax("/order/pay", params, "POST").then(function(response) {
        if(response.data.retCode == '000000'){
			result = true;
		}else{
			result = false;
		}
    }).catch(function(err) {
        result = false;
    });
    return result;
}

//添加评价
const addComment= async(params) => {
    let result;
    await axiosAjax("/evaluate/evaAdd", params, "POST").then(function(response) {
        if(response.data.retCode == '000000'){
			result = true;
		}else{
			result = false;
		}
    }).catch(function(err) {
        result = false;
    });
    return result;
}
export default { addShopCartDt, deleteAddressDt, upAddressDt, addOrderDt,deleteShopCartDt,cancelOrder,deleteOrder,orderPay,addComment};
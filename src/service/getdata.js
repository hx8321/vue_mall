import axiosAjax from '@/config/axios.js'

//商品详情信息
const wareInfoDt=async (ids)=>{
	let result;
	await axiosAjax("/goodsInfo/queryGoodsInfo?ids="+ids).then(function(response){
		if(response.data.retCode=="000000"){
			result=response.data.data.responseInfo;
		}else{
			result=false;
		}
		result.filepath=result.filepath.replace("[","");
		result.filepath=result.filepath.replace("]","");
		result.filepath=result.filepath.split(",");
	}).catch(function(err){
		result=false;
	});
	return result;
}

//地址列表信息
const addressListDt=async (userId)=>{
	let result;
	await axiosAjax("/address/list?userId="+userId).then(function(response){
		if(response.data.retCode=="000000"){
			result=response.data.data.responseInfo;
		}else{
			result=false;	
		}
	}).catch(function(err){
		result=false;
	});
	return result;
}

//广告信息
const advertiseDt=async (positionId)=>{
	let result=[];
	await axiosAjax("/advertise/findAdvertiseList?positionId="+positionId).then(function(response){
		if(response.data.retCode=="000000"){
			result=response.data.data.responseInfo;
		}else{
			result=false;
		}
	}).catch(function(err){
		result=false;
	});
	return result;
}

//订单列表信息
const orderListDt=async (userId)=>{
	let result;
	await axiosAjax("/order/list?userId="+userId).then(function(response){
		if(response.data.retCode=="000000"){
			result=response.data.data;
		}else{
			result=false;	
		}
	}).catch(function(err){
		result=false;
	});
	return result;
}

//购物车信息
const shopCartDt=async (userId)=>{
	let result;
	await axiosAjax("/shoppingCart/query/goodsList?userId="+userId).then(function(response){
		if(response.data.retCode=="000000"){
			result=response.data.data.pyShoppingCartList;
		}else{
			result=false;	
		}
	}).catch(function(err){
		result=false;
	});
	return result;
}

//订单分页信息
const orderPageDt=async (params)=>{
	let result;
	await axiosAjax("/order/main",params,"POST").then(function(response){
		if(response.data.retMsg=="success"){
			result=response.data.data.mainList;
		}else{
			result=false;	
		}
	}).catch(function(err){
		result=false;
	});
	return result;
}

//商品校验
const goodsInspection=async (params)=>{
	let result;
	await axiosAjax("/shoppingCart/checkGoodsInfo",params,"POST").then(function(response){
		result=response.data.retMsg;
	}).catch(function(err){
		result="系统繁忙，请稍后再试";
	});
	return result;
}

//个人评论列表信息
const commentListDt=async (params)=>{
	let result;
	await axiosAjax("/evaluate/evaList",params,"POST").then(function(response){
		if(response.data.retCode=="000000"){
			result=response.data.data.responseInfo;
		}else{
			result=false;	
		}
	}).catch(function(err){
		result=false;
	});
	return result;
}

//评论列表信息
const allCommentListDt=async (params)=>{
	let result;
	await axiosAjax("/evaluate/evaAllList",params,"POST").then(function(response){
		if(response.data.retCode=="000000"){
			result=response.data.data.responseInfo;
		}else{
			result=false;	
		}
	}).catch(function(err){
		result=false;
	});
	return result;
}

//sku信息
const skuDt=async (ids)=>{
	let result;
	await axiosAjax("/goodsInfo/findSkuByGoodsIds?ids="+ids).then(function(response){
		if(response.data.retCode=="000000"){
			result=response.data.data.responseInfo;
		}else{
			result=false;	
		}
	}).catch(function(err){
		result=false;
	});
	return result;
}

export default {wareInfoDt,addressListDt,advertiseDt,orderListDt,shopCartDt,orderPageDt,goodsInspection,commentListDt,allCommentListDt,skuDt};
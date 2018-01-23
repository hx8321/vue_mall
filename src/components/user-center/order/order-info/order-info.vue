<template>
	<div class="order-info">
		<header id="ui-nav" class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">订单详情</h1>
		</header>
		<ul class="mui-table-view order-info-content public-margint" v-if="orderInfo">
			<li class="mui-table-view-cell order-info-address">
				<ul class="mui-navigate-right">
					<li>
						<div>
							<img src="../../../../assets/address.png"/>
						</div>
					</li>
					<li>
						<p>收货人：{{orderInfo.contName}}<span>{{orderInfo.contPhone}}</span></p>
						<p>收货地址：{{orderInfo.contProvince}}{{orderInfo.contCity}}{{orderInfo.contDistrict}}{{orderInfo.contStreet}}{{orderInfo.contAddress}}</p>
					</li>
				</ul>
			</li>
			<li class="order-info-goodsList"  v-for="shopItem in orderInfo.shopLists">
				<ul>
					<li class="goodsList-header">
						<img src="../../../../assets/shopping-mall.png"/>
						<span>{{shopItem.vendorSnm}}</span>
					</li>
					<li v-for="goodsItem in shopItem.goodsLists"  :class="{'goodsList-content':true,'disableStyle':goodsItem.status=='1'?false:true}"  @tap="jumpGoods(goodsItem.status=='1'?false:true,goodsItem.goodsids)" :setdata="goodsItem.status=='1'?true:payFlag=true">
						<div>
							<img :src="imgUrl+goodsItem.filepath"/>
						</div>
						<div>
							<p>{{goodsItem.goodsTitle}}</p>
							<p>
								<span class="fontRed">￥{{goodsItem.goodsPrice|decimal}}</span>
								<span class="fontsilver fontsmall" v-if="goodsItem.orderRealAmtOld">￥{{goodsItem.orderRealAmtOld|decimal}}</span>
								<span>×{{goodsItem.goodsNum}}</span>
							</p>
						</div>
					</li>
				</ul>
			</li>
			
			<li class="order-info-data" v-if="orderType=='unpaidOrder'">
				<table>
					<tr>
						<td>商品数量</td>
						<td>{{orderInfo.orderTotalNum}}</td>
					</tr>
					<tr>
						<td>运费</td>
						<td class="fontRed">￥0.00</td>
					</tr>
					<tr>
						<td>实付（含运费）</td>
						<td class="fontRed">￥{{orderInfo.orderTotalAmt|decimal}}</td>
					</tr>
				</table>
			</li>
			
			<li class="order-info-orderId">
				<ul>
					<li>
						订单号：{{orderInfo.transactionid}}
					</li>
					<li>
						<div>
							<button @tap="updateOrderState($event)">取消订单</button>
						</div>
						<div>
							<button @tap="pay($event)" :disabled="payFlag">付&nbsp;&nbsp;款</button>
						</div>
					</li>
				</ul>
			</li>
		</ul>
		<div class="modal" id="modal">
	         <span></span>
	    </div>
		<loading v-show="loading"></loading>
	</div>
</template>

<script>
	import {imgUrl} from '@/config/env'
	import loading from '@/components/loading/loading'
	export default{
		data:function(){
			return {
				//图片路径前缀
				imgUrl,
				//订单详细数据
				orderInfo:"",
				//订单类型
				orderType:"",
				//加载动画显示标志
				loading:true,
				//定时器
				timeout:"",
				//付款禁用标志位
				payFlag:false
			}
		},
		components:{
			//加载动画组件
			loading
		},
		methods:{
			//跳转到商品详情页面，flag：商品存在状态标志位，ids：商品id
			"jumpGoods"(flag,ids){
				//判断商品存在状态位
				if(flag){
					//调用提示框
					this.proptimg("商品已经不存在",false,false);
				}else{
					this.$store.state.getData.wareInfoDt(ids).then((result)=>{
						if(result){
							//进行二次判断，同步后台数据
							if(result.status==1&&result.reviewStatues==1){
								//成功跳转到商品详情页
								this.$router.push("/pClass/gClass/details/"+ids);
							}else{
								this.proptimg("商品已经不存在",false,false);
								$("order-info-orderId button:last-of-type").attr("disabled",true);
							}
						}else{
							this.proptimg("系统繁忙，请稍后再试",false,false);
						}
					})
				}
			},
			//更新订单状态
			"updateOrderState"(event){
				//禁用当前按钮
				$(event.target).attr("disabled",true);
				//如果为取消按钮
				if($(event.target).html()=="取消订单"){
					//弹出提示框
					mui.confirm("确认取消订单？","",["是","否"],(e)=>{
						if (e.index == 0) {
							let params={'ids':this.orderInfo.ids,'transactionid':this.orderInfo.transactionid,'userIds':this.$store.state.userId};
							//调用订单取消接口
							this.$store.state.setData.cancelOrder(params).then((result)=>{
								if(result){
									this.proptimg("取消成功",true,event.target);
								}else{
									this.proptimg("系统繁忙，请稍后再试",false,event.target);
								}
							});
						}else{
							$(event.target).attr("disabled",false);
						}
					});
					//如果为删除订单
				}else if($(event.target).html()=="删除订单"){
					mui.confirm("确认删除订单？","",["是","否"],(e)=>{
						if (e.index == 0) {
							//如果为取消订单的删除
							if(this.orderType=="cancelOrder"){
								let params={'ids':this.orderInfo.ids,'userIds': this.$store.state.userId,'transactionid':this.orderInfo.transactionid};
								//调用删除订单接口，根据big大订单删除
								this.$store.state.setData.deleteOrder("big",params).then((result)=>{
									if(result){
										this.proptimg("删除成功",true,event.target);
									}else{
										this.proptimg("系统繁忙，请稍后再试",false,event.target);
									}
								});
								//如果为非取消订单的删除
							}else{
								let params={'ids':this.orderInfo.ids,'userIds': this.$store.state.userId,'bigorderId':this.orderInfo.bigorderId};
								//调用删除订单接口，根据main主订单删除
								this.$store.state.setData.deleteOrder("main",params).then((result)=>{
									if(result){
										this.proptimg("删除成功",true,event.target);
									}else{
										this.proptimg("系统繁忙，请稍后再试",false,event.target);
									}
								});
							}
						}else{
							$(event.target).attr("disabled",false);
						}
					});
				}
			},
			//弹出框切换，spantext：显示文本，flag：判断是否返回订单列表页面标志，dom：禁用标签对象
			"proptimg"(spanText,flag,dom){
				clearTimeout(this.timeout);
				$("#modal>span").html(spanText);
				$("#modal").css("display","block");
				this.timeout=setTimeout(()=>{
					$("#modal").css("display","none");
					if(dom){
						$(dom).attr("disabled",false);
					}
					if(flag){
						//订单列表页面返回目标，判断标志位
						this.$store.state.orderBack=true;
						this.$router.push("/user/myorder/all");
					}
				},2000);
			},
			//付款
			"pay"(event){
				$(event.target).attr("disabled",true);
				mui.confirm("确认付款？","",["是","否"],(e)=>{
		        	if(e.index==0){
		        		let params={'ids':this.orderInfo.ids,'userIds': this.$store.state.userId,'transactionid':this.orderInfo.transactionid};
		        		this.$store.state.setData.orderPay(params).then((result)=>{
							if(result){
								this.proptimg("付款成功",true,event.target);
							}else{
								this.proptimg("系统繁忙，请稍后再试",false,event.target);
							}
						});
		        	}else{
						$(event.target).attr("disabled",false);
		        	}
		        });
			}
		},
		created(){
			//加载订单数据
			this.$store.state.getData.orderListDt(this.$store.state.userId).then((result)=>{
				if(result){
					//获取订单类型
					let type=this.orderType=this.$route.params.orderType;
					//如果为取消订单类型，type修改为未付款类型（因为两种类型数据结构一致，且为了满足下方判断）
					if(type=="cancelOrder"){
						type="unpaidOrder";
					}
					for (let i=0;i<result[type].length;i++) {
						//根据订单号加载对应订单信息
						if(result[type][i].ids==this.$store.state.orderNowId){
							//如果为已付款类型
							if(type=="paymentOrder"){
								//设置订单详情总体结构
								this.orderInfo={"bigorderId":result[type][i].bigorderId,"transactionid":result[type][i].transactionid,"ids":result[type][i].ids,"orderTotalAmt":result[type][i].orderTotalAmt,"orderTotalNum":result[type][i].orderTotalNum,"contName":result[type][i].contName,"contPhone":result[type][i].contPhone,"contProvince":result[type][i].contProvince,"contCity":result[type][i].contCity,"contDistrict":result[type][i].contDistrict,"contStreet":result[type][i].contStreet,"contAddress":result[type][i].contAddress,"shopLists":[]};
								//商户数据
								let shop={"vendorIds":result[type][i].vendorIds,"vendorSnm":result[type][i].vendorSnm,"goodsLists":[]};
								//遍历商品数据
								for (let j=0;j<result[type][i].pyChildGoodsorders.length;j++) {
									let good=result[type][i].pyChildGoodsorders[j];
									shop.goodsLists.push(good);
								}
								this.orderInfo.shopLists.push(shop);
							}else{
								this.orderInfo={"transactionid":result[type][i].transactionid,"ids":result[type][i].ids,"orderTotalAmt":result[type][i].orderTotalAmt,"orderTotalNum":result[type][i].orderTotalNum,"contName":result[type][i].pyMainGoodsorders[0].contName,"contPhone":result[type][i].pyMainGoodsorders[0].contPhone,"contProvince":result[type][i].pyMainGoodsorders[0].contProvince,"contCity":result[type][i].pyMainGoodsorders[0].contCity,"contDistrict":result[type][i].pyMainGoodsorders[0].contDistrict,"contStreet":result[type][i].pyMainGoodsorders[0].contStreet,"contAddress":result[type][i].pyMainGoodsorders[0].contAddress,"shopLists":[]};
								for (let j=0;j<result[type][i].pyChildGoodsorders.length;j++) {
									//如果为第二个以上的商品
									if(j>0){
										for(let x=0;x<this.orderInfo.shopLists.length;x++){
											//根据商户id，提取对应的商品数据。如果有此商户就添加商品，如果没有商户就创建商户再添加
											if(result[type][i].pyMainGoodsorders[j].vendorIds==this.orderInfo.shopLists[x].vendorIds){
												this.orderInfo.shopLists[x].goodsLists.push(result[type][i].pyChildGoodsorders[j]);
												break;
											}else if(result[type][i].pyMainGoodsorders[j].vendorIds!=this.orderInfo.shopLists[this.orderInfo.shopLists.length-1].vendorIds){
												let shop={"vendorIds":result[type][i].pyMainGoodsorders[j].vendorIds,"vendorSnm":result[type][i].pyMainGoodsorders[j].vendorSnm,"goodsLists":[]};
												shop.goodsLists.push(result[type][i].pyChildGoodsorders[j]);
												this.orderInfo.shopLists.push(shop);
											}
										}
										//如果为第一个商品	
									}else{
										let shop={"vendorIds":result[type][i].pyMainGoodsorders[0].vendorIds,"vendorSnm":result[type][i].pyMainGoodsorders[0].vendorSnm,"goodsLists":[]};
										shop.goodsLists.push(result[type][i].pyChildGoodsorders[0]);
										this.orderInfo.shopLists.push(shop);
									}
								}
							}
						}
					}
				}
				this.loading=false;
			});
		},
		mounted(){
			//实现地址左右内容对齐
			$(".order-info-address li:first-of-type").css("height",$(".order-info-address li:last-of-type").css("height"));
			$(".order-info-address li:first-of-type").css("line-height",$(".order-info-address li:last-of-type").css("height"));
			
			$(".footer").css("display","none");
		},
		updated(){
			//切换底部区域显示
			if(this.$route.params.orderType=="cancelOrder"||this.$route.params.orderType=="paymentOrder"){
				$(".order-info-orderId li:last-of-type div:first-of-type button").html("删除订单");
				$(".order-info-orderId li:last-of-type div:last-of-type button").css("display","none");
			}
		},
		destroyed(){
			$(".footer").css("display","block");
		}
	}
</script>

<style>
	@import url("../../../../common/css/ui-nav.css");
	@import url("../../../../common/css/order-info.css");
	@import url("../../../../common/css/modal.css");
	.disableStyle{
		opacity: 0.5;
	}
</style>
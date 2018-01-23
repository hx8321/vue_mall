<template>
	<div class="submit-order">
		<header id="ui-nav" class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">确认订单</h1>
			<a class="mui-icon iconfont icon-icon mui-pull-right" href="#/shopCart"></a>
		</header>
		<ul class="mui-table-view submit-order-content public-margint public-marginb">
			<li class="mui-table-view-cell submit-order-address"  @tap="jumpPage('/user/defaultaddress')">
				<ul class="mui-navigate-right">
					<li>
						<div>
							<img src="../../../assets/address.png"/>
						</div>
					</li>
					<li>
						<p>收货人：{{addressShowDt.name}}<span>{{addressShowDt.mobile}}</span></p>
						<p>收货地址：{{addressShowDt.province}}{{addressShowDt.city}}{{addressShowDt.district}}{{addressShowDt.street}}{{addressShowDt.address}}</p>
					</li>
				</ul>
			</li>
			
			<li class="mui-table-view-cell submit-order-address-v" @tap="jumpPage('/user/defaultaddress')">
				<ul class="mui-navigate-right">
					<li>
						<div>
							<img src="../../../assets/address.png"/>
						</div>
					</li>
					<li>
						<p>请选择收货地址</p>
					</li>
				</ul>
			</li>
			
			<li class="submit-order-goodsList" v-for="vendorItem in goodShow.con">
				<ul>
					<li class="goodsList-header">
						<img src="../../../assets/shopping-mall.png"/>
						<span>{{vendorItem.vendorSnm}}</span>
					</li>
					<li class="goodsList-content" v-for="goodItem in vendorItem.goodsList"  @tap="jumpGoods(goodItem.goodsId)">
						<div>
							<img :src="imgUrl+goodItem.filepath[0]" style="width: 90px;"/>
						</div>
						<div>
							<p>{{goodItem.title}}</p>
							<p>
								<span class="fontRed">￥{{goodItem.price|decimal}}</span>
								<span class="fontsilver fontsmall" v-if="goodItem.disPrice">￥{{goodItem.disPrice|decimal}}</span>
								<span>×{{goodItem.goodsNum}}</span>
							</p>
						</div>
					</li>
					<li class="goodsList-freight">
						运费：<span class="fontRed">￥0.00</span>
					</li>
				</ul>
			</li>
			
			<li class="submit-order-prompting">
				温馨提示：商城会将您的信息（包括但不限于姓名、电话、地址等）传送至第三方，用于商品发货、配送等服务。
			</li>
		</ul>
		<div class="submit-order-footer white">
			合计：<span class="fontRed fontH">￥{{goodShow.tatolPrice|decimal}}</span>
				<button class="mui-btn mui-btn-warning" @tap="sumbitOrder($event)">提交订单</button>
		</div>
		<div class="modal" id="modal">
	         <span></span>
	    </div>
	</div>
</template>

<script>
	import {imgUrl} from '@/config/env'
	export default{
		data:function(){
			return {
				//地址展示数据
				addressShowDt:"",
				//商品展示数据
				goodShow:"",
				//定时器
				timeout:"",
				//图片路径固定前缀
				imgUrl
			};
		},
		methods:{
			//地址列表左右内容对齐
			"aligned"(className){
				$(className+" li:first-of-type").css("height",$(className+" li:last-of-type").css("height"));
				$(className+" li:first-of-type").css("line-height",$(className+" li:last-of-type").css("height"));
			},
			//地址页面跳转
			"jumpPage"(path){
				//修改地址页面标记
				this.$store.state.addressNowFlag=true;
				this.$router.push(path);
			},
			//提交入参格式
			"sumbitParams"(){
				//参数数据
				let params={"addressId":this.addressShowDt.addressId,"orderNo":this.goodShow.order,"userId":this.$store.state.userId,"orderRealAmt":this.goodShow.tatolPrice,"shopCart":[]};
				for (let i=0;i<this.goodShow.con.length;i++) {
					//商户数据
					let shop={"vendorIds":this.goodShow.con[i].vendorId,"vendorSnm":this.goodShow.con[i].vendorSnm,"goodsInfoList":[]};
					for(let j=0;j<this.goodShow.con[i].goodsList.length;j++){
						//商品数据
						let goods={"goodsids":this.goodShow.con[i].goodsList[j].goodsId,"goodsNum":this.goodShow.con[i].goodsList[j].goodsNum,"goodsPrice":this.goodShow.con[i].goodsList[j].price,"goodsName":this.goodShow.con[i].goodsList[j].title};
						shop.goodsInfoList.push(goods);
					}
					params.shopCart.push(shop);
				};
				//返回格式化后的参数
				return params;
			},
			//提交订单
			"sumbitOrder"(ev){
				$(ev.target).attr("disabled",true);	
				let params=this.sumbitParams();
				this.$store.state.setData.addOrderDt(params).then((result)=>{
					let promptText;
					let addFn=false;
					let flag=false;
					if(result){
						//根据返回状态码，选择执行方式
						switch(result.retCode){
							case "000000":
							//如果为购物车页面进入，删除相应购物车
								if(this.$route.params.Way!="buyNow"){
									this.delGoods();
								};
								//设置订单列表返回目标标志码
								this.$store.state.orderBack=true;
						        mui.confirm("确认付款？","",["是","否"],(e)=>{
						        	if(e.index==0){
										let params={'ids':result.data.pyBigGoodsorder.ids,'userIds': this.$store.state.userId,'transactionid':this.goodShow.order};
						        		this.$store.state.setData.orderPay(params).then((result)=>{
											if(result){
												//给弹出框显示文本赋值
								        		promptText="付款成功";
								        		//定时器加载函数
												addFn=()=>{
								        			this.$router.push("/user/myorder/all");
								        		};
											}else{
								        		promptText="系统繁忙，请稍后再试";
								        		addFn=null;
											}
											flag=true;
											//调用弹出框
							        		this.modalTigger(promptText,this.timeout,addFn,result.retCode,ev.target);
										});
						        	}else{
						        		//弹出框是否调用标志位
						        		flag=false;
						        		this.$router.push("/user/myorder/pay");
						        	}
						        });
						        break;
						    case "999999":
						        promptText="系统繁忙，请稍后再试";
						        flag=true;
						        break;
						    case "900010":
						        promptText=result.retMsg;
						        flag=true;
						        addFn=()=>{
						        	$(ev.target).attr("disabled","disabled");
						        };
						        break;
						    case "900011":
						        promptText=result.retMsg;
						        flag=true;
						        break;
						    case "900012":
						        promptText=result.retMsg;
						        flag=true;
						        break;
						    case "900013":
						        promptText="你购买的商品数量超过库存";
						        flag=true;
						        addFn=function(){
						        	$(ev.target).attr("disabled","disabled");
						        };
						        break;
						    default:promptText="系统繁忙，请稍后再试";
						        flag=true;
						}
					}else{
						promptText="系统繁忙，请稍后再试";
						flag=true;
					};
					if(flag){
						this.modalTigger(promptText,this.timeout,addFn,result.retCode,ev.target);
					}
				})
			},
			//弹出窗切换，promptText：弹出窗显示文本，timeout：定时器，addFn：定时器增加触发函数，retCode：接口返回码，dom：禁用标签对象
			"modalTigger"(promptText,timeout,addFn,retCode,dom){
				clearTimeout(timeout);
				$("#modal>span").html(promptText);
				if(addFn&&retCode!=="000000"){
						addFn();
				};
				$("#modal").css("display","block");
				 timeout=setTimeout(function(){
					$("#modal").css("display","none");
					if(dom){
						$(dom).attr("disabled",false);
					}	
					if(addFn&&retCode=="000000"){
						addFn();
					};
				},2000);
			},
			//地址信息展示
			"addressListShow"(){
				let _this=this;
				this.$store.state.getData.addressListDt(this.$store.state.userId).then((result)=>{
					if(result[0]){
						//如果当前地址id存在，显示此id地址
						if(this.$store.state.addressIdNowDt){
							this.addressShowDt=result.filter(function(item){
								if(item.addressId==_this.$store.state.addressIdNowDt){
									return true;
								}else{
									return false;
								}
							})[0];
						}else{
							//否则显示用户地址列表第一个数据
							this.addressShowDt=result[0];
						}
						//对齐地址表单左右内容
						this.aligned(".submit-order-address");
					}else{
						//地址信息显示切换
						$(".submit-order-address").css("display","none");
						$(".submit-order-address-v").css("display","block");
						this.aligned(".submit-order-address-v");
					}
				});
			},
			//商品列表信息展示
			"goodsListShow"(){
				//如果不为立即购买进入当前页面
				if(this.$route.params.Way!="buyNow"){
					//获取购物车列表数据
					let lists=this.$store.state.lists;
					let data={"tatolPrice":this.$store.state.totalPrice,"order":this.$store.state.order,"con":[]};
					for(let key in lists){
						let vendor={"vendorId":key.substring(0,key.indexOf("#")),"vendorSnm":key.substring(key.indexOf("#")+1),"goodsList":[]};
						for(let l=0;l<lists[key].length;l++){
							//插checked字段为true的商品
							if(lists[key][l].checked==true){
								lists[key][l].filepath=lists[key][l].filepath.split(",");
								vendor.goodsList.push(lists[key][l]);
							}
						}
						//如果商户有商品，加入显示列表
						if(vendor.goodsList.length){
							data.con.push(vendor);
						}
					}
					this.goodShow=data;
					//如果为立即购买进入当前页面
				}else{
					//通过商品id获取展示的商品信息
					this.$store.state.getData.wareInfoDt(this.$store.state.buyNowId).then((result)=>{
						let data={"tatolPrice":this.$store.state.buyNowNum*result.price,"order":this.$store.state.order,"con":[{"vendorId":result.vendorids,"vendorSnm":result.vendorSnm,"goodsList":[{"goodsId":result.ids,"title":result.title,"disPrice":result.disPrice,"filepath":result.filepath,"goodsNum":this.$store.state.buyNowNum,"price":result.price}]}]};
						this.goodShow=data;
					});
				}
			},
			//删除购物车
			"delGoods"(){
				//获取当前选中的购物车列表
				let lists=this.$store.state.lists;
				let reData = [];
				for( let x in lists){
				   lists[x].forEach((item)=>{
				   	//如果商品的checked字段为true，删除对应商品
					   	if(item.checked==true){
					   		var data = {
								"userId" : this.$store.state.userId,
								"id" : item.ids,
								"goodsId" : item.goodsId,
								"goodsNum":item.goodsNum
							};
							reData.push(data);
					   	}		
				   })
				}
				this.$store.state.setData.deleteShopCartDt(reData);
			},
			//商品详情页面跳转
			"jumpGoods"(ids){
				this.$store.state.getData.wareInfoDt(ids).then((result)=>{
					if(result){
						//如果商品存在跳转到商品详情页面
						if(result.status==1&&result.reviewStatues==1){
							this.$router.push("/pClass/gClass/details/"+ids);
						}else{
							//否则弹出提示框
							this.modalTigger("商品已下架，重新购买",this.timeout,()=>{
								this.$router.push("/Main");
							},"000000",false);
						}
					}
				});
			}
		},
		created(){
			//加载商品列表信息
			this.goodsListShow();
			//加载地址列表信息
			this.addressListShow();
		},
		mounted(){
			//实现地址左右内容对齐
			this.aligned(".submit-order-address");
			$(".footer").css("display","none");
		},
		destroyed(){
			$(".footer").css("display","block");
		}
	}
</script>

<style>
	@import url("../../../common/css/ui-nav.css");
	@import url("../../../common/css/submit-order.css");
	@import url("../../../common/css/modal.css");
</style>
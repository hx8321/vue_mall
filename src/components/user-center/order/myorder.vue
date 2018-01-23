<template>
	<div class="myorder">
		<myordernav></myordernav>
		<div class="myorder-content public-margint">
			<div class="mui-segmented-control mui-segmented-control-inverted  mui-segmented-control-negative white">
				<a :class="{'mui-control-item':true,'mui-active':active[0]}" href="#myorder-all">全部</a>
				<a :class="{'mui-control-item':true,'mui-active':active[1]}" href="#myorder-pay">待付款</a>
				<a :class="{'mui-control-item':true,'mui-active':active[2]}" href="#myorder-send">待发货</a>
				<a :class="{'mui-control-item':true,'mui-active':active[3]}" href="#myorder-receive">待收货</a>
			</div>
			<ul id="myorder-all" :class="{'mui-control-content':true,'white':true,'mui-active':active[0]}">
				<li  class="mui-scroll-wrapper">
					<div class="mui-scroll">
						<ul>
							<li v-for="payingItem in orderListDt.unpaidOrder">
								<ul :tab='payingItem.ids'  :data-transactionid="payingItem.transactionid">
									<li class="order-header">
										<img src="../../../assets/shopping-mall.png"/>
										<span>微商城</span>
										<span>等待买家付款</span>
									</li>
									<li class="order-content" v-for="childItem in payingItem.pyChildGoodsorders" @tap="orderInfo('unpaidOrder',payingItem.ids)">
										<div>
											<img :src="imgUrl+childItem.filepath"/>
										</div>
										<div>
											<p>{{childItem.goodsTitle}}</p>
											<!--<p>均码</p>-->
											<p>
												<span class="fontRed">￥{{childItem.goodsPrice|decimal}}</span>
												<span class="fontsilver fontsmall" v-if="childItem.orderRealAmtOld">￥{{childItem.orderRealAmtOld|decimal}}</span>
												<span>×{{childItem.goodsNum}}</span>
											</p>
										</div>
									</li>
									<li class="order-data">
										共{{payingItem.orderTotalNum}}件商品 合计：<span class="fontRed">￥{{payingItem.orderTotalAmt|decimal}}</span>（含运费￥0.00）
									</li>
									<li class="order-control">
										<span @tap="updateOrderState($event)">取消订单</span>
										<span @tap="pay($event,payingItem.ids,payingItem.transactionid)">付款</span>
									</li>
								</ul>
							</li>
							
							<li v-for="cancelItem in orderListDt.cancelOrder">
								<ul :tab='cancelItem.ids' :data-transactionid="cancelItem.transactionid">
									<li class="order-header">
										<img src="../../../assets/shopping-mall.png"/>
										<span>微商城</span>
										<span>交易关闭</span>
									</li>
									<li class="order-content" v-for="childItem in cancelItem.pyChildGoodsorders" @tap="orderInfo('cancelOrder',cancelItem.ids)">
										<div>
											<img :src="imgUrl+childItem.filepath"/>
										</div>
										<div>
											<p>{{childItem.goodsTitle}}</p>
											<!--<p>均码</p>-->
											<p>
												<span class="fontRed">￥{{childItem.goodsPrice|decimal}}</span>
												<span class="fontsilver fontsmall" v-if="childItem.orderRealAmtOld">￥{{childItem.orderRealAmtOld|decimal}}</span>
												<span>×{{childItem.goodsNum}}</span>
											</p>
										</div>
									</li>
									<li class="order-data">
										共{{cancelItem.orderTotalNum}}件商品 合计：<span class="fontRed">￥{{cancelItem.orderTotalAmt|decimal}}</span>（含运费￥0.00）
									</li>
									<li class="order-control">
										<span @tap="updateOrderState($event)">删除订单</span>
									</li>
								</ul>
							</li>
							
							<li v-for="payedItem in orderListDt.paymentOrder">
								<ul :tab='payedItem.ids' :data-bigorderId="payedItem.bigorderId">
									<li class="order-header">
										<img src="../../../assets/shopping-mall.png"/>
										<span>{{payedItem.vendorSnm}}</span>
										<span>交易成功</span>
									</li>
									<li class="order-content"  v-for="childItem in payedItem.pyChildGoodsorders" @tap="orderInfo('paymentOrder',payedItem.ids)">
										<div>
											<img :src="imgUrl+childItem.filepath"/>
										</div>
										<div>
											<p>{{childItem.goodsTitle}}</p>
											<!--<p>均码</p>-->
											<p>
												<span class="fontRed">￥{{childItem.goodsPrice|decimal}}</span>
												<span class="fontsilver fontsmall" v-if="childItem.orderRealAmtOld">￥{{childItem.orderRealAmtOld|decimal}}</span>
												<span>×{{childItem.goodsNum}}</span>
											</p>
										</div>
									</li>
									<li class="order-data">
										共{{payedItem.orderTotalNum}}件商品&nbsp;合计：<span class="fontRed">￥{{payedItem.orderTotalAmt|decimal}}</span>（含运费￥0.00）
									</li>
									<li class="order-control">
										<span @tap="updateOrderState($event)">删除订单</span>
									</li>
								</ul>
							</li>
							<li class="prompting" v-show="showMore">没有更多订单</li>
						</ul>
					</div>
				</li>
				
			</ul>
			<ul id="myorder-pay" :class="{'mui-control-content':true,'white':true,'mui-active':active[1]}">
				<li  class="mui-scroll-wrapper">
					<div class="mui-scroll">
						<ul>
							<li v-for="payingItem in orderListDt.unpaidOrder">
								<ul :tab='payingItem.ids'  :data-transactionid="payingItem.transactionid">
									<li class="order-header mui-input-row mui-checkbox mui-left">
										<img src="../../../assets/shopping-mall.png"/>
										<span>微商城</span>
										<span>等待买家付款</span>
										<!--<input name="checkbox" value="Item 1" type="checkbox" @click="tiggertotup($event)">-->
									</li>
									<li class="order-content" v-for="childItem in payingItem.pyChildGoodsorders" @tap="orderInfo('unpaidOrder',payingItem.ids)">
										<div>
											<img :src="imgUrl+childItem.filepath"/>
										</div>
										<div>
											<p>{{childItem.goodsTitle}}</p>
											<!--<p>均码</p>-->
											<p>
												<span class="fontRed">￥{{childItem.goodsPrice|decimal}}</span>
												<span class="fontsilver fontsmall" v-if="childItem.orderRealAmtOld">￥{{childItem.orderRealAmtOld|decimal}}</span>
												<span>×{{childItem.goodsNum}}</span>
											</p>
										</div>
									</li>
									<li class="order-data">
										共{{payingItem.orderTotalNum}}件商品 合计：<span class="fontRed">￥{{payingItem.orderTotalAmt|decimal}}</span>（含运费￥0.00）
									</li>
									<li class="order-control">
										<span @tap="updateOrderState($event)">取消订单</span>
										<span @tap="pay($event,payingItem.ids,payingItem.transactionid)">付款</span>
									</li>
								</ul>
							</li>
							<li class="totup">
								<span>合并付款</span>
							</li>
							<li class="prompting" v-show="showMore">没有更多订单</li>
						</ul>
					</div>
				</li>
			</ul>
			<ul id="myorder-send" :class="{'mui-control-content':true,'white':true,'mui-active':active[2]}">
				<li  class="mui-scroll-wrapper">
					<div class="mui-scroll">
						<ul>
							<li class="prompting">没有更多订单</li>
						</ul>
					</div>
				</li>
			</ul>
			<ul id="myorder-receive" :class="{'mui-control-content':true,'white':true,'mui-active':active[3]}">
				<li class="mui-scroll-wrapper">
					<div class="mui-scroll">
						<ul>
							<li class="prompting">没有更多订单</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
		<div class="modal"  id="modal">
	         <span></span>
	  </div>
	</div>
</template>

<script>
	import {imgUrl} from '@/config/env'
	import myordernav from '@/components/user-center/order/myorder-nav'
	export default{
		data:function(){
			return{
				//图片路径前缀
				imgUrl,
//				tabarr:{},
//				tiggertab:false,
				//订单删除记录
				removeorder:'',
				//用于存放tab的选项状态
				active:[false,false,false,false],
				//订单列表数据
				orderListDt:[],
				//定时器
				timeout:"",
				//按钮状态
				buttonFlag:true,
				//当前页码
				page:2,
				//更多元素显示标志
				showMore:false,
				//全部订单列表数据
				orderListAll:[],
				//上拉条数
				upNum:3,
				//剩余订单列表
				orderListRemain:{"unpaidOrder":[],"cancelOrder":[],"paymentOrder":[]},
				//下拉条数
				dNum:5
			}
		},
		components:{
			//订单列表导航头组件
			myordernav
		},
		methods:{
			//合并付款div切换
//			"tiggertotup"(event){
//				this.tabarr[$(event.target).parent().parent().attr("tab")]=event.target.checked;
//				this.tiggertab=false;
//				for (var key in this.tabarr) {
//					if(this.tabarr[key]){
//						this.tiggertab=true;
//						break;
//					}
//				}
//				if(this.tiggertab){
//					$(".totup").css("display","block");
//				}else{
//					$(".totup").css("display","none");
//				}
//			},
			//取消和删除订单
			"updateOrderState"(event){
				let _this=this;
				if(this.buttonFlag){
					//按钮状态设为false
					this.buttonFlag=false;
					//修改当前按钮字体样式
					$(event.target).attr("style","color: slategray;");
					//如果为取消
					if($(event.target).html()=="取消订单"){
						mui.confirm("确认取消订单？","",["是","否"],(e)=>{
							if (e.index == 0) {
								//获取订单号
								this.removeorder=$(event.target).parents("ul").eq(0).attr("tab");
								let params={'ids':this.removeorder,'transactionid':$(event.target).parents("ul").eq(0).attr("data-transactionid"),'userIds':this.$store.state.userId};
								this.$store.state.setData.cancelOrder(params).then((result)=>{
									if(result){
										//为非全部订单选项卡，直接移除
										if($(event.target).parents("ul").eq(1).attr("id")!="myorder-all"){
											$(event.target).parents("li").eq(1).remove();
										}else{
											//如果为全部订单选项卡，移除其它选项卡对应的订单
											$("#myorder-pay>li,#myorder-send>li,#myorder-receive>li").each(function(){
												if($(this).children("ul")){
													if($(this).children("ul").attr("tab")==_this.removeorder){
														$(this).remove();
													}
												}
											});
										};
										//修改对应取消订单标签的显示
										$("#myorder-all>li").each(function(){
											if($(this).children("ul")){
												if($(this).children("ul").attr("tab")==_this.removeorder){
													$(this).children("ul").children(".order-header").children("span").eq(1).html("交易关闭");
													$(this).children("ul").children(".order-control").children("span").eq(0).html("删除订单");
													$(this).children("ul").children(".order-control").children("span").eq(1).remove();
												}
											}
										});
										this.buttonFlag=true;
									}else{
										//调用弹出框提示
										this.modalTigger("系统繁忙，请稍后再试",event.target);
									}
								});
							}else{
								//移除当前触发对象的样式
								$(event.target).removeAttr("style");
								this.buttonFlag=true;
							}
						});
						//如果为删除
					}else if($(event.target).html()=="删除订单"){
						mui.confirm("确认删除订单？","",["是","否"],(e)=>{
							if (e.index == 0) {
								let type=$(event.target).parents("ul").eq(0).find(".order-header>span:last-of-type").html();
								//判断是付款订单删除，还是未付款订单删除
								if(type=="交易成功"){
									let params={'bigorderId': $(event.target).parents("ul").eq(0).attr("data-bigorderId"),'ids':$(event.target).parents("ul").eq(0).attr("tab"),'userIds': this.$store.state.userId};
									this.$store.state.setData.deleteOrder("main",params).then((result)=>{
										if(result){
											$(event.target).parents().eq(2).remove();
											this.buttonFlag=true;
										}else{
											this.modalTigger("系统繁忙，请稍后再试",event.target);
										}
									});
								}else{
									let params={'ids':$(event.target).parents("ul").eq(0).attr("tab"),'userIds': this.$store.state.userId,'transactionid':$(event.target).parents("ul").eq(1).attr("data-transactionid")};
									this.$store.state.setData.deleteOrder("big",params).then((result)=>{
										if(result){
											$(event.target).parents().eq(2).remove();
											this.buttonFlag=true;
										}else{
											this.modalTigger("系统繁忙，请稍后再试",event.target);
										}
									});
								}
							}else{
								$(event.target).removeAttr("style");
								this.buttonFlag=true;
							}
						});
					}
				}
			},
			//切换默认显示tab项
			"activeInit"(params){
				switch(params){
					case 'all':this.$data.active[0]=true;
					break;
					case 'pay':this.$data.active[1]=true;
					break;
					case 'send':this.$data.active[2]=true;
					break;
					case 'receive':this.$data.active[3]=true;
					break;
				}
			},
			//订单详细信息跳转
			"orderInfo"(type,id){
				this.$store.state.orderNowId=id;
				this.$router.push("/user/myorder/orderInfo/"+type);
			},
			//订单付款
			"pay"(event,orderId,transactionId){
				if(this.buttonFlag){
					this.buttonFlag=false;
					$(event.target).attr("style","color: slategray;border-color:slategray;");
					mui.confirm("确认付款？","",["是","否"],(e)=>{
			        	if(e.index==0){
			        		let params={'ids':orderId,'userIds': this.$store.state.userId,'transactionid':transactionId};
			        		//调用订单付款接口
			        		this.$store.state.setData.orderPay(params).then((result)=>{
								if(result){
									//成功重新加载订单列表
									this.$store.state.getData.orderListDt(this.$store.state.userId).then((result)=>{
										if(result){
											//格式化订单列表数据赋值给orderListDt
											this.orderListDt=this.dataFormat(result);
											$(event.target).removeAttr("style");
											this.buttonFlag=true;
										}
									});
								}else{
									this.modalTigger("系统繁忙，请稍后再试",event.target);
									$(event.target).removeAttr("style");
									this.buttonFlag=true;
								}
							});
			        	}else{
			        		$(event.target).removeAttr("style");
			        		this.buttonFlag=true;
			        	}
			        });
				}
			},
			//弹出窗切换
			"modalTigger"(promptText,dom){
				clearTimeout(this.timeout);
				$("#modal>span").html(promptText);
				$("#modal").css("display","block");
				 this.timeout=setTimeout(()=>{
					$("#modal").css("display","none");
					$(dom).removeAttr("style");
					this.buttonFlag=true;
				},2000);
			},
			//数据格式化
			"dataFormat"(result){
				//取消订单
				let cancelOrder=[];
				//删除存放标志位
				let deleteFlag=[];
				for(let i=0;i<result.unpaidOrder.length;i++){
					//根据paystatus判断订单是为付款订单还是取消状态订单
					if(result.unpaidOrder[i].payStatus==2){
						//将取消状态订单存入cancleorder
						cancelOrder.push(result.unpaidOrder[i]);
						//存储删除标志，即取消状态订单在原来未付款订单数组中坐标
						deleteFlag.push(i);
					}
				}
				//删除存放标志位是否存在
				if(deleteFlag.length){
					for(let l=0;l<deleteFlag.length;l++){
						if(l){
							//删除对应的取消状态订单
							result.unpaidOrder.splice(deleteFlag[l]-l,1);
						}else{
							result.unpaidOrder.splice(deleteFlag[l],1);
						}
					}
				}
				result.cancelOrder=cancelOrder;
				//循环商品的num字段，求和获得订单总数
				for(let x=0;x<result.paymentOrder.length;x++){
					let orderTotalNum=0;
					for(let y=0;y<result.paymentOrder[x].pyChildGoodsorders.length;y++){
						orderTotalNum+=result.paymentOrder[x].pyChildGoodsorders[y].goodsNum;
					}
					result.paymentOrder[x].orderTotalNum=orderTotalNum;
				}
				return result;
			},
			//重置orderListRemain剩余订单列表
			"remainInit"(){
				for(let key in this.orderListRemain){
					this.orderListRemain[key]=[];
				}
			},
			//控制刷新加载数目
			"downLoadNum"(num){
				let unpaidOrder=[];
				//初始化备订单信息
				this.remainInit();
				//判断未付款订单是否存在
				if(this.orderListAll.unpaidOrder.length>0){
					//遍历未付款订单
					for(let i=0;i<this.orderListAll.unpaidOrder.length;i++){
						//如果i大于刷新数，加入剩余订单列表
						if(i>=num){
							this.orderListRemain.unpaidOrder.push(this.orderListAll.unpaidOrder[i]);
						}else{
							//否则加入显示列表
							unpaidOrder.push(this.orderListAll.unpaidOrder[i]);
						}
					}
					this.orderListDt.unpaidOrder=unpaidOrder;
				}
				//如果未付款订单数小于刷新数目
				if(unpaidOrder.length<num){
					let cancelOrder=[];
					//如果取消状态订单存在
					if(this.orderListAll.cancelOrder.length>0){
						for(let l=0;l<this.orderListAll.cancelOrder.length;l++){
							//l大于刷新订单数减去未付款订单数，加入剩余订单列表
							if(l>=num-unpaidOrder.length){
								this.orderListRemain.cancelOrder.push(this.orderListAll.cancelOrder[l]);
							}else{
								//否则加入显示列表
								cancelOrder.push(this.orderListAll.cancelOrder[l]);
							}
						}
						this.orderListDt.cancelOrder=cancelOrder;
					}
					//如果未付款和取消状态订单数小于刷新数且付款订单为真
					if(unpaidOrder.length+cancelOrder.length<num&&this.orderListAll.paymentOrder.length>0){
						let paymentOrder=[];
						for(let x=0;x<this.orderListAll.paymentOrder.length;x++){
							//如果x大于刷新订单数减去未付款与取消状态订单数和，加入剩余订单列表
							if(x>=num-(unpaidOrder.length+cancelOrder.length)){
								this.orderListRemain.paymentOrder.push(this.orderListAll.paymentOrder[x]);
							}else{
								//否则加入显示列表
								paymentOrder.push(this.orderListAll.paymentOrder[x]);
							}
						}
						this.orderListDt.paymentOrder=paymentOrder;
					}
				}
			},
			//下拉刷新
			"downLoad"(loadObj) {
				clearTimeout(this.timeout);
				this.showMore=false;
				this.timeout=setTimeout(()=>{
					this.$store.state.getData.orderListDt(this.$store.state.userId).then((result)=>{
						if(result){
							this.orderListAll=this.dataFormat(result);
							this.downLoadNum(this.dNum);
						}
						this.showMore=true;
						mui(loadObj).pullRefresh().endPulldownToRefresh();
					});
				},1500);
			},
			//控制加载数目
			"uploadNum"(upNum,dNum,loadObj){
				let unpaidDeNum=0;
				//如果剩余列表操作订单数据，优先加载剩余列表数据
				if(this.orderListRemain.unpaidOrder.length>0){
					//循环到指定的加载数
					for(let i=0;i<upNum;i++){
						//如果i等于剩余列表未付款状态列表长度，退出循环
						if(i==this.orderListRemain.unpaidOrder.length){
							break;
						};
						//增加未付款加载订单数
						unpaidDeNum=i+1;
						//将剩余列表对应的订单加入加载列表中
						this.orderListDt.unpaidOrder.push(this.orderListRemain.unpaidOrder[i]);
					}
					//删除剩余列表对应的订单
					this.orderListRemain.unpaidOrder.splice(0,unpaidDeNum);
				};
				//如果为付款加载的订单未足加载数进入
				if(unpaidDeNum<upNum){
					let cancelDeNum=0;
					let paymentDeNum=0;
					if(this.orderListRemain.cancelOrder.length>0){
						for(let l=0;l<upNum-unpaidDeNum;l++){
							if(l==this.orderListRemain.cancelOrder.length){
								break;
							};
							cancelDeNum=l+1;
							this.orderListDt.cancelOrder.push(this.orderListRemain.cancelOrder[l]);
						};
						this.orderListRemain.cancelOrder.splice(0,cancelDeNum);
					};
					//如果未付款加载的订单数与取消状态的加载的订单数之和小于加载数且剩余订单列表付款订单存在进入
					if(unpaidDeNum+cancelDeNum<upNum&&this.orderListRemain.paymentOrder.length>0){
						for(let x=0;x<upNum-(unpaidDeNum+cancelDeNum);x++){
							if(x==this.orderListRemain.paymentOrder.length){
								break;
							};
							paymentDeNum=x+1;
							this.orderListDt.paymentOrder.push(this.orderListRemain.paymentOrder[x]);
						}
						this.orderListRemain.paymentOrder.splice(0,paymentDeNum);
					};
					//如果剩余订单列表的全部订单未满足加载订单数进入
					if(unpaidDeNum+cancelDeNum+paymentDeNum<upNum){
						//获取需要查询的订单数
						let queryNum=upNum-(unpaidDeNum+cancelDeNum+paymentDeNum);
						//请求分页接口
						this.$store.state.getData.orderPageDt({'userIds':this.$store.state.userId,'pageNumber':this.page,'pageSize':queryNum}).then((result)=>{
							if(result[0]){
								for(let i=0;i<result.length;i++){
									this.orderListDt.paymentOrder.push(result[i]);
								}
								for(let x=0;x<this.orderListDt.paymentOrder.length;x++){
									let orderTotalNum=0;
									for(let y=0;y<this.orderListDt.paymentOrder[x].pyChildGoodsorders.length;y++){
										orderTotalNum+=this.orderListDt.paymentOrder[x].pyChildGoodsorders[y].goodsNum;
									}
									this.orderListDt.paymentOrder[x].orderTotalNum=orderTotalNum;
								}
								this.page+=1;
							}
							mui(loadObj).pullRefresh().endPullupToRefresh();
							this.showMore=true;
						});
					}else{
						//上拉加载禁用
						mui(loadObj).pullRefresh().endPullupToRefresh();
						//显示没有更多数据标签
						this.showMore=true;
					}
				}
			},
//			上拉加载
			"upload"(loadObj){
				clearTimeout(this.timeout);
				this.showMore=false;
				this.timeout=setTimeout(()=>{
					this.uploadNum(this.upNum,this.dNum,loadObj);
				},1500);
			},
//			下路控件自动触发判断函数
			"bootUp"(obj){
				if(this.$route.params.order=="all"&&$(obj).parent().attr("id")=="myorder-all"){
					return true;
				}else if(this.$route.params.order=="pay"&&$(obj).parent().attr("id")=="myorder-pay"){
					return true;
				}else{
					return false;
				}
			}
		},
		created(){
			//初始化mui插件
			mui.init();
			//切换默认显示tab项
			this.activeInit(this.$route.params.order);
			//mui插件返回事件重置
			mui.back=()=>{
		        if (typeof mui.options.beforeback === 'function') {
		            if (mui.options.beforeback() === false) {
		                return;
		            }
		         }
		        //根据返回标志判断返回页面
		       if (this.$store.state.orderBack){
		       		this.$router.push("/user");	
		       }else {
		       		mui.doAction('backs'); // 返回上一级
		       }
		   };
		},
		mounted(){
			let _this=this;
			//区域滚动初始化
			mui('.mui-scroll-wrapper').scroll({
				bounce: false,
				deceleration:0.1,
				indicators: false
			});
			//加载主键初始化
			$(".mui-scroll-wrapper").each(function(index,e){
				mui(this).pullRefresh({
					down: {
						style:'circle',
						auto:_this.bootUp(this),
						callback:()=>{
							_this.downLoad(this);
						}
					},
					up: {
						contentrefresh : "正在加载...",
						callback: ()=>{
							_this.upload(this);
						}
					}
				});
			});
			$(".footer").css("display","none");
		},
		destroyed(){
			$(".footer").css("display","block");
		}
	}
</script>

<style>
	@import url("../../../common/css/myorder.css");
	@import url("../../../common/css/modal.css");
</style>
<template>
	<div class="myComment">
		<header class="mui-bar mui-bar-nav myComment-head">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">我的评价</h1>
		</header>
		<ul class="myComment-content public-margint">
			<li class="mcc-user">
				<div>
					<img src="../../../assets/已登录.png"/>
					{{nickName|omit}}
				</div>
				<div>
					<button @tap="active">写评价</button>
				</div>
			</li>
			<li class="mcc-content">
				<div class="mui-segmented-control mui-segmented-control-inverted  mui-segmented-control-negative white">
					<a class="mui-control-item mui-active" href="#commented">已评价</a>
					<a class="mui-control-item" href="#commenting">待评价</a>
				</div>
				<ul id="commented" class="mui-control-content white mui-active">
					<li class="mui-scroll-wrapper" flag="commented">
						<div class="mui-scroll">
							<div class="commented-content">
								<div class="commented-item" v-for="item in commentedList.rows">
									<ul class="item-content">
										<li class="itemc-user">
											<img src="../../../assets/已登录.png"/>
											<span>{{nickName|omit}}</span>
										</li>
										<li class="itemc-score">
											<img src="../../../../static/img/star1.png" v-for="imgIt in item.count"/>
										</li>
										<li class="itemc-data fontsilver">
											<span>{{item.createtime|dateFormat}}</span>
										</li>
										<li class="itemc-content">
											{{item.content}}
										</li>
									</ul>
									<ul class="item-goods">
										<li class="itemg-img">
											<img :src="imgUrl+item.goodspath"/>
										</li>
										<li class="itemg-content">
											<p>{{item.goodsfile}}</p>
										</li>
									</ul>
								</div>
								<div class="unData" v-show="commentedMore">没有更多数据</div>
								<loading v-show="commentedLoad"></loading>
							</div>
						</div>
					</li>
				</ul>
				<ul id="commenting" class="mui-control-content white">
					<li class="mui-scroll-wrapper" flag="commenting">
						<div class="mui-scroll">
							<div class="commenting-connent">
								<ul class="commenting-item" v-for="item in commentingList.rows">
									<li class="item-head">订单号：{{item.transactionid}}</li>
									<li class="item-content">
										<div>
											<img :src="imgUrl+item.goodspath"/>
										</div>
										<div>
											<p>{{item.goodsfile}}</p>
										</div>
									</li>
									<li class="item-write">
										<button @tap="jumpComment(item.transactionid)">去评价</button>
									</li>
								</ul>
								<div class="unData" v-show="commentingMore">没有更多数据</div>
								<loading v-show="commentingLoad"></loading>
							</div>
						</div>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
	import loading from '@/components/loading/loading'
	import {imgUrl} from '@/config/env'
	export default{
		data:function(){
			return {
				//已评价页码
				paged:1,
				//数据加载行数
				rows:3,
				//未评价页数
				paging:1,
				//已评价列表
				commentedList:"",
				//未评价列表
				commentingList:"",
				//图片路径前缀
				imgUrl,
				//定时器
				timeOut:"",
				//用户昵称
				nickName:this.$store.state.nickName,
				//已评价没有数据标签显示标志
				commentedMore:false,
				//未评价没有数据标签显示标志
				commentingMore:false,
				//已评价加载动画标志
				commentedLoad:true,
				//未评价加载动画标志
				commentingLoad:true
			}
		},
		components:{
			//加载动画组件
			loading
		},
		created(){
			//初始化已评价数据
			this.getCommented(()=>{
				this.commentedLoad=false;
				this.commentedMore=true;
			});
			//初始化未评价数据
			this.getCommenting(()=>{
				this.commentingLoad=false;
				this.commentingMore=true;
			});
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
						callback:()=>{
							//判断目前触发插件的选项卡，关闭对应的没有数据标签
							if($(this).attr("flag")=="commented"){
								_this.commentedMore=false;
							}else{
								_this.commentingMore=false;
							}
							clearTimeout(_this.timeOut);
							_this.timeOut=setTimeout(()=>{
								_this.downLoad(this);
							},1500);
						}
					},
					up: {
						contentrefresh : "正在加载...",
						callback: ()=>{
							if($(this).attr("flag")=="commented"){
								_this.commentedMore=false;
							}else{
								_this.commentingMore=false;
							}
							clearTimeout(_this.timeOut);
							_this.timeOut=setTimeout(()=>{
							_this.upLoad(this);
							},1500);
						}
					}
				});
			});
			//隐藏footer
			$(".footer").css("display","none");
		},
		destroyed(){
			//恢复footer
			$(".footer").css("display","block");
		},
		methods:{
			//跳转到设置评论页面
			"jumpComment"(ids){
				for(let i=0;i<this.commentingList.rows.length;i++){
					//通过订单流水号将商品详细存在vuex变量中，以方便页面加载
					if(this.commentingList.rows[i].transactionid==ids){
						this.$store.state.commentGoods=this.commentingList.rows[i];
						break;
					}
				}
				this.$router.push('/myComment/writeComment/'+ids);
			},
			//触发最后一个选项卡
			"active"(){
				$(".mui-control-item:last-of-type").addClass("mui-active").siblings().removeClass("mui-active");
				$(".mui-control-content:last-of-type").addClass("mui-active").siblings().removeClass("mui-active");
			},
			//获取已评价数据，fn：执行函数
			"getCommented"(fn){
				this.paged=1;
				let params={"userid":this.$store.state.userId,"isEvaluate":1,"page":this.paged,"rows":this.rows};
				this.$store.state.getData.commentListDt(params).then((result)=>{
					if(result&&result.rows[0]){
						this.commentedList=result;
					}
					if(fn){
						fn();
					}
				});
			},
			//获取未评价数据，fn：执行函数
			"getCommenting"(fn){
				this.paging=1;
				let params={"userid":this.$store.state.userId,"isEvaluate":0,"page":this.paging,"rows":this.rows};
				this.$store.state.getData.commentListDt(params).then((result)=>{
					if(result&&result.rows[0]){
						this.commentingList=result;
					}
					if(fn){
						fn();
					}
				});
			},
			//添加已评价数据
			"pushCommented"(fn){
				//如果为第一页，修改为第二页
				if(this.paged==1){
					this.paged=2
				}
				let params={"userid":this.$store.state.userId,"isEvaluate":1,"page":this.paged,"rows":this.rows};
				this.$store.state.getData.commentListDt(params).then((result)=>{
					if(result&&result.rows[0]){
						for(let i=0;i<result.rows.length;i++)
						this.commentedList.rows.push(result.rows[i]);
						//每次加载成功，页数加一
						this.paged+=1
					}
					if(fn){
						fn();
					}
				});
			},
			//添加未评价数据
			"pushCommenting"(fn){
				if(this.paging==1){
					this.paging=2
				}
				let params={"userid":this.$store.state.userId,"isEvaluate":0,"page":this.paging,"rows":this.rows};
				this.$store.state.getData.commentListDt(params).then((result)=>{
					if(result&&result.rows[0]){
						for(let i=0;i<result.rows.length;i++)
						this.commentingList.rows.push(result.rows[i]);
						this.paging+=1
					}
					if(fn){
						fn();
					}
				});
			},
			//关闭上拉加载
			"closeUp"(obj){
				mui(obj).pullRefresh().endPullupToRefresh();
			},
			//上拉加载
			"upLoad"(obj){
				//判断触发加载所属选项卡
				if($(obj).attr("flag")=="commented"){
					this.pushCommented(()=>{
						this.closeUp(obj);
						//显示没有更多数据标签
						this.commentedMore=true;
					});
				}else{
					this.pushCommenting(()=>{
						this.closeUp(obj);
						this.commentingMore=true;
					});
				}
			},
			//关闭下拉刷新
			"closeDown"(obj){
				mui(obj).pullRefresh().endPulldownToRefresh();	
			},
			//下拉刷新
			"downLoad"(obj){
				if($(obj).attr("flag")=="commented"){
					this.getCommented(()=>{
						this.closeDown(obj);
						this.commentedMore=true;
					});
				}else{
					this.getCommenting(()=>{
						this.closeDown(obj);
						this.commentingMore=true;
					});
				}
			}
		}
	}
</script>

<style>
	@import url("../../../common/css/myComment.css");
</style>
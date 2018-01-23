<template>
	<div class="commentList">
		<header id="ui-nav" class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">评价</h1>
		</header>
		<div class="mui-scroll-wrapper public-margint">
			<div class="mui-scroll">
				<ul class="commentList-connect">
					<li class="commentList-item" v-for="item in commentList.rows">
						<ul>
							<li class="commentList-user">
								<img src="../../assets/questionMark.png"/>{{item.nickname|omit}}
							</li>
							<li class="commentList-score">
								<img src="../../../static/img/star1.png" v-for="key in item.count"/>
							</li>
							<li class="commentList-date fontsilver">
								{{item.createtime|dateFormat}}
							</li>
							<li class="commentList-content">
								{{item.content}}
							</li>
							<li class="commentList-write">
								<button type="button" class="mui-btn mui-icon mui-icon-chat"><span>评论</span></button>
							</li>
						</ul>
					</li>
					<li class="unMore" v-if="show">没有更多数据</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data:function(){
			return {
				//评价列表
				commentList:"",
				//加载页
				page:1,
				//加载条数
				row:3,
				//定时器
				timeout:"",
				//没有更多数据标签显示标志
				show:false
			}
		},
		methods:{
			//刷新数据
			"loadData"(fn){
				//设置刷新页为1
				this.page=1;
				let params={"goodsids":this.$route.params.commentGoods,"page":this.page,"rows":this.row};
				this.$store.state.getData.allCommentListDt(params).then((result)=>{
					if(result&&result.rows[0]){
						this.commentList=result;
					}
					this.show=true;
					if(fn){
						fn();	
					}
					
				});
			},
			//加载数据
			"pushData"(fn){
				//如果加载页为1，设置为2
				if(this.page==1){
					this.page=2;
				}
				let params={"goodsids":this.$route.params.commentGoods,"page":this.page,"rows":this.row};
				this.$store.state.getData.allCommentListDt(params).then((result)=>{
					if(result&&result.rows[0]){
						for(let i=0;i<result.rows.length;i++){
							this.commentList.rows.push(result.rows[i]);
						}
						this.page+=1;
					}
					this.show=true;
					if(fn){
						fn();	
					}
					
				});
			},
			//下拉刷新
			"downLoad"(){
				clearTimeout(this.timeout);
				this.timeout=setTimeout(()=>{
					this.loadData(()=>{
						mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
					})
				},1500);
			},
			//上拉加载
			"upLoad"(){
				clearTimeout(this.timeout);
				this.timeout=setTimeout(()=>{
					this.pushData(()=>{
						mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
					})
				},1500);
			}
		},
		mounted(){
			//挂载下拉刷新和上拉加载事件
			let _this=this;
			mui('.mui-scroll-wrapper').scroll({
					bounce: false,
					deceleration:0.1,
					indicators: false
			});
			mui(".mui-scroll-wrapper").pullRefresh({
				down : {
			      style:'circle',
			      auto:true,
			      callback :()=>{
			      	this.show=false;
			      	this.downLoad();
			      }
				},
				up : {
			      contentrefresh : "正在加载...",
			      callback :()=>{
					this.show=false;
			      	this.upLoad();
			      }
		    	}
			});
			//隐藏footer
			$(".footer").css("display","none");
		},
		destroyed(){
			//恢复footer
			$(".footer").css("display","block");
		}
	}
</script>

<style>
	@import url("../../common/css/ui-nav.css");
	@import url("../../common/css/commentList.css");
</style>
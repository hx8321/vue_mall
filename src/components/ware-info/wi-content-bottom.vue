<template>
	<div id="wicbottom" class="wi-content-bottom">
		<div class="mui-segmented-control mui-segmented-control-inverted  mui-segmented-control-negative white">
			<a class="mui-control-item mui-active" href="#wicb-ware">详情</a>
			<a class="mui-control-item" href="#wicb-seller">商户</a>
			<a class="mui-control-item" href="#wicb-guarantee">售后</a>
			<a class="mui-control-item" href="#wicb-comment">评价</a>
		</div>
		<div id="wicb-ware" class="mui-control-content mui-active white fontsmall">
			<div v-if="wibottom.standard">
				<p class="boderbottom">规格：{{wibottom.isDisStandard}}</p>
			</div>
			<div v-html="wibottom.content"  class="text-middle">
			</div>
		</div>
		
		<div id="wicb-seller" class="mui-control-content white fontsmall">
			<div class="text-middle">
				<p>{{wibottom.venderIntro}}</p>
			</div>
		</div>
		
		<div id="wicb-guarantee" class="mui-control-content fontsmall">
			<div class=" white">
				<!--<div class="guarantee-title">
					<span class="title-text fontsilver">
						说明
					</span>
				</div>-->
				<div class="text-middle">
					<p>{{wibottom.venderExplain}}</p>
				</div>
			</div>
		</div>
		
		<div id="wicb-comment" class="mui-control-content fontsmall">
			<div class="comment-unConnect" v-if="!(commentDt&&commentDt.rows[0])">
				暂时没有相关的评价
			</div>
			<div class="comment-connect" v-if="commentDt&&commentDt.rows[0]">
				<ul>
					<li class="comment-user">
						<img src="../../assets/questionMark.png"/>{{commentDt.rows[0].nickname|omit}}
					</li>
					<li class="comment-score">
						<img src="../../../static/img/star1.png" v-for="key in commentDt.rows[0].count"/>
					</li>
					<li class="comment-date fontsilver">
						{{commentDt.rows[0].createtime|dateFormat}}
					</li>
					<li class="comment-content" @tap="jumpPage('/details/comment/'+commentDt.rows[0].transactionid)">
						{{commentDt.rows[0].content}}
					</li>
					<li class="comment-write">
						<button type="button" @tap="jumpPage('/comment/commentList/'+wibottom.ids)">查看全部评论</button>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data:function(){
			return {
				commentDt:"",
			}
		},
		//选项卡加载数据
		props: ['wibottom'],
		methods:{
			"jumpPage"(path){
				this.$router.push(path);
			}
		},
		watch:{
			//监听wibottom对象，加载评价列表
			"wibottom"(){
				let params={"goodsids":this.wibottom.ids,"page":1,"rows":1};
				this.$store.state.getData.allCommentListDt(params).then((result)=>{
					if(result&&result.rows[0]){
						this.commentDt=result;
					}
				});
			}
		}
	}	
</script>

<style>
</style>
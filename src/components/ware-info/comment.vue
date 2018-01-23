<template>
	<div class="commentPage">
		<header class="mui-bar mui-bar-nav commentPage-head">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">评价详情</h1>
		</header>
		<div class="public-margint">
			<ul class="commentPage-content">
				<li class="cpc-user">
					<img src="../../assets/questionMark.png"/>
					<span>{{'xxxxx'|omit}}</span>
				</li>
				<!--<li class="cpc-score">
					
				</li>-->
				<li class="cpc-data fontsilver">
					<span>2017-12-13</span>
				</li>
				<li class="cpc-content">
					好啊，贵啊
				</li>
			</ul>
			<ul class="commentPage-goods">
				<li class="cpg-img">
					<img src="../../assets/questionMark.png"/>
				</li>
				<li class="cpg-content">
					<p>问号一枚</p>
					<p class="fontRed fontH">￥{{10.00|decimal}}</p>
			</li>
			</ul>
		</div>
		
	</div>
</template>

<script>
	export default{
		mounted(){
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
	@import url("../../common/css/comment.css");
</style>
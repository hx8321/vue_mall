<template>
	<div class="refund-order">
		<header id="ui-nav" class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">退换货订单</h1>
		</header>
		<ul class="refund-order-content">
			<li class="white">
				<ul>
					<li class="order-header">
						<img src="../../../assets/shopping-mall.png"/>
						<span>微商城</span>
						<span>退款成功</span>
					</li>
					<li class="order-content">
						<div>
							<img src="../../../assets/commodity1.jpg"/>
						</div>
						<div>
							<p>【优衣库-深圳】限量黑包秋季爆款</p>
							<p>均码</p>
							<p>
								<span class="fontRed">￥189.00</span>
								<span class="fontsilver fontsmall">￥200.00</span>
								<span>×1</span>
							</p>
						</div>
					</li>
					<li class="order-content">
						<div>
							<img src="../../../assets/commodity4.jpg"/>
						</div>
						<div>
							<p>【优衣库-深圳】限量白金炫酷旅行箱</p>
							<p>均码</p>
							<p>
								<span class="fontRed">￥200.00</span>
								<span class="fontsilver fontsmall">￥260.00</span>
								<span>×1</span>
							</p>
						</div>
					</li>
					<li class="order-data">
						共1件商品 合计：<span class="fontRed">￥189.00</span>（含运费￥0.00）
					</li>
					<li class="order-control">
						<span>查看详情</span>
					</li>
				</ul>
			</li>
			<li class="prompting white">没有更多订单</li>
		</ul>
	</div>
</template>

<script>
	export default{
		methods:{
			"jumpPage"(path){
				this.$router.push(path);
			}
		},
		mounted(){
			$(".footer").css("display","none");
			 $(".order-content,.order-control>span").on("tap",()=>{
			 	this.jumpPage("/user/orderInfo");
			 });
		},
		destroyed(){
			$(".footer").css("display","block");
		}
	}
</script>

<style>
	@import url("../../../common/css/ui-nav.css");
	@import url("../../../common/css/refund-order.css");
</style>
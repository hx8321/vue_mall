<template>
	<ul class="mui-bar mui-bar-nav middle-navbar white">
		<li>
			<a href="javascript:;">
				<img src="../../assets/raise.png"/>
				众筹
			</a>
		</li>
		<li>
			<a href="#">
				<img src="../../assets/integral.png"/>
				积分
			</a>
		</li>
		<li>
			<a href="#">
				<img src="../../assets/consulting.png"/>
				咨询
			</a>
		</li>
		<li>
			<a href="#/user/myorder/all">
				<img src="../../assets/order.png"/>
				订单
			</a>
		</li>
	</ul>
</template>

<script>
</script>

<style>
	.middle-navbar{
		overflow: hidden;
		position: relative;
		height: auto;
	}
	.middle-navbar>li{
		float: left;
		width: 25%;
		text-align: center;
		padding: 0.285714rem;
	}
	.middle-navbar>li>a{
		color: #7e8c8d;
    	font-size: 1.142857rem;
	}
	.middle-navbar>li img{
		display:block;
		width: 34%;
		margin: 0 auto;
		margin-bottom: 0.285714rem;
	}
	@media only screen and (max-width:360px) {
		.middle-navbar>li>a{
			color: #7e8c8d;
	    	font-size: 1.314285rem;
		}
	}
</style>
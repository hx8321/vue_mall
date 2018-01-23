<template>
	<header id="wiheader" class="mui-bar mui-bar-transparent">
		<a class="mui-icon mui-icon-home mui-pull-left"  href="#/main"></a>
		<a class="mui-icon iconfont icon-icon mui-pull-right" href="#/shopCart"></a>
	</header>
</template>

<script>
</script>

<style>
	#wiheader{
		padding-top: 0.857142rem;
	}
	#wiheader .icon-icon:before,#wiheader .mui-icon-home:before{
		font-size: 32px;
	}
	#wiheader .mui-icon-home:before{
		font-size: 30px;
	}
	#wiheader a{
		background-color: black;
		border-radius: 50%;
		width: 44px;
		height: 44px;
		opacity: 0.5;
		color: white;
		text-align: center;
		vertical-align: middle;
		line-height: 22px;  
	}
	#wiheader.mui-bar-transparent {
		background-color: rgba(247,247,247,0) !important;
	}
</style>
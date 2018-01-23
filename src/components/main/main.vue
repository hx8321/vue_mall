<template>
	<div id="main" class="public-marginb">
		<msearch :barColor='barColor' :inputColor='inputColor'></msearch>
		<div v-if="!carsouseDt[0]" style="height:18.4rem;"></div>
		<Carouse :advertiseDt="carsouseDt"></Carouse>
		<Mnavbar ref="flag"></Mnavbar>
		<Preferential></Preferential>
		<img v-if="middleDt[0]?true:false" class="wMax margins" :src="imgUrl+middleDt[0].imageurl" style="display: block;" @tap="openWindow(middleDt[0].url)"/>
		<Newwares></Newwares>
		<Arderwares></Arderwares>
	</div>
</template>

<script>
	import Carouse from '@/components/main/Carousel-figure'
	import Mnavbar from '@/components/main/middle-navbar'
	import Preferential from '@/components/main/Preferential'
	import Newwares from '@/components/main/new-wares'
	import Arderwares from '@/components/main/arder-wares'
	import msearch  from './msearch';
	import {imgUrl} from '@/config/env'
	export default{
		data:function(){
			return {
				//广告列表数据
				carsouseDt:"",
				//中间广告数据
				middleDt:'',
				offsetTop:'',
				offsetY:'',
				barColor:'mSearch',
				inputColor:'headSearch',
				//图片路径前缀
				imgUrl
			}
		},
		created(){
			mui.init();
			
			//获取广告列表数据
			this.$store.state.getData.advertiseDt("1").then((result)=>{
				this.carsouseDt=result;
			});
			//获取中间广告数据
			this.$store.state.getData.advertiseDt("3").then((result)=>{
				this.middleDt=result;
			});
	   	},
		mounted(){
			this.$nextTick(()=>{
				//flag标志位距离顶部的距离
				this.offsetTop = this.$refs.flag.$el.offsetTop;
			})
			var _this = this
			 window.onscroll=function(){
				//滚动的距离
				_this.offsetY = window.pageYOffset
				if(_this.offsetY >= 294){
					_this.barColor = 'mSearch2';
					_this.inputColor = 'headSearch2';
				}else{
					_this.barColor = 'mSearch';
					_this.inputColor = 'headSearch';
				}
				
			};
		},
		components:{
			//轮播广告组件
			Carouse,
			//中间导航组件
			Mnavbar,
			//分类专区1
			Preferential,
			//分类专区2
			Newwares,
			//分类专区3
			Arderwares,
			msearch
		},
		methods:{
			//页面跳转
			"openWindow"(path){
				window.location.href=path;
			}
		},
	   	updated(){
	   		//初始化轮播
			mui('#slider').slider({
			  interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
			});
		}
	}
</script>

<style>
	@import url("../../common/css/main-public.css");
	#main{
		background-color: #f6f6f6;
	}
</style>
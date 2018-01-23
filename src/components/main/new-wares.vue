<template>
	<div class="new margins">
		<div class="img-headers">
			<img src="../../assets/life.jpg"/>
		</div>
		<div class="new-content mui-slider white">
		  <div class=" mui-slider-group">
		    <div class="mui-slider-item floatin" v-for="(item,index) in number" @tap="detail2(item.ids)">
					<div>
						<img :src="img+item.filepath"/>
					</div>
					<div>
						<p class="fontblack">{{item.title}}</p>
						<p><span class="fontH fontRed">{{item.price}}</span><span class="textline-through">￥200.00</span></p>
					</div>
		    </div>
		  </div>
		</div>
	</div>
</template>

<script>
  import {baseUrl,imgUrl} from '@/config/env'
	export default{
		data(){
			return{
					img:imgUrl,
					number:''
			}
		},
		created(){
			this._initHome1();
		},
		mounted(){
			this.$nextTick(()=>{
					mui.init();
		   	  //初始化轮播图
					mui('.new .mui-slider').slider();
					
			})
		},
		watch:{
			number(){
					this.$nextTick(()=>{
					mui.init();
		   	  //初始化轮播图
					mui('.new .mui-slider').slider();
					
			})
			}
		},
		//初始化图片
		methods: {
			//跳转到详情页面
			detail2(ids){
				this.$router.push('/pClass/gClass/details/'+ids);
			},
			//初始化图片
			_initHome1(){
				var num = 'c1c91ee07cc247c7a9e54de20ba5d09b';
				var url = baseUrl+'/goodsInfo/queryGoodsList?id='+num;
				axios.get(url)
				.then((res)=>{
					 if(res.data.retCode == '000000'){
						 this.number = res.data.data.responseInfo;

					 }else if(res.data.retCode == '200'){
								
							alert('系统繁忙，请稍后再试一试！');
          }

				})
				.catch((error)=>{
					 alert('系统繁忙，请稍后再试一试！');
				})
			}
		}
	}
</script>

<style>
.new-content>div{
	padding: 0.571428rem 0;
}
@import url("../../common/css/floatin.css");
</style>
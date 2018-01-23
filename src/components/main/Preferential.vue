<template>
	<div class="Preferential margins">
		<div class="img-headers">
			<img src="../../assets/recommend-header.jpg"/>
		</div>
		
		<div class="Pcontent mui-slider white">
		  <div class=" mui-slider-group">
		    
		    <div class="mui-slider-item floatin" v-for="(item,index) in number" @tap="detail1(item.ids)">
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
				//图片路径前缀
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
					mui('.Preferential .mui-slider').slider();
			});
		},
		watch:{
			number(){
					this.$nextTick(()=>{
							mui.init();
				   	  //初始化轮播图
							mui('.Preferential .mui-slider').slider();
					})
			}
		},
		methods: {
			//跳转到详情页面
			detail1(ids){
				this.$router.push('/pClass/gClass/details/'+ids);
			},
			//初始化图片
			_initHome1(){
				var num = '32a8f1c6b318435dadf394cb3b374331';
				var url = baseUrl+'/goodsInfo/queryGoodsList?id='+num;
				axios.get(url)
				.then((res)=>{
					 if(res.data.retCode == '000000'){
						 this.number = res.data.data.responseInfo;
					 }else if(res.data.retCode == '200'){
                    }
				})
				.catch((error)=>{
					 console.log(error);
				})
			}
		}
	}
</script>

<style>
.Pcontent>div{
	padding: 0.571428rem 0;
}
@import url("../../common/css/floatin.css");


</style>
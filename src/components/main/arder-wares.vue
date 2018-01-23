<template>
	<div class="arder margins">
		<div class="img-headers">
			<img src="../../assets/shopping.jpg"/>
		</div>
		<div class="img" v-if="bottomDt[0]?true:false">
			<img :src="img+bottomDt[0].imageurl" @tap="openWindow(bottomDt[0].url)"/>
		</div>
		<div class="contentss white">
				<ul>
					<li v-for="(item,index) in number" @tap="detail3(item.ids)">
						<div>
					      	<img :src="img+item.filepath"  style="width:90px;heigth:90px"/>
					    </div>
					    <div>
					      	<p class="fontblack">{{item.title}}</p>
					      	<p>
					      		<span class="brc">
					      			新品上市
					      		</span>
					      	</p>
					      	<p><span class="fontH fontRed">{{item.price}}</span><span class="textline-through">￥200.00</span></p>
					    </div>
					</li>
				</ul>
		</div>
	</div>
</template>

<script>
    import {baseUrl,imgUrl} from '@/config/env'
	export default{
		data(){
			return {
				//bottom位置广告数据
				bottomDt:'',
				//图片路径前缀
				img:imgUrl,
				number:''
			}
		},
		created(){
			//bottom位置广告数据
			this.$store.state.getData.advertiseDt("2").then((result)=>{
				this.bottomDt=result;
			});
			
			this._initHome1();
			
		
		},
		methods:{
			//打开窗口
			openWindow(path){
				window.open(path);
			},
			//跳转到详情页面
			detail3(ids){
				this.$router.push('/pClass/gClass/details/'+ids);
			},
			//初始化图片
			_initHome1(){
				var num = 'a5e42d4da745484c8f34a74c164aa73f'
				var url = baseUrl+'/goodsInfo/queryGoodsList?id='+num
				axios.get(url)
				.then((res)=>{
					 if(res.data.retCode == '000000'){
						 this.number = res.data.data.responseInfo;
				
					 }else if(res.data.retCode == '200'){
								
          			}

				})
				.catch((error)=>{
					console.log(error)
				})
			}
		}
	}
</script>

<style>
</style>
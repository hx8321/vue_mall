<template>
	<div id="wimain" v-show="selectGoodsInfo">
		<wiheader></wiheader>
		<wicontentT :witop="selectGoodsInfo"  :skuMainListFlag="skuMainList[0]" @goodsNum='getNum'></wicontentT>
		<wicontentB :wibottom="selectGoodsInfo"></wicontentB>
		<wifooter :addInfo="{'goods':selectGoodsInfo,'goodsNum':goodsNum}"></wifooter>
		<loading v-show="loading"></loading>
		<div class="modal"  id="modal">
	         <span></span>
	   </div>
	   
		<div class="upliftWindow">
			<div class="upliftTop" v-if="skuMainList[0]">
				<div>
					<div>
						<img :src="(imgUrl+skuMainList[skuIndex].filePath)"/>
						<!--<img :src="skuMainList[skuIndex].filePath"/>-->
					</div>
				</div>
				<div>
					<ul>
						<li class="fontRed fontWeight">￥{{skuPrice(skuIndex,"skuSalePrice")}}</li>
						<li class="fontsilver fontsmall textline-through">￥{{skuPrice(skuIndex,"skuMarketPrice")}}</li>
						<li>库存{{skuMainList[skuIndex].skuStock}}件</li>
						<li v-if="skuIndex==skuMainList.length-1">请选择规格</li>
						<li v-if="skuIndex!=skuMainList.length-1">已选择
							<span v-for="attrItem in skuMainList[skuIndex].attrList">{{attrItem.attrValue}}</span>
						</li>
					</ul>
				</div>
				<div>
					<img src="../../assets/close.png" @tap="close()"/>
				</div>
			</div>
			<div class="upliftBottom" v-if="skuAttrList">
				<div class="upliftBottomItem" v-for="(val,key) in skuAttrList">
					<div class="uBI-header">
						{{key}}
					</div>
					<div class="uBI-content">
						<span v-for="item in val" @tap="checked($event)">{{item}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import loading from '@/components/loading/loading'
	import wiheader from '@/components/ware-info/wi-header'
	import wicontentT from '@/components/ware-info/wi-content-top'
	import wicontentB from '@/components/ware-info/wi-content-bottom'
	import wifooter from '@/components/ware-info/wi-footer'
	import {imgUrl} from '@/config/env'
	
//	import goodsDataCs from "@/common/json/defaultGoodsDt"//测试代码
//	import skuCs from "@/common/json/new_file"//测试代码
	
	export default{
		data:function(){
			return {
				//商品详情数据
				selectGoodsInfo:"",
				//商品id
				ids:'',
				//商品数
				goodsNum:1,
				//加载动画启动标志
				loading:true,
				//图片路径前缀
				imgUrl,
				//sku当前下标
				skuIndex:0,
				//sku关系列表
				skuContrast:[],
				//sku主列表
				skuMainList:[],
				//sku属性列表
				skuAttrList:{},
//				showFlag:true,
			}
		},
		components:{
			wiheader,
			wicontentT,
			wicontentB,
			wifooter,
			loading
		},
		methods:{
			//规格选中函数
			"checked"(ev){
				//点亮当前选择规格，置暗同一类型的其它规格选项
				$(ev.target).toggleClass("spanActive").siblings("span").removeClass("spanActive");
				let skuAttrArry=[];
				//存放当前选中的规格组合
				for(let i=0;i<$(".uBI-content>span").length;i++){
					if($(".uBI-content>span").eq(i).hasClass("spanActive")){
						skuAttrArry.push($(".uBI-content>span").eq(i).html());
					}
				}
				//如果当前选择规格不为空
				if(skuAttrArry[0]){
					//通过skuContrast比对当前选中的规格组合的对应下标
					for(let i=0;i<this.skuContrast.length;i++){
						let keyArry=this.skuContrast[i].split("#");
						if(skuAttrArry.length!=keyArry.length){
							continue;
						}
						let flag=0;
						for(let l=0;l<keyArry.length;l++){
							for(let n=0;n<skuAttrArry.length;n++){
								if(keyArry[l]==skuAttrArry[n]){
									flag+=1;
									break;
								}else if(n==skuAttrArry.length&&keyArry[l]!=skuAttrArry[n]){
									flag=false;
								}
							}
						}
						if(flag&&flag==skuAttrArry.length){
							this.skuIndex=i;
						}
					}
				}
			},
			//关闭规格弹出窗
			"close"(){
				$(".upliftWindow").css("display","none");
				$(".upliftWindow").css("bottom","-100%")
			},
			//获取商品数量
			'getNum':function(data){
				this.goodsNum=data;
			},
			//数组去同，添加新元素，arr：数组，data：添加的数据
			"pushArry":function(arr,data){
				let flag=false;
				for(let i=0;i<arr.length;i++){
					if(arr[i]==data){
						break;
					}else if(i==(arr.length-1)&&arr[i]!=data){
						flag=true;
					}
				}
				if(flag){
					arr.push(data);
				}
			},
			//获得最大价格，type：价格类型，obj：价格抽取对象
			"getPriceMax"(type,obj){
				let max=obj[0][type];
				for (let i=1;i<obj.length;i++) {
					if(obj.skuIds=="init"){
						continue;
					};
					if(obj[i][type]>max){
						max=obj[i][type];
					}
				}
				return max;
			},
			//获得最小价格，type：价格类型，obj：价格抽取对象
			"getPriceMin"(type,obj){
				let min=obj[0][type];
				for (let i=1;i<obj.length;i++) {
					if(obj.skuIds=="init"){
						continue;
					};
					if(obj[i][type]<min){
						min=obj[i][type];
					}
				}
				return min;
			},
			//获得库存总和
			"getskuStockSum"(obj){
				let sum=0;
				for(let i=0;i<obj.length;i++){
					if(obj.skuIds=="init"){
						continue;
					};
					sum+=obj[i].skuStock;
				}
				return sum;
			},
			//价格输出格式，min：价格最小值，max：价格最大值
			"outputFormat"(min,max){
				let result;
				if(min==max){
					result=min.toFixed(2);
				}else{
					result=min.toFixed(2)+"-"+max.toFixed(2);
				}
				return result;
			},
			//价格显示格式，index：下标，pricetype：价格类型：
			"skuPrice"(index,priceType){
				let max,min,priceName,result;
				if(priceType=="skuSalePrice"){
					max="skuSalePriceMax";
					min="skuSalePriceMin";
					priceName="skuSalePrice";
				}else{
					max="skuMarketPriceMax";
					min="skuMarketPriceMin";
					priceName="skuMarketPrice";
				}
				if(this.skuMainList[index].skuIds=="init"){
					result=this.outputFormat(this.skuMainList[index][min],this.skuMainList[index][max]);
				}else{
					result=this.skuMainList[index][priceName];
				}
				return result;
			}
		},
		created(){
			mui.init();
			this.ids = this.$route.params.goodsCode;
			//获取商品数据
			this.$store.state.getData.wareInfoDt(this.ids).then((result)=>{
				if(result){
//			let resultG=goodsDataCs;//测试代码
//			this.selectGoodsInfo=resultG;//测试
					this.selectGoodsInfo=result;
					this.loading=false;
				}
			});
			this.$store.state.getData.skuDt("100007100063").then((result)=>{
				if(result&&result[0]){
//			let result=skuCs.data.responseInfo;//测试
					this.skuMainList=result;
					
					let initSku={};
					initSku.skuSalePriceMax=this.getPriceMax("skuSalePrice",result);
					initSku.skuMarketPriceMax=this.getPriceMax("skuMarketPrice",result);
					initSku.skuSalePriceMin=this.getPriceMin("skuSalePrice",result);
					initSku.skuMarketPriceMin=this.getPriceMin("skuMarketPrice",result);
					initSku.skuStock=this.getskuStockSum(result);
					initSku.skuIds="init";
					initSku.filePath=result[0].filePath;
					this.skuMainList.push(initSku);
					
					this.skuIndex=result.length-1;
					
					for(let i=0;i<result.length-1;i++){
						let keyN="";
						for(let l=0;l<result[i].attrList.length;l++){
							keyN+=result[i].attrList[l].attrValue;
							if(l!=result[i].attrList.length-1){
								keyN+="#";
							};
						};
						this.skuContrast[i]=keyN;
					}
					
					for(let i=0;i<result.length-1;i++){
						for(let l=0;l<result[i].attrList.length;l++){
							let attrItem=this.skuAttrList[result[i].attrList[l].attrName];
							if(attrItem){
								this.pushArry(this.skuAttrList[result[i].attrList[l].attrName],result[i].attrList[l].attrValue);
							}else{
								this.skuAttrList[result[i].attrList[l].attrName]=[];
								this.skuAttrList[result[i].attrList[l].attrName].push(result[i].attrList[l].attrValue);
							}
						}
					}
				}
			});
		},
		mounted(){
			$(".footer").css("display","none");
		},
		updated(){
			mui('#wict-slider').slider({
			  interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
			});
		}
		,
		destroyed(){
			$(".footer").css("display","block");
		}
	}
</script>

<style>
@import url("../../common/css/wi-content-top.css");
@import url("../../common/css/wi-content-bottom.css");
@import url("../../common/css/modal.css");
#wimain #modal{
	z-index: 10;
}
</style>
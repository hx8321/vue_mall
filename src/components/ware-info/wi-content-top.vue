<template>
	<div class="wi-content-top white" id="wictop">
		<div id="wict-slider" class="mui-slider" v-if="witop?true:false">
		  <div class="mui-slider-group mui-slider-loop">
		    <!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
		    <div class="mui-slider-item mui-slider-item-duplicate">
		      <a href="#">
		        <img :src="(imgUrl+witop.filepath[witop.filepath.length-1])|delSpace">
		       	<!--<img :src="witop.filepath[witop.filepath.length-1]">-->
		      </a>
		    </div>
		    
		     <div class="mui-slider-item" v-for="item in witop.filepath">
		      <a href="#">
		        <img :src="(imgUrl+item)|delSpace">
		        <!--<img :src="item">-->
		      </a>
		    </div>
		    
		    <!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
		    <div class="mui-slider-item mui-slider-item-duplicate">
		      <a href="#">
		       <img :src="(imgUrl+witop.filepath[0])|delSpace">
		       	<!--<img :src="witop.filepath[0]">-->
		      </a>
		    </div>
		  </div>
		  <div class="mui-slider-indicator">
		    <div :class="{'mui-indicator':true,'mui-active':key==0?true:false}" v-for="(val,key,index) in witop.filepath"></div>
		  </div>
		</div>
		<ul id="wict-info" class="white fontsilver">
			<li class="wict-H1"><h2 class="fontblack">{{witop.title}}</h2></li>
			<li class="wict-price fontRed">￥{{witop.price|decimal}}</li>
			<li v-if="witop.orgPrice?true:false"><span>原价：</span><span class="MarketPrice">￥{{witop.orgPrice|decimal}}</span></li>
			<li class="standard" @tap="openUplift" v-if="skuMainListFlag"><span>选择规格</span></li>
			<li><span>数量</span>
				<div class="mui-numbox fontblack" data-numbox-min='1'>
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" value="1" @keypress="keyPress($event)"  onpaste="return false" ondragenter="return false" oncontextmenu="return false" style="ime-mode:disabled"/>
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				</div>
				<span class="lpadding-span" v-if="witop.isDisStore">库存{{witop.storeNum}}件</span>
			</li>
			<li><span>已销售</span>{{witop.totalTrade}}件</li>
			<li v-if="witop.isDisVerdorname"><span>服务</span>由“{{witop.vendorSnm}}”提供销售和发货、并提供售后服务，售后电话：{{witop.servicePhone}}</li>
			<li v-if="witop.limitOrderNum"><span class="redspan">限购</span>单笔限购{{witop.limitOrderNum}}件</li>
			<!--<li><span class="redspan">售后</span>包退7天，包换7天</li>-->
			<li><span class="redspan">包邮</span>全国配送</li>
		</ul>
	</div>
</template>

<script>
	import {imgUrl} from '@/config/env'
	export default{
		data:function(){
			return {
				//图片路径固定前缀
				imgUrl,
				max:1
			}
		},
		//商品详情上部分模块数据
		props: ['witop','skuMainListFlag'],
		mounted(){
			//初始化numbox插件
			mui("#wict-info .mui-numbox").numbox().setOption('max',99);
			let _this=this;
			//获取父组件goodsNum数据
			$(".mui-btn-numbox-minus,.mui-btn-numbox-plus").on('tap',function(){
				_this.$emit('goodsNum',$('#test')[0].value);
			});
			//获取商品数量
			$("#test").on('input',()=>{
//				if(Number( $('#test')[0].value)<=_this.witop.limitOrderNum){
					this.$emit('goodsNum',$('#test')[0].value);
//				}else{
//					_this.$emit('goodsNum',_this.witop.limitOrderNum);
//				}
			});
		},
		updated(){
			//设置.mui-numbox标签最大选项值
			if(this.witop.limitOrderNum){
				mui("#wict-info .mui-numbox").numbox().setOption('max',this.witop.limitOrderNum);
			}
			
		},
		methods:{
			//弹出规格窗口
			"openUplift"(){
				$(".upliftWindow").css("display","block");
				$(".upliftWindow").animate({bottom:$("#wifooter")[0].offsetHeight-2+'px'},1000);
			},
			//控制输入
//			"contorlValue"(){
//				$("#test")[0].value=$("#test")[0].value.replace(/\D/g,'');
//				if($("#test")[0].value>this.witop.limitOrderNum){
//					$("#test")[0].value=this.witop.limitOrderNum;
//				}
//			},
			//控制键盘输入值为数字且小于等于限购数
			"keyPress"(event) {
				let keyCode = event.keyCode;
				if($("#test")[0].value.length==0){
					
			       if((keyCode >48 && keyCode <= 57)){
			       	
			       		if(Number(event.key)<=this.witop.limitOrderNum){
			       			event.returnValue = true;
			       		}else{
			       			event.returnValue = false;
			       		}
			       		
				    }else{    
				        event.returnValue = false;    
				    }
				    
				}else{
					
			       if((keyCode >=48 && keyCode <= 57)){
			       	
			       	  if(Number($("#test")[0].value+event.key)<=this.witop.limitOrderNum){
			       	  	event.returnValue = true;
			       	  }else{
			       	  	event.returnValue = false;
			       	  }  
			       	  
				    } else {    
				        event.returnValue = false;    
				    }
				    
				}    
			         
			 }    
		}
	}
</script>

<style>
</style>
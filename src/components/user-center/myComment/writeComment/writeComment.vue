<template>
	<div class="writeComment">
		<header class="mui-bar mui-bar-nav writeComment-head">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">评价</h1>
		</header>
		<div class="public-margint">
			<ul class="writeComment-content">
				<li class="wcc-user">
					<img src="../../../../assets/已登录.png"/>
					<span>{{nickName|omit}}</span>
				</li>
				<li class="wcc-score">
					<span>评分：</span>
					<img src="../../../../../static/img/star2.png" v-for="key in 5" @tap="startrigger($event,key-1)"/>
				</li>
				<li class="wcc-content">
					<textarea rows="6" cols="30" maxlength="300"></textarea>
				</li>
				<li class="wcc-control">
					<button @tap="cancel">取消</button>
					<button @tap="submit($event)">提交</button>
				</li>
			</ul>
			<div class="writeComment-order">订单号：{{aboutGoodsDt.transactionid}}</div>
			<ul class="writeComment-goods">
				<li class="wcg-img">
					<img :src="imgUrl+aboutGoodsDt.goodspath"/>
				</li>
				<li class="wcg-content">
					<p>{{aboutGoodsDt.goodsfile}}</p>
				</li>
			</ul>
		</div>
		
		<div class="modal" id="modal">
	         <span></span>
	    </div>
	</div>
</template>

<script>
	import {imgUrl} from '@/config/env'
	export default{
		data:function(){
			return {
				//用户昵称
				nickName:this.$store.state.nickName,
				//星星切换状态数组
				starFlag:[true,true,true,true,true],
				//评论相关的商品数据
				aboutGoodsDt:this.$store.state.commentGoods,
				//图片路径前缀
				imgUrl,
				//定时器
				timeout:""
			}
		},
		mounted(){
			//隐藏footer
			$(".footer").css("display","none");
		},
		destroyed(){
			//恢复footer
			$(".footer").css("display","block");
		},
		methods:{
			//弹出框提示，spanText：提示文字，dom：禁用的元素，back：是否返回标记
			"proptimg"(spanText,dom,back){
				clearTimeout(this.timeout);
				$("#modal>span").html(spanText);
				$("#modal").css("display","block");
				this.timeout=setTimeout(()=>{
					$("#modal").css("display","none");
					$(dom).attr("disabled",false);
					if(back){
						mui.back();
					}
				},1500);
			},
			//取消按钮事件
			"cancel"(){
				mui.back();
			},
			//提交按钮事件，e:event
			"submit"(e){
				//禁用当前按钮
				$(e.target).attr("disabled",true);
				//获得评价分数
				let count=this.getCount();
				//添加评价入参
				let params={"userid":this.$store.state.userId,"nickname":this.nickName,"goodsids":this.aboutGoodsDt.goodsids,"count":count,"content":$("textarea").val(),"transactionid":this.aboutGoodsDt.transactionid};
				//添加评价
				this.$store.state.setData.addComment(params).then((result)=>{
					if(result){
						//调用提示框
						this.proptimg("提交成功",e.target,true);
					}else{
						this.proptimg("系统繁忙，请稍后再试",e.target,false);
					}
				});
			},
			//获取评价分数
			"getCount"(){
				let result=0;
				for(let i=0;i<this.starFlag.length;i++){
					if(!this.starFlag[i]){
						result+=1;
					}
				}
				return result;
			},
			//星星切换
			"startrigger"(obj,index){
				//判断当前的星星状态
				if(this.starFlag[index]){
					//当前星星制亮
					$(obj.target).attr("src","./static/img/star1.png");
					//当前星星前的星星制亮
					this.perform($(obj.target).prevAll("img"),"./static/img/star1.png");
					//当前星星后的星星制暗
					this.perform($(obj.target).nextAll("img"),"./static/img/star2.png");
					//修改星星切换状态数组，保持状态一致
					for (let i=index;i>=0;i--) {
						this.starFlag[i]=false;
					}
				}else{
					//当前星星制暗
					$(obj.target).attr("src","./static/img/star2.png");
					//当前星星前的星星制暗
					this.perform($(obj.target).nextAll("img"),"./static/img/star2.png");
					//修改星星切换状态数组，保持状态一致
					for (let i=index;i<this.starFlag.length;i++) {
						this.starFlag[i]=true;
					}
				}
			},
			//添加图片路径
			"perform"(obj,src){
				if(obj){
					obj.attr("src",src);
				}
			},
			//截取图片路径
			"srcFarmot"(str){
				return str.substr(str.indexOf("star"));
			}
		}
	}
</script>

<style>
	@import url("../../../../common/css/writeComment.css");
	@import url("../../../../common/css/modal.css");
</style>
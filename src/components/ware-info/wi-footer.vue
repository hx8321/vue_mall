<template>
	<div class="mui-bar mui-bar-tab white" id="wifooter">
		<div class="wif-left mui-tab-item">
			<button type="button" class="mui-btn mui-btn-yellow iconfont icon-icon" @tap="addGoods">
				加入购物车
			</button>
		</div>
		<div class="wif-right mui-tab-item">
			<button type="button" class="mui-btn mui-btn-danger  iconfont icon-goumai" @tap="addOrderDt">
				立即购买
			</button>
		</div>
	</div>
</template>

<script>
	export default{
		data:function(){
			return {
				//定时器
				timeout:"",
			}
		},
		//添加数据
		props:['addInfo'],
		methods:{
			//添加商品
			"addGoods"(){
				if(this.$store.state.token){
					$(".wif-left>button").attr("disabled",true);
					let _this=this;
					let params={"vendorId":this.addInfo.goods.vendorids,"goodsId":this.addInfo.goods.ids,"userId":this.$store.state.userId,"goodsNum":this.addInfo.goodsNum};
					this.$store.state.setData.addShopCartDt(params).then(function (result) {
						$("#modal>span").html(result);
						$("#modal").css("display","block");
						_this.timeout=setTimeout(function(){
							$("#modal").css("display","none");
							$(".wif-left>button").attr("disabled",false);
						},1500);
					});
				}else{
					this.$router.push('/userLogin');
				}
			},
			//添加订单
			"addOrderDt"(){
				$(".wif-right>button").attr("disabled",true);
				this.$store.state.getData.goodsInspection({"goodsId":this.addInfo.goods.ids,"goodsNum":this.addInfo.goodsNum}).then((result)=>{
					if(result=="交易成功"){
						//传递商品id
						this.$store.state.buyNowId=this.addInfo.goods.ids;
						//传递商品数量
						this.$store.state.buyNowNum=this.addInfo.goodsNum;
						this.$store.state.order=this.order();
						//跳转到确认页
						this.$router.push("/user/submitOrder/buyNow");
					}else{
						$("#modal>span").html(result);
						$("#modal").css("display","block");
						this.timeout=setTimeout(function(){
							$("#modal").css("display","none");
							$(".wif-right>button").attr("disabled",false);
						},1500);
					}
				});
			},
//			生成订单流水号
			order(){
                var date = new Date();
                var time = this.format(date);
                var num  = this.randomNum();
                var orderNum = ''+time+num+'0000';
                return orderNum;
            },
            //时间格式化
            format(date) {  
                var y = date.getFullYear()+'';  
                var m = date.getMonth() + 1;  
                m = m < 10 ? ('0' + m) : m;  
                var d = date.getDate();  
                d = d < 10 ? ('0' + d) : d;  
                var h = date.getHours();  
                var minute = date.getMinutes();  
                minute = minute < 10 ? ('0' + minute) : minute;  
                var s  = date.getSeconds();
                return y + m + + d + h + minute +s;  
            },
            //获取四个随机数
            randomNum(){
                var result = '';
                for(var i=1 ; i<5 ;i++){
                    var data = Math.floor((Math.random()*10)+1);
                    result+=data;
                }
                return result;
            },
		}
	}
</script>

<style>
	.wif-left .mui-btn,.wif-right .mui-btn{
     top: 0;
     width: 80%; 
   }
   #wifooter.mui-bar{
   	-webkit-box-shadow: none;
     box-shadow: none;
   }
</style>
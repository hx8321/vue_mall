<template>
	<ul class="mui-table-view user-center public-marginb">
		<li class="mui-table-view-cell user-center-touxian" v-show='!this.ids'>
			<a class="mui-navigate-right" @tap="jumpPage('/userLogin')">
				<img src="../../assets/questionMark.png" style="background-color: white;" />
				<span>
					未登录
				</span>
			</a>
		</li>
		<li class="mui-table-view-cell user-center-touxian" v-show='this.ids'>
			<div class="mui-navigate-right" href="javacript:void(0)">
				<img src="../../assets/已登录.png" style="background-color: white;" />
				<span style="font-size:34px" >
					{{this.userId}}
				</span>
			</div>
		</li>
		<li class="mui-table-view-cell user-center-order">
			 <router-link class="mui-navigate-right" to="/user/myorder/all">
			 	<img src="../../assets/order.png"/>
				我的订单
				<span class="fontsilver">
	            	查看自己的消费
	            </span>
            </router-link>
	    </li>
	    <li class="mui-table-view-cell">
	     	<ul class="mui-bar mui-bar-nav user-center-orderlist white">
				<li>
					<a href="#/user/myorder/all">
						<img src="../../assets/all.png"/>
						全部
					</a>
				</li>
				<li>
					<a href="#/user/myorder/pay">
						<img src="../../assets/purse.png"/>
						待付款
					</a>
				</li>
				<li>
					<a href="#/user/myorder/send">
						<img src="../../assets/shipping.png"/>
						待发货
					</a>
				</li>
				<li>
					<a href="#/user/myorder/receive">
						<img src="../../assets/receiveGoods.png"/>
						待收货
					</a>
				</li>
				<!--<li>
					<a href="#/user/refundOrder">
						<img src="../../assets/salesReturn.png"/>
						退换货
					</a>
				</li>-->
			</ul>	
	    </li>
		<li class="mui-table-view-cell">
			<a class="mui-navigate-right" href="#/user/myComment">
				<img src="../../assets/comment.png"/>
				我的评价
			</a>
		</li>
		<li class="mui-table-view-cell">
			<a class="mui-navigate-right">
				<img src="../../assets/coupon.png"/>
				我的优惠券
			</a>
		</li>
		<li class="mui-table-view-cell">
			<a class="mui-navigate-right">
				<img src="../../assets/exchange.png"/>
				兑换优惠券
			</a>
		</li>
		<li class="mui-table-view-cell">
			<a class="mui-navigate-right">
				<img src="../../assets/raise2.png"/>
				我的众筹
			</a>
		</li>
		<li class="mui-table-view-cell">
			<a class="mui-navigate-right">
				<img src="../../assets/integral2.png"/>
				我的积分
			</a>
		</li>
		<li class="mui-table-view-cell">
			<a class="mui-navigate-right" href="#/user/defaultaddress" @tap="flagTigger">
				<img src="../../assets/positioning.png"/>
				收货地址管理
			</a>
		</li>
		<li class="mui-table-view-cell user-center-binding">
			<a class="mui-navigate-right">
				<img src="../../assets/binding.png"/>
				绑定账户
				<span class="fontsilver">
	            	未绑定
	            </span>
			</a>
		</li>
		<li class="mui-table-view-cell" @tap="jumpPage('/user/userInfo')">
			<a class="mui-navigate-right">
				<img src="../../assets/help.png"/>
				个人中心
			</a>
		</li>
	</ul>
</template>

<script>
import {mapGetters} from 'vuex'
	export default{
		data(){
			return {
				ids:'',
				userId:''
			}
		},
		methods:{
			//路由跳转
			jumpPage(path){
				this.$router.push(path);
			},
			//地址标记切换
			flagTigger(){
				this.$store.state.addressNowFlag=false;
			}
		},
		/* computed:mapGetters([
			'userId',
			'ids',
			'token'
    	]), */
		created(){
			//修改订单列表页面返回状态
			this.$store.state.orderBack=false;
			this.ids    = this.$store.state.ids;
			this.userId = this.$store.state.nickName;
		},
		mounted(){
			$("body").css("background-color","white");
		},
		destroyed(){
			$("body").css("background-color","#efeff4");
		}
	}
</script>

<style>
	@import url("../../common/css/user-center.css");
</style>
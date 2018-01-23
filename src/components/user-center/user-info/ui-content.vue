<template>
	<ul class="mui-table-view ui-content public-margint">
		<li class="mui-table-view-cell ui-content-touxian">
			商城头像
	       	<img src="../../../assets/touxian.png"/>
		</li>
		<li class="mui-table-view-cell mui-collapse" id="uic-nichen">
            <a class="mui-navigate-right">
				商城昵称 
	            <span class="fontsilver">
	            	gogo
	            </span>
            </a>
            <div class="mui-collapse-content">
                <div class="mui-input-row">
					<input type="text" class="mui-input-clear" placeholder="昵称" value="gogo">
				</div>
				<button type="button" class="mui-btn mui-btn-warning mui-btn-block">保存</button>
            </div>
        </li>
        <li class="mui-table-view-cell">
            <a class="mui-navigate-right" @click.prevent="showSexPicker">
				性别
            	<span class="fontsilver" id="sexRuselt">
	            	男
	            </span>
            </a>
        </li>
        <!--<li class="mui-table-view-cell">
            <a class="mui-navigate-right" @click.prevent="showDatePicker">
				出生日期
            	<span class="fontsilver" id="dateRuselt">
	            	1999-08-08
	            </span>
            </a>
        </li>-->
        <li class="mui-table-view-cell mui-collapse" id="uic-phone">
            <a class="mui-navigate-right">
				手机号码
            	<span class="fontsilver">
	            	13818398088
	            </span>
            </a>
            <div class="mui-collapse-content">
            	<h5>请输入手机号：</h5>
                <div class="mui-input-row">
					<input type="text" class="mui-input-clear" placeholder="手机号">
				</div>
					<input type="text" placeholder="请输入短信验证码" class="uic-sms">
					<button type="button" class="mui-btn mui-btn-warning">获取短信验证码</button>
				<button type="button" class="mui-btn mui-btn-warning mui-btn-block">保存</button>
            </div>
        </li>       
        <li class="mui-table-view-cell" id="uic-default-address">
            <a class="mui-navigate-right" href='#/user/defaultaddress'  @tap="flagTigger">
				收货地址
            	<span class="fontsilver">
	            	广东省深圳市
	            </span>
            </a>
        </li>
		 <li class="mui-table-view-cell" id="uic-default-address">
            <a class="mui-navigate-right" @click="logOut()">
				退出登录
            </a>
        </li>
	</ul>
</template>

<script>
	import picker from '@/common/js/mui.picker.min.js'
	import poppicker from '@/common/js/mui.poppicker.js' 
	export default{
		data:function(){
			return{
				//性别数组
				sex:['男','女'],
				//性别picker对象
				sexPicker:"",
				//性别picker对象返回结果对象
				sexRuselt:"",
//				//日期picker对象
//				datePicker:"",
//				//日期picker对象返回结果对象
//				dateRuselt:""
			}
		},
		mounted(){
			var _this=this;
			mui.init();
			//创建picker插件对象
			mui.ready(function(){
				_this.$data.sexPicker = new mui.PopPicker();
				_this.$data.sexRuselt =document.getElementById("sexRuselt");
				_this.$data.sexPicker.setData(_this.$data.sex);
//				_this.$data.datePicker = new mui.DtPicker({type:'date'}); 
//				_this.$data.dateRuselt =document.getElementById("dateRuselt");
			})
			//修改复选框为单选
			$("#uic-default-address input[type=checkbox]").click(function(){
				$("#uic-default-address input[type=checkbox]").each(function(){
					this.checked=false;
				});
				this.checked=true;
			});
		},
		destroyed(){
			//移除picker
			$(".mui-poppicker").remove();
//			$(".mui-dtpicker").remove();
		},
		methods:{
			//展示性别
			showSexPicker:function(){
				var _this=this;
				this.$data.sexPicker.show(function(items) {
					_this.$data.sexRuselt.innerText = items[0];
				});
			},
//			//展示日期
//			showDatePicker:function(){
//				var _this=this;
//				 this.$data.datePicker.show(function (selectItems) {
//				 	_this.$data.dateRuselt.innerText=selectItems.y.text+"-"+selectItems.m.text+"-"+selectItems.d.text;
//			    })
//			},
			//路由切换
			showaddersspage(path){
				this.$router.push(path);
			},
			logOut(){
				 window.location.reload();
				 this.showaddersspage('/user')
			},
			//地址标记切换
			flagTigger(){
				this.$store.state.addressNowFlag=false;
			}
		}
	}
</script>

<style>
	@import url("../../../common/css/mui.picker.min.css");
	@import url("../../../common/css/mui.poppicker.css");
	@import url("../../../common/css/ui-content.css");
</style>
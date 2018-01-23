<template>
	<div class="default-address">
		<addressnav></addressnav>
			<div class="mui-scroll-wrapper public-margint" id="refreshContainer">
				<div class="mui-scroll">
					<ul class="default-address-content">
						<li v-for="(alItem,alIndex) in addressListDt" :data-address="alItem.addressId">
							<form class="mui-input-group">
								<div class="address-row">
									<p>
											<span>
												{{alItem.name}}
											</span>
											<span>
												{{alItem.mobile}}
											</span>
											<span>
												{{alItem.zipCode}}
											</span>
											<!--<span class="default-item">
												【默认地址】
											</span>-->
									</p>
									<p>
										{{alItem.province+alItem.city+alItem.district+alItem.street+alItem.address}}
									</p>
								</div>
								<div class="mui-button-row">
									<div class="mui-checkbox">
										<input value="Item 1" type="checkbox">
										<label>当前选中地址</label>
									</div>
									<button type="button" class="mui-btn mui-btn-warning" @tap="jumpPage('/user/defaultaddress/form/'+alItem.addressId)">编辑</button>&nbsp;&nbsp;
									<button type="button" class="mui-btn mui-btn-danger" @tap="addressDelete($event)">清空</button>
								</div>
							</form>
						</li>
			
						<li class="white" v-show="show">没有更多数据</li>
					</ul>
				</div>
			</div>
		<div class="modal"  id="modal">
	         <span></span>
	    </div>
	</div>
</template>

<script>
	import addressnav from '@/components/user-center/user-info/list-info/defaultAddress/default-address-nav'
	export default{
		data:function(){
			return{
				//显示地址列表数据
				addressListDt:[],
				//定时器
				timeout:"",
				//数据条数
				count:5,
				//全部地址数据
				addressAll:[],
				//显示标志
				show:false
			}
		},
		components:{
			addressnav
		},
		methods:{
			//页面跳转
			jumpPage(path){
				this.$router.push(path);
			},
			//删除地址
			addressDelete(er){
				$(er.target).attr("disabled",true);
				mui.confirm("确认删除地址？","",["是","否"],(e)=>{
					if(e.index==0){
						clearTimeout(this.timeout);
						//弹出框文本
						let htmlValue="系统繁忙，请稍后再试";
						//获得选中地址id
						let addressId=$(er.target).parents("li").eq(0).attr("data-address");
						this.$store.state.setData.deleteAddressDt(this.$store.state.userId,addressId).then((result)=>{
							if(result){
								let checked=$(er.target).parents("li").eq(0).find("input[type=checkbox]").attr("checked");
								//判断当前选中的是否为当前用户使用地址
								if(checked){
									//清空当前选中地址id
									this.$store.state.addressIdNowDt="";
									//移除选中地址
									$(er.target).parents("li").eq(0).remove();
									//选中删除后的列表中的第一个地址作为当前用户使用地址
									$(".default-address-content li:first-of-type input[type=checkbox]").attr("checked","checked");
								}else{
									$(er.target).parents("li").eq(0).remove();
								}
								htmlValue="删除成功";
							}
							$("#modal>span").html(htmlValue);
							$("#modal").css("display","block");
							this.timeout=setTimeout(function(){
								$("#modal").css("display","none");
								$(er.target).attr("disabled",false);
							},2000);
						}).catch(()=>{
							$("#modal>span").html(htmlValue);
							$("#modal").css("display","block");
							this.timeout=setTimeout(function(){
								$("#modal").css("display","none");
								$(er.target).attr("disabled",false);
							},2000);
						});
					}else{
						$(er.target).attr("disabled",false);
					}
				});
			},
			//选中当前地址
			"defaultAddress"(){
				//如果当前地址id存在
				if(this.$store.state.addressIdNowDt){
					//选中当前地址id，且置前
					$(".default-address-content>li[data-address="+this.$store.state.addressIdNowDt+"] .mui-checkbox input").attr("checked","checked");
					$(".default-address-content").prepend($(".default-address-content>li[data-address="+this.$store.state.addressIdNowDt+"]"));
				}else{
					//否则选中列表第一个地址
					$(".default-address-content>li:first-of-type .mui-checkbox input").attr("checked","checked");
				}
			},
			//默认加载
			"defaultLoadDt"(){
				this.$store.state.getData.addressListDt(this.$store.state.userId).then((result)=>{
					if(result[0]){
						//加载数为5
						this.count=5;
						//获取所有地址列表
						this.addressAll=result;
						this.addressListDt=[];
						//如果接口返回的地址数大于count指定的数
						if(result.length>this.count){
							//隐藏没有更多数据标签
							this.show=false;
							//循环遍历count指定的数据到显示列表
							for(let i=0;i<this.count;i++) {
								this.addressListDt.push(this.addressAll[i]);
							}
							//如果接口返回的地址数小于count指定的数
						}else if(result.length<=this.count){
							this.show=true;
							this.addressListDt=this.addressAll;
						}
					}else{
						this.show=true;
					}
					mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
				});
			},
			//下拉刷新
			"downLoad"() {
				this.show=false;
				clearTimeout(this.timeout);
				this.timeout=setTimeout(()=>{
					this.defaultLoadDt();
				}, 1500);
			},
			//上拉加载
			"upload"(){
				this.show=false;
				clearTimeout(this.timeout);
				this.timeout=setTimeout(()=>{
					//如果接口返回的所有地址数大于count
					if(this.addressAll.length>this.count){
						//循环遍历两条数据
						for(let i=this.count;i<this.count+2;i++){
							//如果当前下标数据存在，push到显示列表
							if(this.addressAll[i]){
								this.addressListDt.push(this.addressAll[i]);
							}else{
								//如果addressAll只有一条数据，count加1
								this.show=true;
								this.count+=1;
								break;
							}
							//如果addressAll有2条数据，count加2
							if(this.addressAll[this.count+1]){
								this.count+=2;
							}
							if(this.count+1==this.addressAll.length){
								this.show=true;
							}
						}
					}else{
						this.show=true;
					}
					mui('#refreshContainer').pullRefresh().endPullupToRefresh();
				}, 1500);
			}
		},
		mounted(){
			//挂载下拉刷新和上拉加载事件
			let _this=this;
			mui('.mui-scroll-wrapper').scroll({
					bounce: false,
					deceleration:0.1,
					indicators: false
			});
			mui("#refreshContainer").pullRefresh({
				down : {
			      style:'circle',
			      callback :_this.downLoad,
			      auto:true
				},
				up : {
			      contentrefresh : "正在加载...",
			      callback :_this.upload
		    	}
			});
			
			//隐藏footer
			$(".footer").css("display","none");
			
			//设置单选按钮事件
			$(".default-address").on("click","input[type=checkbox]",function(){;
				_this.$store.state.addressIdNowDt=$(this).parents("li").eq(0).attr("data-address");
				_this.defaultAddress();
				//如果当前地址状态位真（有提交订单页面进入），触发返回事件
				if(_this.$store.state.addressNowFlag){
					mui.back();
				}
				$(".default-address input[type=checkbox]").each(function(){
					this.checked=false;
				});
				this.checked=true;
			});
		},
		updated(){
			//加载地址列表数据
			this.defaultAddress();
		},
		destroyed(){
			//恢复footer
			$(".footer").css("display","block");
		}
	}
</script>

<style>
	@import url("../../../../../common/css/default-address.css");
	@import url("../../../../../common/css/modal.css");
</style>
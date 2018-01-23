<template>
	<div class="default-address-form">
		<formnav></formnav>
		<form class="form-content public-margint">
			<ul class="white">
				<li>
					<div>
						<span class="fontRed">*</span>
						<label for="consignee">收货人</label>
					</div>
					<div>
						<input type="text" id="consignee" placeholder="请输入收货人姓名" autocomplete="off"/>
					</div>
					
				</li>
				<li>
					<div>
						<span class="fontRed">*</span>
						<label for="phone">手机号码</label>
					</div>
					<div>
						<input type="text" id="phone" placeholder="请输入手机号码" autocomplete="off"/>
					</div>
				</li>
				<li>
					<div>
						<span class="fontRed">&nbsp;&nbsp;</span>
						<label for="postcode">邮&nbsp;&nbsp;&nbsp;&nbsp;编</label>
					</div>
					<div>
						<input type="text" id="postcode" placeholder="请输入邮编号码"  autocomplete="off"/>
					</div>
				</li>
				<li>
					<div>
						<span class="fontRed">*</span>
						<label for="area">所在地区</label>
					</div>
					<div>
						<input type="text" id="area" placeholder="请选择所在地区" @tap="showSelect($event)"/>
					</div>
				</li>
				<li>
					<div>
						<span class="fontRed">*</span>
						<label for="street">街&nbsp;&nbsp;&nbsp;&nbsp;道</label>
					</div>
					<div>
						<input type="text" id="street" placeholder="请输入街道"  autocomplete="off" maxlength="30"/>
					</div>
				</li>
				<li>
					<div>
						<span class="fontRed">*</span>
						<label for="detailAddress">详细地址</label>
					</div>
					<div>
						<textarea id="detailAddress" placeholder="请输入详细地址"  autocomplete="off" maxlength="140"></textarea>
					</div>
				</li>
				<!--<li class="mui-input-row mui-checkbox mui-left">
					<label>设为默认地址</label>
  					<input name="checkbox1" type="checkbox">
				</li>-->
			</ul>
			<button type="button" class="mui-btn mui-btn-warning mui-btn-block" @tap="submit($event)">保&nbsp;&nbsp;存</button>
		</form>
		<div class="modal" id="modal">
	         <span></span>
	    </div>
	</div>
</template>

<script>
	import picker from '@/common/js/mui.picker.min.js'
	import poppicker from '@/common/js/mui.poppicker.js' 
	import formnav from '@/components/user-center/user-info/list-info/defaultAddress/addressForm/default-address-form-nav'
	import cityData3 from '@/common/js/city.data-3.js'
	export default{
		data:function(){
			return{
				//定时器
				timeout:'',
				//地区picker对象
				areaPicker:"",
				//地区picker对象返回结果对象
				areaRuselt:""
			}
		},
		components:{
			formnav
		},
		methods:{
			//返回参数处理
			"_getParam"(obj, param){
				return obj[param] || '';
			},
			//展示地区picker
			"showSelect"(event){
				this.$data.areaPicker.show((items)=>{
					event.target.value =this._getParam(items[0], 'text') + " "+this._getParam(items[1], 'text') + " "+ this._getParam(items[2], 'text');
				});
			},
			//提交验证
			"submit"(event){
				$(event.target).attr("disabled",true);
				let isNull=this.$isNull($("input[type=text],#detailAddress").filter("input:not('#postcode'),textarea"));
				clearTimeout(this.timeout);
				if(isNull){
					this.modalShow(isNull);
					this.timeout=setTimeout(()=>{this.modalClose(event.target)},2000);
				}else if(this.$isPhone($("input#phone"))){
					this.modalShow("电话号码格式有误");
					this.timeout=setTimeout(()=>{this.modalClose(event.target)},2000);
				}else if($('#postcode')[0].value&&this.$isPostcode($("input#postcode"))){
					this.modalShow("邮政编码格式有误");
					this.timeout=setTimeout(()=>{this.modalClose(event.target)},2000);
				}else{
					let areaArr=$("#area")[0].value.split(" ");
					let params={  
									"userId":this.$store.state.userId,
								    "mobile":$("#phone")[0].value,
								    "name":$("#consignee")[0].value,
								    "zipCode":$("#postcode")[0].value,
								    "province":areaArr[0],
								    "city":areaArr[1],
						            "district":areaArr[2]?areaArr[2]:" ",
						            "street":$("#street")[0].value,
						            "address":$("#detailAddress")[0].value
								};
					let urlValue;
					let rsmag;
					if(this.$route.params.addressIds=="Add"){
						urlValue="/address/add";
						rsmag="添加成功";
					}else{
						params.addressId=this.$route.params.addressIds;
						urlValue="/address/updata";
						rsmag="修改成功";
					}
					this.$store.state.setData.upAddressDt(urlValue,params).then((result)=>{
						let spanText="系统繁忙，请稍后再试";
						if(result){
							spanText=rsmag;
						}
						this.modalShow(spanText);
						this.timeout=setTimeout(()=>{
							this.modalClose(event.target);
							mui.back();
						},2000);
					});
				}
			},
			//空校验
			"$isNull"($arr){
				for(var i=0;i<$arr.length;i++){
					if($arr[i].value==""){
						return $("label[for="+$arr.eq(i).attr("id")+"]").html().replace(/&nbsp;/g,"")+"不能为空";
					}
				}
				return false;
			},
			//电话格式校验
			"$isPhone"($str){
			    if(!(/^1[3|4|5|8][0-9]\d{8}$/.test($str[0].value))){ 
			        return true;
			    }else{
			    	return false;
			    }
			},
			//邮编格式校验
			"$isPostcode"($str){
			    if(!(/^[1-9][0-9]{5}$/.test($str[0].value))){ 
			        return true;
			    }else{
			    	return false;
			    }
			},
			//隐藏弹出框
			"modalClose"(dom){
				$("#modal").css("display","none");
				if(dom){
					$(dom).attr("disabled",false);
				}
			},
			//显示弹出框
			"modalShow"(spanText){
				$("#modal>span").html(spanText);
				$("#modal").css("display","block");
			}
		},
		created(){
			//判断添加还是修改状态
			if(this.$route.params.addressIds!="Add"){
				let tip=false;
				this.$store.state.getData.addressListDt(this.$store.state.userId).then((result)=>{
					for(let i=0;i<result.length;i++){
						if(result[i].addressId==this.$route.params.addressIds){
							$("#consignee")[0].value=result[i].name;
							$("#phone")[0].value=result[i].mobile;
							$("#postcode")[0].value=result[i].zipCode;
							$("#area")[0].value=result[i].province+" "+result[i].city+" "+result[i].district;
							$("#street")[0].value=result[i].street;
							$("#detailAddress")[0].value=result[i].address;
							tip=true;
							break;
						}
					}
					if(!tip){
						this.modalShow("系统繁忙，请稍后再试");
						this.timeout=setTimeout(this.modalClose,2000);
					}
				});
			}
		},
		mounted(){
			mui.init();
			//创建picker对象
			mui.ready(()=>{
				this.$data.areaPicker = new mui.PopPicker({
						layer: 3
					});
				this.$data.areaRuselt =document.getElementById("area");
				this.$data.areaPicker.setData(cityData3);
			});
			$(".footer").css("display","none");
			//保持表格左右两边内容对齐
			$(".form-content>ul>li>div:first-of-type").each(function(){
				$(this).css("height",$(this).siblings("div").eq(0).css("height"));
				$(this).css("line-height",$(this).siblings("div").eq(0).css("height"));
			});
		},
		destroyed(){
			$(".footer").css("display","block");
			//移除picker插件，由于每次加载都会添加新的，需要手动删除旧的
			$(".mui-poppicker").remove();
		}
	}
</script>

<style>
	@import url("../../../../../../common/css/mui.picker.min.css");
	@import url("../../../../../../common/css/mui.poppicker.css");
	@import url("../../../../../../common/css/default-address-form.css");
	@import url("../../../../../../common/css/modal.css");
</style>
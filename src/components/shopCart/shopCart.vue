<template>
    <div class="shopCart">
        <div class="title">
            <span>购物车</span>
            <span v-show="!emptyCart">
                <a href="#" @click="aditAll()" v-show="!editAll">编辑全部</a>
                <a href="#" @click="aditComp()" v-show="editAll">编辑完成</a>
            </span>
        </div>
        <div class="hxwrapper">
            <div ref="" class="shopCartWrapper">
                <div class="content">
                    
                    <ul v-for="(groups ,key) in lists" id="hx">
                        <li>
                        
                            <label for="" class="mui-checkbox mui-left">
                                <input type="checkbox" name="checkbox" :checked="groups.isSelectLocal" @click="selectLocal(groups)"/>
                            </label>
                        
                            <img src="../../resource/商店图标.png" alt="" />
                            <span>{{key | spliceName }}</span>
                            <a class="edit" @tap="editOdd($event)" href="javascript:void 0">编辑</a>
                            <a class="complete" @tap="completeOnly($event)" href="javascript:void 0">完成</a>
                        </li>
                        <li v-for="(item,index) in groups">
                            <div class="label">
                                <label for="" class="mui-checkbox mui-left">
                                    <input type="checkbox" name="checkbox" :checked="item.checked" @click="selectGood(item,key)"/>
                                </label>
                            </div>
                            <img  @tap="detailsGoods(item.goodsId)" :src="imgUrl+item.filepath" alt="" />
                            
                            <div class="order-ner"  @tap="detailsGoods(item.goodsId)">
                                <span class="text">{{item.title}}</span>
                            
                                <span class="kg">规格：1{{item.standard}}</span>
                                <p>
                                    <span>￥{{item.price}}</span><b></b><i>X</i><strong>{{item.goodsNum}}</strong>
                                </p>
                            </div>
                            <div class="order-ner2" >
                                <div class="text">
                                    <button class="dec" @click="dec(item)">－</button>
                                    <input ref="myInput" type="text" :value="item.goodsNum" @input="inputNum(item,$event)"/>
                                    <button class="add" @click="plus(item)">＋</button>
                                </div>
                                <button class="del" @click="dialogDela(item.ids,index,item,$event)">
                                    删除
                                </button>

                            </div>
                            
                        </li>
                    </ul>
                    <loading v-show="loading"></loading>
                    <!-- 空购物车 -->
                    <div class="empty" v-show="emptyCart">
                        <img src="../../resource/购物车-空.png" alt="" />
                        <p>您的购物车里没有东西哦</p>
                        <router-link to="/Main">
                            <button class="cartBtn">去逛逛</button>
                        </router-link>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="count" ref="result" v-show="!emptyCart">
            <div class="box1">
                <label for="" class="mui-checkbox mui-left">
                    <input type="checkbox" name="checkbox" :checked="isSelectAll" @click="selectAll()"/>
                </label>
                <span>全选</span>
            </div>
            <div class="box2" >
                <span class="text">合计</span>
                <span class="num">￥{{totalPrice}}</span>
                <button class="btn" ref="btn" @click="pay()">去结算({{num}})</button>
            </div>
        
        </div>
    </div>
</template>
<script type="text/javascript">
/*import data from "@/../static/json/shpCart.json";*/
import data from './shopCart.json';
/* import BScroll from 'better-scroll'; */
import loading from '../loading/loading';
import {baseUrl,imgUrl} from '@/config/env'

    export default{
        data(){
            return {
                //存储最原始的数据是Object
                lists:'',
                isSelectAll:false,
                editAll:false,
                emptyCart:false,
                loading:false,
                imgUrl,
                editOnly:false,
            }
        },
        created(){
               this.loading = true;
               var name = this.$store.state.userId;
               axios.get(baseUrl+'/shoppingCart/query/goodsList?userId='+name)
                //axios.get('/hx/shopCart')
               .then((res)=>{
                    if(res.data.retCode == '000000'){
                          this.lists = res.data.data.responseInfo[0];
                          /* this.lists = res.data.data.data.pyShoppingCartList[0] */
                          this.$store.state.lists = this.lists;

                          this.loading = false;
                          /* this.$nextTick(() => {
                            this.shopCartInitScroll();
                          }); */
                           this.isEmpty()
                    }else if(res.data.retCode == '200'){
                        //alert('系统繁忙，请稍后再试一试！');
                        this.loginErr();
                         this.isEmpty()
                    }
               })
               .catch((error)=>{
                  this.loading = false;
                  //alert('系统繁忙，请稍后再试一试！');
                   this.loginErr();
                   this.isEmpty()
              });
              //判断购物车是否为空
             
            
        },
        mounted () {
            
            /* this.$nextTick(() => {
                this.shopCartInitScroll();

            }) */
        },
        updated(){
            //判断购物车是否为空
            this.isEmpty();
        }, 
        methods:{
           //单个编辑
            editOdd(event){
                //获取到点击当前的商店的商品所有li
                var lis = $(event.target).parent().siblings();
                for(var i=0 ; i<lis.length; i++){
                    
                    //点击前是不能编辑的状态，删除按钮是隐藏的
                    
                        $(lis[i]).find('.order-ner').css('display','none');
                        $(lis[i]).find('.order-ner2').css('display','block');
                        //当前是编辑状态
                        $(event.target).css('display','none').next().css('display','block');
                        
                         
            
                }
                this.allAit(event);
            },
            //单个完成
            completeOnly(event){
                //获取到点击当前的商店的商品所有li
                var lis = $(event.target).parent().siblings();
                for(var i=0 ; i<lis.length; i++){
                    
                    //点击前是删除按钮显示状态，编辑被按钮隐藏，完成按钮出现
                    
                        $(lis[i]).find('.order-ner').css('display','block');
                        $(lis[i]).find('.order-ner2').css('display','none');
                        //当前是编辑状态
                        $(event.target).css('display','none').prev().css('display','block');
                       
                }
                this.allComp(event)
            },
            //获取div的display状态，让主动编辑是关联
            orderner(){
               
                var lis = $('.content').find('ul').find('li');
                for(var i=0;i<lis.length;i++){
                    var firstClass = $($(lis[i]).children()[0]).attr('class');
                    //这个是被动编辑
                    if(firstClass == 'label'){
                        var a = $($(lis[i]).find('.order-ner')).css('display','none');
                        var b = $($(lis[i]).find('.order-ner2')).css('display','block');
                        
                    };
                    if(firstClass == 'mui-checkbox mui-left'){
                        var c = $($(lis[i]).find('.edit')).css('display','none');
                        var d = $($(lis[i]).find('.complete')).css('display','block');
                    }
                    
                }
                
            },
            orderner2(){
             
                var lis = $('.content').find('ul').find('li');
                for(var i=0;i<lis.length;i++){
                    var firstClass = $($(lis[i]).children()[0]).attr('class');
                      //这个是被动完成
                    if(firstClass == 'label'){
                        var a = $($(lis[i]).find('.order-ner')).css('display','block');
                        var b = $($(lis[i]).find('.order-ner2')).css('display','none');
                        
                    };
                    if(firstClass == 'mui-checkbox mui-left'){
                        var c = $($(lis[i]).find('.edit')).css('display','block');
                        var d = $($(lis[i]).find('.complete')).css('display','none');
                    }
                    
                }
               
            },//编辑
            aditAll(){
                this.editAll = true;
                //this.editOnly = true;
                this.orderner();
            },
            //编辑完成
            aditComp(){
                this.editAll = false;
                //this.editOnly = false
                this.orderner2();
            },
            //被动全部编辑
            allAit(event){
                //获取到所有商店的ul
                  
                var uls = $(event.target).parents('.content').children('#hx');
                
                var  arrLis = [];
                 for(var i=0 ; i<uls.length ; i++){
                    var $lis = $($(uls[i]).children()[0]);
                    var styleShow = $($lis.children()[4]).css('display');
                    arrLis.push(styleShow);
                        
                };
                
                var flag = true;
                for(var i=0 ; i<arrLis.length ; i++ ){
                   
                    if( arrLis[i] == 'none' ){
                                
                        flag = false;
                    }
                };

                if(!flag){
                    this.editAll = false;
                    //this.editOnly = false;
                }else{
                    this.editAll = true;
                    //this.editOnly = true;
                }

            },
             //被动全部完成
             allComp(event){
                 //获取到所有商店的ul  
                var uls = $(event.target).parents('.content').children('#hx');
    
                var  arrLis = [];
                 for(var i=0 ; i<uls.length ; i++){
                    var $lis = $($(uls[i]).children()[0]);
                    var styleShow = $($lis.children()[4]).css('display');
                    arrLis.push(styleShow);
                        
                };
             
                var flag = true;
                for(var i=0 ; i<arrLis.length ; i++ ){
                   
                    if( arrLis[i] == 'none' ){
                                
                        flag = false;
                    }
                };

                if(!flag){
                    this.editAll = false;
                    //this.editOnly = false;
                }else{
                    this.editAll = true;
                    //this.editOnly = true;
                }
             },
            //点击购物车跳转到详情页面
            detailsGoods(ids){
             
                this.$router.push('/pClass/gClass/details/'+ids);
            },
            //重新刷新betterscroll
           /*  shopCartRefresh() {
                this.shopCartMenuScroll && this.shopCartMenuScroll.refresh()
            }, */
            //初始化BScroll
           /*  shopCartInitScroll() {
                this.shopCartMenuScroll = new BScroll(this.$refs.shopCartWrapper)
            }, */
            //主动单选
            selectGood(good,index){
                
                if(!good.checked){
                    good.checked = true
                }else{
                     good.checked = false
                }
                this.isCheckAll();
                this.isCheckLoacl(index);
              
            },
            //主动全选
            selectAll(){
               
                if(!this.isSelectAll){
                    this.isSelectAll = true;
                    this.item(true);
                  
                }else{
                    this.isSelectAll = false;
                    this.item(false);
                }
            },
            //主动局部全选
            selectLocal(items){
                if(!items.isSelectLocal){
                    items.isSelectLocal = true;
                    items.forEach((item)=>{
                        item.checked = true;
                    }) 
                }else{
                    items.isSelectLocal = false;
                    items.forEach((item)=>{
                        item.checked = false;
                    }) 
                }
                this.isCheckAll();
            },
            //被动全选
            isCheckAll(){
                var flag = true;
                for( let x in this.lists){
                    this.lists[x].forEach((item)=>{
                        if(!item.checked){
                            flag =false;
                        }
                    })
                }
                if(!flag){
                    this.isSelectAll = false;
                }else{
                    this.isSelectAll = true;
                }
                
            },
            //被动局部全选
            isCheckLoacl(key){
                var flag = true;
                for(let x in this.lists){
                    if( x == key){
                        this.lists[x].forEach((item)=>{
                            if(!item.checked){
                                flag = false;
                            }
                        })
                        if(!flag){
                            this.lists[x].isSelectLocal = false;
                        }else{
                            this.lists[x].isSelectLocal = true;
                        }
                    }
                }
            },
            //手动输入商品数量
            inputNum(item,event){
                var value = parseInt(event.target.value);
                if(value >= item.limitUserNum){
                     event.target.value = parseInt(item.limitUserNum);
                     item.goodsNum     = parseInt(item.limitUserNum);
                     this._numPropmt(item.limitUserNum);
                    
                     return;
                }else if(value < item.limitOrderNum){
                    event.target.value = parseInt(item.limitOrderNum);
                    item.goodsNum     = parseInt(item.limitOrderNum);
                    this._numLessPropmt(item.limitOrderNum);
                     
                     return;
                }
                
                item.goodsNum = value;
                var data = {
                    "userId" : this.$store.state.userId,
                    "id"    :  item.ids,
                    "goodsId": item.goodsId,
                    "goodsNum" : event.target.value
                };
                var url = baseUrl+'/shoppingCart/mod/goods'
                axios.post(url,data)
                .then((res)=>{
                    
                })
                .catch((err)=>{
                     
                })
                
            },
            //添加商品数量
            plus(item){
                 var result = this._greaterThan(item);
                 
                 if(result){
                       
                        item.goodsNum+=1;
                        var data = {
                            "userId" : this.$store.state.userId,
                            "id"    :  item.ids,
                            "goodsId": item.goodsId,
                            "goodsNum" : item.goodsNum
                        };
                        
                        var url = baseUrl+'/shoppingCart/updateShoppingCartGoods'
                        axios.post(url,data)
                        .then((res)=>{
                           
                            
                        })
                        .catch((error)=>{
                        //alert('系统繁忙，请稍后再试一试！');
                        this.loginErr();
                        })
                }
               
                
            },
            //添加商品数量大于库存是提示
            _greaterThan(item){
                var res = true
                if(item.goodsNum >= item.limitUserNum){
                    item.goodsNum = item.limitUserNum;
                   this._numPropmt(item.limitUserNum);
                  
                   res = false;
                };
                
                return res;
            },
            //最后一件商品提示
           onlyGoods(){
                mui.alert('', '亲！只剩下最后一件商品了哦 ╯﹏╰', function() {
                        
                });
            },
            //减少商品数量
            dec(item){
                 if(item.goodsNum <= 1){
                    item.goodsNum = 1;
                    this.onlyGoods();
                }else{
                    item.goodsNum -=1;
                    var data = {
                        'userId' : this.$store.state.userId,
                        'id'    :  item.ids,
                        'goodsId': item.goodsId,
                        'goodsNum' : item.goodsNum
                    }
                   
                    var url = baseUrl+'/shoppingCart/updateShoppingCartGoods'
                    axios.post(url,data)
                    .then((res)=>{
                    })
                    .catch((error)=>{
                        //alert('系统繁忙，请稍后再试一试！');
                        this.loginErr();
                    })
                }
            },
            //删除确认
            dialogDela(ids,index,goods,event){
                var _this = this;
                 //$(event.target).attr("disabled",true);
                var btnArray = ['是', '否'];
				mui.confirm('你确定要删除该商品么！','', btnArray, function(e) {
					if (e.index == 0) {
                        _this.delGood(ids,index,goods)
						
					} else {
                        //$(event.target).attr("disabled",false);
						
					}
				})
            },
            //正真删除单个商品
            delGood(ids,index,goods){
                    for( let x in this.lists){
                        
                       this.lists[x].forEach((item)=>{
                            if(item.ids == ids){
                                var data = [{
                                    "userId" : this.$store.state.userId,
                                    "id"     : item.ids,
                                    "goodsId" : item.goodsId,
                                    "goodsNum": item.goodsNum,
                                    "vendorId":item.vendorids
                                }];
                                
                                    var url =baseUrl+"/shoppingCart/deleteShoppingGoods";
                                    axios.post(url,data)
                                    .then((res)=>{
                                    
                                        if(res.data.retCode == '000000'){
                                        
                                            this.lists[x].splice(index,1);
                                            if(this.lists[x].length == 0){
                                                delete this.lists[x];
                                            };
                                        }else if(res.data.retCode == '200'){
                                            //alert('系统繁忙，请稍后再试一试！');
                                            this.loginErr();
                                        };
                                        
                                    })
                                    .catch((error)=>{
                                        //salert('系统繁忙，请稍后再试一试！');
                                        this.loginErr();
                                    }) 
                            }
                        })
                    }
               
               //this.emptyCart = this._isEmptyObject();
            },
            //删除多个商品
            delGoods(){
                 var reData = [];
                 for( let x in this.lists){
                     this.lists[x].forEach((item)=>{
                         if(item.checked ==true){
                             var data = {
                                    "userId" : this.$store.state.userId,
                                    "id"     : item.ids,
                                    "goodsId" : item.goodsId
                            };
                            reData.push(data);
                            var url =baseUrl+"/shoppingCart/deleteShoppingGoods";
                                axios.post(url,reData)
                                .then((res)=>{
                                   
                                    if(res.data.retCode == '000000'){
                                       
                                    
                                    };
                                        
                                })
                                .catch((error)=>{
                                    alert('系统繁忙，请稍后再试一试！');
                                })
                         }
                     })
                 }
                
            },
            isEmpty(){
                this.emptyCart = this._isEmptyObject();
            },
            //判断是否空购物车
            _isEmptyObject(){
                 for(let x in this.lists){
                     return false  
                };  
                return true  
            },
             //登录失败提示505
            loginErr(){
                mui.alert('', '系统繁忙，请稍后再试一试！', function() {
                    
                });
            },
            //大于库存提示
            _numPropmt(num){
                mui.alert('', '亲，您只能购买'+num+'件商品哦！', function() {
                    
                });
            },
            //小于库存提示
            _numLessPropmt(num){
                mui.alert('', '亲，您至少要购买'+num+'件商品哦！', function() {
                    
                });
            },
            //结算
            pay(){
                var tatolPrice = this.totalPrice;
                if(tatolPrice == '0'){
                    return;
                }
                for(let x in this.lists){
                    this.lists[x].forEach((item)=>{
                        if(item.checked ==true){
                            var info = {};
                            info.shopName = x;
                            info.lists = item;
                           /*  data.shopName = x;
                            data.lists.push(item); */
                            // 将被选中的信息存放在vue里
                             this.$store.state.shopCart.push(info);
                        }
                    })
                }
                // 将总价、订单号、存放在vuex里
                this.$store.state.totalPrice = tatolPrice;
                this.$store.state.order = this.order()
                /* this.delGoods(); */
                this.$router.push('/user/submitOrder/shopChart');
            },
            //订单号
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
            item(type){
                for(let x in this.lists){

                    this.lists[x].isSelectLocal = type;
                    this.lists[x].forEach((item)=>{
                        item.checked = type;
                    })
                }
            }
        },
        computed:{
            //计算总价
            totalPrice(){
                var total = 0;
                for(let x in this.lists){
                    this.lists[x].forEach((item)=>{
                        if(item.checked){
                            total+=item.price*item.goodsNum;
                        }
                    })
                }
                return total;
            },
            //计算数量
            num(){
                var total = 0;
                for( let x in this.lists){
                    this.lists[x].forEach((item)=>{
                        if(item.checked){
                            total+=1;
                        }
                    })
                }
                return total;
            }
           
        },
        filters:{
            spliceKey:function(str){
                return str.split('#')[0];
            },
            spliceName:function(str){
                return str.split('#')[1];
            }
        },
        components: {
           loading
        }
    }       
</script>
<style type="text/css">
  @import "./shopCart.css"; 

</style>
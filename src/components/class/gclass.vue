<template>
  <div>
    <search :backfill='backfill' ref="query"></search>
      <div class="food">
            <loading v-show="loading"></loading>
            <div class="gClass" ref="gClassWrapper" v-show="!loading">
                
                <ul class="searchlist-normal" v-show="goodClass3.length">
                    <li class="normal-list" v-for="(item,index) in goodClass3">
                        <router-link :to="'/pClass/gClass/details/'+item.ids">
                            <div class="pro-img">
                            <img :src="img+item.filepath"/>
                            </div>
                            <div class="product-info-box">
                                <div class="product-name">               
                                    <span>{{item.title}}</span>           
                                </div>
                                <div class="gray-icon"></div>            
                                <div class="product-price-m">           
                                    <em>
                                        ¥<span class="big-price">{{item.price}}</span>
                                    </em>            
                                </div>           
                            </div>
                        </router-link>  
                    </li>
                </ul>
                <div v-show="!goodClass3.length" class="tip">
                    <span>未找到相关数据！</span>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import search  from './search';
import BScroll from 'better-scroll';
import {baseUrl,imgUrl} from '@/config/env'
import loading from '../loading/loading'
export default {
    data(){
        return{
            goodClass3:[],
            loading:false,
            img:imgUrl,
            backfill:''
        }
    },
     created(){
        //路由参数
        var ids = this.$route.params.num
        var reg = /^keyWord=/gi;
        var exp =reg.test(ids);
        //根据ids和keyword判断是使用ids进入三级商品分类还是通过关键字进入的
        if(ids&&!exp){
            var than = this;
            this._initGoods(ids,than);
        }else{
            var type = typeof (this.$store.state.searchVal)
            if( type != 'string' ){
                 
                 this.backfill = this.$route.params.num.split('=')[1];
               
                 var val = this.$store.state.searchVal;
                this.goodClass3 = val;
            }
           
        }
        
    },
    mounted(){
         //再次初始化bs插件
         this.$nextTick(() => {
            this.initScroll();
            this._searchBackNum();
        })
    },
    updated () {
        //数据更新是时初始化bs插件
        this.$nextTick(() => {
            this.refresh()
        })
    },
    watch:{
          //多个url关联同一个组件，监听路由的变化，然后执行相关操作
         '$route' (to, from) {
             var type = typeof (this.$store.state.searchVal)
            if( type != 'string' ){
                
                 this.backfill = this.$route.params.num.split('=')[1];
                 
                 var val = this.$store.state.searchVal;
                this.goodClass3 = val;
            }else{
                 this.goodClass3 = '';
            }
             
        }
    },
    methods:{
        //调用搜索组件回填数据
        _searchBackNum(){
            this.$refs.query.backNum();
        },
        //重新刷新betterscroll
        refresh() {
            this.menuScroll && this.menuScroll.refresh()
        },
        //初始化BScroll
         initScroll() {
                this.menuScroll = new BScroll(this.$refs.gClassWrapper,{
                    click:true
                })
            },
        //关键字搜索
         _searchKey(data){
             var url  =baseUrl+"/goodsInfo/queryGoodsInfoList";
              axios.post(url,data)
              .then((res)=>{
                  this.goodClass3 = res.data.data.responseInfo;
                  this.$nextTick(() => {
                    this.initScroll()
                 })
              })
              .catch((error)=>{
                  alert('系统繁忙，请稍后再试一试！');
              })
         },
         //正常查询（通过ids）
         _initGoods(ids,than){
             this.loading = true;
             var _this = this;
            var url = baseUrl+'/goodsInfo/queryGoodsList';
            axios.get(url, {
　　              params: { 'id': ids }
            }).then(function (res) {
                    than.goodClass3 = res.data.data.responseInfo;
                    _this.loading = false;
            }).catch(function (res) {
　　               alert('系统繁忙，请稍后再试一试！');
                    _this.loading = false;
           });
        }
    },
    components:{
        search,
        loading
    }
  
}
</script>


<style>
.food{
 display: flex; 
  position: fixed;
  left: 0;
  top:44px;
  bottom:67px;
  z-index: 30;
  width: 100%;
  background: #ffffff;
 overflow: hidden;
}

    /* gClass */
    .gClass{

        background-color: #fff;
       width: 100%;
    }
    .gClass .tip{
        text-align: center;
        margin-top: 47px;
       font-size: 20px;
       padding-bottom: 36px;
    }
     .gClass .searchlist-normal li a{
        display:flex;
     }
    .gClass .searchlist-normal .pro-img{
        flex:0 0 100px;
        height: 100px;
        width: 100px;
        margin-left: 10px;
        overflow: hidden;
        text-align: center;
    }
    .gClass .pro-img img{
        width: auto;
        max-width: 100px;
        height: 100px;
    }
    .gClass .searchlist-normal .product-info-box{
         flex:1;
         padding-top:10px;
         padding-left:10px;
         color:#000;
    }
     .searchlist-normal .normal-list {
         border-bottom: 1px solid rgb(218,218,218);
     }
    .searchlist-normal .normal-list a .product-info-box .gray-icon {
    height: 25px;
    margin: 0px;
    overflow: hidden;
    line-height: 25px;
}
 .searchlist-normal .normal-list a .product-info-box .product-price-m {
    height: 20px;
    overflow: hidden;
   /*  width: 100%;
   line-height: 20px;
   margin-right: 10px; */
    color:red;
}
</style>

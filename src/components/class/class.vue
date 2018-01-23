<template>
    <div>
        <router-view></router-view>
        <search></search>
        <div class="pClass">
            <!--左边-->
            <div class="menu-wrapper" ref="menuWrapper" v-show="goodClass.length">
                <ul>
                    <li class="menu-item" ref="list" v-for="(item,index) in goodClass" :data-ids="item.ids"  @click="selectMenu(index,$event)">
                        {{item.name}}
                    </li>
                   
                </ul>
            </div> 
            <!--右边-->
            <div class="foods-wrapper" ref="foodWrapper" v-show="goodClass2.length">
                <ul>
                    <li class="food-list food-list-hook">
                        <ul>
                            <li v-for="(item,index) in goodClass2">
                                <router-link :to="'/pclass/gclass/'+item.ids">
                                    <img style="width:100px;height:100px" :src="imgUrl+item.img"/>
                                    <br />
                                    <span>{{item.name}}</span>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            <loading v-show="!goodClass"></loading>
        </div>
        
    </div>
</template>

<script type="text/javascript">
    import search  from './search';
    import BScroll from 'better-scroll';
    import loading from '../loading/loading'
    import {baseUrl,imgUrl} from '@/config/env'

    export default{
      data(){
        return {
           goodClass:'',
           goodClass2:'',
           imgUrl
        }
      },

      created(){
       axios.get(baseUrl+'/goodsClass/queryClass')
            .then((res)=>{
                if(res.data.retCode == '000000'){
                    this.goodClass = res.data.data.responseInfo;
                    //初始化bs插件
                    this.$nextTick(() => {
                        this._initScroll()
                    })
                     
                }else if(res.data.retCode == '200'){
                        alert('系统繁忙，请稍后再试一试！');
                }
                
            })
            .catch((error)=>{
                alert('系统繁忙，请稍后再试一试！');
            })
      },
      mounted(){
         
      },
      watch:{
           //设置进入页面时，高亮左边的最后一个li，同时关联右边的二级数据
            goodClass(){
                var clean = setTimeout(() => {
                    clearTimeout(clean);
                    $('.menu-wrapper ul li:last-child').addClass('current').siblings('li').removeClass('current'); 
                    var index = $('.menu-wrapper ul li:last-child').index();
                    var classId = this.goodClass[index].ids;
                    this._goodslist(index,classId)
                }, 20);
            }
      },
      mounted(){
            //页面上的数据发生变化重新初始化bs插件
            this.$nextTick(() => {
                this._initScroll()
            })
        
      },
      methods:{
        //初始化bs插件
        _initScroll() {
                this.menuScroll = new BScroll(this.$refs.menuWrapper,{
                    click:true
                });
                this.foodScroll = new BScroll(this.$refs.foodWrapper,{
                    click:true
                });
            },
        //左边点击事件
        selectMenu(index,event){
             if(!event._constructed) {
                    return;
                };
                $(event.target).addClass('current').siblings('li').removeClass('current');
                var classId = $(event.target).data('ids');
                var index   = $(event.target).index();
                this._goodslist(index,classId)
                
        },
        //右边加载数据的事件
        _goodslist(index,classId){
                this.goodClass2 = "";
                var detailli = $('.foods-wrapper>ul>li');
                $(detailli[index]).show().siblings().hide();
                var url = baseUrl+'/goodsClass/queryClass';
                axios.get(url,{
                    params: {'classId' : classId }
                }).then((res)=>{
                    if(res.data.retCode == '000000'){
                        this.goodClass2 = res.data.data.responseInfo;
                    }
                    
                })
                .catch((error)=>{
                    alert('系统繁忙，请稍后再试一试！');
                })
        }
      },
      components:{
          search,
          loading
      }

    }

</script>

<style type="text/css">

    /* pClass */
    /* 左边 */
  .pClass{
    display:flex;
    position:absolute;
    width: 100%;
    top:44px;
    bottom:58px;
    overflow: hidden;
    background-color: #ffffff;
  }
  
  .pClass .menu-wrapper{
    flex: 0 0 100px;
    width: 100px;
    background:#f3f5f7;
  }
    
   .pClass .menu-wrapper .menu-item{
      display: table;
      width:100px;
      height: 54px;
      line-height: 54px;
      padding: 0 12px;
      border-bottom: 1px solid #eee;
    } 
    .menu-wrapper,.current{
        position:relative;
        z-index:10;
        margin-top:-1px;
        background:#fff;
        font-weight:700;
    }
    /* 右边 */
    .foods-wrapper .food-list ul{
        overflow:hidden;
    }
    .foods-wrapper .food-list li{
        float: left;
        display:inline-block;
        text-align: center;
        margin:20px 0 0 20px;
    }
     .foods-wrapper .food-list a{
        color: #000;
     }

     @media screen and (max-width:320px) {
         .foods-wrapper .food-list li{
            width: 80px;
         }
     }
</style>


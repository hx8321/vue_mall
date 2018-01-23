<template>
     <header class="mui-bar mui-bar-nav" :class="barColor">
         
            <input type="search" placeholder="请输入关键字" class="input" value="" :id="inputColor"/>
            <span id="iconLog" class="mui-icon mui-icon-search"  @click="search()"></span>
    </header>
  
</template>

<script>
import {mapActions} from 'vuex';
import {baseUrl } from '@/config/env'
export default {
    data(){
        return {
           arr:''
        }
    },
    props:{
        barColor:{
            type:String,
            default:'mSearch'
        },
        inputColor:{
            type:String,
            default:'headSearch2'
        }
    },
    methods:{
        //关键字搜索
         _search(data,value){
             var url  =baseUrl+"/goodsInfo/queryGoodsInfoList";
              axios.post(url,data)
              .then((res)=>{
                  if(res.data.retCode == '000000'){
                    
                      this.arr = res.data.data.responseInfo;
                      this.goSearch(this.arr);
                     window.location.href="#/pClass/gClass/keyWord="+value;

                  }else if(res.data.retCode == '900001'){

                       this.arr = res.data.retMsg;
                       this.goSearch(this.arr);
                       window.location.href="#/pClass/gClass/keyWord="+value;
                  }
                  
              })
              .catch((error)=>{
                  alert('系统繁忙，请稍后再试一试！');
              })
         },
        ...mapActions(['goSearch']),
        search(){
            var value = $('.input').val();
            //this.$router.push('/pclass/gclass');
            var data = {'title':value}; 
            this._search(data,value);
        }
    }
}
</script>

<style>
/* header */
    .mSearch{
        width:100%;
        height:48px;
        background-color:transparent;
        color: #000;
        position:fixed;
        top:0;
        z-index: 100;

    }
    .mSearch2{
        width:100%;
        height:48px;
        background-color:#fff;
        color: #000;
        position:fixed;
        top:0;
        z-index: 100;
    }
   input#headSearch{
        position:fixed;
        top:0;
        background:rgba(255,255,255,0.8);
        height: 34px;
        width: 94%;
        padding-left: 35px;
    } 
    input#headSearch2{
        position:fixed;
        top:0;
        background-color:#efefef;
        height: 34px;
        width: 94%;
        padding-left: 35px;
        border: 1px solid #d0d0d0;
    }
    .mSearch .mui-icon-search{
        line-height:29px;
        position: absolute;
        top:-1px;
        right: 22px;
       
    }
    .mSearch2 .mui-icon-search{
        line-height:29px;
        position: absolute;
        top:-1px;
        right:15px;
       
    }
</style>

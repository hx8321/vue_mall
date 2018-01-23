<template>
     <header class="search mui-bar mui-bar-nav">
            <!-- <a href="#" class="mui-icon mui-icon-arrowleft"></a> -->
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <input id="hxhx" type="search" placeholder="请输入关键字" value="" class="headSearch"/>
            <span class="mui-icon mui-icon-search"  @click="search()"></span>
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
        backfill:{
            type:String
        }
    },
    waatch:{
        backfill(){
           
        }
    },
    methods:{
        //回填数据
        backNum(){
            
             $('.headSearch').val(this.backfill)
        },
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
            var value = $('.headSearch').val();
            //this.$router.push('/pclass/gclass');
            var data = {'title':value}; 
            this._search(data,value);
        }
    }
}
</script>

<style>
/* header */
    .search{
        width:100%;
        height:44px;
        background-color:#000;
        color:#fff;
        display:flex;
    }
    .search a{
         line-height:29px;
         color:#fff;
    }
     .search input{
        flex:1;
        color:#fff;
    }
    .search .mui-icon-search{
        line-height:29px;
    }
   .search .headSearch{
        font-size: 22px;
   }
</style>

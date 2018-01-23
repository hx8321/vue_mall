<template>
	<div class="mui-slider white" id="slider"  v-if="advertiseDt[0]?true:false">
	  <div class="mui-slider-group  mui-slider-loop">
	    <div class="mui-slider-item mui-slider-item-duplicate">
	      <a :href="advertiseDt[advertiseDt.length-1].url">
			<img :src="imgUrl+advertiseDt[advertiseDt.length-1].imageurl">
		  </a>
	    </div>
	    	
	    <div class="mui-slider-item" v-for="advertiseItem in advertiseDt">
	      <a :href="advertiseItem.url">
			<img :src="imgUrl+advertiseItem.imageurl">
		  </a>
	    </div>
	    
	    <div class="mui-slider-item mui-slider-item-duplicate">
	      <a :href="advertiseDt[0].url">
			<img :src="imgUrl+advertiseDt[0].imageurl">
		  </a>
	    </div>
	  </div>
	  
	  <div class="mui-slider-indicator">
	  	<div :class="{'mui-indicator':true,'mui-active':key==0?true:false}" v-for="(val,key) in advertiseDt"></div>
	  </div>
	  
	</div>
</template>

<script>
import {imgUrl} from '@/config/env'
   export default{
   	data:function(){
   		return {
   			//图片路径前缀
   			imgUrl
   		}
   	},
   	//广告列表数据
		props:['advertiseDt'],
	}
</script>

<style>
</style>
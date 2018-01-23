<template>
	<div id="ui-main" class="public-marginb">
		<uinav></uinav>
		<uicontent></uicontent>
	</div>
</template>

<script>
	import uinav from '@/components/user-center/user-info/ui-nav'
	import uicontent from '@/components//user-center/user-info/ui-content'
	export default{
		components:{
			uinav,
			uicontent,
		},
		mounted(){
			//更换body背景色
			$("body").css("background-color","white");
		},
		destroyed(){
			//恢复body背景色
			$("body").css("background-color","#efeff4");
		}
	}
</script>

<style>
</style>
<template>
  <div id="app">
    <router-view v-bind:seller="seller"></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
import footer from './components/footer/footer.vue';

export default {
    data(){
        return {
			seller:[],
			info : "App"
        }
    },
  name: 'app',
  components:{
      'v-footer': footer
  }
}
</script>

<style>
	/*@media only screen and (max-width:360px) {
		html{
			font-size: 12px;
		}
		body #main{
			margin-bottom: 5.742857rem;
		}
		body .tops>div{
			padding-top:0.857142rem;
		}
	}
	.white{
			background-color: white;
		}
	.fontH{
		font-size: 1.142857rem;
	}
	.fontblack{
		color: black;
	}
	.fontsilver{
		color: silver;
	}
	.fontsmall{
		font-size: 0.342857rem;
	}
	.fontRed{
		color: red;
	}
	.textline-through{
		text-decoration:line-through;
	}
	.line{
		display: inline-block;
		width: 0.285714rem;
		background-color: red;
		height: 60%;
		position: relative;
		top:20%;
		margin-right: 0.571428rem;
	}
	.brc{
		border-radius:1.142857rem;
		background-color: red;
		padding: 0.285714rem;
		color: white;
		font-size: 0.342857rem;
	}*/
</style>

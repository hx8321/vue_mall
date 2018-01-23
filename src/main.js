// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'

Vue.config.productionTip = false
Vue.filter("decimal", function(str) {
    return parseFloat(str).toFixed(2);
});

Vue.filter("delSpace", function(str) {
    return str.replace(" ","");
});
Vue.filter("omit", function(str) {
	let result;
	if(str.length>3){
		result=str.substr(0,1)+"**"+str.substr(str.length-1,1);
	}else{
		result=str;
	}
	return result;
    
});
Vue.filter("dateFormat", function(str) {
	return str.substr(0,4)+"-"+str.substr(4,2)+"-"+str.substr(6,2)+" "+str.substr(8,2)+":"+str.substr(10,2)+":"+str.substr(12);
    
});
//Vue.prototype.aaa = '';
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
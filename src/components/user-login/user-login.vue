<template>
  <div class="userLogin">
    <header id="ui-nav" class="mui-bar mui-bar-nav">
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
        <h1 class="mui-title">用户登录</h1>
    </header>
    <div class="user-con">
        <form action="">
            <ul>
                <li>
                    <label  for="user"><img src="../../resource/用户 .png" alt="" /></label>
                    <input type="text" id="username"/>
                    <div class="linek"></div>
                </li>
                <li>
                    <label for="word" ><img src="../../resource/锁.png" alt="" /></label>
                    <input type="password" id="password"/>
                    <div class="linek"></div>
                </li>
            </ul>
            <div class="user-footer">
                <button class="btn login" type="button" @click="submit()">登录</button>
                <a href="JavaScript:void 0" class="noWord">忘记密码</a>
                 <router-link to="/register">
                     <a href="JavaScript:void 0" class="register">免费注册</a>
                 </router-link>   
            </div>
        </form>
    </div>
    <div class="modal2" v-show='show' id="modal">
         <span>{{result.msg}}</span>
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5';
  import {mapActions} from 'vuex';
  import encryption from '@/common/js/encryption.js';
  import {baseUrl } from '@/config/env'
export default {
    data(){
        return {
            show:false,
            result:{
                status:false,
                msg:''
            }
        }
    },
    methods:{
        ...mapActions(['loginIds']),
        ...mapActions(['changeLogin']),
        ...mapActions(['loginUserId']),
        //提交
        submit(){
            //校验的数据
            var formData = {
                userId: $.trim($('#username').val()),
                password:$.trim($('#password').val())
            };
            this.formValidate(formData);
            this.showMsg();
            var md = md5($.trim($('#password').val()));
       
            var encry = encryption(md).toString();
           
            //加密的数据
            var subData = {
                userId: $.trim($('#username').val()),
                password:encry
            };
            if(this.result.status){
                $('.user-footer>.login').attr('disabled','disabled');
                $('.user-footer>.login').text('登录中。。。');
                var url = baseUrl+'/spUser/signIn'
                axios.post(url,
                           subData
                ).then((res)=>{
                    if(res.data.retCode == '000000'){
                        this.$store.state.nickName=res.data.data.responseInfo.nickName;
                        //分发actions组件中调用
                        this.loginIds(res.data.data.responseInfo.ids);
                        this.loginUserId(res.data.data.responseInfo.userId);
                        this.changeLogin(1);
                       
//                      window.location.href="/#/Main"
						this.$router.go(-1);
                    }else if(res.data.retCode == '400020'){
                        $('.user-footer>.login').removeAttr('disabled')
                        $('.user-footer>.login').text('登录');
                        //alert('您输入的账号或者密码有误！');
                        this.loginEroor();
                        this._inputEmpty();
                    }else if(res.data.retCode == '200'){
                        
                        this.dialogErro();
                        this._inputEmpty();
                        //alert('系统繁忙，请稍后再试一试！');
                    }
                    $('.user-footer>.login').removeAttr('disabled')
                    $('.user-footer>.login').text('登录');
                    
                }).catch((error)=>{
                     this.dialogErro();
                     this._inputEmpty();
                    $('.user-footer>.login').removeAttr('disabled')
                    $('.user-footer>.login').text('登录');
                })
            };
            
        },
        //清空input的值
        _inputEmpty(){
            $('#password').val('');
            $('#username').val('');
        },
       //校验
       formValidate(formData){
            if(!formData.userId){
                this.result.msg = '用户名不能为空！';
                return;
            };
            if(!formData.password){
                this.result.msg = '密码不能为空';
                return;
            };
            this.result.status = true;
            this.result.msg = '';
            return;
       },
       //登录失败提示505
        loginEroor(){
            mui.alert('', '您输入的账号或者密码有误！', function() {
				
			});
        },
        //登录失败提示400020
        dialogErro(){
            mui.alert('', '系统繁忙，请稍后再试一试！', function() {
				
			});
        },
       //显示提示信息
       showMsg(){
            if(this.result.msg != ''){
                this.show = true;
            };
            var clean=setInterval(()=>{
                clearInterval(clean)
                this.result.msg = '';
                this.show = false;
            },3000)

       }

    }


}
</script>


<style>
@import "./user-login.css";
</style>

<template>
  <div class="userRegister">
    <header id="ui-nav" class="mui-bar mui-bar-nav">
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
        <h1 class="mui-title">用户注册</h1>
    </header>
    <div class="user-con">
        <form action="">
            <ul> 
                <li>
                    <label for="userId" >账号</label>
                    <input type="text" id="userId" placeholder="请输入用账号"/>
                    <div class="linek"></div>
                </li>
                <li>
                    <label for="word1" >密码</label>
                    <input type="password" id="word1" placeholder="请输入密码"/>
                    <div class="linek"></div>
                </li>
                 <li>
                    <label for="word2" class="word2">确认密码</label>
                    <input type="password" id="word2" placeholder="请再次输入密码"/>
                    <div class="linek"></div>
                </li>
                <li>
                    <label for="phone" >昵称</label>
                    <input type="text" id="nickName" placeholder="请输入昵称"/>
                    <div class="linek"></div>
                </li>
                 <li>
                    <label for="email" >性别</label>
                    <select name="" id="sex">
                        <option value="">请选择性别</option>
                        <option value="M">男</option>
                        <option value="WM">女</option>
                    </select>
                    <div class="linek"></div>
                </li>
            </ul>
            <div class="user-footer">
                <button class="btn register" type="button" @click="submit()">立即注册</button>
                 <router-link to="/userLogin">
                     <a href="JavaScript:void 0" class="register">已有账号，去登录>></a>
                 </router-link>   
            </div>
       </form>
    </div>
   <div class="modal3" v-show='show' id="modal">
        <span>{{result.msg}}</span>
   </div>
  </div>
</template>

<script>
import md5 from 'js-md5';
import encryption from '@/common/js/encryption.js';
 import {baseUrl } from '@/config/env'
export default {
    data(){
        return {
            show:false,
            result: {
                status : false,
                msg:''
            }
        }
    },
    methods:{
         //提交
        submit(){
            var formData = {
                userId    :$.trim($('#userId').val()),
                word1     :$.trim($('#word1').val()),
                word2     :$.trim($('#word2').val()),
                nickName  :$.trim($('#nickName').val()),
                sex       :$.trim($('#sex').val()),
            };
            this.formValidate(formData);
            this.showMsg();
            if(this.result.status){
                var md = md5($.trim($('#word1').val()));
                var encry = encryption(md).toString();
                var data = {
                        userId    :$.trim($('#userId').val()),
                        password  :encry,
                        nickName  :$.trim($('#nickName').val()),
                        sex       :$.trim($('#sex').val()),
                };
               /*  var data = JSON.stringify(data); */
               /* {headrs:{'Content-Type':'application/x-www-form-urlencoded'}} */
               
                var url = baseUrl+'/spUser/signUp'
                $('.user-footer>.register').attr('disabled','disabled');
                $('.user-footer>.register').text('注册中。。。');
                axios.post(url,data,{headrs:{'Content-Type':'application/x-www-form-urlencoded'}}
                    ).then((res)=>{
                   
                    this.result.msg = res.data.retMsg;
                    
                    //this.showMsg();
                    $('.user-footer>.register').removeAttr('disabled')
                    $('.user-footer>.register').text('立即注册');
                    //alert(res.data.retMsg);
                    if(res.data.retCode == '000000'){
                         this.dialogSucc();
                         this.formEmpty();
                          return;
                    }else if(res.data.retCode == '400010'){
                        this.dialogErro();
                        this.formEmpty();
                        return;
                    }
                   
//                  window.location.href="/userLogin?#/userLogin";
                    //this.$router.go(-1);
                    
                }).catch((error)=>{
                    $('.user-footer>.register').removeAttr('disabled')
                    $('.user-footer>.register').text('立即注册');
                   
                    //this.result.msg = error;
                    //this.showMsg();
                      this.serError();
                });                
            }
        },
        //检验
        formValidate(formDate){
            
            if(!formDate.userId){
                this.result.msg='用户ID不能为空';
                return;
            };
            if(formDate.userId.length <3){
                this.result.msg='用户ID的长度不能小于3且不能大于10';
                return;
            };

            if(formDate.userId.length > 10){
                this.result.msg='用户ID的长度不能小于3且不能大于10';
                return;
            };
            var reg = /[()''""\\\/]/gi;
            if(reg.test(formDate.userId)){
                this.result.msg='用户ID不能有括号等特殊字符';
                return;
            };
          
          
            if(!formDate.word1){
                this.result.msg='密码不能为空';
                return;
            };
            if(formDate.word1.length != 6){
                this.result.msg='密码长度为6位';
                return;
            };
            if(formDate.word1 !== formDate.word2){
                this.result.msg='两次密码不一致';
                return;
            };
            if(!formDate.nickName){
                this.result.msg='用户昵称不能为空';
                return;
            };

            if(!formDate.sex){
                this.result.msg='性别不能为空 ';
                return;
            };
           
            this.result.status = true;
            this.result.msg = '';
            return;
        },
        //清除表单数据
        formEmpty(){
            var inputs = $('input');
            for(var i =0 ; i<inputs.length ;i++){
                $(inputs[i]).val('');
            };
            $('#sex').val('');
        },
        //注册成功提示
        dialogSucc(){
            mui.alert('', '注册成功！', function() {
			});
        },
        //账号已被注册提示
        dialogErro(){
             mui.alert('', '该账号已被注册了！', function() {
			});
        },
        //服务器故障提示
        serError(){
            mui.alert('', '系统繁忙，请稍后再试一试！', function() {
			});
        },
        //显示提示信息
       showMsg(){
            if(this.result.msg != ''){
                this.show = true;
            };
            var clean = setInterval(()=>{
                clearInterval(clean)
                this.result.msg = '';
                this.show = false;
            },3000)

       }
         
    }
}
</script>


<style>
@import "./register.css"; 
</style>

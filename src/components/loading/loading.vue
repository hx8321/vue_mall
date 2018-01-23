<template>
  <div class="loading">
    <img width="52" height="52" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>

<style>
.loading{
    width: 100%;
    text-align: center;
    margin-top: 48px;
}
.loading .desc{
    line-height: 20px;
    font-size: 18px;
    color: rgb(255, 255, 255, 0.5);
}
</style>


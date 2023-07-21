<template>
  <div class="notice">
    <div style="margin-left: 5%; margin-right: 5%; padding-top: 5%">

      <div  style="background-color:#fafafa;display:flex;align-items: center;">
        <a-icon type="sound" style="font-size: 3vh;"/>
        <h6
          style="color: dimgray;margin:5px 0 5px 2vh;display:inline-block"
        >  
          公告
        </h6>
        
      </div>
      <hr style="margin-top: 0;"/>
      <div class="content">
        <h6 style="color: dimgray">欢迎浏览我的博客</h6>
        <h6 style="color: dimgray">不定期更新一些文章</h6>
        <!-- <h6 style="color:white">职业：前端程序员</h6>
      <h6 style="color:white">文学/语言/篆刻/露营爱好者</h6> -->
        <br />
        <!-- <h6 style="color: dimgray">近况：</h6> -->
        <!-- <h6 style="color: dimgray">找工作 / 毕设</h6> -->
        <!-- <h6 style="color: white">考虑延毕中...</h6> -->

      </div>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  name: "noticeComponent",
};
</script>

<style scoped>
.notice {
  background-color:#ffffff;
  width: 95%;
  height: auto;
  margin-left: 2%;
  margin-top: 8%;
  border-radius: 10px;
  /* box-shadow: 0px 4px 6px 2px rgb(223, 223, 223); */
  border:1px solid rgb(208, 215, 222);


}
.content{
  margin-top: 5px;
  margin-left: 2%;
}
</style>
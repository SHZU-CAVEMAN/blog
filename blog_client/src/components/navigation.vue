<template>
   <div class="navigation">
      <img src="../assets/caveman.jpg" class="img" />
      <div style="color:rgb(0, 0, 0);font-size:4vh;font-family: lisu;margin-left: 2vh;">山顶洞人</div>
      <a-icon type="home" theme="filled" style="font-size: 3vh;margin-left: 50%;" />
      <div class="shouye">
         <!-- 再内嵌一个div，这样悬浮放大字体时就不会影响旁边的字体了-->
         <div style="width:8vh;background-color: " @click="jump1">首页</div>
      </div>
      <a-icon type="user" theme="" style="font-size: 3vh;margin-left:2vh;"/>
      <div class="guanyu">
         <div style="width:8vh;background-color: " @click="jump2">关于</div>
      </div>
      <a-icon type="edit" theme="filled"  style="font-size: 3vh;margin-left:2vh;"/>
      <div class="bianji">
         <div style="width:8vh;background-color:" @click="jump3">编辑</div>
      </div>
      <!-- <a-icon type="link" spin="true" style="font-size: 3vh;margin-left:2vh;"/>
      <div class="youlian">
         <div style="width:8vh;background-color:" @click="jump3">友链</div>
      </div> -->
   </div>
</template>

<script>
export default {
   name: "navigationComponent",
   methods: {
      click() {
         // alert("haha");
         let node = document.getElementById("shouye");
         node.style.cssText = "text-decoration:underline;";
      },
      jump1() {

         this.$router.push({
            name: "articleList",
         });
      },
      jump2() {
         this.$router.push({
            name: "articleViewComponent",
            params: {
               id: 0,
               name: 'blogger',
            }
         });
      },
      jump3() {
         this.$router.push({
            name: "mdEditorComponent",
         });
      },
   }
};
</script>

<style lang="css" scoped>
.navigation {
   display: flex;
   align-items: center;
   text-align: center;
   position: relative;
   background-color: #F6F8FA;
   height: 10vh;
}

.img {
   width: 8vh;
   height: 8vh;
   margin-left: 8%;
   border-radius: 50%;
}

.shouye {
   line-height: 10vh;
   color: rgb(61, 61, 61);
   font-size: 2.7vh;
   margin-left: 0%
}

.shouye::after {
   background-color: rgb(0, 0, 0);
   height: 2px;
}

.shouye:hover {
   font-size: 3.2vh;
   /* text-decoration: underline; */
}

.guanyu {
   line-height: 10vh;
   color: rgb(61, 61, 61);
   font-size: 2.7vh;
   margin-left: 0%
}

.guanyu:hover {
   font-size: 3.2vh;
   /* text-decoration: underline; */
}

.bianji {
   line-height: 10vh;
   color: rgb(61, 61, 61);
   font-size: 2.7vh;
   margin-left: 0%
}

.bianji:hover {
   font-size: 3.2vh;
   /* text-decoration: underline; */
}
.youlian {
   line-height: 10vh;
   color: rgb(61, 61, 61);
   font-size: 2.7vh;
   margin-left: 0%
}

.youlian:hover {
   font-size: 3.2vh;
   /* text-decoration: underline; */
}


#blogger:hover {
   text-decoration: underline;

}

#editor:hover {
   text-decoration: underline;
}</style>
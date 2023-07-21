<template>
  <div class="article">
    <!-- <hr style="margin-top: 8px;" /> -->
    <br/>
    <div id="top" style="
          
            ">
      <a style="font-size: 22px"><a style="background-color: #fafafa;">最新：</a>
        <a id="titlename" @click="jump(article.id, article.name)"> {{ article.name }}</a></a>
    </div>

    <div class="description">
      <!-- <a
        id="titlename"
        style="height: 50px; background-color: ; font-size: 25px"
        @click="jump(article.id, article.name)"
        >{{ article.name }}</a
      > -->

      <hr style="margin-top: 0px; margin-bottom: 0px" />
    

      <div style="
                font-size: 16px;
                min-height: 25vh;
                background-color: #F6F8FA;
                border-radius: 0%;
                color: dimgray;
                padding: 5px 10px 0 10px;
              ">
        {{ article.intro }}
      </div>

      <hr style="margin-top: 0px; margin-bottom: 3vh" />

      <!-- 底栏start -->
      <div style="font-size: small">
        <div style="display: inline-block; width: 60%; color: dimgray">
          <div style="display: inline-block; ">
            <a style="font-size: 15px">发布：2023-2-14</a>
          </div>
          <!-- <div style="display:inline-block">
            修改：2023-3-21
          </div> -->
        </div>

        <div style="display: inline-block">
          <a href="">
            <p style="display: inline-block; color: dimgray">
              <a style="font-size: 15px">分类：</a>
            </p>
            <!-- 以下的a标签，如果没有style则默认使用a的样式。id为category，
              悬浮效果会使用category组件同名的 dom样式 -->
            <a @click="jumpCate(article.category)" id="category" style=""> {{ article.category }}</a>
          </a>
        </div>
      </div>
      <!-- 底栏end -->
    </div>


    <div id="picture">
      <a @click="jump(article.id, article.name)">
        <img :src="pictureUrl" style="
                  width: 100%;
                  height: 170px;
                  border-radius: 0%;
                  object-fit: cover;
                  flex: 1;
                " />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "articleComponent",
  data() {
    return {
      //封面图片
      // pictureUrl: "http://localhost:3001/uploadFiles/"+ this.article.picture ,
    };

  },
  computed: {
    pictureUrl() {
      return "http://localhost:3001/uploadFiles/" + this.article.picture;
    }
  },
  props: ["article"],
  methods: {
    jump(id, name) {
      // console.log(id);

      this.$router.push({
        name: "articleViewComponent",
        params: {
          id,
          name,
        },
      });
    },
    jumpCate(name) {
      // console.log("点击事件没问题",name)

      this.$router.push({
        name: "articleListCate",
        //在这里携带 params参数（category_name)比较好。
        // query:{
        //   name,
        // }
      });

        // this.$bus.$emit('cateEvent', name);  //被触发的那个组件还没被创建出来?

    }
  },
  mounted() {
    // this.articleInfo = JSON.stringify(this.a);
    console.log(this.article.picture);
    //  console.log(Object.assign({},this.a));
  },
};
</script>

<style scoped>
.article {
  background-color: #ffffff;
  width: 96%;
  /* height: 230px; */
  /* height: 200px; */

  margin-bottom: 3%;
  margin-left: 2%;
  border-radius: 10px;
  /* box-shadow: 0px 4px 6px 2px rgb(223, 223, 223); */
  border:1px solid rgb(208, 215, 222);

}

.description {

  display: inline-block;
  vertical-align: top;

  margin-top: 2%;
  margin-left: 2%;
  width: 56%;
  /* height: 200px; */
  /* height: 150px; */
}

#picture {
  background-color: rgb(255, 255, 255);
  display: inline-block;
  vertical-align: top;
  margin-top: 2%;
  margin-left: 2%;
  margin-bottom: 2%;
  width: 38%;
  /* height: 200px; */
}

#picture:hover {
  box-shadow: 0px 4px 10px 2px rgb(185, 185, 185);
}

#top {
  background-color: #F6F8FA;
  margin: 0 2% 0 2%;
  padding: 5px 5px 5px 5px;
}

#top:hover {
  background-color: #ffffff;
}

#top #titlename {
  font-size: 22px;
  color: dimgray;
  /* color:#0d6efd; */
}

#top:hover #titlename {
  /* color: #000000; */
  /* color: #1890ff; */

  /* 字体变大 */
  /* font-size:25px; */

  /* 字体加粗 */
  font-weight: 520;
  color:black;
  /* text-decoration: underline; */

  /* 给字体加下划线 */
  /* text-decoration: null; */
}


#category {
  color: dimgray;
  font-size: 15px;
  background-color: #F6F8FA;
  padding: 0.8vh 2vh;
  border:1px solid rgb(208, 215, 222);
  
  border-radius: 1vh;
}

#category:hover {
  /* color: #1890ff; */
  background-color:#F3F4F6;
  /* text-decoration: underline; */
  font-weight: 510;
}</style>
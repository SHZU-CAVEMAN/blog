<template>
  <div id="home">

    <!-- key 怎么使用？什么时候更新视图可以？ -->
    <!-- <articleList  :key="new Date().getTime()"/> -->
    <!-- <articleList  :key="time"/> -->

    <!-- <markdown/> -->

    <div style="margin: 0px 10% 0 10%;padding-top: 0px;">
      <!-- 点击分类选项时,home还没拿到 articleInfo数据? 再更改分类选项时,才有 articleInfo的展示 -->
      <!-- <keep-alive> -->
      <router-view :articleInfo="articleInfo"></router-view>
      <!-- 缓存路由组件后，切换再切回，组件不会被重新创建 -->
      <!-- </keep-alive> -->

      <!-- <article-list-new v-show="cateNameFlag == ''" /> -->
      <!-- 点击分类选项时,该组件已进入beforeUpdate状态,异步请求的articleInfo数据已经拿到了,所以以下没问题 -->
      <!-- <article-list-cate v-show="cateNameFlag != ''" :articleInfo="articleInfo" /> -->

      <div class="one">
        <blogger-intro />
        <!-- <notice /> -->
        <category :articleInfo="articleInfo" />
      </div>

    </div>


  </div>
</template>

<script>
import articleList from "./articleList.vue";
import bloggerIntro from "./bloggerIntro.vue";
import Category from './category.vue';
import notice from "./notice.vue";
import Markdown from './markdown.vue';
import ArticleListNew from './articleList.vue';
import ArticleListCate from './onFile.vue';
// import { mapActions } from "vuex";
export default {
  name: "homeComponent",
  components: { articleList, bloggerIntro, notice, Category, Markdown, ArticleListNew, ArticleListCate },
  data() {
    return {
      // time:new Date().getTime(),
      articleInfo: [],
      cateNameFlag: '',
    }
  },

  // beforeRouteUpdate (to, from, next) { //这个路由钩子
  //   console.log( from,"哈哈哈", to);
  //   next();
  //   console.log(to,"呵呵呵", from);
  // },

  methods: {
    // ...mapActions(["setArticleInfo",]),
    EventHandler(name) {
      console.log("home组件", name);
      this.cateNameFlag = name;
      //点击了分类,则 cateNameFlag不为空,则显示ArticleListCate组件
      //否则显示 ArticleListNew组件
    }
  },
  created() {
    //在这里请求articleInfo的数据，并存放在store中。
    //home组件是父组件，articleList组件是子组件。
    // 异步请求的结果在父组件的 beforeUpdate阶段可以获取，
    // 算了。

    // this.$bus.$on("cateEvent", this.EventHandler);

    // 多个 promise 请求可以尝试用 promise.all 
    //请求文章数据
    axios({
      method: "get",
      url: "http://localhost:3001/article/getall",
    })
      .then((res) => {
        for (var i = 0; i < res.data.data.length; i++) {
          this.articleInfo.unshift(res.data.data[i]); //倒序输出
        }
        console.log("home组件", this.articleInfo);
      })
      .catch((err) => {
        console.log(err);
      });


  }
};
</script>

<style>
.one {
  /* position:fixed; */
  /* background-color: #ffffff; */
  display: inline-block;
  vertical-align: top;
  width: 24%;
  /* height:600px; */
  height: auto;
  margin-left: 4%;
  margin-right: 2%;
  /* margin-top:6% */
}
</style>
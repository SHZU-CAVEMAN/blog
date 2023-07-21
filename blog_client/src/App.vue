<template>
  <div id="app">
    <navigation />
    <hr style="margin: 0;color:rgb(168, 168, 168)" />
    <br style="padding-top: 0;padding-bottom: 0;" />
    <div style="height:10px"></div>
    <MyLogin />
    <!-- 无 keep-alive：每次切换组件，再切回时重新创建。 -->
    <!-- keep-alive还是好，看样子还是应该把articlelist请求的数据保存在store中。 -->
    <!-- 以下：home(articleList/onFile), articleView, mdEditor, -->
    <keep-alive>
      <router-view :commentData="commentData"></router-view>
    </keep-alive>
    <hr style="margin-bottom: 0;color:rgb(168, 168, 168)" />

    <Footer />
  </div>
</template>

<script>
import Footer from './components/footer.vue'
import MyLogin from './components/login.vue';
import navigation from './components/navigation.vue'
export default {
  name: 'App',
  components: {
    navigation,
    Footer,
    MyLogin
  },
  data() {
    return {
      commentData: [],
    }
  },
  created() {

   

    // 请求评论数据
    axios({
      method: "get",
      url: "/comment/getall",
    })
      .then((res) => {
        //将请求的数据保存在store中
        this.$store.dispatch("setComment", res.data.data);
        console.log("comment存储成功了", this.$store.state.comment.commentdata);
        this.commentData = res.data.data;
        // console.log("有了", this.commentData);
      })
      .catch((err) => {
        console.log(err);
      });


       //请求文章数据
    axios({
      method: "get",
      url: "/article/getall",
    })
      .then((res) => {

        //将请求的数据保存在store中
        // console.log("article存储成功",res.data.data)
        this.$store.dispatch("setArticle", res.data.data);
        console.log("article存储成功", this.$store.state.articleInfo.article);

      })
      .catch((err) => {
        console.log(err);
      });
    

  }

}
</script>

<style></style>



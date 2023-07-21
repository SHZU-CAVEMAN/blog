<template>
  <div style="">
    <!-- 文章正文 -->
    <div style="
        background-color: rgb(255, 255, 255);
        display: inline-block;
        vertical-align: top;
        width: 65%;
        margin-left: 8%;
        color: black;
        border-radius: 10px;
        border: 1px solid rgb(178, 178, 178);
      ">
      <!-- 正文 -->
      <v-md-preview :text="text" ref="preview" />
      <h v-if="publish_time" style="margin-left: 80%; font-size: 2.8vh">——— {{ publish_time }}</h>
      <hr v-if="publish_time" />
      <!-- 尾部 -->
      <div v-if="publish_time" style="
          display: flex;
          flex-direction: column;
          height: 20vh;
          padding: 3vh;
        ">
        <!-- <a-icon  type="like" :theme=isLike @click="Onlike" style="font-size:4vh;margin-left: 0vh;" /> -->

        <h1 style="
            display: flex;
            align-items: center;
            font-size: 16px;
            background-color: #f6f8fa;
            padding: 1vh;
            border: 1px solid rgb(184, 184, 184);
          " @click="jumpFormer(formerId, former)">
          上一篇
          <a-icon type="double-right" style="margin-left: 1vh; margin-right: 2vh" />
          {{ former }}
        </h1>
        <h1 style="
            display: flex;
            align-items: center;
            margin-top: 0vh;
            font-size: 16px;
            background-color: #f6f8fa;
            padding: 1vh;
            border: 1px solid rgb(184, 184, 184);
          " @click="jumpLater(laterId, later)">
          下一篇
          <a-icon type="double-right" style="margin-left: 1vh; margin-right: 2vh" />
          {{ later }}
        </h1>
      </div>
    </div>

    <!-- 文章目录 -->
    <!-- v-if="this.titles!=0" -->
    <div class="catalog">
      <!-- <a-icon type="container" /> -->
      <div class="el-icon-tickets" style="
          font-size: 3vh;
          margin-top: 1vh;
          text-align: center;
          color: dimgray;
        ">
        目录
      </div>

      <hr style="margin-top: 5px; margin-bottom: 5px" />
      <div :id="anchor.lineIndex" v-for="anchor in titles" :style="{
        padding: `0px 0px 0px ${anchor.indent * 30}px`,
        marginLeft: '1vh',
        marginRight: '0px',
      }" style="background-color: ;" @click="handleAnchorClick(anchor)" :key="anchor">
        <div id="font" style="cursor: pointer; height:5vh;font-size: 2.5vh;background-color: ;">
          {{ anchor.title }}</div>
        <!-- <hr style="margin:0" /> -->
      </div>

      <div class="sider">
        <div class="siderbar">
        </div>
      </div>

      <br />
    </div>
  </div>
</template>

<script>
export default {
  name: "markdownComponent",
  props: ["id", "name"],
  data() {
    return {
      text: ``,
      titles: [],
      isLike: "",
      // articles:this.$store.state.articleInfo.article,
      publish_time: "",
      former: "",
      later: "",
      formerId: "",
      laterId: "",
      formerName: "",
      laterName: "",
      target: [],
      indexArray:[],//这个数组仅用于 siderbar的平移
    };
  },
  watch: {
    id: {
      handler() {
        //刷新页面,这样才能拿到axios请求后的数据。
        // location.reload();
        this.$router.go(0);
      },
    },
  },

  mounted() {
    //文章数据
    console.log(this.name);
    var url = encodeURI(
      "http://localhost:3001/uploadFiles/" + this.name + ".md"
    );
    // var urldeco = decodeURI(url);
    console.log(url);
    axios({
      method: "get", //请求方法
      url: url,
    })
      .then((res) => {
        this.text = res.data;
        let articles = this.$store.state.articleInfo.article;
        // 以下for循环与 “上一篇下一篇”这个功能有关
        for (let i = 0; i < articles.length; i++) {
          if (articles[i].name == this.name) {
            //可以对时间数据略作处理：2023/3/12 ——> 2023年3月12日
            this.publish_time = articles[i].publish_time;
            if (i != 0 && i != articles.length - 1) {
              this.former = articles[i - 1].name;
              this.later = articles[i + 1].name;
              this.formerId = articles[i - 1].id;
              this.laterId = articles[i + 1].id;
            }
            if (i == 0) {
              this.former = "温馨提示：目前是第一篇文章哦~";
              this.later = articles[i + 1].name;
              this.laterId = articles[i + 1].id;
            }
            if (i == articles.length - 1) {
              this.former = articles[i - 1].name;
              this.later = "温馨提示：目前是最后一篇文章了哦~";
              this.formerId = articles[i - 1].id;
            }
          }
        }
      })
      .then(() => {
        // 一 、 拿到文章数据后获取文章标签等数据
        // console.log("这里执行了");
        const anchors =
          this.$refs.preview.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");
        console.log("呵呵", anchors);
        //anchors是一个NodeList对象，（类数组对象），表示一个有序的节点集合

        const titles = Array.from(anchors).filter(
          //Array.from：将anchors转换成一个数组
          (title) => !!title.innerText.trim() //保留具有非空文本内容的标题元素。
        );
        console.log(titles);

        // 没有标题，则 this.titles数组为空，返回空数组。
        if (!titles.length) {
          this.titles = [];
          return;
        }

        const hTags = Array.from(
          new Set(titles.map((title) => title.tagName))
        ).sort(); //去除重复的标题标签名，并将结果转换为数组 ?

        this.titles = titles.map((el) => ({
          title: el.innerText, //文本内容
          lineIndex: el.getAttribute("data-v-md-line"), //所在行数
          indent: hTags.indexOf(el.tagName), //标题级别-1
          //一个title对象 存储了文本内容，所在行数，标题级别。
        }));

        //二 、监听滚动
        for (let i = 0; i < this.titles.length; i++) {
          const item = this.$refs.preview.$el.querySelector(
            `[data-v-md-line="${this.titles[i].lineIndex}"]`
          );
          this.target.push(item);
          this.indexArray.push(this.titles[i].lineIndex);
        }
        const observer = new IntersectionObserver(this.observeScroll);
        // console.log("试一试", target);
        Array.from(this.target, (item) => observer.observe(item));
      })
      .catch((err) => {
        console.log("请求文章出错！");
        return Promise.reject(err);
      });
  },

  methods: {
    //去除除了line所对应标题的字体样式（还原成dimgray）
    removeClass(line) {
      for (let i = 0; i < this.target.length; i++) {
        const domline = this.target[i].getAttribute("data-v-md-line");
        if (domline != line) {
          document.getElementById(domline).style.color = "dimgray";
          document.getElementById(domline).style.fontWeight = "500";
          
        }
      }
      // console.log(line);
    },

    observeScroll(item) {
      // console.log(item.target);
      item.forEach((observe) => {//为什么这里要用 forEach ？
        console.log('哈？',observe);//observe是一个 IntersectionObserver对象，从其target属性中可以获取观察的dom对象。
        if (observe.isIntersecting) {
          const line = item[0].target.getAttribute("data-v-md-line");
          this.removeClass(line);
          const dom = document.getElementById(line);
          // dom.style.color = "#1890ff";
          dom.style.color = "black";
          dom.style.fontWeight = '550';
          const index = this.indexArray.indexOf(line);
          var sider = document.querySelector(".siderbar");
          sider.style.transform =  `translateY(${index * 5}vh)`;
        }
      });
    },

    // 目录跟随
    handleAnchorClick(anchor) {
      const { preview } = this.$refs;
      console.log("最好！", preview.html); //打印整个文章的html
      const { lineIndex } = anchor;
      // console.log("哈哈哈哈",anchor);
      //heading为滚动的位置
      const heading = preview.$el.querySelector(
        `[data-v-md-line="${lineIndex}"]`
      );

      if (heading) {
        preview.scrollToTarget({
          //scrollToTarget是 v-md-editor 封装的方法。
          target: heading,
          scrollContainer: window,
          top: 10,
        });
      }
    },
    jumpFormer(id, name) {
      if (id != "") {
        this.$router.push({
          name: "articleViewComponent",
          params: {
            id,
            name,
          },
        });
      }
    },
    jumpLater(id, name) {
      if (id != "") {
        this.$router.push({
          name: "articleViewComponent",
          params: {
            id,
            name,
          },
        });
      }
    },
  },
  beforeMount() {
    console.log("空空空？？？", this.articles);
  },
};
</script>

<style scoped>
.catalog::-webkit-scrollbar {
  width: 0 !important;
}

.catalog {
  overflow: auto;
  position: fixed;

  background-color: rgb(255, 255, 255);
  display: inline-block;
  vertical-align: top;
  width: 23%;
  min-height:20vh;
  max-height: 70vh;
  margin-left: 2%;
  overflow-y: scroll;
  padding: 1vh;
  border-radius: 5px;
  border: 1px solid rgb(178, 178, 178);
}

#catalog:hover {
  background-color: #f6f8fa;
}

#catalog:hover #font {
  /* color:black; */
  color: #1890ff;
  font-weight: 550;
}

#catalogScroll {
  color: red;
}

.sider {
  width: 2px;
  height: 100%;
  background: #eee;
  position: absolute;
  left: 0;
  top: 17vh;
  border-radius: 10px;
  margin: auto;
  bottom: 0;
}

.siderbar {
  display: flex;
  width: 100%;
  height: 4vh;
  line-height: 2;
  background: black;
  transition: all 0.1s;
}
</style>
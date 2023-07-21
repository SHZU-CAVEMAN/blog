<!-- 这个组件向后端写入.md文件，同时要传送和保留一些文章的基本信息</div> -->
<template>
  <div class="mdEditor">
    <!-- prevent组织页面自动刷新？并执行test回调 -->
    <div class="basical_info">
      <form @submit.prevent="test">
        <div style="display: flex;align-items: center;">
          <h style="display: inline;font-size: 16px;">标题：</h>
          <input type="text" v-model="title" placeholder="小心前面别留空格"
            style="flex-grow:1;height:5vh;border:1px solid rgb(178, 178, 178);background-color: rgb(255, 255, 255);" />
        </div>
        <br />
        <div style="display: flex;align-items: center;">
          <h style="display: inline;font-size: 16px;">分类：</h>
          <input type="text" v-model="category" placeholder="小心前面别留空格"
          style="flex-grow:1;height:5vh;border:1px solid rgb(178, 178, 178);" />
        </div>
        <br />
        <div >
          <h style="display: inline;font-size: 16px;">封面：</h>
          <input type="file" @change="onchangemd" /></div>
        <br />
        <div style="display: flex;">
          <h style="display: inline;font-size: 16px;">简介：</h>
          <textarea rows="3" cols="113" v-model.lazy="intro" style="vertical-align: top;flex-grow:1;">
          我是一个文本框。</textarea>
        </div>
        <br />
      </form>
    </div>


    <v-md-editor class="v-md-editor" v-model="editorValue" :disabled-menus="[]" @upload-image="handleUploadImage" @save="save"
      height="80vh">
    </v-md-editor>
  </div>
</template>
  
<script>
import axios from "axios";
export default {
  name: "mdEditorComponent",
  data() {
    return {
      editorValue: this.content != null ? this.content : "",
      title: "",
      category: "",
      picture: "",
      intro: "",
      publish_time: "",
    };
  },
  props: {
    // 接收值父组件传递值
    //   content: String
  },
  methods: {
    //上传图片
    onchangemd(e) {
      console.log(e.target.files); //这个就是选中文件信息 ：一个fileList对象
      let formdata = new FormData();
      Array.from(e.target.files).map((item) => {
        console.log(item); //file对象
        this.picture = item.name; //将图片名保存，发送给后端
        formdata.append("file1", item); //将每一个文件图片都加进formdata
      });
      axios
        .post("/upload-single-file", formdata)
        .then((res) => {
          console.log(res);
        }); //打印响应体
    },

    test() {
      //v-model绑定的表单，一失去焦点就会收集到数据。
      console.log(this.title);
    },

    save(text, html) {
      console.log("text", typeof text);
      console.log(html);
      //如果文章名字不为空，才能上传。避免后端出现.md的空文件
      if (this.title == "" || this.title == " ") {
        alert("文章名字不能为空！");

      }
      else {
        //文章 id 与名字
        let file = new File([html], this.title + ".md"); //文件名即 收集到表单的文章名
        let formData = new FormData();
        formData.set("file1", file);
        //文章发布时间
        let time = new Date();
        this.publish_time = time.toLocaleDateString();
        console.log("hhhhhhhhhhhhh", this.publish_time)

        //上传文章（文件）（注意以下 axios 的写法）
        axios
          .post("/upload-single-file", formData, {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              console.log(`upload process: ${percentCompleted}%`);
            },
          })
          .then((res) => {
            console.log(res.data);
            console.log(res.data.url);
          });

        // 同时上传文章相关信息（注意以下 axios 的写法）
        axios({
          method: "post",
          url: "/article/add",
          data: {
            // id: "1",//文章id数据库自动生成
            name: this.title,
            picture: this.picture,
            intro: this.intro,
            category: this.category,
            publish_time: this.publish_time,
          },
        });
        alert("上传成功");
      }
    },
  },

  watch: {
    editorValue: function (newNum) {
      // 修改调用者传入的值
      this.$emit("update:content", newNum);
    },
  },
  // mounted(){
  //       console.log(this.$store.state.user.isLogin);
  //   }
};
</script>
  
<style>
.mdEditor {
  width: 80%;
  margin-left: 10%;
}
.basical_info{
  /* background-color: rgb(241, 246, 247); */
  background-color: rgb(255, 255, 255);

  padding:3vh;
  border:1px solid rgb(178, 178, 178);
  border-radius: 1vh;

}
.v-md-editor{
  margin-top:3vh;
  height:100vh;
  /* height属性，v-md-editor插件已经封装好 */
  border:1px solid rgb(178, 178, 178);

}
</style>
  
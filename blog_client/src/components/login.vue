<!-- 这个登录组件如果成功，则跳转到 mdEditor组件上去(通过 this.$router.push方法），如果失败，
    则提示错误信息，用户叉掉，或者点击cancel都可以让这个组件消失。 -->
<template>
  <div>
    <!-- 如果登录成功，则隐藏此组件(一个对话框) -->
    <a-modal title="请登录" :visible="visible" :confirm-loading="confirmLoading" width="400px" @ok="handleOk" cancelText="取消"
      @cancel="handleCancel" okText="登录">
      <!-- <p>{{ ModalText }}</p> -->
      <div style="text-align: center">
        账号：<input type="text" v-model="account" />
      </div>
      <br />
      <div style="text-align: center">
        密码：<input type="password" v-model="password" />
      </div>
      <template slot="footer">
        <a-button @click="handleCancel" style="margin-right: 60px">关闭</a-button>
        <a-button @click="handleOk" style="margin-right: 80px">登录</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "myLoginComponent",
  data() {
    return {
      // ModalText: "这是一个登录表单",
      // visible: this.$store.state.user.showLogin,
      confirmLoading: false,
      account: "",
      password: "",
    };
  },
  computed: {
    //不是这样获取store中的数据的吗？嗯，是这样。
    visible: {
      get() {
        return this.$store.state.user.showLogin;
      },
      set(val) {
        this.setLogin(val);
      },
    },
  },
  methods: {
    ...mapActions(["setLogin"]),
    handleOk(e) {
      //在这里判断登录信息，通过则让此组件隐藏，并且跳转路由。
      // this.confirmLoading = true;//？？？
      axios({
        method: "post",
        url: "http://localhost:3001/user/login",
        data: {
          // id: "1",//文章id数据库自动生成
          account: this.account,
          password: this.password,
        },
      }).then((res) => {
        console.log("data", res);
        if (res.data.status == 100) {
          console.log("用户信息；", res.data.data[0]);
          alert("登录成功！");
          this.username = '';//清空输入框
          this.password = '';//清空输入框

          this.visible = false;
          this.confirmLoading = false;
          //修改数据
          this.$store.dispatch("isLogin", true);
          this.$router.replace({
            path: "/mdEditor",
          });
        }
        if (res.data.status == 200) {
          // console.log("密码错误！",res.data.status)
          alert("密码错误！");
          this.username = '';//清空输入框
          this.password = '';//清空输入框

        }
        if (res.data.status == 300) {
          // console.log("无此用户！",res.data.status)
          alert("无此用户！");
          this.username = '';//清空输入框
          this.password = '';//清空输入框

        }

      });


      // if (this.account == "1" && this.password == "1") {
      //   this.visible = false;
      //   this.confirmLoading = false;
      //   //修改数据
      //   this.$store.dispatch("isLogin", true);
      //   this.$router.replace({
      //     path: "/mdEditor",
      //   });
      // }
    },
    handleCancel(e) {
      this.visible = false;
    },
  },
  created() {
  }
};
</script>

<style  scoped></style>
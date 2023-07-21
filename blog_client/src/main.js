import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import ant from 'ant-design-vue';
import "ant-design-vue/dist/antd.css"
import store from './store';

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});
Vue.use(VueMarkdownEditor);

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
// highlightjs
import hljs from 'highlight.js';
VMdPreview.use(githubTheme, {
  Hljs: hljs,
});
Vue.use(VMdPreview);

import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
import '@kangc/v-md-editor/lib/style/preview-html.css';
// 引入使用主题的样式
Vue.use(VMdPreviewHtml);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(ant);

new Vue({
  render: h => h(App),
  router: router,
  store,
  beforeCreate() {
		Vue.prototype.$bus = this // 安装全局事件总线。this 为 vm 实例。
	},

}).$mount('#app')

//设置一个前端路由的全局拦截器，每次跳转时，检测是否需要登录。
router.beforeResolve((to, from, next) => {
  // const loginUser = store.state.user.user;
  // 判断路由是否设置相应校验用户权限
  if (to.meta.requireAuth) {
    if (store.state.user.isLogin == false) {
      store.dispatch("setLogin", true);
      // console.log(store.state.user.showLogin)
    }else{
      //此时，登陆状态已为true，准予通行。
      next();
      return;
    }
    //如果没有登录成功，则不会跳转，也就是终止导航
    // 终止导航
    next(false);
    return;
    // console.log(store.state.user.isLogin);
  }
  //不需要登录的组件一律通行
  next();
});


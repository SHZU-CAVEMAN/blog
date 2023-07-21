<template>
  <div class="bloggerIntro">
    <!-- <h3>博主简介</h3> -->
    <br />
    <div style="text-align: center">
      <img
        src="../assets/zhishui.jpg"
        style="width: 50%; height: 50%; border-radius: 100%"
      />
      <br />
      <br />
      <h5 style="color: dimgray">Liao</h5>
      <h8 style="color: dimgrey; background-color: #F6F8FA; font-size: 15px"
        >“行行重行行”</h8
      >
    </div>

    <div class="icon">
      <!-- <a-icon type="home" style="font-size: 25px;"/> -->
      <!-- <a href="https://github.com/SHZU-CAVEMAN" title="github" target="_blank"> -->
      <a
        href="https://github.com/SHZU-CAVEMAN"
        title="github"
        target="_blank"
        style="color: dimgrey"
      >
        <a-icon type="github" style="font-size: 25px; margin-left:15%" />
      </a>

      <a
        id="douban"
        href="https://www.douban.com/people/213986719/?_i=0204659GwiU6pa"
        title="豆瓣"
        target="_blank"
        ><svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          data-svg-src="/lib/simple-icons/icons/douban.min.svg"
          class="selfDefineIcon"
          style="margin-left: 5%"
        >
          <path
            id="path_douban"
            d="M.643.92v2.412h22.714V.92H.643zm1.974 4.926v9.42h18.764v-9.42H2.617zm2.72 2.408H18.69v4.605H5.338V8.254zm1.657 7.412-2.512.938c1.037 1.461 1.87 2.825 2.512 4.091H0v2.385h24v-2.385h-6.678c.818-1.176 1.589-2.543 2.303-4.091l-2.73-.938a29.952 29.952.0 01-2.479 5.03h-4.75c-.786-1.962-1.677-3.641-2.672-5.03z"
          ></path>
        </svg>
      </a>

      <a
        id="bilibili"
        href="https://space.bilibili.com/481007576"
        title="bilibili"
        target="_blank"
      >
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          data-svg-src="/svg/icons/bilibili.min.svg"
          class="selfDefineIcon"
          style="margin-left: 5%"
        >
          <path
            id="path_bilibili"
            d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858.0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234.0 01-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373s.653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836.0 01.16-.213l2.853-2.747c.267-.249.573-.373.92-.373s.662.151.929.4.391.551.391.907c0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373.0.684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373.0.684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"
          ></path>
        </svg>
      </a>

    </div>
    <br />
  </div>
</template>

<script>
export default {
  name: "bloggerIntroComponent",
  components: {},
};
</script>

<style scoped>
.bloggerIntro {
  display: inline-block;
  vertical-align: top;
  background-color: #ffffff;

  width: 95%;
  height: 45%;
  margin-left: 2%;
  margin-top: 2%;
  border-radius: 10px;
  /* box-shadow: 0px 4px 6px 2px rgb(223, 223, 223); */
  border:1px solid rgb(208, 215, 222);
}

.icon {
  margin-left: 35px;
  margin-top: 20px;
  /* background-color: white; */
}

.selfDefineIcon {
  width: 23px;
  height: 23px;
}

a :hover {
  color: black;
}

path {
  fill: dimgrey;
}

/* A是B的父元素，鼠标悬浮在A上，让B产生悬浮效果。完美解决 */
#bilibili :hover #path_bilibili {
  /* fill是bilibili子元素 path的属性 （但是，话说path不是svg的父元素吗？是bilibili子元素的子元素啊*/
  fill: rgb(0, 0, 0);
}
#douban :hover #path_douban{
  fill:black;
}
</style>
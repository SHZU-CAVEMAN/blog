<!-- 这里由两部分div组成
    第一个将最新文章特写（包含封面图片）（ “修改日期” 这种鸡肋的东西还是不要了）
    第二个则是最近二十篇文章（只有文章题目，分类，发表日期） -->
<template>
    <div class="articleListNew">
        <!-- <a >{{ article.name }}</a> -->
        <!-- 最新文章 -->
        <ArticleLatest :article="article"></ArticleLatest>

        <!-- 以下这个组件可以拆分出去 -->
        <div class="latest">
            <div style="
                  display: inline-block;
                  background-color: #fafafa;
                  border-radius: 3px;
                  font-size: 20px;
                  margin: 15px 0 0 15px;
                  padding: 0 2vh 0 2vh;
                ">
                近期文章 
            </div>
            <br/>
            <br/>

            <!-- <hr /> -->

            <div v-for="article in temp" :key="article.id">
                <div id="latest_item" @click="jump(article.id, article.name)">
                    <!-- 发布时间 -->
                    <a-icon type="file" style="font-size: 3vh;"/>
                    <div style="display: inline-block; width: 25vh;margin-left: 1vh;">
                      
                      
                        <!-- 文章分类 -->
                        <a id="category" style="font-size:16px;background-color: #F6F8FA;border-radius: 0;padding:0.8vh 2vh">{{ article.category }}</a>
                        
                    </div>
               
                    <!-- 文章名 -->
                    <div style="display: inline-block;width:80vh;margin-left: 0vh;">
                        <!-- {{ article.category }} -->
                        <a id="articleName" style="
                              font-size: 16px;
                             margin-left: 3px;
                           /* background-color: #e8e8e8; */
                            border-radius: 3px;
                            padding: 0 3px 0 3px;
                            ">{{ article.name }}</a>
                    </div>

                    <a style="
                        font-size: 16px;
                        margin-left: 3px;
                        /* background-color: #e8e8e8; */
                        border-radius: 3px;
                        padding: 0 3px 0 3px;
                      ">{{ article.publish_time }}
                        </a>
                    <!-- <hr /> -->
                </div>
            </div>
            <hr style="margin-top: 0;"/>

            <div style="margin-left: 30%; margin-top: 30px">
                <a-pagination simple :defaultPageSize="10" :default-current="1" :total="articleInfo.length + 1"
                    @change="onChange" />
            </div>
            <br />
            <!-- <div id="moreArticle" style="">更多文章 . . . . . .</div> -->
        </div>
    </div>
</template>

<script>
import ArticleLatest from "./articleLatest.vue";
export default {
    components: { ArticleLatest },
    name: "articleListNewComponent",
    //   props:["articleInfo"],
    data() {
        return {
            articleInfo: [], //存放所有文章
            temp: [], //存放最近的十篇文章
            article: {}, //最新的一篇文章，需要传给子组件ArticleLatest，特别展示。
        };
    },
    methods: {
        jump(id, name) {
            // console.log(name);
            this.$router.push({
                name: "articleViewComponent",
                params: {
                    id,
                    name,
                },
            });
        },
        onChange(page) {
            this.temp = this.articleInfo.slice(1 + (page - 1) * 10, 1 + page * 10);
        }
    },
    created() {
        //获取所有文章信息
        axios({
            method: "get",
            url: "/article/getall",
        })
            .then((res) => {
                for (var i = 0; i < res.data.data.length; i++) {
                    this.articleInfo.unshift(res.data.data[i]); //倒序输出
                }
                console.log(this.articleInfo);
                this.article = this.articleInfo[0];
                this.temp = this.articleInfo.slice(1, 11);
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
</script>

<style scoped>
.articleListNew {
    /* position: relative; */
    /* background-color: #e8e8e8; */
    display: inline-block;
    vertical-align: top;
    /* background-color: rgb(229, 229, 225); */
    width: 70%;
    /* height:500px; */
    margin-left: 0%;
    /* padding-top: 0%; */
    /* margin-top:6% */
    /* 不设置高度，高度就自适应了 */
    /* max-height: 1400px; */
}

.latest {
    background-color: #ffffff;
    width: 96%;
    margin-bottom: 3%;
    margin-left: 2%;
    border-radius: 10px;
    /* box-shadow: 0px 4px 6px 2px rgb(223, 223, 223); */
    border:1px solid rgb(208, 215, 222);

}


#latest_item {
    background-color: #ffffff;

    border-radius: 5px;
    height: 7vh;
    border:solid rgb(208, 215, 222);
    border-width: 1px 0 0 0;
    padding:2vh;
    /* margin: 5px 20px 0 15px; */
    display: flex;
    align-items: center;
}

#latest_item:hover {
    background-color: #F6F8FA;
    font-weight: 510;
    color:black;
}

/* #latest_item:hover #articleName{
    font-weight: 500;
    color: #1890ff;
} */

#category {
    font-size: 18px;

    margin-left: 3px;
    /* background-color:#e8e8e8; */
    background-color:#fcfcfc;

    border-radius: 3px;
    padding: 0 3px 0 3px;
}

#category:hover {
    background-color: rgb(255, 255, 255);
    color: #1890ff;
    font-weight: 550;

    /* color:black; */
}

#moreArticle {
    display: inline-block;
    background-color: #f1f1f1;
    border-radius: 3px;
    font-size: 18px;
    margin: 15px 0 20px 79%;
    padding: 5px 5px 5px 5px;
}

#moreArticle:hover {
    background-color: white;
}
</style>
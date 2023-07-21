<template>
    <div class="comment">
        <h5>{{ commentListByProps.length }} 条评论</h5>
        <textarea rows="5" cols="99" placeholder="欢迎评论！" v-model="comment"
            style="font-size:16px;background-color: #F6F8FA;border:1px solid rgb(136, 136, 136)"></textarea>

        <div style="display: flex;margin-top:1vh;">
            <a-popover placement="topLeft" trigger="click">
                <template slot="content">
                    <h6 style="color:dimgray;margin-bottom: 1px;font-size: 2.5vh;">昵称</h6>
                    <input type="text" placeholder="必填" v-model="nickname"
                        style="margin-bottom: 1vh;border-radius: 1vh;border:1px solid rgb(136, 136, 136)" />
                    <h6 style="color:dimgray;margin-bottom: 1px;font-size: 2.5vh;">邮箱</h6>
                    <input type="text" placeholder="必填（便于回复你哦）" v-model="email"
                        style="margin-bottom: 1vh;border-radius: 1vh;border:1px solid rgb(136, 136, 136)" />
                    <h6 style="color:dimgray;margin-bottom: 1px;font-size: 2.5vh;">其他</h6>
                    <input type="text" placeholder="选填" v-model="other"
                        style="margin-bottom: 1vh;border-radius: 1vh;border:1px solid rgb(136, 136, 136)" />

                </template>
                <template slot="title">
                    <!-- <span></span> -->
                </template>
                <!-- <a-button>TL</a-button> -->
                <div class="brief">简略信息</div>
            </a-popover>

            <div class="commit" @click="commit">提交评论</div>
        </div>
        <hr />
        <!-- 评论展示列表 （v-for） -->
        <div v-for="Acomment in commentListByProps" :key="Acomment.id" style="background-color:#F6F8FA;">

            <!-- 一级评论 -->
            <div v-if="!Acomment.toWhich" style="background-color: #F6F8FA;padding:2vh 1vh">
                <img :src="pictureUrl + Acomment.avatar + '.png'"
                    style="width: 8vh; height: 8vh; border-radius: 50%;vertical-align: top;" />
                <div style="margin-left:2vh;background-color: #F6F8FA;width:80%;display: inline-block;">
                    <h6> {{ Acomment.nickname }}</h6>
                    <h6 style="font-size:14px;"> {{ Acomment.comment }}</h6>
                    <div style="display: flex;align-items: center;">
                        {{ Acomment.time }}
                        <!-- 点赞功能 -->
                        <!-- <div style="margin-left: 3vh;">{{ Acomment.likeNumber }}</div> -->
                        <!-- <div :id="Acomment.id"  :ref="Acomment.id" @click="like(Acomment.id)"> -->

                        <!-- <a-icon type="like" theme="" style="font-size:14px;margin-left: 1vh;"
                            @click="like(Acomment.id, Acomment)" />
                        <a-icon v-show="isLike && isLikeId == Acomment.id" type="like" theme="filled"
                            style="font-size:14px;position:relative;right:14px" @click="like(Acomment.id)" /> -->

                        <!-- </div> -->

                        <!-- 点击出现评论框 -->
                        <div class='replyTo' @click="Replyto(Acomment.id, Acomment)">Reply to</div>
                    </div>
                </div>

                <!-- 以下评论框点击则显示，再次点击则收回 -->
                <div v-show="isShow && Acomment.id == isShowId" style="margin-top: 2vh;margin-left: 8%;">
                    <textarea rows="4" cols="89" placeholder="请理性回复 ︿(￣︶￣)︿" v-model="comment"
                        style="font-size:16px;background-color: #F6F8FA;border:1px solid rgb(136, 136, 136);">
                </textarea>
                    <div style="display: flex;margin-top:1vh;">
                        <a-popover placement="topLeft" trigger="click">
                            <template slot="content">
                                <h6 style="color:dimgray;margin-bottom: 1px;font-size: 2.5vh;">昵称</h6>
                                <input type="text" placeholder="必填" v-model="nickname"
                                    style="margin-bottom: 1vh;border-radius: 1vh;border:1px solid rgb(136, 136, 136)" />
                                <h6 style="color:dimgray;margin-bottom: 1px;font-size: 2.5vh;">邮箱</h6>
                                <input type="text" placeholder="必填（便于回复你哦）" v-model="email"
                                    style="margin-bottom: 1vh;border-radius: 1vh;border:1px solid rgb(136, 136, 136)" />
                                <h6 style="color:dimgray;margin-bottom: 1px;font-size: 2.5vh;">其他</h6>
                                <input type="text" placeholder="选填" v-model="other"
                                    style="margin-bottom: 1vh;border-radius: 1vh;border:1px solid rgb(136, 136, 136)" />
                            </template>
                            <template slot="title">
                                <!-- <span></span> -->
                            </template>
                            <!-- <a-button>TL</a-button> -->
                            <div class="brief" style="display: inline-block;margin-left: 72vh;">简略信息</div>
                        </a-popover>

                        <div class="commit" style="display: inline-block;margin-left: 5%;" @click="commit">提交评论</div>
                    </div>
                    <!-- <div class="brief" style="display: inline-block;margin-left: 82vh;margin-top:1vh;">简略信息</div> -->
                    <!-- <div class="commit" style="display: inline-block;margin-bottom: 1vh;" @click="commit">提交回复</div> -->
                </div>
            </div>

            <!-- 二级评论 -->
            <!-- 遍历每个一级评论时，取出是否有相应的二级评论（再次遍历） -->
            <div v-for="Bcomment in commentListByProps" :key="Bcomment.id" style="margin-left: 8%;margin-top: 0%;">
                <div v-if="Acomment.id == Bcomment.toWhich" style="background-color: #F6F8FA;padding:2vh 1vh;">
                    <img :src="pictureUrl + Bcomment.avatar + '.png'"
                        style="width: 8vh; height: 8vh; border-radius: 50%;vertical-align: top;" />
                    <div style="margin-left:2vh;background-color: #F6F8FA;width:80%;min-height:10vh;display: inline-block;">
                        <div style="display: flex;align-items: center;background-color: #F6F8FA;">
                            <div style="display: inline;font-size:1rem;color: rgba(0, 0, 0, 0.85);font-weight: 500;"> {{
                                Bcomment.nickname }}</div>
                            <!-- <a-icon type="right" style="font-size:2vh;margin-left: 5vh;background-color: antiquewhite;"/> -->
                            <a-icon type="caret-right" style="font-size:2.5vh;margin-left: 3vh;" />
                            <div
                                style="margin-left: 3vh;display: inline;font-size:1rem;color: rgba(0, 0, 0, 0.85);font-weight: 500;">
                                {{ Bcomment.toWhom }}</div>
                        </div>

                        <h6 style="font-size:14px;margin-top: 1vh;"> {{ Bcomment.comment }}</h6>
                        <div style="display: flex;align-items: center;">
                            {{ Bcomment.time }}
                            <!-- 点赞功能 -->
                            <!-- <div style="margin-left: 3vh;">{{ Bcomment.likeNumber }}</div>
                            <a-icon type="like" theme="" style="font-size:14px;margin-left: 1vh;"
                                @click="like(Bcomment.id, Bcomment)" />
                            <a-icon v-show="isLike && isLikeId == Bcomment.id" type="like" theme="filled"
                                style="font-size:14px;position:relative;right:14px" @click="like(Bcomment.id)" /> -->
                            <!-- 点击出现评论框 -->
                            <div class='replyTo' @click="Replyto(Bcomment.id, Bcomment)">Reply to</div>
                        </div>
                    </div>
                    <!-- 以下评论框点击则显示，再次点击则收回 -->
                    <div v-show="isShow && Bcomment.id == isShowId" style="margin-top: 2vh;margin-left: 8%;">
                        <textarea rows="4" cols="82" placeholder="请理性回复 ︿(￣︶￣)︿" v-model="comment"
                            style="font-size:16px;background-color: #F6F8FA;border:1px solid rgb(136, 136, 136);">
                        </textarea>
                        <div style="display: flex;margin-top:1vh;">
                            <a-popover placement="topLeft" trigger="click">
                                <template slot="content">
                                    <h6 style="color:dimgray;margin-bottom: 1px;font-size: 2.5vh;">昵称</h6>
                                    <input type="text" placeholder="必填" v-model="nickname"
                                        style="margin-bottom: 1vh;border-radius: 1vh;border:1px solid rgb(136, 136, 136)" />
                                    <h6 style="color:dimgray;margin-bottom: 1px;font-size: 2.5vh;">邮箱</h6>
                                    <input type="text" placeholder="必填（便于回复你哦）" v-model="email"
                                        style="margin-bottom: 1vh;border-radius: 1vh;border:1px solid rgb(136, 136, 136)" />
                                    <h6 style="color:dimgray;margin-bottom: 1px;font-size: 2.5vh;">其他</h6>
                                    <input type="text" placeholder="选填" v-model="other"
                                        style="margin-bottom: 1vh;border-radius: 1vh;border:1px solid rgb(136, 136, 136)" />

                                </template>
                                <template slot="title">
                                    <!-- <span></span> -->
                                </template>
                                <!-- <a-button>TL</a-button> -->
                                <div class="brief" style="display: inline-block;margin-left: 72vh;">简略信息</div>
                            </a-popover>

                            <div class="commit" style="display: inline-block;margin-left: 5%;" @click="commit">提交评论</div>
                        </div>
                        <!-- <div class="brief" style="display: inline-block;margin-left: 72vh;margin-top:1vh;">简略信息</div> -->
                        <!-- <div class="commit" style="display: inline-block;margin-left: 5%;margin-bottom: 1vh;" -->
                        <!-- @click="commit">提交回复 -->
                    </div>
                </div>
            </div>

        </div>
        <!-- 评论展示列表 结束 -->
    </div>
</template>

<script>
export default {
    name: "commentComponent",
    props: ["name", "commentData"],
    data() {
        return {
            isShow: false,
            isShowId: 0,
            comment: '',//评论框收集
            nickname: '',//评论框收集
            email: '',//评论框收集
            other: '',//评论框收集
            time: '',  //系统收集
            toWhich: '',//从reply to中收集
            toWhom: '', // 从reply to中收集
            article: '',// 系统收集
            avatar: '',// 系统随机分配
            likeNumber: '',// 某条评论的点赞数量（此功能暂废弃 ————7.13）
            commentListByVueX: this.$store.state.comment.commentdata,//请求来的，相应文章的评论数据
            commentListByProps: [],
            pictureUrl: '/uploadFiles/',
            // theme:'',
            isLike: false,
            isLikeId: '',
        };
    },
    // computed: {
    //     pictureUrl() {
    //         return "http://localhost:3001/uploadFiles/" + this.comment.picture;
    //     }
    // },
    // /*
    watch: {
        'commentData': {
            handler() {
                console.log("有变化了,监听props方式", this.commentData.length, this.name);
                for (let i = 0; i < this.commentData.length; i++) {
                    if (this.commentData[i].article == this.name) {
                        this.commentListByProps.push(this.commentData[i]);
                    }
                }
                console.log(this.commentListByProps);
            },
            deep: true,
            immediate: true,
        }
    },
    // */
    methods: {
        commit() {
            fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
                .then(data => console.log(data.ip));

            // 评论时间
            let date = new Date();
            let time = date.toLocaleString();
            // 评论者头像（系统自动分配）
            // 博主头像特殊，以此区分与其他人。
            // 如果检测到nickname为Liao且邮箱为2238240519，则头像为固定的头像。
            // 其他的则随机分配。


            if (this.nickname == 'Liao' && this.other == '123456') {
                this.avatar = 'zhishui'
            } else {
                this.avatar = Math.floor(Math.random() * 9 + 1)
            }


            if (this.comment == '' || this.email == '' || this.nickname == '') {
                if (this.comment == '') {
                    alert("评论不能为空哦！")
                }
                if (this.comment != '' && this.nickname == '') {
                    alert("昵称不能为空哦！")
                }
                if (this.comment != '' && this.nickname != '' && this.email == '') {
                    alert("邮箱不能为空哦！")
                }
            }
            else {
                axios({
                    method: "post",
                    url: "/comment/add",
                    data: {
                        // id: "1",//文章id数据库自动生成
                        nickname: this.nickname,
                        email: this.email,
                        other: this.other,//可以为空
                        comment: this.comment,
                        time: time,
                        article: this.name,//评论所属的文章名（唯一）
                        toWhich: this.toWhich,//可以为空，为空，则表示这是一个一级评论（支持两级评论）
                        toWhom: this.toWhom,
                        avatar: this.avatar,
                        
                    },
                }).then(() => {
                    //
                });
                alert("评论成功！")
            }


        },
        Replyto(id, comment) {
            //以下两行代码的作用是：每次点击reply to时，只会有相应的评论会展开一个评论框，而不是每个。
            this.isShow = !this.isShow;
            this.isShowId = id;
            // console.log(comment);
            //设置当前评论（新评论） toWhich和 toWhom的值：
            //如果 toWhich的值为null或者为空，说明是一级评论。id就是新评论的toWhich值。
            if (comment.toWhich == null || comment.toWhich == '') {
                this.toWhich = comment.id;
                this.toWhom = comment.nickname;
            } else {
                //二级评论，则 toWhich 值相同。
                this.toWhich = comment.toWhich;
                this.toWhom = comment.nickname;
            }

        },
        like(id, comment) {
            // comment.likeNumber = comment.likeNumber + 1

        
            this.isLike = !this.isLike;
            this.isLikeId = id;
        }
    },
    created() {
        //props传入的数据在 created阶段已经有了。
        // console.log("可以！",this.name);
        // 父组件请求并保存在 store 中的数据还拿不到。
        // console.log("可以！",this.$store.state.comment.commentdata);// undefined
    },
    beforeMount() {
        console.log("有变化了，vuex方式", this.commentListByVueX);
        // console.log("可以！", this.$store.state.comment.commentdata);
        // let data = this.$store.state.comment.commentdata;
        // this.commentList  = data;
        // console.log(data.length);

    }
};
</script>

<style scoped>
.comment {
    background-color: #ffffff;
    width: 65%;
    min-height: 30vh;
    margin-left: 8%;
    margin-top: 5vh;
    border: 1px solid rgb(184, 184, 184);
    padding: 3vh;
    border-radius: 1vh;
}

.brief {
    width: 12vh;
    height: 5vh;
    background-color: #F6F8FA;
    border: 1px solid rgb(208, 215, 222);
    /* border-radius: 1vh; */
    margin-left: 95vh;
    display: flex;
    align-items: center;
    padding: 1vh;
}

.brief:hover {
    /* background-color: #F3F4F6; */
    background-color: #535353;
    color: white;
}

.commit {

    width: 12vh;
    height: 5vh;
    background-color: #F6F8FA;
    border: 1px solid rgb(208, 215, 222);
    /* border-radius: 1vh; */
    margin-left: 5vh;
    display: flex;
    align-items: center;
    padding: 1vh;
}

.commit:hover {
    background-color: #535353;
    color: white;
}

.replyTo {
    margin-left: 3vh;

}

.replyTo:hover {
    color: black;
    font-weight: 520;
}</style>
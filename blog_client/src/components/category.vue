<!-- 这个组件点击后，携带分类名信息，从获取到的所有文章信息中找出相应的文章信息，
    并在 articlelist 中展示出来 -->
<template>
    <div class="category">
        <div style="margin-left: 5%; margin-right: 5%; padding-top: 5%">
            <div style="background-color:#fafafa;display:flex;align-items: center;">
                <a-icon type="folder" style="font-size: 3vh;"/>
                <h6 style="color: dimgray;margin:5px 0 5px 2vh;display:inline-block">
                    分类
                </h6>
            </div>
            <hr style="margin-top: 0;" />

            <div class="content">
                <dl>
                    <dt v-for="item in arr" :key="item" style="background-color: #fafafa;margin-top: 2px;">
                        <a id="category" @click="jump(item.name)" style="font-size: 16px">

                            <div id="character" style="">
                                {{ item.name }}
                            </div>

                            <div style="display: inline-block;width:10%;height:80%;border-radius: 50%;color:dimgray">
                                {{ item.number }}
                            </div>

                        </a>
                    </dt>
                    <!-- 分割线 -->
                    <hr style="margin: 1vh 0;"/>

                    <!-- 总计 -->
                    <dt style="background-color: #fafafa;margin-top: 2px;">
                        <a id="category" @click="jump(item.name)" style="font-size: 16px;">

                            <div id="character" style="">
                                总计
                            </div>

                            <div style="display: inline-block;width:10%;height:80%;border-radius: 50%;color:dimgray">
                                {{ articleInfo.length }}
                            </div>

                        </a>
                    </dt>
                </dl>
            </div>

           
        </div>

    </div>
</template>

<script>
import articleInfo from '@/store/articleInfo';
import axios from 'axios'
export default {
    name: "categoryComponent",
    data() {
        return {
            length: "",
            arr: [],
        }
    },
    props:["articleInfo"],
    methods: {
        jump(name) {
            // console.log("点击事件没问题",name)


            this.$router.push({
                name: "onFile",
                query: {
                    name,
                }
            });//这个时候articleListCate组件实例创建了吗 ?
            // this.$bus.$emit('cateEvent', name);  //被触发的那个组件还没被创建出来?
            //这个路由组件被创建出来后,再次点击jump,不会再次创建。

            //临时解决办法: 对操作后的dom进行渲染?
            // setTimeout(()=>{
            // this.$bus.$emit('cateEvent', name);  //被触发的那个组件还没被创建出来?
            // },200);


        }

    },
    created() {
        // 尝试使用 vueX
        // let n = this.$store.state.articleInfo.article;
        // console.log("haha",n);
      
        axios({
            method: "get",
            url: "http://localhost:3001/category/getall",
        })
            .then((res) => {
                this.length = res.data.data.length;
                for (var i = 0; i < this.length; i++) {
                    this.arr.unshift(res.data.data[i]); //倒序输出
                }
                // console.log(this.arr);
            })
            .catch((err) => {
                console.log(err);
            })
    },
    mounted(){
        console.log('category组件',this.articleInfo);
    }

}
</script>

<style scoped>
.category {
    background-color: #ffffff;
    width: 95%;
    height: auto;
    margin-left: 2%;
    margin-top: 8%;
    border-radius: 10px;
    /* box-shadow: 0px 4px 6px 2px rgb(223, 223, 223); */
    border:1px solid rgb(208, 215, 222);


}

#category:hover {
    /* background-color:lightgray; */
    background-color: #ffffff;
    /* color: black;
    font-weight: 520; */
}

#category:hover #character {
    color: black;
    font-weight: 520;
}

.content {
    padding-bottom: 2vh;
    margin-left: 3%;
}

#character {
    display: inline-block;
    width: 85%;
    color: dimgray;
}


/* #character:hover{
    color:black;
} */</style>
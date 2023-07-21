export default {
    state:{
        article:[],
    },
    actions:{
        setArticle({commit},data){
            commit("setArticle",data);
        }

    },
    mutations:{
        setArticle(state,data){
            state.article = data;
        }

    }
 
}
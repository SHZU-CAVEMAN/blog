export default {
    state:{
        commentdata:[],
    },
    actions:{
        setComment({commit},data){
            commit("setComment",data);
        }
    },
    mutations:{
        setComment(state,data){
            state.commentdata = data;
        }
    }

}
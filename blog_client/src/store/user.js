export default{

    state:{
        isLogin:false, //是否登录了
        showLogin:false, //用于控制是否展示登录组件
    },
    actions:{
        setLogin({commit},data){
            commit("setLogin",data);
        },
        isLogin({commit},data){
            commit("isLogin",data);
        }
    },
    mutations:{
        setLogin(state,data){
            state.showLogin = data;
        },
        isLogin(state,data){
            state.isLogin = data;
        }
    },
}
import Vue from 'vue'
import VueX from 'vuex'

import user from './user'
import articleInfo from './articleInfo'
import comment from './comment'

Vue.use(VueX);

export default new VueX.Store({
    strict: true,
    modules:{
        user,
        articleInfo,
        comment,
    }
})
import Vue from 'vue';
import Vuex from 'vuex';
import mod1 from './default/mod';

Vue.use(Vuex);
// vuex 多模块
export default new Vuex.Store({
  modules: {
    public: mod1
  }
});

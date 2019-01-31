const setItem = (name, data) => window.localStorage.setItem(name, data);

const mutations = {
  changeLoading(state, data) {
    state.loading = data;
  },
  // 背景图
  updateBgimg(state, data) {
    state.bgimg = data;
    setItem('bgimg', data);
  },
  // 自定义logo
  updateLogo(state, data) {
    state.logo = data;
    setItem('logo', data);
  },
  updateBlur(state, data) {
    state.blur = data;
    setItem('blur', data);
  },
  updateSearchRules(state, data) {
    state.addRules.push(data);
    setItem('searchRules', JSON.stringify(state.addRules));
  },
  updateDefaultRule(state, data) {
    state.defaultRule = data;
    setItem('defaultRule', data);
  }
};
export default mutations;

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
  // 位置
  updateHeight(state, data) {
    state.height = data;
    setItem('height', data);
  },
  // 是否显示logo
  updateIsLogo(state, data) {
    state.isLogo = data;
    setItem('isLogo', data);
  },
  // 是否启用自定义logo
  updateIsDiyLogo(state, data) {
    state.isDiyLogo = data;
    setItem('isDiyLogo', data);
  },
  // 自定义logo
  updateLogo(state, data) {
    state.logo = data;
    setItem('logo', data);
  },
  updateIsShortcut(state, data) {
    state.isShortcut = data;
    setItem('isShortcut', data);
  },
  updateBlur(state, data) {
    state.blur = data;
    setItem('blur', data);
  },

  updateSearchEngine(state, data) {
    state.searchEngine.push(data);
    setItem('searchEngine', JSON.stringify(state.searchEngine));
  },
  editSearchEngine(state, data) {
    const temp = JSON.parse(JSON.stringify(state.searchEngine));
    temp[data.index] = data.info;
    state.searchEngine = temp;
    setItem('searchEngine', JSON.stringify(state.searchEngine));
  },
  delSearchEngine(state, index) {
    const temp = JSON.parse(JSON.stringify(state.searchEngine));
    temp.splice(index, 1);
    state.searchEngine = temp;
    state.defaultRule = 0;
    setItem('defaultRule', 0);
    setItem('searchEngine', JSON.stringify(state.searchEngine));
  },

  updateDefaultRule(state, data) {
    state.defaultRule = data;
    setItem('defaultRule', data);
  }
};
export default mutations;

const setItem = (name, data) => window.localStorage.setItem(name, data);

const mutations = {
  // 添加快捷导航
  updateShortcuts(state, data) {
    state.shortcuts.push(data);
    setItem('shortcuts', JSON.stringify(state.shortcuts));
  },
  // 删除快捷导航
  delShortcuts(state, id) {
    const temp = JSON.parse(JSON.stringify(state.shortcuts));
    const current = temp.filter(item => item.id !== id);
    state.shortcuts = current;
    setItem('shortcuts', JSON.stringify(current));
  },
  // 编辑快捷导航
  editShortcuts(state, data) {
    const temp = JSON.parse(JSON.stringify(state.shortcuts));
    const current = temp.map(item => {
      if (item.id === data.id) {
        item = data;
      }
      return item;
    });
    state.shortcuts = current;
    setItem('shortcuts', JSON.stringify(current));
  },
  // logo
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
  // 开启快捷导航
  updateIsShortcut(state, data) {
    state.isShortcut = data;
    setItem('isShortcut', data);
  },
  // 开启covor
  updateCovor(state, data) {
    state.covor = data;
    setItem('covor', data);
  },
  // 黑色字体
  updateBlack(state, data) {
    state.black = data;
    setItem('black', data);
  },
  // 模糊
  updateBlur(state, data) {
    state.blur = data;
    setItem('blur', data);
  },
  // 添加引擎
  updateSearchEngine(state, data) {
    state.searchEngine.push(data);
    setItem('searchEngine', JSON.stringify(state.searchEngine));
  },
  // 编辑引擎
  editSearchEngine(state, data) {
    const temp = JSON.parse(JSON.stringify(state.searchEngine));
    temp[data.index] = data.info;
    state.searchEngine = temp;
    setItem('searchEngine', JSON.stringify(state.searchEngine));
  },
  // 删除引擎
  delSearchEngine(state, index) {
    const temp = JSON.parse(JSON.stringify(state.searchEngine));
    temp.splice(index, 1);
    state.searchEngine = temp;
    state.defaultRule = 0;
    setItem('defaultRule', 0);
    setItem('searchEngine', JSON.stringify(state.searchEngine));
  },
  // 更改默认引擎
  updateDefaultRule(state, data) {
    state.defaultRule = data;
    setItem('defaultRule', data);
  }
};
export default mutations;

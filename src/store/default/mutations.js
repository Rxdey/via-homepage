import { rxLocalStorage } from '@/common/util';

const mutations = {
  changeLoading(state, data) {
    state.loading = data;
  },
  logOut() {
    rxLocalStorage.removeItem('token');
  }
};
export default mutations;

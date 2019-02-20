<template>
  <div class="home">
    <div class="menu" @click="settingShow=true"><i class="iconfont icon-set"></i></div>
    <div class="home-block" :style="`top:${height}`">
      <div class="home__logo" v-show="isLogo" :style="logo&&`background-image:url(${logo})`">
        <p v-if="!logo" class="logo-name">{{searchEngine[defaultRule].name}}</p>
      </div>
      <div class="home__search">
        <div class="search-form" :class="{'border-black': !covor}">
          <div class="btn-logo">
            <i class="iconfont icon-bianji"></i>
          </div>
          <div class="input">
            <input type="text" autocomplete="off" v-model="val" name="search" id="search" placeholder="准备搜点啥啊~" @input="change" @focus="onFocus" @blur="onBlur" @keydown.enter="handleSubmit">
          </div>
          <div class="btn-clear">
            <i @click="handleClear" class="iconfont icon-31guanbi" v-show="isFocus"></i>
          </div>
        </div>
        <div class="search-drop" v-show="isSearch&&dropList.length">
          <ul class="drop-list">
            <li class="drop-child" v-for="(item, index) in dropList" :key="index" @click="handleChooes(index)">{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="home__list" v-if="isShortcut">
        <swiper></swiper>
      </div>
    </div>
    <section class="poe" v-show="hidePoe" :class="{black: black}"><span>{{randPoe}}</span></section>
    <div class="background" :style="`background-image:url(${bgimg});filter:blur(${blur}px)`"></div>

    <div class="bg-cover" v-show="covor"></div>

    <popup v-model="settingShow" position="right" class="popup">
      <setting @selectEngine="selectEngine" @close="settingShow = false"></setting>
    </popup>

    <popup get-container="body" v-model="popShow" position="right" class="popup">
      <engine @add="addEngine" @edit="handleEdit" @del="handleDel"></engine>
    </popup>

    <van-dialog get-container="body" v-model="isAddEngine" show-cancel-button title="添加搜索引擎" :before-close="beforeClose">

      <field v-model="engineName" maxlength="5" label="名称" placeholder="请输入搜索引擎名称" />
      <field v-model="engineUrl" maxlength="200" type="textarea" label="网址" placeholder="网址（用“%s”代替搜索字词）" />

    </van-dialog>
  </div>
</template>

<script>
import { Field, Popup } from 'vant';
import { mapState } from 'vuex';
import swiper from './swiper.vue';
import { http, home } from '@/common/server';
import { throttle } from '@/common/util';
import setting from './setting.vue';
import engine from './engine.vue';

export default {
  name: 'home',
  props: {
  },
  data () {
    return {
      val: '',
      isFocus: false,
      dropList: [],
      isSearch: false,
      swiper: null,
      popShow: false, // 搜索引擎管理
      settingShow: false, // 设置
      isAddEngine: false, // 添加搜索
      engineName: '',
      engineUrl: '',
      isEdit: false,
      poes: null,
      hidePoe: true
    };
  },
  computed: {
    ...mapState({
      bgimg: state => state.bgimg,
      blur: state => state.blur,
      height: state => state.height,
      defaultRule: state => state.defaultRule,
      searchEngine: state => state.searchEngine,
      logo: state => {
        if (!parseInt(state.isDiyLogo, 10)) {
          return state.searchEngine[state.defaultRule].logo;
        }
        return !state.logo ? state.searchEngine[state.defaultRule].logo : state.logo;
      },
      isLogo: state => parseInt(state.isLogo, 10),
      isDiyLogo: state => parseInt(state.isDiyLogo, 10),
      isShortcut: state => parseInt(state.isShortcut, 10),
      black: state => parseInt(state.black, 10),
      covor: state => parseInt(state.covor, 10)
    }),
    randPoe () {
      if (!this.poes) return '';
      const all = this.poes.origin.content;
      const rands = Math.floor(Math.random() * all.length);
      return all[rands];
    }
  },
  mounted () {
    this.getDayPoe();
    const height = window.innerHeight;
    window.addEventListener('resize', throttle(() => {
      const nowH = window.innerHeight;
      this.hidePoe = nowH + 10 >= height;
    }), 200);
  },
  methods: {
    getDay () {
      const date = new Date();
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    isPoes () {
      const poes = window.localStorage.getItem('poes');
      if (!poes) return { bool: false };
      return { bool: JSON.parse(poes).date === this.getDay(), poes: JSON.parse(poes).poes };
    },
    // 每日诗词
    async getDayPoe () {
      if (this.isPoes().bool) {
        this.poes = this.isPoes().poes;
        return;
      }
      const token = window.localStorage.getItem('jrsc_yonken');
      let data = {};
      if (token) {
        data = { 'X-User-Token': token };
      }
      const poeRes = await http(home.jinrishici, data);
      if (poeRes.token) {
        window.localStorage.setItem('jrsc_yonken', poeRes.token);
      }
      this.poes = poeRes.data;
      window.localStorage.setItem('poes', JSON.stringify({ poes: poeRes.data, date: this.getDay() }));
    },
    selectEngine () {
      this.settingShow = false;
      this.popShow = true;
    },
    // 修改搜索引擎
    handleEdit () {
      this.engineName = this.searchEngine[this.defaultRule].name;
      this.engineUrl = this.searchEngine[this.defaultRule].url;
      this.isAddEngine = true;
      this.popShow = false;
      this.isEdit = true;
    },
    // 删除搜索引擎
    handleDel () {
      this.$store.commit('delSearchEngine', this.defaultRule);
    },
    beforeClose (action, done) {
      if (action === 'confirm') {
        if (!this.engineName || !this.engineUrl) {
          this.toast({ message: '请输入完整信息', position: 'bottom' });
          done(false);
          return;
        }
        this.handleAddEngine();
      } else {
        this.engineName = '';
        this.engineUrl = '';
      }
      done();
    },
    // 添加搜索引擎
    handleAddEngine () {
      const data = {
        name: this.engineName,
        url: this.engineUrl,
        readonly: false,
        logo: ''
      };
      if (!this.isEdit) {
        this.$store.commit('updateSearchEngine', data);
      } else {
        this.$store.commit('editSearchEngine', { info: data, index: this.defaultRule });
      }
      this.isEdit = false;
    },
    addEngine () {
      this.popShow = false;
      this.isAddEngine = true;
    },
    // input control
    change () {
      if (!this.val) {
        this.dropList = [];
        return false;
      }
      this.isSearch = true;
      this.getSearchWaitDate();
    },
    async getSearchWaitDate () {
      const res = await http(home.baidu, { wd: this.val, p: 2, t: new Date().getTime() });
      if (!res.s) return;
      const data = res.s.length > 7 ? res.s.slice(0, 7) : res.s;
      this.dropList = data;
    },
    onFocus () {
      this.isFocus = true;
    },
    onBlur () {
      setTimeout(() => {
        this.isFocus = false;
        this.isSearch = false;
      }, 200);
    },
    handleChooes (index) {
      this.val = this.dropList[index];
      this.handleSubmit();
    },
    handleSubmit () {
      const url = this.searchEngine[this.defaultRule].url.replace('%s', this.val);
      window.location.href = url;
    },
    handleClear () {
      this.val = '';
      this.isFocus = false;
    }
  },
  components: {
    popup: Popup, engine, Field, setting, swiper
  }
};
</script>

<style lang="less">
@import url("../assets/css/public.less");
.van-dialog__header {
  padding: 30px 0;
}
.home {
  background-color: #fff;
  .menu {
    position: absolute;
    top: 30px;
    right: 30px;
    z-index: 101;
    // border-radius: 55px;
    // background: rgba(0,0,0,.2);
    // width: 55px;
    // height: 55px;
    overflow: hidden;
    // text-align: center;
    // line-height: 55px;
    cursor: pointer;
    i {
      color: #fff;
      font-size: 40px;
    }
  }
  .home-block {
    position: absolute;
    top: 15%;
    width: 100%;
    z-index: 100;
    max-width: 1000px;
    left: 50%;
    transform: translateX(-50%);
  }
  &__logo {
    width: 380px;
    height: 120px;
    margin: 0 auto 15px auto;
    // position: absolute;
    // top: 15%;
    // left: 50%;
    // transform: translateX(-50%);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    display: flex;
    flex-flow: row;
    align-items: center;
    z-index: 8;
    .logo-name {
      text-align: center;
      font-size: 80px;
      color: #fff;
      width: 100%;
    }
    img {
      width: 100%;
      max-height: 100%;
      display: block;
      margin: 0 auto;
    }
  }
  &__search {
    @inputHeight: 90px;
    padding: 10px 50px;
    position: relative;
    // z-index: 99;
    width: 100%;
    // top: 28%;
    .btn-logo {
      position: absolute;
      width: 70px;
      text-align: center;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      // height: 100%;
      // line-height: @inputHeight;
      i {
        font-size: 38px;
      }
    }
    .search-form {
      width: 100%;
      padding: 0 30px 0 70px;
      border-radius: 50px;
      background: #fff;
      // border: 1px solid #ddd;
      // box-shadow: 0 0 16px 0 #f1f1f1;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      align-items: center;
      &.border-black {
        border: 1px solid #6f6f6f;
      }
      .input {
        flex: 1;
        input {
          appearance: none;
          width: 100%;
          // height: 34px;
          height: @inputHeight;
          font-size: 28px;
          background: #fff;
          border: none;
          outline: none;
          line-height: 1.5;
          &::placeholder {
            line-height: @inputHeight;
          }
        }
      }
    }
    .search-drop {
      position: absolute;
      top: 130px;
      left: 0;
      width: 100%;
      padding: 0 50px;
      z-index: 100;
      .drop-list {
        border-radius: 50px;
        background: #fff;
        border: 1px solid #e5e5e5;
        overflow: hidden;
        .drop-child {
          padding: 30px 40px;
          &:active {
            background: #f1f1f1;
          }
        }
      }
    }
    .btn-clear {
      width: 50px;
      text-align: center;
      i {
        font-size: 36px;
        cursor: pointer;
      }
    }
  }
  &__list {
    // position: absolute;
    // top: 40%;
    margin-top: 50px;
    width: 100%;
    // padding: 0 50px;
    // .swiper-container {
    //   // background: rgba(255, 255, 255, 0.3);
    //   min-height: 500px;
    //   // border-radius: 40px;
    //   overflow: hidden;
    //   .swiper-slide,
    //   .swiper-wrapper {
    //     height: 100%;
    //     min-height: 500px;
    //   }
    //   .swiper-slide {
    //     // padding: 30px;
    //     overflow: hidden;
    //   }
    // }
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    z-index: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transition: 0.3s all;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transition: 0.3s all;
}
.van-overlay {
  background: rgba(0, 0, 0, 0.3);
}
.bg-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 2;
}
.poe {
  position: absolute;
  color: #fff;
  bottom: 50px;
  width: 90%;
  left: 5%;
  text-align: center;
  z-index: 99;
  overflow: hidden;
  span {
    position: relative;
    .ov_1;
    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      border-bottom: 1px solid #fff;
      width: 100%;
    }
    &::before {
      left: -110%;
    }
    &::after {
      right: -110%;
    }
  }

  &.black {
    color: #666;
    span::before,
    span::after {
      border-bottom: 1px solid #666;
    }
  }
  // }
}
</style>

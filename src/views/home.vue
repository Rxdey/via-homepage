<template>
  <div class="home">
    <div class="menu" @click="popShow=true"><i class="iconfont icon-add"></i></div>
    <div class="home-block">
      <div class="home__logo">
        <img :src="isLogo" alt="">
      </div>
      <div class="home__search">
        <div class="search-form">
          <div class="btn-change"></div>
          <div class="input">
            <input type="text" autocomplete="off" autofocus="autofocus" v-model="val" name="search" id="search" placeholder="准备搜点啥啊~" @input="change" @focus="onFocus" @blur="onBlur" @keydown.enter="handleSubmit">
          </div>
          <div class="btn-clear">
            <i @click="handleClear" class="iconfont icon-31guanbi" v-show="isFocus"></i>
          </div>
        </div>
        <div class="search-drop" v-show="isSearch">
          <ul class="drop-list">
            <li class="drop-child" v-for="(item, index) in dropList" :key="index" @click="handleChooes(index)">{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="home__list">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="mark-block">
                <div class="mark">
                  <div class="mark-logo" :style="`background-image:url();background-color: #26a2ff`">
                    <span>天</span>气
                  </div>
                  <p>天气</p>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
    <div class="background" :style="`background-image:url(${bgimg});filter:blur(${blur}px)`"></div>
    <popup v-model="popShow" position="right" width="60%">
      <engine></engine>
    </popup>
  </div>
</template>

<script>

import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
import { http, home } from '@/common/server';
import { popup } from '@/components/index';
import conf from '@/conf/conf';
import engine from './engine.vue';

const { bgimg, logo, blur, searchRules } = conf;
export default {
  name: 'home',
  props: {
  },
  data () {
    return {
      bgimg,
      logo,
      blur,
      val: '',
      isFocus: false,
      dropList: [],
      isSearch: false,
      swiper: null,
      popShow: false,
      addEngine: false
    };
  },
  computed: {
    searchRules () {
      return searchRules;
    },
    isLogo () {
      if (!logo) {
        return searchRules[this.engine].logo;
      }
      return logo;
    }
  },
  mounted () {
    this.swiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      // loop: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  },
  watch: {
  },
  methods: {

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
      const url = searchRules[this.engine].url.replace('%s', this.val);
      window.location.href = url;
    },
    handleClear () {
      this.val = '';
      this.isFocus = false;
    },
  },
  components: {
    popup, engine
  }
};
</script>

<style lang="less">
@import url("../assets/css/public.less");
* {
  box-sizing: border-box;
}
.home {
  background-color: #fff;
  .menu {
    position: absolute;
    top: 30px;
    right: 30px;
    z-index: 101;
    cursor: pointer;
    i {
      color: #fff;
      font-size: 40px;
    }
  }
  .home-block {
    position: absolute;
    top: 10%;
    width: 100%;
    z-index: 100;
    max-width: 1000px;
    left: 50%;
    transform: translateX(-50%);
  }
  &__logo {
    width: 300px;
    height: 144px;
    margin: 0 auto 40px auto;
    // position: absolute;
    // top: 15%;
    // left: 50%;
    // transform: translateX(-50%);
    overflow: hidden;
    display: flex;
    flex-flow: row;
    align-items: center;
    z-index: 8;
    img {
      width: 100%;
      max-height: 100%;
      display: block;
      margin: 0 auto;
    }
  }
  &__search {
    padding: 10px 50px;
    position: relative;
    // z-index: 99;
    width: 100%;
    // top: 28%;
    .search-form {
      width: 100%;
      padding: 0 40px;
      border-radius: 40px;
      background: #fff;
      border: 1px solid #e5e5e5;
      // box-shadow: 0 0 16px 0 #f1f1f1;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      align-items: center;
      .input {
        flex: 1;
        input {
          appearance: none;
          width: 100%;
          // height: 34px;
          height: 80px;
          font-size: 28px;
          background: #fff;
          border: none;
          outline: none;
        }
      }
    }
    .search-drop {
      position: absolute;
      top: 110px;
      left: 0;
      width: 100%;
      padding: 0 50px;
      z-index: 100;
      .drop-list {
        border-radius: 40px;
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
    margin-top: 40px;
    width: 100%;
    padding: 0 50px;
    .swiper-container {
      // background: rgba(255, 255, 255, 0.3);
      min-height: 500px;
      // border-radius: 40px;
      overflow: hidden;
      .swiper-slide,
      .swiper-wrapper {
        height: 100%;
        min-height: 500px;
      }
      .swiper-slide {
        // padding: 30px;
        overflow: hidden;
      }
    }
  }
  // .mask {
  //   position: absolute;
  //   background: rgba(0, 0, 0, 0.3);
  //   width: 100%;
  //   height: 100%;
  //   z-index: 9;
  //   top: 0;
  //   left: 0;
  // }
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
.mark-block {
  .mark {
    width: 120px;
    .mark-logo {
      border-radius: 120px;
      width: 120px;
      height: 120px;
      overflow: hidden;
      background-position: center;
      background-size: cover;
      background-color: #fff;
      box-shadow: 0 0 16px 0 #42bff8;
      text-align: center;
      line-height: 120px;
      // font-weight: bold;
      color: #fff;
      font-size: 28px;
      letter-spacing: 3px;
      cursor: pointer;
      span {
        font-size: 40px;
      }
      transition: 0.3s all;
      &:active {
        transform: scale(0.8);
      }
    }
    p {
      text-align: center;
      margin-top: 15px;
      font-size: 24px;
      color: #fff;
    }
  }
}

.user-setting {
  width: 100%;
  background: #fff;
  height: 100%;
  overflow-y: auto;
  // padding: 0 30px;
  .icon {
    display: flex;
    flex-flow: column;
    justify-content: center;
    margin-right: 15px;
    img {
      width: 30px;
      height: 30px;
    }
  }
  .title {
    font-size: 28px;
    // color: #666;
    background: @color-blue;
    color: #fff;
    border-bottom: 1px solid #e5e5e5;
    padding: 20px 30px;
    text-align: left;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    i {
      font-size: 28px;
    }
  }
  .tool-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 90px;
    .box-shadow;
    display: flex;
    flex-flow: row;
    .rx-btn {
      flex: 1;
      width: 50%;
      text-align: center;
      line-height: 90px;
      font-size: 28px;
      // &.edit{
      //   background: @color-green;
      //   color: #fff;
      // }
      &.add {
        background: @color-red;
        color: #fff;
      }
    }
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
</style>

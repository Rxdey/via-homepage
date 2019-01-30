<template>
  <div class="home">
    <div class="home__logo">
      <img :src="logo" alt="logo">
    </div>

    <div class="home__search">
      <div class="search-form">
        <div class="input">
          <input type="text" autocomplete="off" autofocus="autofocus" v-model="val" name="search" id="search" placeholder="准备搜点啥啊~" @input="change" @focus="onFocus" @blur="onBlur" @keydown.enter="handleSubmit">
        </div>
        <div class="btn-clear">
          <i @click="handleClear" class="iconfont icon-31guanbi" v-show="isFocus"></i>
        </div>
        <div class="search-drop">
          <ul class="drop-list">
            <li class="drop-child">test</li>
            <li class="drop-child">test</li>
            <li class="drop-child">test</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="home__list"></div>
    <div class="background" :style="`background-image:url(${bgimg});filter:blur(${blur}px)`"></div>
    <transition name="fade">
      <div class="mask" v-show="isFocus"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'home',
  props: {
  },
  data () {
    return {
      bgimg: 'https://ws1.sinaimg.cn/large/005O2C54gy1fz9p8wvsmej30u01dqq5n.jpg',
      logo: 'https://ws1.sinaimg.cn/large/005O2C54gy1fz9p8wvsmej30u01dqq5n.jpg',
      blur: 0,
      val: '',
      isFocus: false
    };
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    change () { },
    onFocus () {
      this.isFocus = true;
    },
    onBlur () {
      setTimeout(() => {
        this.isFocus = false;
      }, 200);
    },
    handleSubmit () {

    },
    handleClear () {
      this.val = '';
      this.isFocus = false;
    }
  },
  components: {
  }
};
</script>

<style lang="less">
* {
  box-sizing: border-box;
}
.home {
  background-color: #fff;
  &__logo {
    width: 300px;
    max-height: 144px;
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    display: flex;
    flex-flow: row;
    align-items: center;
    z-index: 8;
    img {
      width: 100%;
      display: block;
      margin: 0 auto;
    }
  }
  &__search {
    padding: 10px 30px;
    position: absolute;
    z-index: 99;
    width: 100%;
    top: 20%;
    .search-form {
      width: 100%;
      padding: 0 40px;
      border-radius: 40px;
      background: #fff;
      border: 1px solid #e5e5e5;
      // box-shadow: 0 0 16px 0 #f1f1f1;
      // overflow: hidden;
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
      top: 95px;
      left: 0;
      width: 100%;
      .drop-list {
        border-radius: 40px;
        background: #fff;
        padding: 15px 40px;
        .drop-child{
          padding: 30px 0;
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
  }
  .mask {
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    z-index: 9;
    top: 0;
    left: 0;
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
</style>

<template>
  <div class="user-setting">
    <div class="title">
      <p>定制</p>
    </div>
    <div class="setting-list">
      <div class="small-title">基本</div>
      <cell-group>
        <cell title="选择默认搜索" is-link />
        <cell title="更换背景图" is-link />
        <cell title="更换logo" is-link />
        <cell title="添加快捷导航" is-link />
      </cell-group>
      <div class="small-title">背景虚化</div>
      <div class="slider-box">
        <van-slider v-model="isBlur" :min="0" :max="100" @change="sliderChange">
          <div slot="button" class="custom-button"></div>
        </van-slider>
      </div>
      <div class="small-title">其他</div>
    </div>
  </div>
</template>

<script>
import { Cell, CellGroup, Slider } from 'vant';

export default {
  name: 'setting',
  props: {
  },
  data () {
    return {
      isBlur: 0
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
    sliderChange (val) {
      this.$store.commit('updateBlur', val / 10);
    }
  },
  components: {
    Cell, CellGroup, vanSlider: Slider
  }
};
</script>

<style lang="less">
@import url("../assets/css/public.less");
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
  .small-title {
    padding: 15px 30px;
    background: #f7f7f7;
    font-size: 24px;
    color: #999;
  }
  .slider-box {
    position: relative;
    padding: 0 30px;
    margin: 50px 0;
    .custom-button{
      @size: 40px;
      width: @size;
      height: @size;
      border-radius: @size;
      overflow: hidden;
      text-align: center;
      line-height: @size;
      border: 1px solid @color-blue;
      background: @color-blue;
      color: #fff;
    }
  }
}
</style>

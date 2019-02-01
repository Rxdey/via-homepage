<template>
  <div class="user-setting">
    <div class="title">
      <p>定制</p>
    </div>
    <div class="setting-list">
      <div class="small-title">基本</div>
      <cell-group>
        <cell title="选择默认搜索" is-link @click="setting(0)" />
        <cell title="更换背景图" is-link @click="setting(1)" />
        <cell title="更换logo" is-link @click="setting(2)" />
        <cell title="添加快捷导航" is-link @click="setting(3)" />
      </cell-group>
      <div class="small-title">背景虚化</div>
      <div class="slider-box">
        <van-slider v-model="blurVal" :min="0" :max="100" @change="sliderChange">
          <div slot="button" class="custom-button"></div>
        </van-slider>
      </div>
      <div class="small-title">位置(上下)</div>
      <div class="slider-box">
        <van-slider v-model="heightVal" :min="0" :max="100" @change="heightChnage">
          <div slot="button" class="custom-button"></div>
        </van-slider>
      </div>
      <div class="small-title">其他</div>
      <cell-group>
        <switch-cell @change="islogoChange" v-model="isShowLogo" title="显示logo" ></switch-cell>
      </cell-group>
    </div>
    <input ref="file" @change="handleFileChange" type="file" id="update" accept="image/*" hidden v-show="false">
  </div>
</template>

<script>
import { Cell, CellGroup, Slider, SwitchCell } from 'vant';

export default {
  name: 'setting',
  props: {
  },
  data () {
    return {
      heightVal: 0,
      blurVal: 0,
      logoImage: null,
      target: 0,
      bgImage: null,
      isShowLogo: true
    };
  },
  computed: {
    height () {
      return this.$store.state.height;
    },
    blur () {
      return this.$store.state.blur;
    },
    isLogo () {
      return this.$store.state.isLogo;
    }
  },
  mounted () {
    this.blurVal = this.blur * 10;
    this.heightVal = parseInt(this.height, 10);
    this.isShowLogo = !!parseInt(this.isLogo, 10);
  },
  methods: {
    setting (val) {
      this.target = val;
      const setConf = {
        0: () => {
          this.$emit('selectEngine');
        },
        1: this.handleUpload,
        2: this.handleUpload,
        3: () => { }
      };
      setConf[val]();
    },
    sliderChange (val) {
      this.$store.commit('updateBlur', val / 10);
    },
    heightChnage (val) {
      this.$store.commit('updateHeight', `${val}%`);
    },
    islogoChange (val) {
      this.$store.commit('updateIsLogo', this.isShowLogo ? 1 : 0);
    },
    handleUpload () {
      this.$refs.file.click();
    },
    handleFileChange (event) {
      const target = {
        2: (val) => {
          this.$store.commit('updateLogo', val);
        },
        1: (val) => {
          this.$store.commit('updateBgimg', val);
        }
      };
      const file = event.target.files[0];
      if (!file) return false;
      if (file.size > 1572864) {
        this.toast('由于本地存储限制，自定义图片大小请不要超过1.5兆');
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = reader.result;
        target[this.target](img);
        this.$nextTick(() => {
          this.$refs.file.value = '';
        });
      };
    }
  },
  watch: {
    // logoImage (val) {
    //   ;
    // },
    // bgImage (val) {
    //   this.$store.commit('updateBgimg', val);
    // }
  },
  components: {
    Cell, CellGroup, vanSlider: Slider, SwitchCell
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
    .custom-button {
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

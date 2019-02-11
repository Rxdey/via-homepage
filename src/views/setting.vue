<template>
  <div class="user-setting">
    <div class="title">
      <p>定制</p>
    </div>
    <div class="setting-list">
      <div class="small-title">基本</div>
      <cell-group>
        <cell title="选择默认搜索" is-link @click="setting(0)" />
        <cell title="更换背景图" is-link @click="actionShow=true" />
        <cell title="更换logo" is-link @click="setting(2)" />
        <cell title="添加快捷导航" is-link @click="setting(3)" />
        <!-- <cell title="导入导出" is-link /> -->
      </cell-group>
      <div class="small-title">背景虚化 ({{blurVal}})</div>
      <div class="slider-box">
        <van-slider v-model="blurVal" :min="0" :max="100" @change="sliderChange">
          <div slot="button" class="custom-button"></div>
        </van-slider>
      </div>
      <div class="small-title">位置({{heightVal}})</div>
      <div class="slider-box">
        <van-slider v-model="heightVal" :min="0" :max="100" @change="heightChnage">
          <div slot="button" class="custom-button"></div>
        </van-slider>
      </div>
      <div class="small-title">其他</div>
      <cell-group>
        <switch-cell @change="islogoChange" v-model="isShowLogo" title="显示logo"></switch-cell>
        <switch-cell @change="isUselogoChange" v-model="isUseLogo" title="启用logo"></switch-cell>
        <switch-cell @change="isUseShortcutChange" v-model="isUseShortcut" title="快捷导航"></switch-cell>
        <switch-cell @change="isCovorChange" v-model="isCovor" title="启用cover"></switch-cell>
        <switch-cell @change="isBlackChange" v-model="isBlack" title="黑色字体"></switch-cell>
      </cell-group>
    </div>
    <actionsheet get-container="body" v-model="actionShow" @select="onSelect" :actions="bgActions" cancel-text="取消"></actionsheet>

    <van-dialog get-container="body" v-model="dialogShow" show-cancel-button :before-close="beforeClose" title="网络图片">
      <field v-model="tempImage" label="图片地址" placeholder="请输入图片地址" />
    </van-dialog>

    <popup v-model="addShow" get-container="body" position="right" class="popup">
      <add-shortcut></add-shortcut>
    </popup>

    <input ref="file" @change="handleFileChange" type="file" id="update" accept="image/*" hidden v-show="false">
  </div>
</template>

<script>
import { Cell, CellGroup, Slider, SwitchCell, Actionsheet, Field, Popup } from 'vant';
import addShortcut from './addShortcut.vue';

export default {
  name: 'setting',
  props: {
  },
  data () {
    return {
      addShow: false,
      actionShow: false,
      heightVal: 0,
      blurVal: 0,
      logoImage: null,
      target: 0,
      bgImage: null,
      isShowLogo: true,
      isUseLogo: true,
      bgActions: [
        { name: '上传本地图片', subname: '< 1.5M' },
        { name: '网络图片', subname: '无限制' }
      ],
      tempImage: '',
      dialogShow: false,
      isUseShortcut: true, // 启用快捷导航
      isCovor: true, // 启用covor
      isBlack: false // 黑色字体
    };
  },
  computed: {
    height () {
      return parseInt(this.$store.state.height, 10);
    },
    blur () {
      return this.$store.state.blur;
    },
    covor () {
      return !!parseInt(this.$store.state.covor, 10);
    },
    black () {
      return !!parseInt(this.$store.state.black, 10);
    },
    isLogo () {
      return !!parseInt(this.$store.state.isLogo, 10);
    },
    isDiyLogo () {
      return !!parseInt(this.$store.state.isDiyLogo, 10);
    },
    isShortcut () {
      return !!parseInt(this.$store.state.isShortcut, 10);
    }
  },
  mounted () {
    this.blurVal = this.blur * 10;
    this.heightVal = this.height;
    this.isShowLogo = this.isLogo;
    this.isUseLogo = this.isDiyLogo;
    this.isUseShortcut = this.isShortcut;
    this.isCovor = this.covor;
    this.isBlack = this.black;
  },
  methods: {
    beforeClose (action, done) {
      if (action === 'confirm') {
        if (!this.tempImage) {
          this.toast({ message: '请填写图片地址', position: 'bottom' });
          done(false);
          return false;
        }
        this.$store.commit('updateBgimg', this.tempImage);
        this.toast('上传成功');
      }
      done();
    },
    onSelect (name) {
      if (name.name === '上传本地图片') {
        this.setting(1);
      }
      if (name.name === '网络图片') {
        this.dialogShow = true;
      }
      this.actionShow = false;
    },
    setting (val) {
      this.target = val;
      const setConf = {
        0: () => {
          this.$emit('selectEngine');
        },
        1: this.handleUpload,
        2: this.handleUpload,
        3: () => { this.addShow = true; this.$emit('close'); }
      };
      setConf[val]();
    },
    // 启用covor
    isBlackChange (val) {
      this.$store.commit('updateBlack', val ? 1 : 0);
    },
    // 启用covor
    isCovorChange (val) {
      this.$store.commit('updateCovor', val ? 1 : 0);
    },
    // 启用快捷方式
    isUseShortcutChange (val) {
      this.$store.commit('updateIsShortcut', val ? 1 : 0);
    },
    // 虚化
    sliderChange (val) {
      this.$store.commit('updateBlur', val / 10);
    },
    // 高度变化
    heightChnage (val) {
      this.$store.commit('updateHeight', `${val}%`);
    },
    // 显示logo
    islogoChange (val) {
      this.$store.commit('updateIsLogo', val ? 1 : 0);
    },
    // 启用自定义logo
    isUselogoChange (val) {
      this.$store.commit('updateIsDiyLogo', val ? 1 : 0);
    },
    // upload
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
      // const img = URL.createObjectURL(file);
      // target[this.target](img);
      // this.$nextTick(() => {
      //   this.$refs.file.value = '';
      // });
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
  components: {
    Cell, CellGroup, vanSlider: Slider, SwitchCell, Actionsheet, Field, addShortcut, Popup
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
.van-cell {
  font-size: 24px;
}
</style>

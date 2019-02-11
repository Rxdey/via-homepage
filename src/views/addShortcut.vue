<template>
  <div class="user-setting">
    <div class="title">
      <p>添加快捷导航</p>
    </div>
    <div class="add-list">
      <div class="small-title">导航信息</div>
      <cell-group>
        <field v-model="url" placeholder="网址"></field>
        <field v-model="name" placeholder="名称"></field>
        <field v-model="imgUrl" placeholder="网站图标地址 (可选)"></field>
      </cell-group>
      <div class="small-title">预览 (点击更换颜色)</div>
      <div class="url-preview">
        <div class="mark-logo" :style="setUrlIcon" @click="isShowPicker = !isShowPicker">
          <template v-if="!imgUrl">
            <span>{{getFirst(name)}}</span>{{getSecond(name)}}
          </template>
        </div>
      </div>
      <chrome v-model="color" v-show="isShowPicker" />
    </div>
    <div class="add-bottom">
      <van-button type="primary" size="large" @click="addShortcut">添加</van-button>
    </div>
  </div>
</template>
<script>
// import { Popup } from 'vant';
import { Field, CellGroup, Button } from 'vant';
import { Chrome } from 'vue-color';
import { createRands } from '@/common/util';

export default {
  name: 'addFast',
  data () {
    return {
      url: '', // 网址
      name: '', // 名称
      imgUrl: '', // 图标地址
      color: { hex: '#26a2ff' },
      isShowPicker: false
    };
  },
  methods: {
    addShortcut () {
      if (!this.url) {
        this.toast('请输入网址');
        return false;
      }
      if (!this.name) {
        this.toast('请输入名称');
        return false;
      }
      this.submit();
    },
    submit () {
      const data = {
        name: this.name,
        url: this.url,
        id: createRands(10),
        icon: this.imgUrl,
        background: this.color.hex
      };
      this.$store.commit('updateShortcuts', data);
      this.url = '';
      this.name = '';
      this.imgUrl = '';
      this.color = { hex: '#26a2ff' };
      this.isShowPicker = false;
    },
    getFirst (val) {
      return val.substring(0, 1);
    },
    getSecond (val) {
      return val.substring(1, 2);
    }
  },
  computed: {
    // createId () {
    //   return createRands(10);
    // },
    setUrlIcon () {
      // return this.imgUrl? this.imgUrl
      if (this.imgUrl) {
        return { backgroundImage: `url(${this.imgUrl})` };
      }
      return { backgroundColor: this.color.hex };
    }
  },
  watch: {},
  components: {
    // Popup
    Field,
    CellGroup,
    vanButton: Button,
    Chrome
  },
  mounted () { }
};
</script>
<style lang = "less" >
.url-preview {
  width: 100%;
  box-sizing: border-box;
  margin: 15px 0;
  .mark-logo {
    margin: 0 auto;
    transition: none;
    &:active {
      transform: scale(1);
    }
  }
  /* @height: 124px;
  .url-icon {
    width: @height;
    height: @height;
    border-radius: @height / 2;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    margin: 10px auto;
    font-size: 28px;
    letter-spacing: 3px;
    cursor: pointer;
    margin: 0 auto;
    span {
      font-size: 40px;
    }
  } */
}
.vc-chrome {
  margin: 0 auto;
}
.add-bottom {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  .van-button--large {
    height: 80px;
    font-size: 24px;
    line-height: 80px;
    border-radius: 0;
  }
}
</style>

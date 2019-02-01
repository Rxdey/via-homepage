<template>
  <div class="user-setting">
    <div class="title">
      <p>选择搜索引擎</p>
      <p><i class="iconfont icon-add" @click="addShow"></i></p>
    </div>
    <div class="engine">
      <radio-group v-model="engine">
        <cell-group>
          <cell v-for="(item,index) in searchEngine" :key="index" :title="item.name" clickable @click="setEngine(index)">
            <div class="icon" slot="icon"><img :src="getUrl(item.url)[1] + '://' + getUrl(item.url)[2] + '/favicon.ico'" alt=""></div>
            <van-radio :name="index" />
          </cell>
        </cell-group>
      </radio-group>
    </div>
    <div class="tool-bar" v-show="!searchEngine[defaultRule].readonly">
      <div class="rx-btn edit" @click="edit">编辑</div>
      <div class="rx-btn add" @click="del">删除</div>
    </div>
  </div>
</template>

<script>
import { RadioGroup, Radio, Cell, CellGroup } from 'vant';
import { urlReg } from '@/common/util';
import { mapState } from 'vuex';

export default {
  name: 'engine',
  props: {
  },
  data () {
    return {
      engine: 0
    };
  },
  computed: {
    ...mapState({
      defaultRule: state => parseInt(state.defaultRule, 10),
      searchEngine: state => state.searchEngine
      // currentRule: state => state.searchEngine[state.defaultRule]
    })
  },
  created () {
    this.engine = this.defaultRule;
  },
  watch: {
    engine (val) {
      this.$store.commit('updateDefaultRule', val);
    },
    defaultRule(val) {
      this.engine = val;
    }
  },
  methods: {
    edit() {
      this.$emit('edit');
    },
    del() {
      this.$emit('del');
    },
    addShow () {
      this.$emit('add');
    },
    setEngine (index) {
      this.engine = index;
      this.$store.commit('updateDefaultRule', index);
    },
    getUrl (url) {
      let arr = url.match(urlReg);
      if (!arr) arr = [];
      return arr;
    }
  },
  components: {
    RadioGroup, vanRadio: Radio, Cell, CellGroup
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
</style>

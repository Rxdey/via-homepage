<template>
  <div class="engine">
    <div class="user-setting">
      <div class="title">
        <p>选择搜索引擎</p>
        <p><i class="iconfont icon-add"></i></p>
      </div>
      <div class="engine">
        <radio-group v-model="engine">
          <cell-group>
            <cell v-for="(item,index) in searchRules" :key="item.name" :title="item.name" clickable @click="setEngine(index)">
              <div class="icon" slot="icon"><img :src="getUrl(item.url)[1] + '://' + getUrl(item.url)[2] + '/favicon.ico'" alt=""></div>
              <van-radio :name="index" />
            </cell>
          </cell-group>
        </radio-group>
      </div>
      <div class="tool-bar">
        <div class="rx-btn edit">编辑</div>
        <div class="rx-btn add" v-show="!currentDate.readonly">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
import { RadioGroup, Radio, Cell, CellGroup } from 'vant';
import { urlReg } from '@/common/util';
import conf from '@/conf/conf';

const { searchRules, defaultRule } = conf;
export default {
  name: 'engine',
  props: {
  },
  data () {
    return {
      engine: defaultRule,
    };
  },
  computed: {
    currentDate () {
      return searchRules[this.engine];
    },
    searchRules () {
      return searchRules;
    }
  },
  methods: {
    setEngine (index) {
      this.engine = index;
      window.localStorage.setItem('defaultRule', index);
      this.$emit('select', index);
    },
    getUrl (url) {
      return url.match(urlReg);
    }
  },
  components: {
    RadioGroup, vanRadio: Radio, Cell, CellGroup
  }
};
</script>

<style lang="less">
</style>

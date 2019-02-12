<template>
  <div class="shortcut-edit user-setting">
    <div class="title">
      <p>编辑</p>
    </div>
    <div class="url-preview">
      <div class="mark-logo" v-show="setUrlIcon" :style="setUrlIcon" @click="isShowPicker = !isShowPicker">
        <template v-if="!this.current.icon">
          <span>{{getFirst(this.current.name)}}</span>{{getSecond(this.current.name)}}
        </template>
      </div>
      <chrome v-model="current.background" v-show="isShowPicker" />
    </div>
    <div class="edit-list">
      <cell-group>
        <field v-model="current.url" placeholder="网址"></field>
        <field v-model="current.name" placeholder="名称"></field>
        <field v-model="current.icon" placeholder="网站图标地址 (可选)"></field>
      </cell-group>
    </div>
    <div class="add-bottom">
      <van-button type="primary" size="large" @click="editShortcut">提交修改</van-button>
      <van-button type="danger" size="large" @click="delShortcut">删除</van-button>
    </div>
  </div>
</template>

<script>
import { Field, CellGroup, Button } from 'vant';
import { Chrome } from 'vue-color';

export default {
  name: 'shortcutEdit',
  props: {
    shortcut: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isShowPicker: false,
      color: {},
      current: null
    };
  },
  computed: {
    setUrlIcon () {
      if (JSON.stringify(this.shortcut) === '{}') return false;
      if (this.current.icon) {
        return { backgroundImage: `url(${this.current.icon})` };
      }
      return { backgroundColor: typeof this.current.background === 'string' ? this.current.background : this.current.background.hex };
    }
  },
  created () {
    this.current = this.shortcut;
  },
  watch: {
    shortcut (val) {
      this.current = val;
    }
  },
  methods: {
    editShortcut () {
      const data = JSON.parse(JSON.stringify(this.current));
      // if (!data.background) {
      //   data.background = this.current.background;
      // }
      if (typeof data.background !== 'string') {
        data.background = this.current.background.hex;
      }

      this.$emit('edit', data);
    },
    delShortcut () {
      this.$dialog.confirm({
        title: '提示',
        message: '删除后不可恢复，确认要删除吗？'
      }).then(() => {
        this.$emit('delete', this.shortcut.id);
      }).catch(() => {

      });
    },
    getFirst (val) {
      return val.substring(0, 1);
    },
    getSecond (val) {
      return val.substring(1, 2);
    }
  },
  components: {
    Chrome, Field, CellGroup, 'van-button': Button
  }
};
</script>

<style lang="less">
.shortcut-edit {
  .add-bottom {
    display: flex;
    flex-flow: row nowrap;
  }
}
</style>

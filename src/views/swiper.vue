<template>
  <div class="swiper">
    <swipe indicator-color="white">
      <swipe-item v-for="(current, index) in cutFastTarget" :key="index">
        <div class="mark-block" :class="{black:isBlack}">
          <div class="mark" v-for="(item, index) in current" :key="index">
            <div class="mark-box">
              <div class="mark-logo" @touchstart.prevent="handleTouch(item)" @touchend.prevent="handleEnd(item.url)" @mousedown.prevent="handleTouch(item)" @mouseup.prevent=" handleEnd(item.url)" :style="`background-image:url(${item.icon});background-color: ${item.background}`">
                <div v-if="!item.icon"><span>{{getFirst(item.name)}}</span>{{getSecond(item.name)}}</div>
              </div>
              <!-- <div v-show="isEdit" class="del-shortcut" @click.stop="handleDel(item.id)"><i class="iconfont icon-del"></i></div> -->
            </div>
            <p class="ov_1 icon-name">{{item.name}}</p>
          </div>
        </div>
      </swipe-item>
    </swipe>
    <popup get-container="body" v-model="isEdit" position="right" class="popup">
      <shortcut-edit @edit="handleEdit" @delete="handleDel" :shortcut="shortcut"></shortcut-edit>
    </popup>
  </div>
</template>
<script>
import { Swipe, SwipeItem, Popup } from 'vant';
import { vibrate } from '@/common/util';
import shortcutEdit from './shortcutEdit.vue';

export default {
  name: 'swiper',
  data () {
    return {
      // popShow: false,
      // fastTarget: [
      //   { name: '书签', url: 'folder://', id: 'url1', icon: '/static/icon/save.png', background: '' }
      // ]
      st: null,
      isEdit: false,
      shortcut: {}
    };
  },
  methods: {
    handleEdit (data) {
      this.$store.commit('editShortcuts', data);
      this.isEdit = false;
    },
    handleDel (id) {
      this.$store.commit('delShortcuts', id);
      this.toast({ message: '删除成功', position: 'bottom' });
      this.isEdit = false;
    },
    handleTouch (item) {
      this.isEdit = false;
      this.st = setTimeout(() => {
        vibrate(50);
        this.isEdit = true;
        this.shortcut = item;
      }, 1000);
    },
    handleEnd (url) {
      if (!this.isEdit) {
        window.location.href = url;
      }
      clearTimeout(this.st);
    },
    getFirst (val) {
      return val.substring(0, 1);
    },
    getSecond (val) {
      return val.substring(1, 2);
    }
  },
  mounted () {
    // document.body.addEventListener('mousedown', (event) => {
    //   event.stopPropagation();
    //   this.isEdit = false;
    // });
  },
  components: {
    Swipe, SwipeItem, Popup, shortcutEdit
  },
  computed: {
    isBlack () {
      return !!parseInt(this.$store.state.black, 10);
    },
    fastTarget () {
      return this.$store.state.shortcuts;
    },
    cutFastTarget () {
      if (!this.fastTarget.length) return [];
      const arr = this.fastTarget;
      const result = [];
      for (let i = 0; i < arr.length; i += 8) {
        result.push(arr.slice(i, i + 8));
      }
      return result;
    }
  },
  watch: {}
};
</script>
<style lang = "less" >
.van-swipe {
  /* height: 500px; */
  min-height: 500px;
}
.mark-block {
  padding: 10px 10px;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  .icon-name {
    color: #fff;
  }
  &.black {
    .icon-name {
      color: #6f6f6f;
    }
  }
  .mark {
    /* width: 100px; */
    flex: 0 0 25%;
    margin-bottom: 30px;
    color: #fff;
    &.has-del {
      animation: shake 0.3s infinite ease;
    }
    p {
      text-align: center;
      margin-top: 15px;
      font-size: 24px;
    }
  }
  .mark-box {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50px;
    overflow: hidden;
    margin: 0 auto;
  }
  .del-shortcut {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 100px;
    color: #f03838;
    i {
      font-size: 36px;
    }
  }
  @keyframes shake {
    0% {
      -webkit-transform: rotate(0) scale(1);
    }

    20% {
      -webkit-transform: rotate(-2deg) scale(1);
    }

    60% {
      -webkit-transform: rotate(0) scale(1);
    }

    80% {
      -webkit-transform: rotate(2deg) scale(1);
    }

    100% {
      -webkit-transform: rotate(0) scale(1);
    }
  }
}
</style>

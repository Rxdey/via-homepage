<template>
  <transition :name="position">
    <div ref="popup" v-show="popShow" v-transferDom :class="['rx-pop',position,full&&'full']" @click="clickClose" :style="width? `width:${width}`: ''">
      <slot></slot>
      <!-- <rx-mask @mask="maskClose&&close()" v-show="mask&&popShow"></rx-mask> -->
    </div>
  </transition>
</template>
<script>
import CreateMask from './mask';

export default {
  name: 'rxPop',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'top'
    },
    width: {
      type: String,
      default: null
    },
    height: {
      type: String,
      default: null
    },
    full: {
      type: Boolean,
      default: false
    },
    clickToClose: {
      type: Boolean,
      default: false
    },
    mask: {
      type: Boolean,
      default: true
    },
    maskClose: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      popShow: false
    };
  },
  mounted () {
    this.popShow = this.value;
    if (this.mask) {
      this.rxMask = new CreateMask({
        el: '#rx-mask',
        maskClick: () => {
          if (this.maskClose) {
            this.popShow = false;
            this.rxMask.hide();
          }
        }
      });
    }
  },
  methods: {
    clickClose () {
      if (this.clickToClose) {
        this.close();
      }
    },
    close () {
      this.popShow = false;
    }
  },
  computed: {
  },
  watch: {
    value (val) {
      this.popShow = val;
    },
    popShow (val) {
      if (val) {
        this.rxMask.show();
      } else {
        this.rxMask.hide();
      }
      this.$emit('input', val);
    }
  },
  components: {
    // rxMask: mask
  }
};
</script>
<style lang="less">
.rx-pop {
  position: fixed;
  z-index: 2001;
  // text-align: center;
  &.full {
    height: 100%;
  }
  &.top {
    top: 0;
    width: 100%;
  }
  &.left {
    top: 0;
    left: 0;
    // width: 100%;
    height: 100%;
  }
  &.bottom {
    bottom: 0;
    left: 0;
    width: 100%;
  }
  &.right {
    top: 0;
    right: 0;
    // width: 100%;
    height: 100%;
  }
}
.top-enter-active,
.top-leave-active {
  // opacity: 1;
  transition: 0.3s;
  transform: translateY(0);
}
.top-enter,
.top-leave-to {
  // opacity: 0;
  transition: 0.3s;
  transform: translateY(-100%);
}
.left-enter-active,
.left-leave-active {
  // opacity: 1;
  transition: 0.3s;
  transform: translateX(0);
}
.left-enter,
.left-leave-to {
  // opacity: 0;
  transition: 0.3s;
  transform: translateX(-100%);
}
.right-enter-active,
.right-leave-active {
  // opacity: 1;
  transition: 0.3s;
  transform: translateX(0%);
}
.right-enter,
.right-leave-to {
  // opacity: 0;
  transition: 0.3s;
  transform: translateX(100%);
}
.bottom-enter-active,
.bottom-leave-active {
  transition: 0.3s;
  transform: translateY(0%);
}
.bottom-enter,
.bottom-leave-to {
  transition: 0.3s;
  transform: translateY(100%);
}

#rx-mask {
  position: fixed;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
}
</style>

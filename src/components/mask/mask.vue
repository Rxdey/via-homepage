<template>
  <transition name="fade">
    <div class="mask" id="rx-mask" @click="handleMask"> </div>
  </transition>
</template>

<script>
export default {
  name: 'rxMask',
  methods: {
    handleMask () {
      this.$emit('mask');
    }
  }
};
</script>

<style lang="less">
.mask {
  position: fixed;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
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

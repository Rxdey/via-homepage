<template>
  <div id="app">
    <router-view class="page" />
  </div>
</template>

<script>
export default {
  name: 'App',
  props: {
  },
  data () {
    return {
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
  },
  components: {
  }
};
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  position: relative;
  font-size: 24px;
  background: #fff;
  overflow: hidden;
}
.page {
  height: 100%;
}
</style>

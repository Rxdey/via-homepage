<template>
  <div class="swiper">
    <swipe indicator-color="white">
      <swipe-item v-for="(current, index) in cutFastTarget" :key="index">
        <div class="mark-block">
          <div class="mark" v-for="(item, index) in current" :key="index">
            <div class="mark-logo" :style="`background-image:url();background-color: #26a2ff`">
              <span>{{item.name | getFirst}}</span>{{item.name | getSecond}}
            </div>
            <p>{{item.name}}</p>
          </div>
        </div>
      </swipe-item>
    </swipe>

  </div>
</template>
<script>
import { Swipe, SwipeItem } from 'vant';

export default {
  name: 'swiper',
  data () {
    return {
      fastTarget: [

      ]
    };
  },
  components: {
    Swipe, SwipeItem
  },
  mounted () {
  },
  methods: {
  },
  filters: {
    getFirst (val) {
      return val.substring(0, 1);
    },
    getSecond (val) {
      return val.substring(1, 2);
    }
  },
  computed: {
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
  padding: 10px 50px;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  .mark {
    width: 120px;
    flex: 0 0 25%;
    margin-bottom: 30px;
    color: #fff;
    .mark-logo {
      border-radius: 120px;
      width: 120px;
      height: 120px;
      overflow: hidden;
      background-position: center;
      background-size: cover;
      background-color: #fff;
      box-shadow: 0 0 16px 0 #42bff8;
      text-align: center;
      line-height: 120px;
      color: #fff;
      font-size: 28px;
      letter-spacing: 3px;
      cursor: pointer;
      margin: 0 auto;
      span {
        font-size: 40px;
      }
      transition: 0.3s all;
      &:active {
        transform: scale(0.8);
      }
    }
    p {
      text-align: center;
      margin-top: 15px;
      font-size: 24px;
    }
  }
}
</style>

<template>
    <div class="play-page">
        play页面
        <van-button type="primary" @click="handleClickReturnPrevPage">返回</van-button>
        <div>
            <div class="door-area">
              <div class="door-cell"></div>
              <div class="door-cell"></div>
              <div class="door-cell"></div>
              <div class="door-cell"></div>
              <div class="door-cell"></div>
              <div class="door-cell"></div>
            </div>
            <div ref="soccer" class="soccer"></div>
            <div class="soccer-virturl" v-hammer:swipe="handleSwipe"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'play',
  methods: {
    handleClickReturnPrevPage () {
      this.$emit('touchable', true)
    },
    handleSwipe (evt) {
      console.log(evt)

      console.log(this.$refs.soccer)
      this.$refs.soccer.style.top = '30vh'
      if (this.$refs.soccer.$el) {
        console.log(this.$refs.soccer.$el.style)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.play-page {
    background: gray;
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/imgs/bg2.png");
  background-size: 100% 100%;
  position: relative;
  .soccer {
    width: 6vw;
    height: 6vw;
    background-image: url("../../assets/imgs/football.png");
    background-size: 100% 100%;
    position: absolute;
    top: 60vh;
    left: 50%;
    transform: translateX(-50%);
    transform-origin: center;
    z-index: 1;
    transition: all 500ms;
  }
  .soccer-virturl {
    width: 8vw;
    height: 8vw;
    background-color: red;
    position: absolute;
    top: 60vh;
    left: 50%;
    transform: translateX(-50%);
    transform-origin: center;
    z-index: 2;
  }
  .door-area {
    background: greenyellow;
    height: 40vh;
    width: 80vw;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    .door-cell {
      width: 30%;
      height: 18vh;
      margin: 1vw;
      background: coral;
    }
  }
}
</style>

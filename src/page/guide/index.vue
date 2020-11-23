<template>
  <div class="guide-page">
    引导页
    <van-button type="primary">进入选择页</van-button>
    <div class="swiper-tip"></div>
  </div>
</template>

<script>
export default {
  name: "guide",
};
</script>

<style lang="scss" scoped>
.guide-page {
  background: gray;
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/imgs/bg1.png");
  background-size: 100% 100%;
  position: relative;
  .swiper-tip {
    background-image: url("../../assets/imgs/bottom.png");
    width: 12vw;
    height: 18vw;
    position: absolute;
    bottom: 8vh;
    left: 50%;
    transform: translateX(-50%);
    background-size: 100% 100%;
    animation: swiper-tip-ani 1.5s linear infinite;
  }
}
@keyframes swiper-tip-ani {
  0% {
    bottom: 10vh;
    opacity: 1;
  }
  100% {
    bottom: 3vh;
    opacity: 0.4;
  }
}
</style>

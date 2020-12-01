<template>
  <div class="guide-page">
<!--    <van-button type="primary"></van-button>-->
    <div class="torule" @click="showpopup" :style="`z-index: ${isShowBg0 ? '900' : '1001'}`"></div>
    <div class="swiper-tip"></div>
    <!--查看规则-->
    <div v-show="popup">
      <!--这里是要展示的内容层-->
      <div class="seerule">
        <div class="closerule" @click="closepopup"></div>
      </div>
      <!--这里是半透明背景层-->
      <div class="over"></div>
    </div>
    <div class="bg0" :style="`opacity: ${isShowBg0 ? '1' : '0'}`"></div>
  </div>
</template>

<script>
export default {
  name: 'guide',
  data () {
    return {
      popup: 0,
      isShowBg0: true
    }
  },
  methods: {
    // 打开活动规则页面
    showpopup () {
      this.$emit('disableSwip', false)
      this.popup = 1
    },
    // 关闭活动规则页面
    closepopup () {
      this.$emit('disableSwip', true)
      this.popup = 0
    }
  },
  mounted () {
    setTimeout(() => {
      this.isShowBg0 = false
    }, 2000)
  }
}
</script>

<style lang="scss" scoped>
.guide-page {
  background: gray;
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/imgs/bg1.jpg");
  background-size: 100% 100%;
  /*position: relative;*/
  .bg0{
    background-image: url("../../assets/imgs/bg0.jpg");
    background-size: 100% 100%;
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 1000;
    opacity: 1;
    transition: opacity 800ms linear;
  }
  .torule {
    background-image: url("../../assets/imgs/torule.png");
    width: 120px;
    height: 35px;
    background-size: 100% 100%;
    position: absolute;
    bottom: 46vh;
    margin-left: -60px;
    left: 50%;
    animation: torule-ani 1s linear infinite;
  }
  .swiper-tip {
    background-image: url("../../assets/imgs/bottom.png");
    width: 12vw;
    height: 12vw;
    position: absolute;
    bottom: 8vh;
    left: 50%;
    transform: translateX(-50%);
    background-size: 100% 100%;
    animation: swiper-tip-ani 1.5s linear infinite;
  }
  .seerule {
    position: absolute;
    height: 365px;
    width: 280px;
    border-radius: 0.25rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1100;
    background-image: url("../../assets/imgs/seerule.png");
    background-size: 100%;
    .closerule{
      position: absolute;
      left: 10px;
      top:10px;
      width: 20px;
      height: 20px;
      background-image: url("../../assets/imgs/closerule.png");
      background-size: 100%;
    }
  }
  .over {
    position: fixed;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    filter: alpha(opacity=80);
    top: 0;
    left: 0;
    z-index: 1060;
    background-color: #111111;
  }
}
@keyframes swiper-tip-ani {
  0% {
    bottom: 3vh;
    opacity: 1;
  }
  100% {
    bottom: 10vh;
    opacity: 0.8;
  }
}
@keyframes torule-ani {
  0% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>

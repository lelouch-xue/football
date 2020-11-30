<template>
  <div class="showbill-page">
    <div class="showjf" @click="showjf"></div>
    <!--积分榜-->
    <div v-show="popup3">
      <!--这里是要展示的内容层-->
      <div class="zlbg">
        <div class="closerule" @click="closepopup"></div>
        <div class="clscore">{{clscore}}分</div>
        <div class="mxscore">{{mxscore}}分</div>
      </div>
      <!--这里是半透明背景层-->
      <div class="over"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'showbill',
  data () {
    return {
      popup3: 0,
      clscore: 0,
      mxscore: 0
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      // axios('/api/role/score', {
      //   // axios('/api/dqdz/Rolelist', {
      //   params: {}
      // }).then(res => {
      //   if (res.data.code === '0') {
      //     this.clscore = res.data.data[0].allscore
      //     this.mxscore = res.data.data[1].allscore
      //   }
      // })
    },
    // 关闭活动规则页面
    closepopup () {
      this.popup3 = 0
    },
    showjf () {
      this.popup3 = 1
    }
  }
}
</script>

<style lang="scss" scoped>
.showbill-page {
  position: absolute;
  background: gray;
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/imgs/bill.jpg");
  background-size: 100% 100%;
  /*position: relative;*/
  .showjf{
    width: 75px;
    height: 35px;
    background-image: url("../../assets/imgs/jfbtn.png");
    background-size: 100% 100%;
    position: absolute;
    top:20px;
    right:20px;
    z-index: 1003;
  }
  .zlbg{
    position: absolute;
    height: 216px;
    width: 280px;
    border-radius: 0.25rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    background-image: url("../../assets/imgs/jfbg.png");
    background-size: 100%;
    z-index: 1010;
    .closerule{
      position: absolute;
      left: 10px;
      top:10px;
      width: 20px;
      height: 20px;
      background-image: url("../../assets/imgs/closerule.png");
      background-size: 100%;
    }
    .clscore{
      width: 50%;
      height: 50px;
      text-align: center;
      position: absolute;
      left:0;
      bottom: 5%;
      color: #3f3d3a;
      font-size: 20px;
      font-weight: 500;
    }
    .mxscore{
      width: 50%;
      height: 50px;
      text-align: center;
      position: absolute;
      left:50%;
      bottom: 5%;
      color: #3f3d3a;
      font-size: 20px;
      font-weight: 500;
    }
  }
}
</style>

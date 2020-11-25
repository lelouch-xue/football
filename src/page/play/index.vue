<template>
  <div class="play-page">
    <div class="football-bg"></div>
    <h1 style="position: absolute;color: white;top: 5px">角度 --- {{ angel }}</h1>
    <h1 style="position: absolute;color: white;top: 45px">力量 --- {{ liliang }}</h1>
    <van-button style="position: absolute;color: white;top: 95px" type="primary" @click="handleReset">重置</van-button>
    <section >
      <div class="football_field">
        <img ref="goal" id="mying" :src="require('../../assets/imgs/play/goal.png')" alt="">
        <!-- <div class="door-area">
          <div class="door-cell"></div>
          <div class="door-cell"></div>
          <div class="door-cell"></div>
          <div class="door-cell"></div>
          <div class="door-cell"></div>
          <div class="door-cell"></div>
        </div> -->
        <div ref="soccer" class="soccer"></div>
        <div class="soccer-shader"></div>
        <div class="soccer-virturl" v-hammer:swipe="handleSwipe"></div>

        <div id="box1" style="position: absolute;width: 10px;height:10px;background: red;color:white"></div>
        <div id="box2" style="position: absolute;width: 10px;height:10px;background: red;color:white"></div>
        <div id="box3" style="position: absolute;width: 10px;height:10px;background: red;color:white"></div>
        <div id="box4" style="position: absolute;width: 10px;height:10px;background: red;color:white"></div>
      </div>
    </section>
  </div>
</template>
<script>
import bezier from '@/utils/bezier'
import { analysis, generate, getAreaPointByPos, getOuterPointByPos } from '@/utils/index'
const actualwidth = document.body.clientWidth
const actualheight = document.body.clientHeight

export default {
  name: 'play',
  data () {
    return {
      timer: null,
      angel: '0',
      liliang: 0,
      // 直径
      diameter: 0,

      // 足球初始位置点
      initialPosX: 0,
      initialPosY: 0,

      goalLT: [0, 0],
      goalLB: [0, 0],
      goalRT: [0, 0],
      goalRB: [0, 0],

      // 门框宽高，底部距离
      goalwidth: 0,
      goalheight: 0,
      goalbottom: 0
    }
  },
  created () {
    console.log(actualwidth)
    console.log(actualheight)
  },
  mounted () {
    // 此处是为了适配点做准备
    this.diameter = actualwidth * 0.25
    const soccer = this.$refs.soccer
    const goal = this.$refs.goal
    soccer.style.width = `${this.diameter}px`
    soccer.style.height = `${this.diameter}px`
    soccer.style.transform = `translate(${this.diameter * -0.5}px, ${this.diameter * 0.5}px)`

    this.initialPosX = actualwidth * 0.5
    this.initialPosY = actualwidth * 0.25

    soccer.style.left = `${this.initialPosX}px`
    soccer.style.bottom = `${this.initialPosY}px`

    // 足球框宽 高 底
    this.goalwidth = actualwidth * 0.7
    this.goalheight = actualwidth * 0.5
    this.goalbottom = actualheight * 0.25

    goal.style.width = `${this.goalwidth}px`
    goal.style.height = `${this.goalheight}px`
    goal.style.bottom = `${this.goalbottom}px`

    this.goalLT = [actualwidth * 0.5 - this.goalwidth * 0.5, this.goalheight + this.goalbottom]
    this.goalLB = [actualwidth * 0.5 - this.goalwidth * 0.5, this.goalbottom]
    this.goalRT = [actualwidth * 0.5 + this.goalwidth * 0.5, this.goalheight + this.goalbottom]
    this.goalRB = [actualwidth * 0.5 + this.goalwidth * 0.5, this.goalbottom]
    console.log(this.goalLT, this.goalLB, this.goalRT, this.goalRB)

    goal.style.transform = `translateX(${this.goalwidth * -0.5}px)`
    goal.style.left = `${actualwidth * 0.5}px`

    document.getElementById('box1').style.left = `${this.goalLT[0]}px`
    document.getElementById('box1').style.bottom = `${this.goalLT[1]}px`
    document.getElementById('box1').innerText = this.goalLT

    document.getElementById('box2').style.left = `${this.goalLB[0]}px`
    document.getElementById('box2').style.bottom = `${this.goalLB[1]}px`
    document.getElementById('box2').innerText = this.goalLB

    document.getElementById('box3').style.left = `${this.goalRT[0]}px`
    document.getElementById('box3').style.bottom = `${this.goalRT[1]}px`
    document.getElementById('box3').innerText = this.goalRT

    document.getElementById('box4').style.left = `${this.goalRB[0]}px`
    document.getElementById('box4').style.bottom = `${this.goalRB[1]}px`
    document.getElementById('box4').innerText = this.goalRB

    // console.log(posLT, posLB, posMT, posMB, posRT, posRB)
  },
  methods: {
    handleClickReturnPrevPage () {
      this.$emit('touchable', true)
    },
    handleSwipe (evt) {
      console.log(evt)

      const initPox = [this.initialPosX, this.initialPosY]
      let target = [60, 200]

      // // 连个控制点
      let c1 = [135, 500]
      let c2 = [79, 500]
      // 通过这个分析方法，得出力量值跟方向
      // 此时应该知道得分和命中情况，
      const opt = analysis(evt)

      const res = generate(opt)
      // this.angel = res.posititon
      this.angel = `${opt.angle} --- ${Math.round(evt.angle) + 90} -- ${res.posititon}`
      if (res.posititon >= 1 && res.posititon <= 6) {
        target = getAreaPointByPos(actualwidth, this.goalwidth, this.goalheight, this.goalbottom, res.posititon)
      } else {
        target = getOuterPointByPos(actualwidth, this.goalwidth, this.goalheight, this.goalbottom, opt.angle, opt.strength, this.initialPosX, this.initialPosY, res.posititon)
      }

      this.liliang = `${opt.strength}   --- ${target}`

      c1 = [initPox[0] + (target[0] - initPox[0]) * 0.33, target[1] + 120]
      c2 = [initPox[0] + (target[0] - initPox[0]) * 0.66, target[1] + 120]

      console.log(initPox, c1, c2, target)
      if (this.$refs.soccer) {
        this.animation(bezier.getBezierPoints(15, initPox, c1, c2, target))
      }
    },
    animation (points) {
      const len = points.length
      console.log(len)
      let index = 0
      let size = 1
      const time = 50
      const soccer = this.$refs.soccer

      this.timer = setInterval(
        () => {
          if (index >= len - 1) {
            clearInterval(this.timer)
            // soccer.classList.remove('soccer-ani')
          }
          if (!soccer.classList.contains('soccer-ani')) {
            // soccer.classList.add('soccer-ani')
          }

          soccer.style.left = `${points[index][0]}px`
          soccer.style.bottom = `${points[index][1]}px`
          soccer.style.transform = `translate(${this.diameter * -0.5}px, ${this.diameter * 0.5}px) scale(${size})`
          index++

          if (size >= 0.12) size -= 0.1
        }, time
      )
    },
    handleReset () {
      const soccer = this.$refs.soccer
      soccer.style.left = `${this.initialPosX}px`
      soccer.style.bottom = `${this.initialPosY}px`
      soccer.style.transform = `translateX(${this.diameter * -0.5}px) scale(1)`
    }
  }
}
</script>

<style lang="scss" scoped>
.play-page {
  background: gray;
  width: 100vw;
  height: 100vh;
  position: relative;
  .football-bg {
    width: 100%;
    height: 100%;
    background-image: url("../../assets/imgs/play/play-bg.png");
    object-fit: cover;
    background-size:cover;
    background-position:center;
  }
  .football_field {
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 60vh;
      img {
        position: absolute;
        background-color: orange;
        // bottom: 25vh;
        // width: 70%;
        // margin: 0 15%;
      }

      .door-area {
        background-image: url("../../assets/imgs/play/goal.png");
        background-size: 100% 100%;
        position: absolute;
        bottom: 25vh;
        width: 70%;
        margin: 0 auto;
        height: 172px;
        left: 15%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;

        .door-cell {
          width: 30%;
          height: 48%;
          margin: 1%;
          background: coral;
        }
      }
      .soccer {
        // width: 30vw;
        // height: 30vw;
        background-image: url("../../assets/imgs/play/football.png");
        background-size: 100% 100%;
        position: absolute;
        bottom: 10vh;
        transform-origin: center;
        z-index: 1;
        transition: all 60ms;
      }
      .soccer-ani {
        animation: soccerRotate 3s linear infinite;
      }
      .soccer-shader {
        width: 50vw;
        height: 5vw;
        background-image: url("../../assets/imgs/play/shader.png");
        background-size: 100% 100%;
        position: absolute;
        bottom: 9vh;
        left: 47%;
        transform: translateX(-50%);
        transform-origin: center;
      }

      .soccer-virturl {
        // background-color: red;
        width: 30vw;
        height: 30vw;
        position: absolute;
        bottom: 10vh;
        left: 50%;
        transform: translateX(-50%);
        transform-origin: center;
        z-index: 1;
      }
  }

  @keyframes soccerRotate {
    from {
      transform: rotateZ(0);
    }
    to {
      transform: rotateZ(360deg);
    }
  }
}
</style>

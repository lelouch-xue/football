<template>
  <div class="play-page">
    <h1>角度 --- {{ angel }}</h1>
    <h1>力量 --- {{ liliang }}</h1>
    <div class="football-bg"></div>

    <section >
      <div class="football_field">
        <img :src="require('../../assets/imgs/play/goal.png')" alt="">
        <div class="door-area">
          <!-- <div class="door-cell"></div>
          <div class="door-cell"></div>
          <div class="door-cell"></div>
          <div class="door-cell"></div>
          <div class="door-cell"></div>
          <div class="door-cell"></div> -->
        </div>
        <div ref="soccer" class="soccer"></div>
        <div class="soccer-shader"></div>
        <div class="soccer-virturl" v-hammer:swipe="handleSwipe"></div>
      </div>
    </section>
  </div>
</template>
<script>
import bezier from '@/utils/bezier'
import { analysis } from '@/utils/index'
const actualwidth = document.body.clientWidth
const actualheight = document.body.clientHeight

export default {
  name: 'play',
  data () {
    return {
      timer: null,
      angel: '0',
      liliang: 0
    }
  },
  created () {
    console.log(actualwidth)
    console.log(actualheight)
  },
  methods: {
    handleClickReturnPrevPage () {
      this.$emit('touchable', true)
    },
    handleSwipe (evt) {
      console.log(evt)

      const p1 = [140, 60]
      const p2 = [60, 200]
      const c1 = [135, 500]
      const c2 = [79, 500]
      // 通过这个分析方法，得出力量值跟方向
      // 此时应该知道得分和命中情况，
      const { angle, strength } = analysis(evt)
      this.angel = angle
      this.liliang = strength
      // console.log(bezier.getBezierPoints(30, p1, c1, c2, p2))
      // // this.$refs.soccer.style.top = '30vh'
      if (this.$refs.soccer) {
        this.animation(bezier.getBezierPoints(15, p1, c1, c2, p2))
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
          console.log(`index -- ${index}`)
          console.log(`${points[index][0]} -- ${points[index][1]}`)
          soccer.style.left = `${points[index][0]}px`
          soccer.style.bottom = `${points[index][1]}px`
          soccer.style.transform = `scale(${size})`
          index++
          if (size >= 0.12) size -= 0.1
          // time += 3
        }, time
      )
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
        bottom: 25vh;
        width: 70%;
        margin: 0 15%;
      }
      .soccer {
        width: 30vw;
        height: 30vw;
        background-image: url("../../assets/imgs/play/football.png");
        background-size: 100% 100%;
        position: absolute;
        bottom: 10vh;
        left: 35vw;
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

  .door-area {
    // background: greenyellow;
    background-image: url("../../assets/imgs/play/goal.png");
    background-size: 100% 100%;
    // width: 50%;
    // height: auto;
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

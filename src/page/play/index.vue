<template>
  <div class="play-page">
    <div class="football-bg"></div>
    <h1 style="position: absolute; color: white; top: 5px">
      角度 --- {{ angel }}
    </h1>
    <h1 style="position: absolute; color: white; top: 45px">
      力量 --- {{ liliang }}
    </h1>
    <van-button
      style="position: absolute; color: white; top: 95px"
      type="primary"
      @click="handleReset"
      >重置</van-button
    >
    <h1 style="position: absolute; color: orange; top: 135px">
      得分 --- {{ myscore }} --次数 - {{ index }}
    </h1>
    <section>
      <div class="football_field">
        <img
          ref="goal"
          id="mying"
          :src="require('../../assets/imgs/play/goal.png')"
          alt=""
        />
        <!-- <div class="door-area">
          <div class="door-cell"></div>
          <div class="door-cell"></div>
          <div class="door-cell"></div>
          <div class="door-cell"></div>
          <div class="door-cell"></div>
          <div class="door-cell"></div>
        </div> -->
        <div class="soccer-shader"></div>
        <div ref="soccer" class="soccer">
          <div
            :class="
              isRotate
                ? Math.random() > 0.5
                  ? 'soccer-ani-L'
                  : 'soccer-ani-R'
                : ''
            "
            class="soccer-img"
          ></div>
        </div>

        <div class="soccer-virturl" v-hammer:swipe="handleSwipe"></div>

        <div
          id="box1"
          style="
            position: absolute;
            width: 10px;
            height: 10px;
            background: red;
            color: white;
          "
        ></div>
        <div
          id="box2"
          style="
            position: absolute;
            width: 10px;
            height: 10px;
            background: red;
            color: white;
          "
        ></div>
        <div
          id="box3"
          style="
            position: absolute;
            width: 10px;
            height: 10px;
            background: red;
            color: white;
          "
        ></div>
        <div
          id="box4"
          style="
            position: absolute;
            width: 10px;
            height: 10px;
            background: red;
            color: white;
          "
        ></div>
      </div>
    </section>
  </div>
</template>
<script>
import bezier from '@/utils/bezier'
import {
  analysis,
  generate,
  getAreaPointByPos,
  getOuterPointByPos,
  randomNum,
  toInt
} from '@/utils/index'
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
      goalbottom: 0,
      myscore: 0,
      index: 0,
      isRotate: false
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
    soccer.style.transform = `translate(${this.diameter * -0.5}px, ${
      this.diameter * 0.5
    }px)`

    this.initialPosX = actualwidth * 0.5
    this.initialPosY = actualwidth * 0.25

    soccer.style.left = `${this.initialPosX}px`
    soccer.style.bottom = `${this.initialPosY}px`

    // 足球框宽 高 底
    this.goalwidth = actualwidth * 0.6
    this.goalheight = this.goalwidth * 0.557
    this.goalbottom = actualheight * 0.28

    goal.style.width = `${this.goalwidth}px`
    goal.style.height = `${this.goalheight}px`
    goal.style.bottom = `${this.goalbottom}px`

    this.goalLT = toInt([
      actualwidth * 0.5 - this.goalwidth * 0.5,
      this.goalheight + this.goalbottom
    ])
    this.goalLB = toInt([
      actualwidth * 0.5 - this.goalwidth * 0.5,
      this.goalbottom
    ])
    this.goalRT = toInt([
      actualwidth * 0.5 + this.goalwidth * 0.5,
      this.goalheight + this.goalbottom
    ])
    this.goalRB = toInt([
      actualwidth * 0.5 + this.goalwidth * 0.5,
      this.goalbottom
    ])
    console.log(this.goalLT, this.goalLB, this.goalRT, this.goalRB)

    goal.style.transform = `translateX(${this.goalwidth * -0.5}px)`
    goal.style.left = `${actualwidth * 0.5}px`

    // 辅助点位置，正式可删
    document.getElementById('box1').style.left = `${this.goalLT[0]}px`
    document.getElementById('box1').style.bottom = `${this.goalLT[1]}px`
    document.getElementById('box1').innerText = this.goalLT.map((_) =>
      parseInt(_, 10)
    )

    document.getElementById('box2').style.left = `${this.goalLB[0]}px`
    document.getElementById('box2').style.bottom = `${this.goalLB[1]}px`
    document.getElementById('box2').innerText = this.goalLB.map((_) =>
      parseInt(_, 10)
    )

    document.getElementById('box3').style.left = `${this.goalRT[0]}px`
    document.getElementById('box3').style.bottom = `${this.goalRT[1]}px`
    document.getElementById('box3').innerText = this.goalRT.map((_) =>
      parseInt(_, 10)
    )

    document.getElementById('box4').style.left = `${this.goalRB[0]}px`
    document.getElementById('box4').style.bottom = `${this.goalRB[1]}px`
    document.getElementById('box4').innerText = this.goalRB.map((_) =>
      parseInt(_, 10)
    )

    // console.log(posLT, posLB, posMT, posMB, posRT, posRB)
  },
  methods: {
    handleClickReturnPrevPage () {
      this.$emit('touchable', true)
    },
    handleSwipe (evt) {
      console.log(evt)

      if (evt.angle > 20 || evt.angle < -160) return

      const initPox = [this.initialPosX, this.initialPosY]
      let target = [60, 200]

      // 通过这个分析方法，得出力量值跟方向
      // 此时应该知道得分和命中情况，
      const opt = analysis(evt)
      // 此方法会计算出得分情况及击中与否，位置等信息
      const res = generate(opt)
      // this.angel = res.posititon
      console.log(res)
      const { posititon, hit } = res
      // const hit = 2
      if (posititon >= 1 && posititon <= 6) {
        if (hit !== 2) {
          target = getAreaPointByPos(
            actualwidth,
            this.goalwidth,
            this.goalheight,
            this.goalbottom,
            posititon
          )
        } else {
          // 弹出位置模拟，这里只有一些，足够
          if (posititon === 1 || posititon === 2) {
            target = [
              actualwidth * 0.5 - this.goalwidth * 0.5,
              randomNum(this.goalbottom, this.goalbottom + this.goalheight)
            ]
          } else if (posititon === 3) {
            target = [
              randomNum(
                actualwidth * 0.5 - this.goalwidth * 0.5,
                actualwidth * 0.5 + this.goalwidth * 0.5
              ),
              this.goalbottom + this.goalheight
            ]
          } else if (posititon === 5 || posititon === 6) {
            target = [
              actualwidth * 0.5 + this.goalwidth * 0.5,
              randomNum(this.goalbottom, this.goalbottom + this.goalheight)
            ]
          } else {
            target = getAreaPointByPos(
              actualwidth,
              this.goalwidth,
              this.goalheight,
              this.goalbottom,
              posititon
            )
          }
        }
      } else {
        target = getOuterPointByPos(
          actualwidth,
          this.goalwidth,
          this.goalheight,
          this.goalbottom,
          opt.angle,
          opt.strength,
          this.initialPosX,
          this.initialPosY,
          posititon
        )
      }
      this.angel = `${opt.angle} --- ${
        Math.round(evt.angle) + 90
      } -- ${posititon}`
      this.liliang = `${opt.strength}   --- ${target}`

      // 连个控制点
      const c1 = toInt([
        initPox[0] + (target[0] - initPox[0]) * 0.33,
        target[1] + 40
      ])
      const c2 = toInt([
        initPox[0] + (target[0] - initPox[0]) * 0.66,
        target[1] + 60
      ])

      // console.log(initPox, c1, c2, target)
      if (this.$refs.soccer) {
        this.animation(
          bezier.getBezierPoints(15, initPox, c1, c2, target),
          res
        )
      }
    },
    animation (points, data) {
      this.isRotate = true
      const len = points.length
      console.log(len)
      let index = 0
      let size = 1
      const time = 25
      const soccer = this.$refs.soccer
      console.log(points)
      this.timer = setInterval(() => {
        if (index > len - 1) {
          clearInterval(this.timer)
          // soccer.classList.remove('soccer-ani')

          const { hit } = data
          const point = points[points.length - 1]

          if (hit === 1) {
            // 弧形动画结束，模拟扑出动画
            this.putoutAni(point, data, size)
          } else if (hit === 2) {
            // 弧形动画结束，模拟门框弹出动画
            this.frameAni(point, data, size)
          } else {
            this.triggerEnd(data)
          }
          return
        }
        if (!soccer.classList.contains('soccer-ani')) {
          // soccer.classList.add('soccer-ani')
        }

        // 踢球开始
        this.triggerStart(data)
        soccer.style.left = `${points[index][0]}px`
        soccer.style.bottom = `${points[index][1]}px`
        soccer.style.transform = `translate(${this.diameter * -0.5}px, ${
          this.diameter * 0.5
        }px) scale(${size})`
        index++

        if (size >= 0.26) size -= 0.05
      }, time)
    },
    handleReset () {
      const soccer = this.$refs.soccer
      soccer.style.display = 'block'
      soccer.style.left = `${this.initialPosX}px`
      soccer.style.bottom = `${this.initialPosY}px`
      soccer.style.transform = `translate(${this.diameter * -0.5}px, ${
        this.diameter * 0.5
      }px) scale(1)`
      console.log('reset')
    },
    putoutAni (point, data, size) {
      // 扑出动画
      let timer = null

      let _bottomPos = []

      let _low = false
      if (point[1] - this.goalbottom < 50) _low = false
      else _low = true

      if (_low) {
        _bottomPos = toInt([
          randomNum(
            point[0] + this.goalwidth * -0.2,
            point[0] + this.goalwidth * 0.2
          ),
          this.goalbottom - randomNum(5, 10)
        ])
      } else {
        _bottomPos = toInt([
          randomNum(
            point[0] + this.goalwidth * -0.1,
            point[0] + this.goalwidth * -0.1
          ),
          this.goalbottom - randomNum(5, 10)
        ])
      }
      console.log(point, this.goalbottom, _bottomPos)
      const _cpos = toInt([
        (_bottomPos[0] + point[0]) * 0.5,
        point[1] + randomNum(-7, 10)
      ])
      const _step =
        Math.round(((point[1] - _bottomPos[1]) / this.goalheight) * 6) + 3
      console.log(`_step -- ${_step}`)
      const _points = bezier.getBezierPoints(_step, point, _cpos, _bottomPos)
      const len = _points.length

      const time = 30
      const soccer = this.$refs.soccer
      let index = 0

      timer = setInterval(() => {
        if (index > len - 1) {
          clearInterval(timer)
          this.triggerEnd(data)
          // soccer.classList.remove('soccer-ani')
          return
        }
        if (!soccer.classList.contains('soccer-ani')) {
          // soccer.classList.add('soccer-ani')
        }

        // 踢球开始
        this.triggerStart(data)
        soccer.style.left = `${_points[index][0]}px`
        soccer.style.bottom = `${_points[index][1]}px`
        soccer.style.transform = `translate(${this.diameter * -0.5}px, ${
          this.diameter * 0.5
        }px) scale(${size})`
        index++
      }, time)
    },
    frameAni (point, data, size) {
      // 弹框动画

      let timer = null

      let _bottomPos = []

      const { posititon } = data

      if (posititon === 1 || posititon === 2) {
        _bottomPos = toInt([
          randomNum(
            point[0] - this.goalwidth * 0.2,
            point[0] - this.goalwidth * 0.4
          ),
          point[1] + randomNum(10, 30)
        ])
      } else if (posititon === 3) {
        _bottomPos = toInt([
          randomNum(
            actualwidth * 0.5 - this.goalwidth * 0.7,
            actualwidth * 0.5 + this.goalwidth * 0.7
          ),
          this.goalbottom + this.goalheight + randomNum(30, 70)
        ])
      } else if (posititon === 5 || posititon === 6) {
        _bottomPos = toInt([
          randomNum(
            point[0] + this.goalwidth * 0.2,
            point[0] + this.goalwidth * 0.4
          ),
          point[1] + randomNum(10, 30)
        ])
      }

      console.log(point, this.goalbottom, _bottomPos)
      const _cpos = toInt([
        (_bottomPos[0] + point[0]) * 0.5,
        point[1] + randomNum(-7, 10)
      ])

      const _points = bezier.getBezierPoints(6, point, _cpos, _bottomPos)
      const len = _points.length

      const time = 25
      const soccer = this.$refs.soccer
      let index = 0

      timer = setInterval(() => {
        if (index > len - 1) {
          clearInterval(timer)
          soccer.style.display = 'none'
          this.triggerEnd(data)
          // soccer.classList.remove('soccer-ani')
          return
        }
        if (!soccer.classList.contains('soccer-ani')) {
          // soccer.classList.add('soccer-ani')
        }

        // 踢球开始
        this.triggerStart(data)
        soccer.style.left = `${_points[index][0]}px`
        soccer.style.bottom = `${_points[index][1]}px`
        soccer.style.transform = `translate(${this.diameter * -0.5}px, ${
          this.diameter * 0.5
        }px) scale(${size})`
        index++
      }, time)
    },
    // 滑动成绩触发,
    // 滑动动画开始
    // 此时已有得分，位置，等信息
    triggerStart (data) {},

    // 足球动画结束,
    // 滑动动画开始
    // 得分，位置，等信息同上
    triggerEnd (data) {
      console.log(data)
      this.isRotate = false
      this.myscore += data.score
      this.index++
      // setTimeout(() => {
      //   this.handleReset()
      // }, 1000)
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
    background-size: cover;
    background-position: center;
  }
  .football_field {
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 60vh;
    img {
      position: absolute;
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
      // background-image: url("../../assets/imgs/play/football.png");
      // background-size: 100% 100%;
      position: absolute;
      bottom: 10vh;
      transform-origin: center;
      z-index: 1;
      transition: all 60ms;

      .soccer-img {
        background-image: url("../../assets/imgs/play/football.png");
        background-size: 100% 100%;
        transform-origin: center;
        width: 100%;
        height: 100%;
      }
    }
    .soccer-ani-R {
      animation: soccerRotateR 5s linear infinite;
    }

    .soccer-ani-L {
      animation: soccerRotateL 5s linear infinite;
    }
    .soccer-shader {
      width: 50vw;
      height: 5vw;
      background-image: url("../../assets/imgs/play/shader.png");
      background-size: 100% 100%;
      position: absolute;
      bottom: 6vh;
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

  @keyframes soccerRotateR {
    from {
      transform: rotateZ(0);
    }
    to {
      transform: rotateZ(360deg);
    }
  }

  @keyframes soccerRotateL {
    from {
      transform: rotateZ(0);
    }
    to {
      transform: rotateZ(-360deg);
    }
  }
}
</style>

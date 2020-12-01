<template>
  <div class="play-page">
    <router-link class="next" to="/showbillpage"></router-link>
<!--    <div @click="showbill"></div>-->
    <div class="lawn">
<!--      <div class="goal"></div>-->
      <div class="scoreboard">
        <div :class="'bodyStyle '+(isPlay?'play':'')">
          <div class="container">
            <ul class="flip secondPlay" v-for="p in [0,1]" :key="p">
              <li :class="(activeNum[p]===0?'':'before')">
                <a href="#">
                  <div class="up">
                    <div class="shadow"></div>
                    <div class="inn">0</div>
                  </div>
                  <div class="down">
                    <div class="shadow"></div>
                    <div class="inn">0</div>
                  </div>
                </a>
              </li>
              <li :class="(activeNum[p]!==0?'active':'')">
                <a href="#">
                  <div class="up">
                    <div class="shadow"></div>
                    <div class="inn">{{activeNum[p]}}</div>
                  </div>
                  <div class="down">
                    <div class="shadow"></div>
                    <div class="inn">{{activeNum[p]}}</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="smallf">
        <div v-for="num in smallnum">
          <div :id="num" class="smallfb"></div>
<!--          <img src="../../assets/imgs/small-f.png">-->
        </div>
      </div>
    </div>
    <!--提示中奖-->
    <div v-show="popup">
      <!--这里是要展示的内容层-->
      <div class="win">
        <div class="closerule" @click="closepopup"></div>
        <div class="submit" @click="closepopup"></div>
      </div>
      <!--这里是半透明背景层-->
      <div class="over"></div>
    </div>
    <div class="football-bg"></div>
    <section>
      <div class="football_field">
        <div
          ref="goal"
          class="goal-area"
        >
          <div
            class="goal-area-score"
            :style="`opacity: ${isShowScore ? '0.7' : '0'}`"
          >
          </div>
        </div>
        <div class="soccer-shader"></div>
        <div ref="glove" class="glove-area">
        </div>
        <div ref="soccer" class="soccer">
          <div
            ref="ball"
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

        <div ref='shader' class="soccer-shader"></div>
        <template v-if="isEnd">
          <div v-if="isHit" class="goal-hit hit-ani" :class="{'hit-ani': isEnd}"></div>
          <div v-else class="miss-hit hit-ani" :class="{'hit-ani': isEnd}"></div>
        </template>
        <div ref="virturl" class="soccer-virturl" v-hammer:swipe="handleSwipe">
        </div>
      </div>
    </section>
    <div class="bg4" v-if="playover">
      <div class="overbg"></div>
      <div class="playover"></div>
    </div>
    <!--重玩还是助力-->
    <div v-show="popup1">
      <!--这里是要展示的内容层-->
      <div class="zlbg">
        <div class="closerule" @click="closepopup"></div>
        <div class="info">您为{{roleName}}助力{{myscore}}分！</div>
        <div class="reset" @click="reset"></div>
        <div class="zlbtn" @click="postScore"></div>
      </div>
      <!--这里是半透明背景层-->
      <div class="over"></div>
    </div>
<!--    <router-view></router-view>-->
    <div class="sounds-area">
      <audio ref="success" src="../../assets/sounds/goal.mp3"></audio>
      <audio ref="fail" src="../../assets/sounds/miss.mp3"></audio>
      <audio ref="hit" src="../../assets/sounds/hit.wav"></audio>
    </div>
  </div>
</template>
<script>
import bezier from '@/utils/bezier'
import axios from 'axios'
import {
  analysis,
  generate,
  getAreaPointByPos,
  getOuterPointByPos,
  randomNum,
  toInt
} from '@/utils/index'
import { Dialog } from 'vant'
const actualwidth = document.body.clientWidth
const actualheight = document.body.clientHeight

export default {
  name: 'clock',
  data () {
    return {
      activeNum: [0, 0],
      isPlay: false,
      // 每次玩10局
      smallnum: 10,
      playover: false,
      popup: 0,
      popup1: 0,
      roleId: -1,
      userId: -1,
      roleName: '梅西',

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
      isRotate: false,
      isHit: false,
      isEnd: false,
      isShowScore: true
    }
  },
  methods: {
    // 关闭活动规则页面
    closepopup () {
      this.playover = false
      this.popup = 0
      this.myscore = 0
    },
    // 打开海报
    // showbill () {
    //   this.$router.push('/showbillpage')
    // },
    handleClickReturnPrevPage () {
      this.$emit('touchable', true)
    },
    showHitEffect (state) {
      this.isEnd = true
      this.isHit = state
      setTimeout(() => {
        this.isHit = false
        this.isEnd = false
      }, 1000)
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
          bezier.getBezierPoints(10, initPox, c1, c2, target),
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

      // 踢球开始
      this.triggerStart(data)
      this.playSound(3)
      this.timer = setInterval(() => {
        if (index > len - 1) {
          clearInterval(this.timer)
          // soccer.classList.remove('soccer-ani')

          const { hit, posititon } = data
          const point = points[points.length - 1]
          // const hit = 1
          if (hit === 1) {
            // 弧形动画结束，模拟扑出动画
            this.showGlove(point, posititon)
            this.triggerEnd(data)
            this.playSound(2)
          } else if (hit === 2) {
            // 弧形动画结束，模拟门框弹出动画
            this.frameAni(point, data, size)
            this.playSound(2)
          } else {
            this.triggerEnd(data)
            if (hit === -1) {
              this.playSound(2)
            } else {
              this.playSound(1)
              this.putoutAni(point, data, size)
            }
          }
          this.showHitEffect(hit === 0)

          return
        }
        // if (!soccer.classList.contains('soccer-ani')) {
        //   // soccer.classList.add('soccer-ani')
        // }

        soccer.style.transform = `translate(${this.diameter * -0.5 + points[index][0]}px, ${
          this.diameter * 0.5 - points[index][1]
        }px) scale(${size})`

        index++

        if (size >= 0.26) size -= 0.08
      }, time)

      // 阴影控制
      const shader = this.$refs.shader
      shader.style.bottom = `${this.initialPosY - this.diameter * 0.5 + 40}px`
      shader.style.left = `${this.initialPosX - 10}px`
      shader.style.transform = 'translateX(-50%) scaleX(0)'
      shader.style.opacity = 0
      shader.style.transition = 'all 160ms linear'
    },
    handleReset () {
      const soccer = this.$refs.soccer
      soccer.style.display = 'block'
      soccer.style.transform = `translate(${this.diameter * -0.5 + this.initialPosX}px, ${
      this.diameter * 0.5 - this.initialPosY
      }px) scale(1)`

      soccer.style.left = `0px`
      soccer.style.bottom = `0px`

      const shader = this.$refs.shader
      shader.style.bottom = `${this.initialPosY - this.diameter * 0.5 + 10}px`
      shader.style.left = `${this.initialPosX - 10}px`
      shader.style.opacity = 1
      shader.style.transform = 'translateX(-50%) scaleX(1)'
      shader.style.transition = 'all 0ms linear'
      console.log('reset')
    },
    putoutAni (point, data, size) {
      // 扑出动画
      let timer = null

      let _bottomPos = []

      // let _low = false
      // if (point[1] - this.goalbottom < 50) _low = false
      // else _low = true

      _bottomPos = toInt([
        randomNum(
          point[0] + this.goalwidth * -0.05,
          point[0] + this.goalwidth * 0.05
        ),
        this.goalbottom + 5
      ])
      console.log(point, this.goalbottom, _bottomPos)
      const _cpos = toInt([
        (_bottomPos[0] + point[0]) * 0.5,
        point[1] + randomNum(-5, 5)
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
          // this.triggerEnd(data)
          return
        }

        soccer.style.transform = `translate(${this.diameter * -0.5 + _points[index][0]}px, ${
          this.diameter * 0.5 - _points[index][1]
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
            actualwidth * 0.5 - this.goalwidth * 0.2,
            actualwidth * 0.5 + this.goalwidth * 0.2
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
          return
        }

        soccer.style.transform = `translate(${this.diameter * -0.5 + _points[index][0]}px, ${
          this.diameter * 0.5 - _points[index][1]
        }px) scale(${size})`
        index++
      }, time)
    },

    showGlove (position, area) {
      const glove = this.$refs.glove
      glove.style.display = 'block'
      glove.style.width = `${this.diameter}px`
      glove.style.height = `${this.diameter}px`
      let rotate = 0
      if (area === 1 || area === 2) { rotate = -45 } else if (area === 3 || area === 4) { rotate = 0 } else if (area === 5 || area === 6) { rotate = 45 }
      glove.style.transform = `translate(${this.diameter * -0.5 + position[0]}px, ${
          this.diameter * 0.5 - position[1]}px) scale(0.35) rotate(${rotate}deg)`
      setTimeout(() => {
        glove.style.display = 'none'
      }, 1200)
    },
    // 滑动成绩触发,
    // 滑动动画开始
    // 此时已有得分，位置，等信息
    triggerStart (data) {},
    // 加分
    addScore (num) {
      const s = parseInt(num / 10 % 10)
      const g = num % 10
      this.activeNum = [s, g]
      this.isPlay = false
      this.isPlay = true
      this.smallnum--
    },
    // 足球动画结束,
    // 滑动动画开始
    // 得分，位置，等信息同上
    triggerEnd (data) {
      this.isRotate = false
      this.myscore += data.score
      this.index++
      this.addScore(this.myscore)
      // if (this.roleId !== -1 && this.userId !== -1 && this.todayPyayCount !== 11) {
      //   // 将踢球分数传给接口
      //   this.postScore()
      // } else {
      //   this.addScore(this.myscore)
      // }
      setTimeout(() => {
        this.handleReset()
        if (this.smallnum === 0) {
          // 游戏结束
          this.playover = true
          if (this.roleId !== -1 && this.userId !== -1 && this.todayPyayCount !== 1) {
            this.popup1 = 1
            // 将踢球分数传给接口
            // this.postScore()
          }
        }
      }, 1000)
    },
    reset () {
      this.playover = false
      this.popup1 = 0
      this.myscore = 0
      this.smallnum = 11
      this.addScore(0)
    },
    // 将踢球分数传给后台
    postScore () {
      axios({
        // url: '/api/score/add',
        url: 'http://123.56.2.234/c5_201706/activitiesApi.php/dqdz/Scoresubmit',
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data:"roleId=" + this.roleId + '&' + "userId=" + this.userId + '&' + "score=" + this.myscore
      }).then(res => {
        this.popup1 = 0
        if (res.data.code === '1') {
          // 记分牌累计分数
          // this.addScore(this.myscore)
          if (res.data.isWin === 1) {
            this.popup = 1
          }
        } else {
          Dialog.alert({
            message: res.data.msg
          }).then(() => {
            // on close
          })
        }
      })
    },
    playSound (state) {
      const success = this.$refs.success
      const fail = this.$refs.fail
      const hit = this.$refs.hit

      switch (state) {
        case 1:
          success.play()
          break
        case 2:
          fail.play()
          break
        case 3:
          hit.play()
          break
      }
    }
  },
  created () {
    // const id = 1
    // const aa = id * 3 + 2
    // setTimeout(() => {
    //   this.activeNum = [parseInt(aa), parseInt(aa)]
    //   this.isPlay = false
    //   this.isPlay = true
    // }, 500)
    this.roleId = this.$route.params.roleId
    this.userId = this.$route.params.userId
    this.todayPyayCount = this.$route.params.todayPyayCount
    if (this.roleId === 2) {
      this.roleName = '梅西'
    } else if (this.roleId === 1) {
      this.roleName = 'C罗'
    }
  },
  mounted () {
    // 此处是为了适配点做准备
    this.diameter = actualwidth * 0.25
    this.initialPosX = actualwidth * 0.5
    this.initialPosY = actualwidth * 0.5

    const soccer = this.$refs.soccer
    const goal = this.$refs.goal
    soccer.style.width = `${this.diameter}px`
    soccer.style.height = `${this.diameter}px`
    soccer.style.transform = `translate(${this.diameter * -0.5 + this.initialPosX}px, ${
      this.diameter * 0.5 - this.initialPosY
    }px)`
    // soccer.style.left = `${this.initialPosX}px`
    // soccer.style.bottom = `${this.initialPosY}px`
    soccer.style.left = '0px'
    soccer.style.bottom = '0px'

    const virturl = this.$refs.virturl
    virturl.style.width = `${this.diameter}px`
    virturl.style.height = `${this.diameter}px`
    virturl.style.transform = `translate(${this.diameter * -0.5}px, ${
      this.diameter * 0.5
    }px)`
    virturl.style.left = `${this.initialPosX}px`
    virturl.style.bottom = `${this.initialPosY}px`

    const shader = this.$refs.shader
    shader.style.bottom = `${this.initialPosY - this.diameter * 0.5 + 10}px`
    shader.style.left = `${this.initialPosX - 10}px`

    // 足球框宽 高 底
    this.goalwidth = actualwidth * 0.8
    this.goalheight = this.goalwidth * 0.557
    this.goalbottom = actualheight * 0.4

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

    setTimeout(() => {
      this.isShowScore = false
    }, 2500)
  }
}
</script>

<style lang="scss" scoped>
.play-page{
  position: relative;
  background: gray;
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/imgs/bg3.jpg");
  background-size: 100% 100%;
  position: relative;
  .next{
    width: 75px;
    height: 35px;
    background-image: url("../../assets/imgs/next.png");
    background-size: 100% 100%;
    position: absolute;
    top:20px;
    right:20px;
    z-index: 1003;
  }
  .lawn {
    background: gray;
    width: 100vw;
    height: 43vh;
    background-image: url("../../assets/imgs/bg3-1.jpg");
    background-size: 100% 100%;
    position: absolute;
    bottom: 0;
    .goal{
      background-image: url("../../assets/imgs/goal.png");
      background-size: 100% 100%;
      width: 300px;
      height: 180px;
      position: absolute;
      bottom: 90%;
      left: 50%;
      margin-left: -150px;
      box-shadow: 0 -4px 50px rgba(255, 255, 255, 0.8);
      z-index: 1000;
    }
    .scoreboard{
      background-image: url("../../assets/imgs/scoreboard.png");
      background-size: 100% 100%;
      width: 80px;
      height: 80px;
      position: absolute;
      bottom: 90%;
      left: 50%;
      margin-left: -40px;
      z-index: 999;
      margin-bottom: 180px;
    }
    .bigf{
      width: 100px;
      height: 100px;
      position: absolute;
      bottom: 45%;
      left:50%;
      margin-left: -50px;
      img{
        width: 100%;
        z-index: 1000;
        position: absolute;
      }
      .fshade{
        width: 80px;
        height: 10px;
        border-radius: 5px;
        background: none;
        box-shadow: 0px 10px 10px #000;
        position: absolute;
        bottom: 0px;
        z-index: 999;
      }
    }
    .smallf{
      border:1px solid rgba(255, 255, 255, 0.4);
      width: 280px;
      height: 24px;
      position: absolute;
      bottom: 10%;
      left: 50%;
      margin-left: -140px;
      div{
        width: 10%;
        float: left;
        text-align: center;
        .smallfb{
          background-image: url("../../assets/imgs/small-f.png");
          background-size: 100% 100%;
          width: 60%;
          height: 16px;
          margin-top:15%;
          margin-left: 20%;
        }
      }
    }
  }
  .zlbg{
    position: absolute;
    height: 140px;
    width: 280px;
    border-radius: 0.25rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    background-image: url("../../assets/imgs/zlbg.png");
    background-size: 100%;
    z-index: 1010;
    .info{
      color:#3f3d3a;
      font-size: 20px;
      text-align: center;
      margin-top:30px;
      font-weight: 500;
    }
    .reset{
      width: 85px;
      height: 35px;
      background-image: url("../../assets/imgs/reset.png");
      background-size: 100% 100%;
      position: absolute;
      left: 30%;
      top: 60%;
      margin-left: -45px;
    }
    .zlbtn{
      width: 85px;
      height: 35px;
      background-image: url("../../assets/imgs/zlbtn.png");
      background-size: 100% 100%;
      position: absolute;
      left: 70%;
      top: 60%;
      margin-left: -45px;
    }
  }
  .win {
    position: absolute;
    height: 300px;
    width: 240px;
    border-radius: 0.25rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1020;
    background-image: url("../../assets/imgs/win.png");
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
    .submit{
      width: 85px;
      height: 30px;
      background-image: url("../../assets/imgs/goon.png");
      background-size: 100% 100%;
      position: absolute;
      left: 50%;
      top: 73%;
      margin-left: -45px;
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
    z-index: 999;
    background-color: #111111;
  }
  .bg4{
    position: absolute;
    width: 100vw;
    height: 100vh;
    .playover{
      background-image: url("../../assets/imgs/playover.png");
      width: 100vw;
      height: 40vh;
      background-size: 100% 100%;
      position: absolute;
      top:20%;
      z-index: 1002;
    }
    .overbg {
      background-image: url("../../assets/imgs/bg4.png");
      width: 100vw;
      height: 100vh;
      background-size: 100% 100%;
      opacity: 0.6;
      position: absolute;
      z-index: 1001;
      animation: lamlight 2s linear infinite;
    }
  }
}
/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  cursor: pointer;
  text-decoration: none;
  color: #fff;
}

a:hover {
  color: #fff;
}

ul {
  list-style: none
}

/* Main */

html, body {
  min-height: 100%;
}

/* Skeleton */

ul.flip {
  position: relative;
  float: left;
  margin: 23px 0px 0px;
  width: 50%;
  height: 60px;
  font-size: 40px;
  font-weight: bold;
  line-height: 60px;
}

ul.flip li {
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

}

ul.flip li:first-child {
  z-index: 2;
}

ul.flip li a {
  display: block;
  height: 100%;
}

ul.flip li a div {
  z-index: 1;
  position: absolute;
  left: 0;
  width: 100%;
  height: 50%;
  overflow: hidden;
}

ul.flip li a div .shadow {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
}

ul.flip li a div.up {
  transform-origin: 50% 100%;
  top: 0;
}

ul.flip li a div.up:after {
  content: "";
  position: absolute;
  top: 29px;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 1px;
}

ul.flip li a div.down {
  transform-origin: 50% 0%;
  bottom: 0;
}

ul.flip li a div div.inn {
  position: absolute;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 200%;
  color: #fff;
  text-align: center;
  /*background-color: red;*/
  background-image: url("../../assets/imgs/sb-bg.png");
  background-size: 100% 100%;
}

ul.flip li a div.up div.inn {
  top: 0;

}

ul.flip li a div.down div.inn {
  bottom: 0;
}

/* PLAY */

div.play ul li.before {
  z-index: 3;
}

div.play ul li.active {
  animation: asd .3s .3s linear both;
  z-index: 2;
}

@keyframes asd {
  0% {
    z-index: 2;
  }
  5% {
    z-index: 4;
  }
  100% {
    z-index: 4;
  }
}

div.play ul li.active .down {
  z-index: 2;
  animation: turn .3s .3s linear both;
}

@keyframes turn {
  0% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(0deg);
  }
}

div.play ul li.before .up {
  z-index: 2;
  animation: turn2 .3s linear both;
}

@keyframes turn2 {
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(-90deg);
  }
}

@keyframes show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes hide {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.football_field {
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 60vh;
    .goal-area {
      position: absolute;
      background-image: url('../../assets/imgs/play/goal.png');
      background-size: 100% 100%;

      .goal-area-score {
        background-image: url('../../assets/imgs/play/score.png');
        background-size: 100% 100%;
        // width: 100%;
        // height: 100%;
        // margin: 10px 10px 0;
        opacity: 0.7;
        transition: opacity 800ms linear;
        position: absolute;
        left: 7px;
        right: 7px;
        top: 6px;
        bottom: 0;
      }
    }
    .glove-area {
      background-image: url("../../assets/imgs/play/glove.png");
      background-size: 100% 100%;
      transform-origin: center;
      // width: 10vw;
      // height: 10vw;
      position: absolute;
      display: none;
      bottom: 0;
      left: 0;
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
        // position: absolute;
        // left: 50%;
        // top: 50%;
        // transform: translate(-50%, -50%);
        transition: all 50ms;
      }
    }
    .soccer-ani-R {
      animation: soccerRotateR 5s linear infinite;
    }

    .soccer-ani-L {
      animation: soccerRotateL 5s linear infinite;
    }
    .soccer-shader {
      width: 2.13333rem;
      height: 0.26667rem;
      border-radius: 0.13333rem;
      background: none;
      box-shadow: 0 0.26667rem 0.26667rem #000;
      position: absolute;
      transform: translateX(-50%) scaleX(1);
      opacity: 1;
      transition: all 150ms linear;
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
      z-index: 10;
    }

    .goal-hit {
      background-image: url("../../assets/imgs/play/goal_hit.png");
      background-size: 100% 100%;
      transform-origin: center;
      width: 100vw;
      height: 20vw;
      position: absolute;
      bottom: 42vh;
      z-index: 10;
    }

    .miss-hit {
      background-image: url("../../assets/imgs/play/miss_hit.png");
      background-size: 100% 100%;
      transform-origin: center;
      width: 100vw;
      height: 20vw;
      position: absolute;
      bottom: 42vh;
      z-index: 10;
    }
    .hit-ani {
      animation: bounceIn 0.3s linear 1 alternate forwards;
    }
    .sounds-area {
      display: none;
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
@keyframes lamlight {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 0.3;
  }
}

@keyframes bounceIn{
  from, 20%, 40%, 60%, 80%, to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }
  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }
  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }
  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9);
  }
  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }
  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97);
  }
  to {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
</style>

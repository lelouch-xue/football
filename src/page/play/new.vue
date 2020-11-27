<template>
  <div class="play-page">
    <div class="next" @click="showbill"></div>
    <div class="lawn">
      <div class="goal"></div>
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
      <div class="bigf">
        <div class="fshade"></div>
        <img src="../../assets/imgs/big-f.png" @click="seewin">
      </div>
      <div class="smallf">
        <div v-for="num in smallnum">
          <img :id="num" src="../../assets/imgs/small-f.png">
        </div>
      </div>
    </div>
    <!--提示中奖-->
    <div v-show="popup">
      <!--这里是要展示的内容层-->
      <div class="win">
        <div class="closerule" @click="closepopup"></div>
        <div class="submit" @click="submit"></div>
      </div>
      <!--这里是半透明背景层-->
      <div class="over"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'clock',
  data () {
    return {
      activeNum: [0, 0],
      isPlay: false,
      smallnum: 10,
      popup: 0
    }
  },
  methods: {
    // 中奖
    seewin () {
      this.popup = 1
    },
    // 关闭活动规则页面
    closepopup () {
      this.popup = 0
    },
    // 提交用户信息
    submit () {
      console.log('s')
    },
    showbill () {
      console.log('s')
    }
  },
  created () {
    const id = 1
    const aa = id * 3 + 2
    setTimeout(() => {
      this.activeNum = [parseInt(aa), parseInt(aa)]
      this.isPlay = false
      this.isPlay = true
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
.play-page{
  position: relative;
  background: gray;
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/imgs/bg3.png");
  background-size: 100% 100%;
  .next{
    width: 75px;
    height: 35px;
    background-image: url("../../assets/imgs/next.png");
    background-size: 100% 100%;
    position: absolute;
    top:20px;
    right:20px;
  }
  .lawn {
    background: gray;
    width: 100vw;
    height: 43vh;
    background-image: url("../../assets/imgs/bg3-1.png");
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
        img{
          width: 60%;
          margin-top:15%;
        }
      }
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
    z-index: 1000;
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
  width: 40px;
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
</style>

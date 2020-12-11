<template>
  <div class="role-page">
    <div class="return" @click="toGuide"></div>
<!--    <div class="next" @click="toplay"></div>-->
    <div class="roles">
      <div class="fbimg"></div>
      <div class="mx-abtn" v-if="isMx" @click="setrole(mxid)"></div>
      <div class="mxbtn" v-if="!isMx" @click="setrole(mxid)"></div>
      <div class="clbtn" v-if="isMx" @click="setrole(clid)"></div>
      <div class="cl-abtn" v-if="!isMx" @click="setrole(clid)"></div>
    </div>
    <div class="showjf" @click="showjf"></div>
    <!--积分榜-->
    <div v-show="popup3">
      <!--这里是要展示的内容层-->
      <div class="zlbg">
        <div class="closerule" @click="closepopup"></div>
        <div class="clscore">{{clscore}}分</div>
        <div class="mxscore">{{mxscore}}分</div>
        <div class="vantRow thvant">
          <div class="col1">名次</div>
          <div class="col2">昵称</div>
          <div class="col3">手机号</div>
          <div class="col4">分数</div>
        </div>
        <section class="rank-list-area">
          <div class="rank-list-wraper">
            <div class="vantRow" v-for="(item, index) in rankList" :key="item.userOrder">
              <div class="col1">
                <div :style="`background-color: ${ index === 0 ? '#ff9900': index === 1 ? '#a59d92': index ===2 ? '#b7868b': '#636363'}`">{{item.userOrder}}</div>
              </div>
              <div class="col2">{{item.userName?item.userName:'--'}}</div>
              <div class="col3">{{item.mobile}}</div>
              <div class="col4">
                <div>{{item.score}}</div>
              </div>
            </div>
          </div>

        </section>
      </div>
      <!--这里是半透明背景层-->
      <div class="over"></div>
    </div>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import axios from 'axios'
import { Dialog } from 'vant'

export default {
  name: 'role',

  data () {
    return {
      isMx: true,
      // popup: 0,
      // popup1: 0,
      mxid: 2,
      clid: 1,
      // roleId: -1,
      // userId: -1,
      popup3: 0,
      clscore: 0,
      mxscore: 0,
      rankList: []
    }
  },
  created () {
    this.init()
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
  methods: {
    init () {
      // axios('/api/role/list', {
      axios('https://interact.5club.cctv.cn/hudong/api.php/dqdz/Rolelist', {
        params: {}
      }).then(res => {
        if (res.data.code !== '1') {
          Dialog.alert({
            message: res.data.msg
          }).then(() => {
            // on close
          })
        } else {
          this.clscore = res.data.data[1].countScore
          this.mxscore = res.data.data[0].countScore
        }
      })
    },
    // 选择角色
    setrole (roleid) {
      // this.roleId = roleid
      if (roleid === this.mxid) {
        this.isMx = true
      } else if (parseInt(roleid) === parseInt(this.clid)) {
        this.isMx = false
      }
      this.$emit('toplay', 2, {
        roleId: roleid
        // userId: -1,
        // todayPyayCount: 11
      })
      // this.popup = 1
    },
    toGuide () {
      this.$emit('touchable')
    },
    // 关闭活动规则页面
    closepopup () {
      this.popup3 = 0
    },
    toplay () {
      this.$emit('toplay', 1, {
        roleId: -1
        // userId: -1,
        // todayPyayCount: 11
      })
      // this.$router.push({
      //   name: 'playpage',
      //   params:
      // })
    },
    showjf () {
      this.popup3 = 1
      axios({
        // url: '/api/user/add',
        url: 'https://interact.5club.cctv.cn/hudong/api.php/dqdz/Ranklist',
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(res => {
        if (res.data.code === '1') {
          console.log('data', res.data)
          this.rankList = res.data.data.rankList
        } else {
          Dialog.alert({
            message: res.data.msg
          }).then(() => {
            // on close
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.role-page {
  background: gray;
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/imgs/bg2.jpg");
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
  }
  .return{
    width: 75px;
    height: 35px;
    background-image: url("../../assets/imgs/return.png");
    background-size: 100% 100%;
    position: absolute;
    top:20px;
    left:20px;
  }
  .roles{
    width: 300px;
    height: 340px;
    background-image: url("../../assets/imgs/roles.png");
    background-size: 100% 100%;
    position: absolute;
    bottom: 13vh;
    left: 10vw;
    .fbimg {
      width: 40px;
      height: 40px;
      background-image: url("../../assets/imgs/fball.png");
      background-size: 100% 100%;
      position: absolute;
      bottom: 0;
      left: 36vw;
      animation: run 3s linear infinite;
    }
    .mxbtn{
      background-image: url("../../assets/imgs/mx.png");
      background-size: 100% 100%;
      position: absolute;
      width: 80px;
      height: 50px;
      bottom: 70px;
      left: 20px;
    }
    .clbtn{
      background-image: url("../../assets/imgs/cl.png");
      background-size: 100% 100%;
      position: absolute;
      width: 80px;
      height: 50px;
      bottom: 70px;
      right: 20px;
    }
    .mx-abtn{
      background-image: url("../../assets/imgs/mx-a.png");
      background-size: 100% 100%;
      position: absolute;
      width: 80px;
      height: 50px;
      bottom: 70px;
      left: 20px;
    }
    .cl-abtn{
      background-image: url("../../assets/imgs/cl-a.png");
      background-size: 100% 100%;
      position: absolute;
      width: 80px;
      height: 50px;
      bottom: 70px;
      right: 20px;
    }
  }
  .showjf{
    width: 100px;
    height: 38px;
    background-image: url("../../assets/imgs/jfbtn.png");
    background-size: 100% 100%;
    position: absolute;
    top:21%;
    left: 50%;
    margin-left: -45px;
  }
  .zlbg{
    position: absolute;
    height: 493px;
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
    .rank-list-area {
      width: 250px;
      height: 260px;
      overflow-y: scroll;
      /*background-color: #fca82a;*/
      /*border: 2px solid #000;*/
      /*border-radius: 5px;*/
      position: absolute;
      top: 40%;
      left:10px;
      .rank-list-wraper {
      }
    }
    .clscore{
      width: 50%;
      height: 50px;
      text-align: center;
      position: absolute;
      left:0;
      top: 28%;
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
      top: 28%;
      color: #3f3d3a;
      font-size: 20px;
      font-weight: 500;
    }
    .vantRow{
      margin: 3px 4px 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 242px;
      font-size: 14px;
      height: 24px;
      padding: 0 1px;
      border: 1px solid #686868;
      background-color: #d0d0d0;
      border-radius: 4px;
      .col1{
        width: 13%;
        display: flex;
        // float:left;
        div{
          text-align: center;
          // line-height: 20px;
          width: 20px;
          height: 20px;
          background-color: #636363;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .col2{
        width: 25%;
        display: block;
        // float:left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
      .col3{
        width: 36%;
        display: block;
        // float:left;
      }
      .col4{
        width: 26%;
        display: flex;
        // float:left;

        div{
          background-color: #6d6d6d;
          text-align: center;
          // line-height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 65px;
          height: 20px;
          border-radius: 5px;
        }
      }
    }
    .thvant{
      position: absolute;
      left: 25px;
      top: 34%;
      background: none;
      border: 0;
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
@keyframes run {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

</style>

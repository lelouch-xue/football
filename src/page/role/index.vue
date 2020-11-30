<template>
  <div class="role-page">
    <div class="return" @click="toGuide"></div>
    <router-link class="next" :to="{name:'playpage'}"></router-link>
    <div class="roles">
      <div class="fbimg"></div>
      <div class="mx-abtn" v-if="isMx" @click="setrole(mxid)"></div>
      <div class="mxbtn" v-if="!isMx" @click="setrole(mxid)"></div>
      <div class="clbtn" v-if="isMx" @click="setrole(clid)"></div>
      <div class="cl-abtn" v-if="!isMx" @click="setrole(clid)"></div>
    </div>
    <!--提交用户信息-->
    <div v-show="popup">
      <!--这里是要展示的内容层-->
      <div class="userform">
        <div class="closerule" @click="closepopup"></div>
        <div><input v-model="username" class="username" placeholder="姓 名" /></div>
        <div><input v-model="mobile" class="mobile" placeholder="电 话" type="number" /></div>
        <div class="submit" @click="submit"></div>
        <div class="jump" @click="toplay"></div>
      </div>
      <!--这里是半透明背景层-->
      <div class="over"></div>
    </div>
    <!--明天再来-->
    <div v-show="popup1">
      <!--这里是要展示的内容层-->
      <div class="seeyou">
        <div class="closerule" @click="closepopup"></div>
<!--        <router-link class="submit" to='/playpage'></router-link>-->
        <div class="submit" @click="toplay"></div>
      </div>
      <!--这里是半透明背景层-->
      <div class="over"></div>
    </div>
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
    <router-view></router-view>
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
      popup: 0,
      popup1: 0,
      mxid: 2,
      clid: 1,
      roleId: -1,
      userId: -1,
      username: '',
      mobile: '',
      todayPyayCount: 0,
      popup3: 0,
      clscore: 0,
      mxscore: 0
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
      axios('/api/role/list', {
      // axios('/api/dqdz/Rolelist', {
        params: {}
      }).then(res => {
        if (res.data.code === '0') {
          Dialog.alert({
            message: res.data.msg
          }).then(() => {
            // on close
          })
        }
      })
    },
    // 选择角色
    setrole (roleid) {
      this.roleId = roleid
      if (roleid === this.mxid) {
        this.isMx = true
      } else if (parseInt(roleid) === parseInt(this.clid)) {
        this.isMx = false
      }
      this.popup = 1
    },
    toGuide () {
      this.$emit('touchable')
    },
    // 关闭活动规则页面
    closepopup () {
      this.popup1 = 0
      this.popup3 = 0
      this.popup = 0
    },
    toplay () {
      this.popup = 0
      this.popup1 = 0
      this.$router.push({
        name: 'playpage',
        params: {
          roleId: -1,
          userId: -1,
          todayPyayCount: 11
        }
      })
    },
    // 提交用户信息
    submit () {
      if (this.mobile === '') {
        Dialog.alert({
          message: '请填写手机号～'
        }).then(() => {
          // on close
        })
      } else {
        axios({
          url: '/api/user/add',
          // url: '/api/dqdz/Usersubmit',
          method: 'post',
          data: {
            mobile: this.mobile,
            sex: '1',
            userName: this.username
          }
        }).then(res => {
          if (res.data.code === 0) {
            this.todayPyayCount = res.data.data.isTodayPyayCount
            if (this.todayPyayCount >= 10) {
              // 今日已提交，明天再来
              this.popup = 0
              this.popup1 = 1
            } else if (this.todayPyayCount >= 0 && this.todayPyayCount < 10) {
              this.userId = res.data.data.tbUser.id
              this.popup = 0
              this.$router.push({
                name: 'playpage',
                params: {
                  roleId: this.roleId,
                  userId: this.userId,
                  todayPyayCount: this.todayPyayCount
                }
              })
            }
            this.mobile = ''
            this.username = ''
          } else {
            Dialog.alert({
              message: res.data.msg
            }).then(() => {
              // on close
            })
          }
        })
      }
    },
    showjf () {
      this.popup3 = 1
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
    bottom: 20vh;
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
  .seeyou{
    position: absolute;
    height: 140px;
    width: 280px;
    border-radius: 0.25rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    background-image: url("../../assets/imgs/seeyou.png");
    background-size: 100%;
    .submit{
      width: 85px;
      height: 30px;
      background-image: url("../../assets/imgs/goon1.png");
      background-size: 100% 100%;
      position: absolute;
      left: 50%;
      top: 60%;
      margin-left: -45px;
    }
  }
  .userform {
    position: absolute;
    height: 280px;
    width: 280px;
    border-radius: 0.25rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    background-image: url("../../assets/imgs/userinfo.png");
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
    .username{
      width: 200px;
      height: 30px;
      border-radius: 10px;
      border:1px solid #000000;
      background-color: #ffffff;
      position: absolute;
      left: 50%;
      top: 35%;
      margin-left: -115px;
      padding-left: 20px;
    }
    .mobile{
      width: 200px;
      height: 30px;
      border-radius: 10px;
      border:1px solid #000000;
      background-color: #ffffff;
      position: absolute;
      left: 50%;
      top: 52%;
      margin-left: -115px;
      padding-left: 20px;
    }
    .submit{
      width: 85px;
      height: 33px;
      background-image: url("../../assets/imgs/submit.png");
      background-size: 100% 100%;
      position: absolute;
      left: 30%;
      top: 73%;
      margin-left: -45px;
    }
    .jump{
      width: 85px;
      height: 33px;
      background-image: url("../../assets/imgs/jump.png");
      background-size: 100% 100%;
      position: absolute;
      right: 15%;
      top: 73%;
      margin-left: -45px;
    }
  }
  .showjf{
    width: 130px;
    height: 50px;
    background-image: url("../../assets/imgs/jfbtn.png");
    background-size: 100% 100%;
    position: absolute;
    top:21%;
    left: 50%;
    margin-left: -55px;
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

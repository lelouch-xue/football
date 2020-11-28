<template>
  <div class="role-page">
    <div class="return" @click="toGuide"></div>
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
      </div>
      <!--这里是半透明背景层-->
      <div class="over"></div>
    </div>
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
      mxid: 2,
      clid: 1,
      username: '',
      mobile: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      axios('/api/role/list', {
      // axios('http://123.56.2.234/c5_201706/activitiesApi.php/dqdz/Rolelist', {
        params: {}
      }).then(res => {
        alert(res.data.code)
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
      if (roleid === this.mxid) {
        this.isMx = true
      } else if (parseInt(roleid) === parseInt(this.clid)) {
        this.isMx = false
      }
      this.popup = 1
    },
    toGuide () {
      console.log('role')
      this.$emit('swipeto', 1)
    },
    // 关闭活动规则页面
    closepopup () {
      this.popup = 0
    },
    // 提交用户信息
    submit () {
      if (this.mobile === 0) {
        Dialog.alert({
          message: '请填写手机号～'
        }).then(() => {
          // on close
        })
      } else {
        axios({
          url: 'http://123.56.2.234/c5_201706/activitiesApi.php/dqdz/Usersubmit',
          method: 'post',
          data: {
            mobile: this.mobile,
            sex: 1,
            userName: this.userName
          }
        }).then(res => {
          if (res.code === '0') {
            Dialog.alert({
              message: res.data.msg
            }).then(() => {
              // on close
            })
          } else {
            console.log('请求结果：', res)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.role-page {
  background: gray;
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/imgs/bg2.png");
  background-size: 100% 100%;
  position: relative;
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
      margin-left: -105px;
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
      margin-left: -105px;
      padding-left: 20px;
    }
    .submit{
      width: 85px;
      height: 30px;
      background-image: url("../../assets/imgs/submit.png");
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
@keyframes run {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

</style>

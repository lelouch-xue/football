<template>
  <div id="app">
    <!-- <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide><c-guide></c-guide></swiper-slide>
      <swiper-slide><c-play></c-play></swiper-slide>
    </swiper> -->
    <van-swipe
      class="my-swipe"
      ref="swiper"
      :touchable="touchable"
      indicator-color="white"
      :loop="false"
      :duration="200"
      vertical
      :initial-swipe="initialSwipe"
      :show-indicators="false"
      @change="handleChangeSwiper"
    >
      <van-swipe-item><c-guide ref="guide" @disableSwip="(v) => touchable = v"></c-guide></van-swipe-item>
      <van-swipe-item><c-role @toplay="handleSwitchToPlay" @touchable="onTouchableChange(0)"></c-role></van-swipe-item>
      <van-swipe-item><c-play ref="play" :args="args" @tobill="handleSwitchToBill"></c-play></van-swipe-item>
      <van-swipe-item><c-bill></c-bill></van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import guide from '@/page/guide/index.vue'
import role from '@/page/role/index.vue'
import play from '@/page/play/new.vue'
import bill from '@/page/showbill/index.vue'
export default {
  name: 'App',
  components: {
    'c-guide': guide,
    'c-role': role,
    'c-play': play,
    'c-bill': bill
  },
  data () {
    return {
      touchable: true,
      initialSwipe: 0,
      args: {
        roleId: -1,
        userId: -1,
        todayPyayCount: 11
      }
    }
  },
  // created: {

  // },
  // mounted () {
  //   console.log('Current Swiper instance object', this.swiper)
  //   this.swiper.slideTo(3, 1000, false)
  // }
  methods: {
    init () {
      console.log('zaizheer')
    },
    handleChangeSwiper (evt) {
      console.log(evt)
      if (evt === 1) this.touchable = false
    },
    onTouchableChange (state) {
      this.touchable = true
      this.$refs.swiper.swipeTo(0, {
        immediate: true
      })
    },
    swipeTo (num) {
      location.reload()
    },
    handleSwitchToPlay (type, args) {
      if (type === 1) {
        this.args = {
          roleId: -1
        }
      } else if (type === 2) {
        this.args = args
      }
      this.$refs.play.init({
        ...this.args
      })
      this.$refs.swiper.swipeTo(2, {
        immediate: true
      })
    },
    handleSwitchToBill () {
      this.$refs.swiper.swipeTo(3, {
        immediate: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .return{
    display: none;
  }
  .roles{
    display: none;
  }
.my-swipe {
  height: 100vh;
}
</style>

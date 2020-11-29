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
      <van-swipe-item><c-guide @disableSwip="(v) => touchable = v"></c-guide></van-swipe-item>
      <van-swipe-item><c-role @touchable="onTouchableChange(0)"></c-role></van-swipe-item>
<!--      <van-swipe-item><c-showbill></c-showbill></van-swipe-item>-->
    </van-swipe>
  </div>
</template>

<script>
import guide from '@/page/guide/index.vue'
import role from '@/page/role/index.vue'
export default {
  name: 'App',
  components: {
    'c-guide': guide,
    'c-role': role
  },
  data () {
    return {
      touchable: true,
      initialSwipe: 0
    }
  },
  // created: {

  // },
  // mounted () {
  //   console.log('Current Swiper instance object', this.swiper)
  //   this.swiper.slideTo(3, 1000, false)
  // }
  methods: {
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

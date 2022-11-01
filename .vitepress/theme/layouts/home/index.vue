<template>
  <div class="layout-home">
    <div class="track track-swiper">
      <track-slide1></track-slide1>
      <track-slide2></track-slide2>
    </div>
    <div class="track track-demo">
      <track-demo></track-demo>
    </div>
  </div>
</template>

<script lang="ts" setup>

import TrackSlide1 from './track-slide-1.vue'
import TrackSlide2 from './track-slide-2.vue'
import TrackDemo from './track-demo.vue'

</script>

<style lang="scss" scoped>

.layout-home {
  height: 100vh;
  margin-top: calc(0px - var(--vp-nav-height));

  :deep(.screen) {
    height: 100vh;
    position: relative;
  }
}

.track {
  top: 0;
  left: 0;
  width: 100vw;
}

.track-demo {
  position: fixed;
  z-index: 100;
}

</style>

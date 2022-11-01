<template>
  <screen-demo #figure>
    <img :src="withBase('/console/bot.png')"/>
  </screen-demo>
</template>

<script lang="ts" setup>

import ScreenDemo from './screen-demo.vue'
import { withBase } from 'vitepress'

</script>

<style lang="scss" scoped>

img {
  height: 75vh;
  max-width: unset;
}

</style>

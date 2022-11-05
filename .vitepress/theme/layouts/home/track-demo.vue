<template>
  <screen-demo #figure>
    <chat-panel controls>
      <img :src="withBase('/console/bot.png')"/>
    </chat-panel>
  </screen-demo>
</template>

<script lang="ts" setup>

import ScreenDemo from './screen-demo.vue'
import { withBase } from 'vitepress'

</script>

<style lang="scss" scoped>

.panel-view {
  width: fit-content;
  margin: 0;
  border-radius: 16px;

  :deep(.content) {
    padding: 2.5rem 1rem 1rem;
  }
}

img {
  height: 75vh;
  max-width: unset;
  border-radius: 8px;
}

</style>

<template>
  <div class="layout-home">
    <div class="track track-main" :style="main">
      <slide1 @swipe="move(1)"></slide1>
      <slide2></slide2>
      <slide3></slide3>
      <slide4></slide4>
    </div>
    <div class="track track-demo" :style="demo">
      <track-demo :position="position"></track-demo>
    </div>
  </div>
</template>

<script lang="ts" setup>

import Slide1 from './slide1.vue'
import Slide2 from './slide2.vue'
import Slide3 from './slide3.vue'
import Slide4 from './slide4.vue'
import TrackDemo from './track-demo.vue'
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import { useEventListener } from '@vueuse/core'

const { frontmatter } = useData()

const demoCount = computed<number>(() => frontmatter.value.features.length)
const totalCount = computed(() => demoCount.value + 2)

const position = ref(0)

const main = computed(() => ({
  transform: `translateY(${-position.value * 100}vh)`,
}))

function interval(value: number, begin: number, end: number) {
  if (value < begin) {
    return begin - value
  } else if (value > end) {
    return end - value
  } else {
    return 0
  }
}

const demo = computed(() => ({
  transform: `translateY(${interval(position.value, 1, demoCount.value) * 100}vh)`,
}))

function restrict(value: number) {
  return Math.max(Math.min(value, totalCount.value), 0)
}

function move(offset: number) {
  position.value = restrict(position.value + offset)
}

useEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    move(1)
  } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    move(-1)
  }
})

let lastWheel = 0

useEventListener('wheel', (e: WheelEvent) => {
  if (e.ctrlKey || e.shiftKey || Math.abs(e.deltaY) < 50) return
  const timestamp = Date.now()
  if (timestamp - lastWheel >= 100) {
    move(Math.sign(e.deltaY))
  }
  lastWheel = timestamp
}, { passive: false })

let isDragging = false
let lastY: number

useEventListener('touchstart', (e: TouchEvent) => {
  isDragging = true
  lastY = e.touches[0].clientY
  e.preventDefault()
})

useEventListener('touchmove', (e: TouchEvent) => {
  if (!isDragging) return
  e.preventDefault()
  position.value = position.value + (lastY - e.touches[0].clientY) / innerHeight
  lastY = e.touches[0].clientY
})

useEventListener('touchend', (e: TouchEvent) => {
  isDragging = false
  position.value = position.value + (lastY - e.touches[0].clientY) / innerHeight
  position.value = restrict(Math.round(position.value))
})

</script>

<style lang="scss" scoped>

.layout-home {
  height: 100vh;
  margin-top: calc(0px - var(--vp-nav-height));
  overflow: hidden;
  line-height: 1.7em;

  :deep(.screen) {
    height: 100vh;
    position: relative;
  }
}

.track {
  top: 0;
  left: 0;
  width: 100vw;
  transition: transform .3s ease;
}

.track-main {
  :deep(.screen):nth-child(2n) {
    background-color: var(--vp-c-bg-alt);
  }
}

.track-demo {
  position: fixed;
  z-index: 100;
  pointer-events: none;
}

</style>

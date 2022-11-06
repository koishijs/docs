<template>
  <div class="layout-home" :class="{ moving }">
    <div class="track track-main" :style="main">
      <slide1 @swipe="move(1)"></slide1>
      <slide2></slide2>
      <slide3></slide3>
      <slide4></slide4>
    </div>
    <div class="track track-demo" :style="demo">
      <carousel :position="position"></carousel>
    </div>
  </div>
</template>

<script lang="ts" setup>

import Slide1 from './slide1.vue'
import Slide2 from './slide2.vue'
import Slide3 from './slide3.vue'
import Slide4 from './slide4.vue'
import Carousel from './carousel.vue'
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
  position.value = restrict(Math.round(position.value + offset))
}

function sign(value: number, epsilon = 0) {
  if (value > epsilon) return 1
  if (value < -epsilon) return -1
  return 0
}

useEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    e.preventDefault()
    move(1)
  } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    e.preventDefault()
    move(-1)
  }
})

let lastMove = 0
let moving = false
let startY: number
let lastY: number

useEventListener('wheel', (e: WheelEvent) => {
  if (e.ctrlKey || e.shiftKey || Math.abs(e.deltaY) < 50) return
  const timestamp = Date.now()
  if (timestamp - lastMove >= 100) {
    move(Math.sign(e.deltaY))
  }
  lastMove = timestamp
}, { passive: false })

useEventListener('touchstart', (e: TouchEvent) => {
  moving = true
  startY = lastY = e.changedTouches[0].clientY
})

useEventListener('touchmove', (e: TouchEvent) => {
  if (!moving) return
  const { clientY } = e.changedTouches[0]
  const destination = position.value + (lastY - clientY) / innerHeight
  position.value = restrict(destination)
  if (position.value === destination) {
    // do not prevent default at the top or bottom
    e.preventDefault()
  }
  lastY = clientY
}, { passive: false })

useEventListener('touchend', (e: TouchEvent) => {
  moving = false
  const { clientY } = e.changedTouches[0]
  const deltaY = startY - clientY
  const timestamp = Date.now()
  if (timestamp - lastMove >= 100) {
    position.value -= (lastY - startY) / innerHeight
    move(sign(deltaY, 50))
  }
  lastMove = timestamp
})

</script>

<style lang="scss" scoped>

.layout-home {
  --t-duration: .3s;
  height: 100vh;
  margin-top: calc(0px - var(--vp-nav-height));
  overflow: hidden;
  line-height: 1.7em;

  &.moving {
    --t-duration: 0;
  }

  :deep(.screen) {
    height: 100vh;
    position: relative;
  }

  :deep(p) {
    font-size: 15px;
  }
}

.track {
  top: 0;
  left: 0;
  width: 100vw;
  transition: transform var(--t-duration) ease;
}

.track-main {
  :deep(.screen):nth-child(2n) {
    background-color: var(--vp-c-bg-alt);
  }
}

.track-demo {
  position: fixed;
  z-index: 15;
  pointer-events: none;
}

</style>

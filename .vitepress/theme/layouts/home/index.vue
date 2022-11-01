<template>
  <div class="layout-home">
    <div class="track track-main" :style="main">
      <track-slide1 @swipe="move(1)"></track-slide1>
      <track-slide2></track-slide2>
      <track-slide3></track-slide3>
      <track-slide4></track-slide4>
    </div>
    <div class="track track-demo" :style="demo">
      <track-demo></track-demo>
    </div>
  </div>
</template>

<script lang="ts" setup>

import TrackSlide1 from './track-slide-1.vue'
import TrackSlide2 from './track-slide-2.vue'
import TrackSlide3 from './track-slide-3.vue'
import TrackSlide4 from './track-slide-4.vue'
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

useEventListener('mousedown', (e: MouseEvent) => {
  if (e.button !== 0) return
  isDragging = true
  lastY = e.clientY
})

useEventListener('mousemove', (e: MouseEvent) => {
  if (!isDragging) return
  position.value = position.value + (lastY - e.clientY) / innerHeight
  lastY = e.clientY
})

useEventListener('mouseup', (e: MouseEvent) => {
  isDragging = false
  position.value = position.value + (lastY - e.clientY) / innerHeight
  position.value = restrict(Math.round(position.value))
})

useEventListener('touchstart', (e: TouchEvent) => {
  isDragging = true
  lastY = e.touches[0].clientY
})

useEventListener('touchmove', (e: TouchEvent) => {
  if (!isDragging) return
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
  transition: transform 0.3s ease;
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

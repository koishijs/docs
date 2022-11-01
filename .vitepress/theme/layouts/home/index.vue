<template>
  <div class="layout-home">
    <div class="track track-swiper" :style="swiper">
      <track-slide1></track-slide1>
      <track-slide2></track-slide2>
    </div>
    <div class="track track-demo" :style="demo">
      <track-demo></track-demo>
    </div>
  </div>
</template>

<script lang="ts" setup>

import TrackSlide1 from './track-slide-1.vue'
import TrackSlide2 from './track-slide-2.vue'
import TrackDemo from './track-demo.vue'
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import { useEventListener } from '@vueuse/core'

const { frontmatter } = useData()

const totalHeight = computed(() => {
  return frontmatter.value.features.length
})

const position = ref(0)

const swiper = computed(() => ({
  transform: `translateY(${-position.value * 100}vh)`,
}))

const demo = computed(() => ({
  transform: `translateY(${(
    position.value < 1
      ? 1 - position.value
      : 0
  ) * 100}vh)`,
}))

function restrict(value: number) {
  return Math.max(Math.min(value, totalHeight.value), 0)
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
  if (timestamp - lastWheel >= 75) {
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
  position.value = restrict(Math.round(position.value))
})

</script>

<style lang="scss" scoped>

.layout-home {
  height: 100vh;
  margin-top: calc(0px - var(--vp-nav-height));
  overflow: hidden;

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

.track-demo {
  position: fixed;
  z-index: 100;
  pointer-events: none;
}

</style>

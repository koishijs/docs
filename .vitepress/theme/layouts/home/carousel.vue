<template>
  <div class="mask" :style="{ top: (index + offset) * 100 + 'vh' }" v-for="(feat, index) in frontmatter.features" :key="index">
    <demo #figure :style="{ top: -(index + offset) * 100 + 'vh' }">
      <chat-panel controls>
        <img :src="withBase(feat.image + '.light.webp')" class="light-only"/>
        <img :src="withBase(feat.image + '.dark.webp')" class="dark-only"/>
      </chat-panel>
    </demo>
  </div>
</template>

<script lang="ts" setup>

import Demo from './demo.vue'
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'

const props = defineProps<{
  position: number
}>()

const { frontmatter } = useData()

const demoCount = computed<number>(() => frontmatter.value.features.length)

const offset = computed(() => {
  if (props.position < 1) return 0
  if (props.position > demoCount.value) return 1 - demoCount.value
  return 1 - props.position
})

</script>

<style lang="scss" scoped>

.mask {
  width: 100vw;
  position: absolute !important;
  overflow: hidden;
  transition: top var(--t-duration) ease;

  @media (max-width: 959px) {
    padding: 0 0.5rem;
  }
}

.screen {
  transition: top var(--t-duration) ease;
}

.panel-view {
  width: fit-content;
  margin: 0;
  border-radius: 16px;

  :deep(.content) {
    padding: 2.5rem 1rem 1rem;

    img {
      height: 70vh;
      max-width: unset;
      border-radius: 8px;
    }
  }
}

.mask:nth-child(2n + 1) {
  .panel-view {
    background-color: var(--vp-c-bg);
  }
} 

</style>

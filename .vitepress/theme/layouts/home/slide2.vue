<template>
  <demo v-for="feat in frontmatter.features" :key="feat.title">
    <h2>{{ feat.title }}</h2>
    <p>{{ feat.desc }}</p>
  </demo>
</template>

<script lang="ts" setup>

import { useData } from 'vitepress'
import Demo from './demo.vue'

const { frontmatter } = useData()

</script>

<style lang="scss" scoped>

h2 {
  font-size: 2rem;
  line-height: 1.7;
}

p {
  font-size: 1rem;
}

</style>

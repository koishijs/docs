<template>
  <template v-for="{ text, items } in sidebar">
    <h2 :id="text">
      {{ text }}
    </h2>
    <ul>
      <li v-for="{ text, link } in items">
        <a :href="withBase(link.replace(/\.md$/, '.html'))">{{ text }}</a>
      </li>
    </ul>
  </template>
</template>

<script setup lang="ts">

import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { page, theme } = useData()

const sidebar = computed(() => {
  const path = '/' + page.value.relativePath
  for (const key in theme.value.sidebar) {
    if (path.startsWith(key)) {
      return theme.value.sidebar[key].filter(item => item.text)
    }
  }
  return []
})

</script>

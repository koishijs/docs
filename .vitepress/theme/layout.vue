<template>
  <Layout :class="extra">
    <template v-if="frontmatter.layout === 'schema'" #sidebar-nav-before>
      <VPNavBarTitle></VPNavBarTitle>
    </template>
    <template v-if="frontmatter.layout === 'market'" #sidebar-nav-after>
      <market-filter v-model="words" :data="all"></market-filter>
    </template>
  </Layout>
</template>

<script lang="ts" setup>

import { Layout } from '@koishijs/vitepress/client'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { MarketFilter } from '@koishijs/market'
import VPNavBarTitle from '@theme-default/components/VPNavBarTitle.vue'
import { home, words, all } from './utils'

const { frontmatter } = useData()

const extra = computed(() => {
  if (frontmatter.value.layout === 'home') {
    return [`parity-` + (Math.round(home.position.value) % 2 ? 'odd' : 'even')]
  }
})

</script>

<style lang="scss">

.market-filter-group {
  margin-top: 16px;
  border-top: 1px solid var(--k-color-border);
  padding-top: 16px;
}

.market-filter-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 2;

  h2 {
    margin: 0;
    padding-top: 6px;
    padding-bottom: 6px;
    line-height: 20px;
    font-size: 14px;
    font-weight: 700;
  }
}

</style>

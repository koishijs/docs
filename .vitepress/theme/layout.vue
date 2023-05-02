<template>
  <Layout :class="extra">
    <template v-if="frontmatter.layout === 'schema'" #sidebar-nav-before>
      <VPNavBarTitle></VPNavBarTitle>
      <div class="group">
        <VPSidebarItem :item="navItem" :depth="0"></VPSidebarItem>
      </div>
    </template>
    <template v-if="frontmatter.layout === 'market'" #sidebar-nav-after>
      <market-filter v-model="words" :data="getSorted(market?.objects || [], words)"></market-filter>
    </template>
  </Layout>
</template>

<script lang="ts" setup>

import { Layout } from '@koishijs/vitepress/client'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { getSorted, MarketFilter } from '@koishijs/market'
import VPNavBarTitle from '@theme-default/components/VPNavBarTitle.vue'
import VPSidebarItem from '@theme-default/components/VPSidebarItem.vue'
import { home, market, words } from './utils'

const { frontmatter, theme } = useData()

const navItem = computed(() => ({
  text: theme.value.navText || '导航',
  items: theme.value.nav.filter(item => item.link),
}))

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

<template>
  <Layout :class="frontmatter.layout && `layout-${frontmatter.layout}`">
    <template v-if="frontmatter.layout === 'schema'" #sidebar-nav-before>
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

import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { computed, provide, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getSorted, kConfig, MarketFilter } from '@koishijs/market'
import VPSidebarItem from '@theme-default/components/VPSidebarItem.vue'
import { market, words } from './utils'

const Layout = DefaultTheme.Layout

provide(kConfig, {
  portable: true,
})

const { frontmatter, localeIndex, theme } = useData()
const composer = useI18n()

watch(localeIndex, () => {
  composer.locale.value = localeIndex.value
}, { immediate: true })

const navItem = computed(() => ({
  text: theme.value.navText || '导航',
  items: theme.value.nav.filter((item: any) => item.link),
}))

</script>

<style lang="scss">

.Layout.layout-homepage {
  --vp-nav-bg-color: transparent;
  --vp-c-gutter: transparent;

  .VPSidebar {
    background-color: transparent;
  }

  .VPNavBar .divider-line::before {
    display: none;
  }

  .VPNavBar.has-sidebar .title {
    background-color: transparent;
  }
}

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

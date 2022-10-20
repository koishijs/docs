<template>
  <div class="Layout">
    <VPSkipLink />
    <VPBackdrop class="backdrop" :show="isSidebarOpen" @click="closeSidebar" />
    <VPNav>
      <template #nav-bar-title-before></template>
      <template #nav-bar-title-after></template>
      <template #nav-bar-content-before></template>
      <template #nav-bar-content-after></template>
      <template #nav-screen-content-before></template>
      <template #nav-screen-content-after></template>
    </VPNav>
    <VPLocalNav :open="isSidebarOpen" @open-menu="openSidebar" />
    <VPSidebar :open="isSidebarOpen" />

    <div class="VPContent" id="VPContent" :class="{
      'has-sidebar': hasSidebar,
      'is-home': frontmatter.layout === 'home'
    }">
      <NotFound v-if="route.component === NotFound" />
      <component :is="component">
        <template #doc-footer-before></template>
        <template #doc-before></template>
        <template #doc-after></template>

        <template #aside-top></template>
        <template #aside-bottom></template>
        <template #aside-outline-before></template>
        <template #aside-outline-after></template>
        <template #aside-ads-before></template>
        <template #aside-ads-after></template>
      </component>
    </div>

    <VPFooter />
  </div>
</template>

<script setup lang="ts">

import { computed, inject, provide, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import { useSidebar, useCloseSidebarOnEscape } from '@theme-default/composables/sidebar.js'
import VPSkipLink from '@theme-default/components/VPSkipLink.vue'
import VPBackdrop from '@theme-default/components/VPBackdrop.vue'
import VPNav from '@theme-default/components/VPNav.vue'
import VPLocalNav from '@theme-default/components/VPLocalNav.vue'
import VPSidebar from '@theme-default/components/VPSidebar.vue'
import VPFooter from '@theme-default/components/VPFooter.vue'
import VPDoc from '@theme-default/components/VPDoc.vue'
import starter from './layouts/starter.vue'

const {
  isOpen: isSidebarOpen,
  open: openSidebar,
  close: closeSidebar,
  hasSidebar,
} = useSidebar()

const route = useRoute()
watch(() => route.path, closeSidebar)

useCloseSidebarOnEscape(isSidebarOpen, closeSidebar)

provide('close-sidebar', closeSidebar)

const { frontmatter } = useData()

const layouts = {
  starter,
  default: VPDoc,
}

const NotFound = inject('NotFound')
const component = computed(() => {
  return layouts[frontmatter.value.layout] || layouts.default
})

</script>

<style scoped>

.Layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.VPContent {
  flex-grow: 1;
  flex-shrink: 0;
  margin: 0 auto;
  width: 100%;
}

.VPContent.is-home {
  width: 100%;
  max-width: 100%;
}

@media (min-width: 960px) {
  .VPContent {
    padding-top: var(--vp-nav-height);
  }

  .VPContent.has-sidebar {
    margin: 0;
    padding-left: var(--vp-sidebar-width);
  }
}

@media (min-width: 1440px) {
  .VPContent.has-sidebar {
    padding-right: calc((100vw - var(--vp-layout-max-width)) / 2);
    padding-left: calc((100vw - var(--vp-layout-max-width)) / 2 + var(--vp-sidebar-width));
  }
}

</style>

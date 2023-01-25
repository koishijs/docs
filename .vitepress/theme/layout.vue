<template>
  <Layout>
    <template v-if="frontmatter.layout === 'market'" #sidebar-nav-after>
      <div class="category-group">
        <div class="title">
          <h2 class="title-text">分类</h2>
        </div>
        <div
          v-for="(title, key) in categories" :key="key"
          class="category-item" :class="{ active: activeCategory === key }"
          @click="activeCategory = activeCategory === key ? null : key"
        >
          <span class="icon">
            <k-icon :name="key"></k-icon>
          </span>
          <span class="text">
            {{ title }}
            <template v-if="market">
              ({{ visible.filter(item => item.category === key).length }})
            </template>
          </span>
          <span class="spacer"></span>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script lang="ts" setup>

import { Layout } from '@koishijs/vitepress/client'
import { useData } from 'vitepress'
import { activeCategory, categories, market, visible } from './utils'
import KIcon from './components/icon'

const { frontmatter } = useData()

</script>

<style lang="scss" scoped>

.category-group {
  margin-top: 16px;
  border-top: 1px solid var(--vp-c-divider-light);
  padding-top: 16px;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 2;
}

.title-text {
  padding-top: 6px;
  padding-bottom: 6px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 700;
}

.category-item {
  display: flex;
  margin: 4px 0;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  height: 24px;
  cursor: pointer;

  &.active {
    color: var(--vp-c-brand);
  }

  .icon {
    display: inline-flex;
    width: 1.75rem;
    margin-right: 6px;
    align-items: center;
    justify-content: center;
  }

  svg {
    height: 1.125rem;
    max-width: 1.25rem;
  }

  .text {
    line-height: 20px;
    font-size: 14px;
    font-weight: 500;
  }

  .spacer {
    flex: 1;
  }
}

</style>

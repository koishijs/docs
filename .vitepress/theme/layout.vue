<template>
  <Layout :class="extra">
    <template v-if="frontmatter.layout === 'market'" #sidebar-nav-after>
      <div class="filter-group">
        <div class="title">
          <h2 class="title-text">筛选</h2>
        </div>
        <div
          v-for="(badge, key) in badges" :key="key" class="filter-item"
          :class="{ [key]: true, active: words.includes(badge.query), disabled: words.includes('-' + badge.query) }"
          @click="toggleBadge(badge.query)">
          <span class="icon"><market-icon :name="key"></market-icon></span>
          <span class="text">{{ badge.text }}</span>
          <span class="spacer"></span>
          <span class="count" v-if="market">
            {{ all.filter(item => badge.check(item)).length }}
          </span>
        </div>
      </div>
      <div class="filter-group">
        <div class="title">
          <h2 class="title-text">分类</h2>
        </div>
        <div
          v-for="(title, key) in categories" :key="key" class="filter-item"
          :class="{ active: words.includes('category:' + key) }"
          @click="toggleCategory(key)">
          <span class="icon"><market-icon :name="'solid:' + key"></market-icon></span>
          <span class="text">{{ title }}</span>
          <span class="spacer"></span>
          <span class="count" v-if="market">
            {{ all.filter(item => resolveCategory(item.category) === key).length }}
          </span>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script lang="ts" setup>

import { Layout } from '@koishijs/vitepress/client'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { badges, categories, resolveCategory, MarketIcon } from '@koishijs/client-market'
import { home, words, market, all } from './utils'

const { frontmatter } = useData()

const extra = computed(() => {
  if (frontmatter.value.layout === 'home') {
    return [`parity-` + (Math.round(home.position.value) % 2 ? 'odd' : 'even')]
  }
})

function toggleCategory(key: string) {
  const index = words.value.findIndex(word => word.startsWith('category:'))
  if (index === -1) {
    if (!words.value[words.value.length - 1]) words.value.pop()
    words.value.push('category:' + key, '')
  } else if (words[index] === 'category:' + key) {
    words.value.splice(index, 1)
  } else {
    words.value[index] = 'category:' + key
  }
}

function toggleBadge(word: string) {
  const index = words.value.findIndex(x => x === word || x === '-' + word)
  if (index === -1) {
    if (!words.value[words.value.length - 1]) words.value.pop()
    words.value.push(word, '')
  } else if (words.value[index] === word) {
    words.value[index] = '-' + word
  } else {
    words.value.splice(index, 1)
  }
}

</script>

<style lang="scss" scoped>

.filter-group {
  margin-top: 16px;
  border-top: 1px solid var(--vp-c-divider-light);
  padding-top: 16px;
  padding-bottom: 1px;
  margin-bottom: -1px;
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

.filter-item {
  display: flex;
  margin: 4px 0;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
  align-items: center;
  z-index: 2;
  height: 24px;
  cursor: pointer;

  &.active {
    color: var(--vp-c-brand);

    &.verified, &.newborn {
      color: var(--c-success);
    }

    &.preview {
      color: var(--c-warning);
    }

    &.insecure {
      color: var(--c-danger);
    }
  }

  &.disabled {
    opacity: 0.5;
    text-decoration: line-through 2px;
  }

  .icon {
    display: inline-flex;
    width: 1.75rem;
    margin-right: 4px;
    align-items: center;
    justify-content: center;
  }

  svg {
    height: 1rem;
    max-width: 1.125rem;
  }

  .text, .count {
    line-height: 20px;
    font-size: 14px;
    font-weight: 500;
  }

  .count {
    margin-right: 4px;
  }

  .spacer {
    flex: 1;
  }
}

</style>

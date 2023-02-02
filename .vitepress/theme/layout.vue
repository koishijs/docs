<template>
  <Layout :class="extra">
    <template v-if="frontmatter.layout === 'market'" #sidebar-nav-after>
      <div class="filter-group">
        <div class="title">
          <h2 class="title-text">排序</h2>
        </div>
        <div
          v-for="(item, key) in comparators" :key="key" class="filter-item"
          :class="{ active: activeSort[0] === key }"
          @click="toggleSort('sort:' + key)">
          <span class="icon"><market-icon :name="item.icon"></market-icon></span>
          <span class="text">{{ item.text }}</span>
          <span class="spacer"></span>
          <span class="order"><market-icon :name="activeSort[1]"></market-icon></span>
        </div>
      </div>
      <div class="filter-group">
        <div class="title">
          <h2 class="title-text">筛选</h2>
        </div>
        <div
          v-for="(badge, key) in badges" :key="key" class="filter-item"
          :class="{ [key]: true, active: words.includes(badge.query), disabled: words.includes('-' + badge.query) }"
          @click="toggleQuery(badge.query)">
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
          @click="toggleCategory('category:' + key)">
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
import { badges, comparators, categories, resolveCategory, MarketIcon } from '@koishijs/client-market'
import { home, words, market, all } from './utils'

const { frontmatter } = useData()

const extra = computed(() => {
  if (frontmatter.value.layout === 'home') {
    return [`parity-` + (Math.round(home.position.value) % 2 ? 'odd' : 'even')]
  }
})

const activeSort = computed<string[]>(() => {
  let word = words.value.find(w => w.startsWith('sort:'))
  if (!word) return ['rating', 'desc']
  word = word.slice(5)
  if (word.endsWith('-desc')) {
    return [word.slice(0, -5), 'desc']
  } else if (word.endsWith('-asc')) {
    return [word.slice(0, -4), 'asc']
  } else {
    return [word, 'desc']
  }
})

function addWord(word: string) {
  if (!words.value[words.value.length - 1]) {
    words.value.pop()
  }
  words.value.push(word, '')
}

function toggleSort(word: string) {
  const index = words.value.findIndex(x => x.startsWith('sort:'))
  if (index === -1) {
    if (word === 'sort:rating') {
      addWord('sort:rating-asc')
    } else {
      addWord(word)
    }
  } else if (words.value[index] === word || words.value[index] === word + '-desc') {
    words.value[index] = word + '-asc'
  } else if (words.value[index] === word + '-asc') {
    words.value[index] = word
  } else {
    words.value[index] = word
  }
}

function toggleCategory(word: string) {
  const index = words.value.findIndex(x => x.startsWith('category:'))
  if (index === -1) {
    addWord(word)
  } else if (words[index] === word) {
    words.value.splice(index, 1)
  } else {
    words.value[index] = word
  }
}

function toggleQuery(word: string) {
  const index = words.value.findIndex(x => x === word || x === '-' + word)
  if (index === -1) {
    addWord(word)
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
      color: var(--k-color-success);
    }

    &.preview {
      color: var(--k-color-warning);
    }

    &.insecure {
      color: var(--k-color-danger);
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

  &:not(.active) .order {
    display: none;
  }

  .order {
    display: inline-flex;
    width: 1.75rem;
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

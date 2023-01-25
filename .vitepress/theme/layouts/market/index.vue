<template>
  <div class="market-container" v-if="market">
    <h1>插件市场</h1>
    <div class="info">
      当前共有 {{ hasWords ? packages.length + ' / ' : '' }}{{ visible.length }} 个可用于 v4 版本的插件
      <span class="timestamp">({{ new Date(market.timestamp).toLocaleString() }})</span>
    </div>
    <div class="card search-box">
      <badge type="tip" v-for="(word, index) in words.slice(0, -1)" :key="index" @click="words.splice(index, 1)">{{ word }}</badge>
      <input
        placeholder="输入想要查询的插件名"
        v-model="words[words.length - 1]"
        @blur="(onEnter as any)"
        @keydown.escape="onEscape"
        @keydown.backspace="onBackspace"
        @keypress.enter.prevent="onEnter"
        @keypress.space.prevent="onEnter"/>
    </div>
    <div class="packages">
      <package-view class="card"
        v-for="data in packages"
        :key="data.name"
        :data="data" @query="onQuery"/>
    </div>
  </div>
  <div class="market-container loading" v-else>
    <div v-if="error">
      插件市场加载失败。
    </div>
    <div v-else>
      正在加载插件市场...
    </div>
  </div>
</template>

<script lang="ts" setup>

import type { AnalyzedPackage, User } from '@koishijs/registry'
import { computed, onMounted, ref } from 'vue'
import PackageView from './package.vue'
import { market, getUsers, activeCategory, words, visible } from '../../utils'

function onEnter(event: KeyboardEvent) {
  const last = words[words.length - 1]
  if (!last) return
  if (words.slice(0, -1).includes(last)) {
    words.pop()
  }
  words.push('')
}

function onEscape(event: KeyboardEvent) {
  words[words.length - 1] = ''
}

function onBackspace(event: KeyboardEvent) {
  if (words[words.length - 1] === '' && words.length > 1) {
    event.preventDefault()
    words.splice(words.length - 2, 1)
  }
}

function onQuery(word: string) {
  if (!words[words.length - 1]) words.pop()
  if (!words.includes(word)) words.push(word)
  words.push('')
}

function validate(data: AnalyzedPackage, word: string, users: User[]) {
  const { locales, service } = data.manifest
  if (word.startsWith('impl:')) {
    return service.implements.includes(word.slice(5))
  } else if (word.startsWith('locale:')) {
    return locales.includes(word.slice(7))
  } else if (word.startsWith('using:')) {
    const name = word.slice(6)
    return service.required.includes(name) || service.optional.includes(name)
  } else if (word.startsWith('email:')) {
    return users.some(({ email }) => email === word.slice(6))
  } else if (word.startsWith('before:')) {
    return data.createdAt < word.slice(7)
  } else if (word.startsWith('after:')) {
    return data.createdAt >= word.slice(6)
  } else if (word.startsWith('is:')) {
    if (word === 'is:verified') return data.verified
    if (word === 'is:insecure') return data.insecure
    if (word === 'is:preview') return data.manifest.preview
    return false
  } else if (word.startsWith('not:')) {
    if (word === 'not:verified') return !data.verified
    if (word === 'not:insecure') return !data.insecure
    if (word === 'not:preview') return !data.manifest.preview
    return true
  } else if (word.startsWith('show:')) {
    return true
  }

  if (data.shortname.includes(word)) return true
  return data.keywords.some(keyword => keyword.includes(word))
}

const hasWords = computed(() => {
  return words.filter(w => w).length || activeCategory.value
})

const error = ref()

onMounted(async () => {
  try {
    market.refresh()
  } catch (err) {
    error.value = err
  }
})

const packages = computed(() => {
  return visible.value.filter((data) => {
    if (activeCategory.value && activeCategory.value !== data.category) return
    const users = getUsers(data)
    return words.every(word => validate(data, word, users))
  })
})

</script>

<style lang="scss">

$max-width: 480px;
$min-width: 420px;
$breakpoint: 760px;

.market-container {
  --c-border: transparent;
  --c-success: #67c23a;
  --c-danger: #f56c6c;
  --c-warning: #e49400;
}

html.dark .market-container {
  --c-border: transparent; // var(--vp-c-divider-inverse);
  --c-success: #3ba55e;
  --c-danger: #ff595a;
  --c-warning: #f9af1b;
}

@media (min-width: 1440px) and (max-width: 1503px) {
  .layout-market .VPContent.has-sidebar {
    padding-right: 2rem;
  }
}

.market-container {
  margin: calc(0px - var(--vp-nav-height)) 0 0;
  padding: var(--vp-nav-height) 0 2rem 2rem;
  min-height: 100vh;
  max-width: var(--vp-layout-max-width);

  @media (max-width: 1439px) {
    padding-right: 2rem;
  }

  &.loading {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  h1 {
    font-size: 2.2rem;
    margin: 1.5rem auto;
    font-weight: 600;
    line-height: 1.5;
    text-align: center;
  }

  .info {
    margin: 1rem auto;
    text-align: center;
  }

  // @media (min-width: $breakpoint) {
    .card {
      background-color: var(--vp-c-bg-alt);
      border: 1px solid var(--c-border);
      border-radius: 8px;
    }

    .market-view {
      display: flex;
      flex-direction: column;
    }
  // }

  .search-box {
    display: flex;
    margin: 2rem auto 0;
    width: 540px;
    max-width: 540px;
    height: 3rem;
    border-radius: 1.5rem;
    background-color: var(--vp-c-bg-alt);
    align-items: center;
    padding: 0 1.2rem;

    @media (max-width: 663px) {
      width: 100%;
    }

    input {
      height: 3rem;
      width: 100%;
      font-size: 1em;
      background-color: transparent;
      border: none;
      outline: none;
    }

    .badge {
      flex-shrink: 0;
    }

    .badge + input {
      margin-left: 0.4rem;
    }
  }

  .badge {
    cursor: pointer;
    user-select: none;
    padding: 2px 6px;
    color: var(--vp-c-white);
    font-weight: 500;
  }

  --card-margin: 2rem;
  --card-padding-vertical: 1.5rem;
  --card-padding-horizontal: 1.5rem;

  @media screen and (max-width: 768px) {
    --card-margin: 1.5rem;
    --card-padding-vertical: 1rem;
    --card-padding-horizontal: 1rem;
  }

  @media screen and (max-width: 420px) {
    --card-margin: 1rem;
    --card-padding-vertical: 0.75rem;
    --card-padding-horizontal: 0.875rem;
  }

  .packages {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(336px, 1fr));
    gap: var(--card-margin);
    margin: var(--card-margin) 0;
    justify-items: center;
  }

  // @media (max-width: ($breakpoint - 1px)) {
  //   .market-view {
  //     padding: 0.25rem 0;
  //     border-top: 1px solid var(--c-border);

  //     &:last-child {
  //       border-bottom: 1px solid var(--c-border);
  //     }

  //     .badge-container {
  //       margin: 1rem 0 1.25rem;
  //     }
  //   }
  // }

  @media (max-width: 480px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    // .search-box {
    //   width: calc(100% - 1rem);
    // }

    .info .timestamp {
      display: none;
    }

  //   .market-view {
  //     padding: 0;
  //   }

  //   .market-view > * {
  //     padding: 0 1rem;
  //   }
  }
}

// html:not(.dark) .market-container .card {
//   transition: box-shadow 0.3s ease;

//   --shadow-left-1: 0 1px 4px hsl(250deg 40% 40% / 12%);
//   --shadow-left-2: 0 2px 8px hsl(250deg 40% 40% / 8%);
//   --shadow-left-3: 0 4px 16px hsl(250deg 40% 40% / 6%);
//   --shadow-left-4: 0 6px 24px hsl(250deg 40% 40% / 4%);
//   --shadow-right-1: 1px 1px 4px hsl(250deg 40% 40% / 12%);
//   --shadow-right-2: 2px 2px 8px hsl(250deg 40% 40% / 8%);
//   --shadow-right-3: 4px 4px 16px hsl(250deg 40% 40% / 6%);
//   --shadow-right-4: 6px 6px 24px hsl(250deg 40% 40% / 4%);

//   // @media (min-width: $breakpoint) {
//     box-shadow: var(--shadow-right-1), var(--shadow-right-3);

//     &:hover {
//       box-shadow: var(--shadow-right-2), var(--shadow-right-4);
//     }

//     &:nth-child(2n) {
//       box-shadow: var(--shadow-left-1), var(--shadow-left-3);

//       &:hover {
//         box-shadow: var(--shadow-left-2), var(--shadow-left-4);
//       }
//     }
//   // }

//   &.search-box {
//     box-shadow: var(--shadow-right-1), var(--shadow-right-3);

//     &:hover {
//       box-shadow: var(--shadow-right-2), var(--shadow-right-4);
//     }
//   }
// }

</style>

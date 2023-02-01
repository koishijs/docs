<template>
  <div class="market-container" v-if="market">
    <h1>插件市场</h1>
    <div class="info">
      当前共有 {{ hasWords ? packages.length + ' / ' : '' }}{{ all.length }} 个可用于 v4 版本的插件
      <span class="timestamp">({{ new Date(market.timestamp).toLocaleString() }})</span>
    </div>
    <search-box v-model="words"></search-box>
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

import { computed, onMounted, ref } from 'vue'
import PackageView from './package.vue'
import { market, words, all, packages } from '../../utils'
import { SearchBox } from '@koishijs/client-market'

function onQuery(word: string) {
  if (!words.value[words.value.length - 1]) words.value.pop()
  if (!words.value.includes(word)) words.value.push(word)
  words.value.push('')
}

const hasWords = computed(() => words.value.filter(w => w).length > 0)

const error = ref()

onMounted(async () => {
  try {
    market.refresh()
  } catch (err) {
    error.value = err
  }
})

</script>

<style lang="scss">

$max-width: 480px;
$min-width: 420px;
$breakpoint: 760px;

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

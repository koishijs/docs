<template>
  <market-list
    gravatar="https://cravatar.cn"
    v-if="market"
    v-model="words"
    :data="market.objects"
  >
    <template #header="{ hasFilter, all, packages }">
      <h1>插件市场</h1>
      <div class="info">
        当前共有 {{ hasFilter ? packages.length + ' / ' : '' }}{{ all.length }} 个可用于 v4 版本的插件
        <span class="timestamp">({{ new Date(market.timestamp).toLocaleString() }})</span>
      </div>
      <market-search class="k-card" v-model="words"></market-search>
    </template>
  </market-list>

  <div class="market-loading" v-else>
    <div v-if="error">
      插件市场加载失败。
    </div>
    <div v-else>
      正在加载插件市场……
    </div>
  </div>
</template>

<script lang="ts" setup>

import { onMounted, ref } from 'vue'
import { market, words } from '../utils'
import { MarketList, MarketSearch } from '@koishijs/market'

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

.k-card {
  border-radius: 8px;
  background-color: var(--vp-c-bg-alt);
  border: 1px solid var(--c-border);
}

.market-loading {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  margin-top: calc(0px - var(--vp-nav-height));
}

.market-list {
  margin: calc(0px - var(--vp-nav-height)) 0 0;
  padding: var(--vp-nav-height) 0 0 2rem;
  min-height: 100vh;
  max-width: var(--vp-layout-max-width);

  @media (max-width: 1439px) {
    padding-right: 2rem;
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

  @media (max-width: 480px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .info .timestamp {
      display: none;
    }
  }
}

</style>

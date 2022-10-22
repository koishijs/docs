<template>
  <div class="starter-container">
    <div class="vp-doc">
      <content />
    </div>
    <div class="chooser">
      <div>
        <div class="chooser-header chooser-cell">
          <span>我使用 Koishi……</span>
        </div>
        <div class="chooser-select chooser-select-usage">
          <div class="chooser-select-item chooser-cell"
            v-for="(value, key) in choices" :key="key"
            :class="{ selected: chooserUsage === key }"
            @click="chooserUsage = key">
            &gt; {{ value.text }}
          </div>
        </div>
      </div>

      <div>
        <div class="chooser-header chooser-cell">
          <span>{{ choices[chooserUsage].caption }}</span>
        </div>
        <div class="chooser-select" :class="'chooser-select-' + chooserUsage">
          <a class="chooser-select-item chooser-cell"
            v-for="(value, key) in choices[chooserUsage].children" :key="key"
            :href="normalizeLink(value)">
            &gt; {{ key }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import { normalizeLink } from '@theme-default/support/utils.js'
const chooserUsage = ref('production')
const choices = {
  production: {
    text: '用于搭建机器人服务',
    caption: '我的运行环境是……',
    children: {
      'Windows': '/manual/starter/desktop',
      'macOS': '/manual/starter/desktop',
      'Linux': '/manual/starter/desktop',
      'Android': '/manual/starter/mobile',
      'Docker': '/manual/starter/docker',
      'Server': '/manual/starter/server',
    },
  },
  development: {
    text: '用于开发',
    caption: '我希望 Koishi 作为……',
    children: {
      '一个独立的项目': '/manual/starter/boilerplate',
      '其他 Node 项目的依赖': '/manual/starter/direct',
    },
  },
}

</script>

<style lang="scss" scoped>

.starter-container {
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: center;
  max-width: 840px;
  margin: 0 auto;
  margin-top: calc(0px - var(--vp-nav-height));

  @media (max-width: 719px) {
    justify-content: flex-start;
    gap: 0;
    padding-top: calc(1rem + var(--vp-nav-height));
  }
}

.vp-doc {
  padding: 16px 24px;
}

.content {
  padding: 2rem 2.5rem;
  @media (max-width: 719px) {
    padding: 1rem 2rem;
  }
}

.chooser {
  &-cell {
    padding: 20px 36px;
    font-size: 1.125rem;

    @media (max-width: 719px) {
      padding: 16px 24px;
    }
  }

  &-header {
    background-color: var(--vp-c-bg-alt);
    // border-bottom: 1px solid var(--vp-c-divider-light);
  }

  &-select {
    display: grid;

    &-item {
      flex: 1;
      cursor: pointer;
      background-color: var(--vp-c-bg-alt);
      transition: background-color 0.3s ease;
      &:hover, &.selected {
        background-color: var(--vp-button-brand-bg);
        color: var(--vp-button-brand-text);
      }
    }

    &-usage {
      grid-template-columns: repeat(2, 1fr);

      @media (max-width: 719px) {
        grid-template-columns: repeat(1, 1fr);
      }
    }

    &-development {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);

      @media (max-width: 719px) {
        grid-template-columns: repeat(1, 1fr);
      }
    }

    &-production {
      grid-template-columns: repeat(3, 1fr);

      @media (max-width: 719px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }

  > div + div {
    // border-top: 1px solid var(--vp-c-divider-light);
  }
}

</style>

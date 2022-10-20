<template>
  <div class="starter-container page">
    <div class="content">
      <content />
    </div>
    <div class="chooser">
      <div>
        <div class="chooser-header">
          <span>我使用 Koishi……</span>
        </div>
        <div class="chooser-select">
          <div class="chooser-select-item"
            v-for="(value, key) in choices" :key="key"
            :class="{ selected: chooserUsage === key }"
            @click="chooserUsage = key">
            &gt; {{ value.text }}
          </div>
        </div>
      </div>

      <div>
        <div class="chooser-header">
          <span>{{ choices[chooserUsage].caption }}</span>
        </div>
        <div class="chooser-select">
          <div class="chooser-select-item"
            v-for="(value, key) in choices[chooserUsage].children" :key="key"
            @click="$router.push(value)">
            &gt; {{ key }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
const chooserUsage = ref('non-dev')
const choices = {
  'non-dev': {
    text: '用于搭建机器人服务',
    caption: '我的运行环境是……',
    children: {
      'Windows': './desktop',
      'macOS': './desktop',
      'Linux': './desktop',
      'Android': './mobile',
    },
  },
  dev: {
    text: '用于开发',
    caption: '我希望 Koishi 作为……',
    children: {
      '一个独立的项目': './boilerplate',
      '其他 Node 项目的依赖': './direct',
    },
  },
}

</script>

<style lang="scss" scoped>

.starter-container {
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 840px;
  margin: 0 auto;
}
.content {
  padding: 2rem 2.5rem;
  @media (max-width: 719px) {
    padding: 1rem 2rem;
  }
}
.chooser {
  &-header {
    background-color: var(--c-bg-home);
    padding: 12px 36px;
    font-size: 1.2rem;
  }
  &-select {
    display: flex;
    justify-content: space-between;
    &-item {
      flex: 1;
      padding: 24px 36px;
      font-size: 1.2rem;
      font-weight: bold;
      cursor: pointer;
      background-color: var(--c-bg-dark);
      transition: background-color 0.3s ease;
      &:hover, &.selected {
        background-color: var(--c-primary);
      }
    }
    @media (max-width: 719px) {
      flex-direction: column;
      &-item {
        padding: 16px 36px;
      }
    }
  }
}

</style>

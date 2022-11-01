<template>
  <div class="screen screen-cover">
    <h1><span class="koi">Koi</span>shi.js</h1>
    <p class="desc">
      创建跨平台、可扩展、高性能的机器人
    </p>
    <div class="actions">
      <a class="action-button primary" :href="withBase('/manual/starter/')">Get Started</a>
      <a class="action-button secondary" @click="$emit('swipe', 1)">Learn More</a>
    </div>
    <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 320 512">
      <g>
        <path fill="var(--vp-c-brand-alt)" d="M160 256.14l-56.51 56.47-96.44-96.15a23.77 23.77.0 01-.18-33.61l.18-.18 22.59-22.51a23.94 23.94.0 0133.85.0z"></path>
        <path fill="var(--vp-c-brand-lightest)" d="M313 182.57 290.21 160a23.94 23.94.0 00-33.85.0L103.47 312.61 143 352l.06.06a24 24 0 0033.93-.16L313 216.36l.18-.17a23.78 23.78.0 00-.18-33.62z"></path>
      </g>
    </svg>
  </div>
</template>

<script lang="ts" setup>

import { withBase } from 'vitepress'

defineEmits(['swipe'])

// 跨平台 (待定)

// 实时监控 (仪表盘)
// 借助 Koishi 仪表盘功能，你可以实时监控机器人的运行状态。

// 简单配置 (全局配置)
// Koishi 提供了丰富的插件配置和简单易懂的操作模式，使你能够轻松完成机器人的定制化。

// 生态丰富 (插件市场)
// Koishi 拥有庞大的插件生态，无论是日常娱乐还是实用功能，你都能在这里找到。

// 掌控数据 (数据库)
// 多驱动、高性能的数据库使得 Koishi 可以轻松处理百万量级的数据。

// 即刻预览 (沙盒)
// 安装或配置任何插件后，你可以立即在 Koishi 的沙盒界面中模拟聊天、预览效果。

</script>

<style lang="scss" scoped>

.screen-cover {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem 0;

  h1 {
    line-height: 1.5;
    font-size: 3rem;
    color: var(--vp-c-brand-lightest);
  }

  svg {
    position: absolute;
    opacity: 60%;
    bottom: 1.5rem;
    width: 1.5rem;
    animation: bounce 1s infinite;
  }

  .koi {
    color: var(--vp-c-brand-alt);
  }

  .desc {
    color: var(--vp-c-brand-lightest);
    text-transform: uppercase;
    text-align: center;
    line-height: 2;

    br {
      @media (min-width: 600px) {
        display: none;
      }
    }
  }

  .actions {
    margin: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 2.2rem;
    justify-content: center;

    @media (max-width: 600px) {
      margin: 4rem 0 0 0;
      flex-direction: column;
    }

    .action-button {
      user-select: none;
      display: inline-block;
      font-size: 1.05rem;
      line-height: 1.4;
      padding: 0.5rem 2.2rem;
      border-width: 2px;
      border-style: solid;
      border-radius: 2rem;
      transition:
        color 0.3s ease,
        background-color 0.3s ease,
        border-color 0.3s ease;
      box-sizing: border-box;
      cursor: pointer;

      @media (max-width: 600px) {
        padding: 0.5rem 4rem;
      }

      &.primary {
        color: var(--vp-button-brand-text);
        border-color: var(--vp-button-brand-bg);
        background-color: var(--vp-button-brand-bg);
        &:hover {
          color: var(--vp-button-brand-hover-text);
          border-color: var(--vp-button-brand-hover-bg);
          background-color: var(--vp-button-brand-hover-bg);
        }
      }

      &.secondary {
        color: var(--vp-button-brand-hover-bg);
        border-color: var(--vp-button-brand-bg);
        &:hover {
          color: var(--vp-button-brand-text);
          background-color: var(--vp-button-brand-bg);
        }
      }
    }
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-50%);
    animation-timing-function: cubic-bezier(.8, 0, 1, 1);
  }

  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, .2, 1);
  }
}

</style>

<template>
  <div class="screen screen-cover">
    <h1><span class="koi">Koi</span>shi.js</h1>
    <p class="desc">
      {{ frontmatter.home.desc }}
    </p>
    <div class="actions">
      <a class="action-button primary" :href="withBase(frontmatter.links.starter)">{{ frontmatter.home.primary }}</a>
      <a class="action-button secondary" @click="$emit('swipe', 1)">{{ frontmatter.home.secondary }}</a>
    </div>
    <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 320 512">
      <g>
        <path fill="var(--vp-c-brand-alt)" d="M160 256.14l-56.51 56.47-96.44-96.15a23.77 23.77.0 01-.18-33.61l.18-.18 22.59-22.51a23.94 23.94.0 0133.85.0z"></path>
        <path fill="var(--vp-c-brand-darker)" d="M313 182.57 290.21 160a23.94 23.94.0 00-33.85.0L103.47 312.61 143 352l.06.06a24 24 0 0033.93-.16L313 216.36l.18-.17a23.78 23.78.0 00-.18-33.62z"></path>
      </g>
    </svg>
  </div>
</template>

<script lang="ts" setup>

import { useData, withBase } from 'vitepress'

defineEmits(['swipe'])

const { frontmatter } = useData()

</script>

<style lang="scss" scoped>

.screen-cover {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem 0;
  color: var(--vp-c-brand-darker);

  h1 {
    line-height: 1.5;
    font-size: 3rem;
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
    color: var(--vp-c-brand-darker);
    text-transform: uppercase;
    text-align: center;
    line-height: 2;
    font-size: 16px;

    br {
      @media (min-width: 600px) {
        display: none;
      }
    }
  }

  .actions {
    margin: 1.5rem 0;
    display: flex;
    flex-wrap: wrap;
    gap: 2.2rem;
    justify-content: center;

    @media (max-width: 600px) {
      margin: 4rem 0 0 0;
      flex-direction: column;
    }

    .action-button {
      flex: 1 0 auto;
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

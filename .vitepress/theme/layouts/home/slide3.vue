<template>
  <div class="screen screen-development">
    <div class="introduction">
      <h2>{{ frontmatter.development.title }}</h2>
      <p>{{ frontmatter.development.desc }}</p>
    </div>
    <div class="advantages">
      <div class="advantage" v-for="feat in frontmatter.advantages" :key="feat.title">
        <span class="icon">
          <svg :viewBox="feat.icon.viewBox">
            <path :d="feat.icon.path" fill="currentColor"/>
          </svg>
        </span>
        <h3>{{ feat.title }}</h3>
        <p class="desc">{{ feat.desc }}</p>
        <p class="learn-more"><a :href="withBase(feat.link)">了解更多</a></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useData, withBase } from 'vitepress'

const { frontmatter } = useData()

</script>

<style lang="scss" scoped>

.screen-development {
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .introduction {
    text-align: center;
  }

  h2 {
    margin: 2rem 0 1rem;
    font-size: 2.2rem;
    font-weight: 400;
    line-height: 1.5;

    @media (max-width: 720px) {
      font-size: 2rem;
    }
  }
}

.advantages {
  max-width: 60rem;
  margin: 6rem 0 2rem;
  gap: 2rem 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: 720px) {
    margin: 2rem 0 0;
    grid-template-columns: 1fr;
  }

  .advantage {
    display: grid;

    h3 {
      padding: 0;
      line-height: 1.5;
      font-size: 1.5rem;
      margin: 1rem;
      border-bottom: none;
    }

    .desc {
      margin: 0;
    }

    svg {
      height: 2rem;
      margin: 0 auto;
    }

    @media (min-width: 720px) {
      text-align: center;

      .learn-more {
        margin: 1rem;
      }
    }

    @media (max-width: 719px) {
      gap: .8rem .2rem;
      align-items: center;
      grid-template-columns: 3rem auto 4rem;

      .icon {
        text-align: center;
        grid-column: 1 / 2;
      }

      svg {
        height: 1.4rem;
      }

      h3 {
        margin: 0;
        font-size: 1.3rem;
        text-align: left;
        grid-column: 2 / 3;
      }

      .desc {
        grid-column: 1 / 4;
      }

      .learn-more {
        grid-row: 1 / 2;
        grid-column: 3 / 4;
      }
    }
  }
}

</style>

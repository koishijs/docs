<template>
  <footer class="screen screen-footer">
    <div class="links">
      <div v-for="group in frontmatter.footer" :key="group.text" class="group">
        <div class="group-title">{{ group.text }}</div>
        <ul class="group-items">
          <li v-for="item in group.items" :key="item.text">
            <a :href="item.link" class="link">{{ item.text }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="copyright">
      <div>MIT Licensed</div>
      <div>Copyright © 2019-2022 Shigma</div>
    </div>
  </footer>
</template>

<script lang="ts" setup>

import { useData } from 'vitepress'

const { frontmatter } = useData()

</script>

<style lang="scss" scoped>

.screen-footer {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  gap: 0 4rem;

  .links {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    padding: 1.5rem 0;

    .group-title {
      padding: 6px 0;
      font-weight: 600;
      color: var(--vp-c-text-2);
    }

    li {
      margin: 4px 0;
      color: var(--vp-c-text-1);
    }
  }

  @media (min-width: 768px) {
    .links {
      margin-left: -2rem;
      padding-left: 2rem;
      border-left: 1px solid var(--vp-c-divider-light);
    }

    .copyright {
      flex: 1;
      text-align: right;
    }
  }

  @media (max-width: 767px) {
    flex-direction: column;

    .copyright {
      flex: 0;
      text-align: center;
      width: 100%;
      padding: 1.5rem 0;
      font-size: 14px;
      border-top: 1px solid var(--vp-c-divider-light);

      div {
        display: inline;
      }

      div + div::before {
        content: "|";
        margin: 0 6px;
      }
    }
  }
}

</style>

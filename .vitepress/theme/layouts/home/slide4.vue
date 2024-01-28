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
      <div>Copyright © 2019-present Shigma</div>
      <a v-if="beian" target="_blank" rel="noopener noreferrer" href="https://beian.miit.gov.cn/">浙ICP备2021029727号-1</a>
    </div>
  </footer>
</template>

<script lang="ts" setup>

import { onMounted, ref } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const beian = ref(false)

onMounted(() => {
  if (window.location.href.includes('ilharper.com')) {
    beian.value = true
  }
})

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
    flex-wrap: wrap;
    flex-direction: column;
    gap: 1.5rem;
    padding: var(--vp-nav-height) 0;

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
    flex-direction: column;
    justify-content: space-evenly;
  
    .links {
      margin-left: -2rem;
      padding-left: 2rem;
      border-left: 1px solid var(--vp-c-divider-light);
      justify-content: center;
      flex-direction: row;
    }

    .group {
      border-top: 1px solid var(--vp-c-divider);
      padding-top: 16px;
    }

    .copyright {
      text-align: center;
      opacity: 0.6;
    }
  }

  @media (max-width: 767px) {
    flex-direction: column;

    .links {
      flex: 1 1 0;
      flex-wrap: nowrap;
      height: 0;
      width: 100%;
      margin-top: var(--vp-nav-height);
      padding: 0 2rem 1rem;
      justify-content: flex-start;

      .group {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        gap: 0 3rem;
        padding-left: 15%;
      }
    }

    .copyright {
      flex: 0 0 auto;
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

/* Make platform links parallel */
.links .group:nth-child(3) .group-items {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 0 1.5rem;
  justify-items: start;
}

.links .group:nth-child(3) .group-items * {
  text-align: center;
}

</style>

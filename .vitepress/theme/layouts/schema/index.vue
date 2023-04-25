<template>
  <div class="layout-schema">
    <div class="left-container">
      <section class="theme-default-content">
        <el-scrollbar>
          <main class="vp-doc">
            <content></content>
          </main>
        </el-scrollbar>
      </section>

      <section>
        <header>Input</header>
        <main>
          <code>
            <json :data="input"></json>
          </code>
        </main>
      </section>

      <section>
        <header>Output</header>
        <main>
          <code>
            <json :data="output"></json>
          </code>
        </main>
      </section>
    </div>

    <section class="right-container">
      <el-scrollbar>
        <form>
          <k-schema :schema="schema" :initial="initial" v-model="config"></k-schema>
        </form>
      </el-scrollbar>
    </section>
  </div>
</template>

<script setup lang="ts">

import { computed, ref, watch } from 'vue'
import { clone } from 'schemastery-vue'
import { useData } from 'vitepress'
import Json from './json.vue'

const { frontmatter } = useData()

const schema = computed(() => eval(frontmatter.value.code))

const initial = ref(null)
const config = ref(null)

const output = computed(() => {
  try {
    return schema.value(config.value)
  } catch (e) {}
})

const input = computed(() => {
  try {
    return JSON.parse(JSON.stringify(config.value))
  } catch (e) {}
})

</script>

<style lang="scss">

.layout-schema {
  position: relative;
  height: 100vh;
  box-sizing: border-box;
  display: flex;

  > * {
    flex: 1;
  }

  > .left-container {
    box-sizing: border-box;
    border-right: 1px solid var(--vp-c-divider);
    display: flex;
    flex-direction: column;
    max-width: 50%;
    background-color: var(--code-bg-color);

    section {
      flex: 1 1 auto;
      box-sizing: border-box;

      main {
        padding: 1rem 2rem;
      }
    }

    .theme-default-content {
      overflow-y: auto;

      h1 {
        font-size: 1.75rem;
        margin-top: 1rem !important;

        + p {
          margin-top: 1rem;
        }
      }
    }

    section:not(.theme-default-content) {
      code {
        white-space: pre-wrap;
        color: var(--shiki-color-text);
        background-color: var(--shiki-color-background);
      }
    }
  }

  .right-container {
    background-color: var(--vp-c-bg-soft);

    h2, h3 {
      border-bottom: none;
      font-weight: 600;
    }

    h2 {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    .schema-item + h2, .schema-group + h2 {
      margin-top: 2rem;
    }

    form {
      padding: 1rem 2rem;
    }
  }

  section header {
    height: 3rem;
    border-top: 1px solid var(--vp-c-divider);
    border-bottom: 1px solid var(--vp-c-divider);
    padding: 0 2rem;
    display: flex;
    align-items: center;
    font-weight: 500;
  }
}

</style>

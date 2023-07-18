<template>
  <div class="schema-container">
    <div class="left-container">
      <section class="theme-default-content">
        <el-scrollbar>
          <main class="vp-doc">
            <content></content>
          </main>
        </el-scrollbar>
      </section>

      <section v-if="schema">
        <header>Input</header>
        <main>
          <code>
            <json :data="input"></json>
          </code>
        </main>
      </section>

      <section v-if="schema">
        <header>Output</header>
        <main>
          <code>
            <json :data="output"></json>
          </code>
        </main>
      </section>
    </div>

    <section class="right-container" v-if="schema">
      <client-only>
        <el-scrollbar>
          <form>
            <k-schema :schema="schema" :initial="initial" v-model="config"></k-schema>
          </form>
        </el-scrollbar>
      </client-only>
    </section>
  </div>
</template>

<script setup lang="ts">

import { computed, ref, watch } from 'vue'
import { useData } from 'vitepress'
import Json from './json.vue'

const { frontmatter } = useData()

const schema = computed(() => {
  try {
    return eval(frontmatter.value.code)
  } catch (e) {
    console.error(e)
    return null
  }
})

const initial = ref(null)
const config = ref(null)

watch(schema, () => {
  config.value = null
})

const output = computed(() => {
  try {
    return schema.value(config.value)
  } catch (e) {
    return e.message
  }
})

const input = computed(() => {
  try {
    return JSON.parse(JSON.stringify(config.value))
  } catch (e) {
    return e.message
  }
})

</script>

<style lang="scss">

.schema-container {
  position: relative;
  height: 100vh;
  box-sizing: border-box;
  display: flex;

  > * {
    flex: 1 0 50%;
    width: 0;
  }

  > .left-container {
    box-sizing: border-box;
    // border-right: 1px solid var(--vp-c-divider);
    display: flex;
    flex-direction: column;
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
        color: var(--shiki-token-text);
        font-size: var(--vp-code-font-size);
        line-height: var(--vp-code-line-height);
      }
    }
  }

  .right-container {
    background-color: var(--vp-c-bg-soft);

    h2, h3 {
      border-bottom: none;
      font-weight: 600;
    }

    form {
      padding: 1rem 2rem;
    }

    :not(pre) > code {
      border-radius: 4px;
      padding: 3px 6px;
      color: var(--vp-c-text-code);
      background-color: var(--vp-c-mute);
      transition: color 0.5s, background-color 0.5s;
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

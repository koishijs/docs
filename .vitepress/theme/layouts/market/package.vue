<template>
  <section class="k-card market-view">
    <div class="header">
      <div class="left">
        <market-icon :name="'outline:' + resolveCategory(data.category)"></market-icon>
      </div>
      <div class="right">
        <h2>
          <a :href="data.links.homepage || data.links.repository" target="_blank" rel="noopener noreferrer">{{ data.shortname }}</a>
          <span v-if="badge" :class="['icon', badge.type]" :title="badge.text">
            <market-icon :name="badge.type" @click="$emit('query', badge!.query)"></market-icon>
          </span>
        </h2>
        <div class="rating" :title="data.rating.toFixed(1)">
          <market-icon v-for="(_, index) in Array(5).fill(null)" :key="index" :name="index + 0.5 < data.rating ? 'star-full' : 'star-empty'"></market-icon>
        </div>
      </div>
    </div>
    <k-markdown inline tag="div" class="desc" :source="data.manifest.description.zh || data.manifest.description.en"></k-markdown>
    <div class="footer">
      <a class="shrink" :href="data.links.npm" target="_blank" rel="noopener noreferrer">
        <market-icon name="tag"></market-icon>{{ data.version }}
      </a>
      <template v-if="data.installSize">
        <span class="spacer"></span>
        <a :href="data.links.size" target="_blank" rel="noopener noreferrer">
          <market-icon name="file-archive"></market-icon>{{ formatSize(data.installSize) }}
        </a>
      </template>
      <template v-if="data.downloads">
        <span class="spacer"></span>
        <span>
          <market-icon name="download"></market-icon>{{ data.downloads.lastMonth }}
        </span>
      </template>
      <template v-if="!data.installSize && !data.downloads">
        <span class="spacer"></span>
        <span>
          <market-icon name="balance"></market-icon>{{ data.license }}
        </span>
      </template>
      <span class="spacer grow"></span>
      <div class="avatars">
        <a v-for="({ email, name, username }, index) in getUsers(data)"
          :title="name || username"
          :key="index"
          @click="$emit('query', 'email:' + email)">
          <img :src="getAvatar(email)">
        </a>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>

import { computed } from 'vue'
import { AnalyzedPackage } from '@koishijs/registry'
import KMarkdown from 'marked-vue'
import { MarketIcon, getUsers, getAvatar, formatSize, resolveCategory, badges } from '@koishijs/client-market'

defineEmits(['query', 'click'])

const props = defineProps<{
  data: AnalyzedPackage,
}>()

const badge = computed(() => {
  for (const type in badges) {
    if (badges[type].check(props.data)) return { type, ...badges[type] }
  }
})

</script>

<style lang="scss">

.market-view {
  width: 100%;
  max-width: 540px;
  height: calc(12.5rem + 2px);
  margin: 0;
  padding: 1rem 1.25rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .market-icon {
    height: 1em;
    display: inline;
  }

  .header, .footer {
    flex: 0 0 auto;
  }

  .header {
    position: relative;
    display: flex;
    gap: 1rem;

    .left {
      flex: 0 0 auto;
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 8px;
      border: 1px solid var(--vp-c-divider-light);
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        height: 1.75rem;
      }
    }

    .right {
      display: flex;
      flex-flow: column;
      justify-content: space-around;
      overflow: hidden;
    }

    h2 {
      font-size: 1.125rem;
      margin: 0;
      line-height: 1;
      display: flex;
      align-items: center;

      a {
        flex: 0 1 auto;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        line-height: 1.5rem;
        display: inline-block;
      }

      .icon {
        flex: 0 0 auto;
        margin-left: 0.6rem;
        height: 1.125rem;
        width: 1.125rem;
        position: relative;
        display: inline-block;
        cursor: pointer;

        .market-icon {
          height: 100%;
          transition: color 0.3s ease;
          z-index: 10;
          position: relative;
        }

        &.verified, &.newborn {
          color: var(--c-success);
        }

        &.preview {
          color: var(--c-warning);
        }

        &.insecure {
          color: var(--c-danger);
        }

        &.verified, &.insecure {
          &::before {
            position: absolute;
            top: 25%;
            left: 25%;
            right: 25%;
            bottom: 25%;
            content: '';
            z-index: 0;
            border-radius: 100%;
            background-color: white;
          }
        }
      }
    }

    .rating {
      height: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0 0.25rem;
      width: fit-content;

      .market-icon {
        color: var(--c-warning);
        height: 0.875rem;
        transition: color 0.3s ease;
      }
    }
  }

  .desc {
    margin: 0;
    font-size: 15px;
    flex: 1 1 auto;
    line-height: 1.5;
    overflow: hidden;
    word-break: break-word;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .footer {
    display: flex;
    align-items: center;
    height: 1.5rem;
    margin-bottom: -0.25rem;
    cursor: default;
    font-size: 14px;
    color: var(--el-text-color-regular);
    transition: color 0.3s ease;
    display: flex;
    overflow: hidden;

    .spacer {
      flex: 0 5 1.5rem;
    }

    .grow {
      flex-grow: 1;
      flex-shrink: 1;
    }

    .market-icon {
      height: 12px;
      width: 16px;
      margin-right: 6px;
      vertical-align: -1px;
    }

    > * {
      flex: 0 0 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .avatars {
      display: flex;
      gap: 0.25rem;

      a {
        cursor: pointer;
      }

      img {
        height: 1.5rem;
        width: 1.5rem;
        border-radius: 100%;
        vertical-align: middle;
      }
    }
  }
}

</style>

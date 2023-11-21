import { defineConfig } from '@koishijs/vitepress'
import { resolve } from 'path'
import { cp, mkdir, rm } from 'fs/promises'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'
import { external } from './mixin'
import mixins from './output'

const isDev = process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview'

const locales = ['en-US', 'zh-CN', 'zh-TW', 'de-DE', 'fr-FR', 'ja-JP', 'ru-RU']

export default async () => {
  for (const locale of locales) {
    await rm(resolve(__dirname, '../..', locale, 'external'), { recursive: true, force: true })
    await mkdir(resolve(__dirname, '../..', locale, 'ecosystem'), { recursive: true })
  }

  for (const name of external) {
    const root = require.resolve(`@root/${name}/package.json`)
    for (const locale of locales) {
      try {
        await cp(
          resolve(root, '../docs', locale),
          resolve(resolve(__dirname, '../..', locale, 'ecosystem'), name),
          { recursive: true, }
        )
      } catch {}
    }
  }

  return defineConfig({
    base: process.env.DEPLOY_BASE || '/',
    title: 'Koishi',
    description: '创建跨平台、可扩展、高性能的机器人',

    locales: {
      'en-US': require('./en-US'),
      'fr-FR': require('./fr-FR'),
      'zh-CN': require('./zh-CN'),
      ...(isDev ? {
        'zh-TW': require('./zh-TW'),
        'de-DE': require('./de-DE'),
        'ja-JP': require('./ja-JP'),
        'ru-RU': require('./ru-RU'),
      } : {}),
    },

    mixins: await mixins(),

    markdown: {
      math: true,
    },

    themeConfig: {
      indexName: 'koishi-docs',
      logo: '/logo.png',

      socialLinks: {
        github: 'https://github.com/koishijs/koishi',
      },
    },

    sitemap: {
      hostname: 'https://koishi.chat',
    },

    vite: {
      optimizeDeps: {
        include: ['xss'],
      },
      resolve: {
        alias: {
          dns: '@koishijs/dns',
        },
      },
      plugins: [
        vueI18n({ ssr: true }),
      ] as any,
    },
  })
}

import { defineConfig } from '@koishijs/vitepress'
import { resolve } from 'path'
import { mkdir, rm, symlink } from 'fs/promises'

const isDev = process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview'

const external = [] // ['assets', 'cache']
const locales = ['en-US', 'zh-CN', 'zh-TW', 'de-DE', 'fr-FR', 'ja-JP', 'ru-RU']

export default async () => {
  for (const locale of locales) {
    await rm(resolve(__dirname, '../..', locale, 'external'), { recursive: true, force: true })
    await mkdir(resolve(__dirname, '../..', locale, 'external'), { recursive: true })
  }

  for (const name of external) {
    try {
      const root = require.resolve(`@root/${name}/package.json`)
      for (const locale of locales) {
        await symlink(
          resolve(root, '../docs', locale),
          resolve(resolve(__dirname, '../..', locale, 'external'), name),
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  return defineConfig({
    title: 'Koishi',
    description: '创建跨平台、可扩展、高性能的机器人',

    locales: {
      'en-US': require('./en-US'),
      'zh-CN': require('./zh-CN'),
      ...(isDev ? {
        'zh-TW': require('./zh-TW'),
        'de-DE': require('./de-DE'),
        'fr-FR': require('./fr-FR'),
        'ja-JP': require('./ja-JP'),
        'ru-RU': require('./ru-RU'),
      } : {}),
    },

    themeConfig: {
      indexName: 'docs',
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
    },
  })
}

import { defineConfig } from '@koishijs/vitepress'
import deDE from './de-DE.json'
import enUS from './en-US.json'
import frFR from './fr-FR.json'
import jaJP from './ja-JP.json'
import ruRU from './ru-RU.json'
import zhCN from './zh-CN.json'

export default async () => defineConfig({
  title: 'Koishi',
  description: '创建跨平台、可扩展、高性能的机器人',

  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#5546a3' }],
  ],

  locales: {
    'en-US': enUS,
    'zh-CN': zhCN,
    ...(process.env.VERCEL_ENV === 'preview' ? {
      'de-DE': deDE,
      'fr-FR': frFR,
      'ja-JP': jaJP,
      'ru-RU': ruRU,
    } : {}),
  },

  themeConfig: {
    indexName: 'docs',
    logo: '/logo.png',

    socialLinks: {
      github: 'https://github.com/koishijs/koishi',
    },

    editLink: {
      pattern: 'https://github.com/koishijs/docs/edit/main/:path',
    },
  },

  vite: {
    optimizeDeps: {
      include: ['xss'],
    },
  },
})

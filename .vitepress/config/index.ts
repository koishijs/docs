import { defineConfig } from '@koishijs/vitepress'

const isDev = process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview'

export default async () => defineConfig({
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

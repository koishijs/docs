import { defineConfig } from '@koishijs/vitepress'
import deDE from './de-DE.json'
import enUS from './en-US.json'
import frFR from './fr-FR.json'
import jaJP from './ja-JP.json'
import ruRU from './ru-RU.json'
import zhCN from './zh-CN.json'

function transformLocale(prefix: string, source: any) {
  if (Array.isArray(source)) {
    return source.map(item => transformLocale(prefix, item))
  }

  const result: any = {}
  for (const key in source) {
    const value = source[key]
    if (typeof value === 'string') {
      if (key === 'link') {
        result[key] = prefix + value
      } else if (key === 'activeMatch') {
        result[key] = '^' + prefix + value
      } else {
        result[key] = value
      }
    } else if (key === 'sidebar') {
      result[key] = {}
      for (const prop in value) {
        result[key][prefix + prop] = transformLocale(prefix, value[prop])
      }
    } else {
      result[key] = transformLocale(prefix, value)
    }
  }
  return result
}

export default async () => defineConfig({
  title: 'Koishi',
  description: '创建跨平台、可扩展、高性能的机器人',

  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#5546a3' }],
  ],

  locales: {
    'en-US': transformLocale('/en-US', enUS),
    'zh-CN': transformLocale('/zh-CN', zhCN),
    ...(process.env.VERCEL_ENV === 'preview' ? {
      'de-DE': transformLocale('/de-DE', deDE),
      'fr-FR': transformLocale('/fr-FR', frFR),
      'ja-JP': transformLocale('/ja-JP', jaJP),
      'ru-RU': transformLocale('/ru-RU', ruRU),
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

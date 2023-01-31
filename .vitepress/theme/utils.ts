import { AnalyzedPackage, MarketResult, User } from '@koishijs/registry'
import { Dict } from 'cosmokit'
import { computed, reactive, ref, Ref } from 'vue'

export namespace home {
  export const position = ref(0)
}

interface MarketRef extends Ref<MarketResult> {
  refresh: () => Promise<void>
}

const refreshInterval = 1000 * 60 * 30

export const market = ref() as MarketRef

market.refresh = async () => {
  if (market.value?.timestamp + refreshInterval > Date.now()) return
  const response = await fetch('https://registry.koishi.chat/market.json')
  market.value = await response.json()
}

const aWeekAgo = new Date(Date.now() - 1000 * 3600 * 24 * 7).toISOString()

export interface Badge {
  text: string
  check(data: AnalyzedPackage): boolean
  query: string
}

export const badges: Dict<Badge> = {
  verified: {
    text: '官方认证',
    check: data => data.verified,
    query: 'is:verified',
  },
  insecure: {
    text: '不安全',
    check: data => data.insecure,
    query: 'is:insecure',
  },
  preview: {
    text: '开发中',
    check: data => data.manifest.preview,
    query: 'is:preview',
  },
  newborn: {
    text: '近期新增',
    check: data => data.createdAt >= aWeekAgo,
    query: `created:>${aWeekAgo}`,
  },
}

export const categories = {
  core: '核心功能',
  adapter: '适配器',
  storage: '存储服务',
  extension: '扩展功能',
  console: '控制台',
  manage: '管理工具',
  preset: '行为预设',
  search: '搜索服务',
  subscribe: '订阅服务',
  image: '图片服务',
  tool: '实用工具',
  ai: '人工智能',
  fun: '趣味交互',
  game: '娱乐玩法',
  gametool: '游戏工具',
}

export const words = reactive([''])

export const visible = computed(() => {
  if (!market.value) return []
  return market.value.objects.filter((data) => {
    return !data.manifest.hidden || words.includes('show:hidden')
  })
})

export function getUsers(data: AnalyzedPackage) {
  const result: Record<string, User> = {}
  for (const user of data.contributors) {
    result[user.email] ||= user
  }
  if (!data.maintainers.some(user => result[user.email])) {
    return [data.publisher]
  }
  return Object.values(result)
}


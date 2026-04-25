import { SearchResult } from '@koishijs/registry'
import { ref, Ref } from 'vue'

export namespace home {
  export const position = ref(0)
}

interface MarketRef extends Ref<SearchResult> {
  refresh: () => Promise<void>
}

const refreshInterval = 1000 * 60 * 30

export const market = ref() as MarketRef

market.refresh = async () => {
  if (market.value && +new Date(market.value.time) + refreshInterval > Date.now()) return
  const response = await fetch('https://registry.koishi.chat/index.json')
  market.value = await response.json()
}

export const words = ref<string[]>([''])

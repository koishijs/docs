import { defineTheme } from '@koishijs/vitepress-theme/client'
import home from '../layouts/home.vue'
import market from '../layouts/market.vue'
import starter from '../layouts/starter.vue'

export default defineTheme({
  layouts: {
    home,
    market,
    starter,
  },
})

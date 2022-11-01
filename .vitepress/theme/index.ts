import { defineTheme } from '@koishijs/vitepress-theme/client'
import home from './layouts/home/index.vue'
import market from './layouts/market.vue'
import starter from './layouts/starter.vue'
import './index.scss'

export default defineTheme({
  layouts: {
    home,
    market,
    starter,
  },
})

import { defineTheme } from '@koishijs/vitepress/client'
import home from './layouts/home/index.vue'
import market from './layouts/market/index.vue'
import starter from './layouts/starter.vue'
import Layout from './layout.vue'
import './index.scss'

export default defineTheme({
  layouts: {
    home,
    market,
    starter,
  },
  Layout,
})

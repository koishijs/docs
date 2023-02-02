import { defineTheme } from '@koishijs/vitepress/client'
import { defineComponent } from 'vue'
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
  enhanceApp({ app }) {
    app.component('el-tooltip', defineComponent({
      props: {
        content: String,
        placement: String,
      },
      setup(props, { slots }) {
        return () => slots.default?.()
      },
    }))
  },
})

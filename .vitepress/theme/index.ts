import { defineTheme } from '@koishijs/vitepress/client'
import { defineAsyncComponent } from 'vue'
import Markdown from 'marked-vue'
import Schema from 'schemastery'
import components from '@koishijs/components'
import Layout from './layout.vue'
import {
  ElButton,
  ElCheckbox,
  ElColorPicker,
  ElDatePicker,
  ElDialog,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElInput,
  ElInputNumber,
  ElPagination,
  ElRadio,
  ElScrollbar,
  ElSelect,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTooltip,
} from 'element-plus'

import '@koishijs/core'
import 'element-plus/dist/index.css'
import './index.scss'

globalThis.Schema = Schema

export default defineTheme({
  layouts: {
    home: defineAsyncComponent(() => import('./layouts/home/index.vue')),
    market: defineAsyncComponent(() => import('./layouts/market.vue')),
    starter: defineAsyncComponent(() => import('./layouts/starter.vue')),
    schema: defineAsyncComponent(() => import('./layouts/schema/index.vue')),
  },
  Layout,
  enhanceApp({ app }) {
    app.use(components)
    app.use(ElButton)
    app.use(ElCheckbox)
    app.use(ElColorPicker)
    app.use(ElDatePicker)
    app.use(ElDialog)
    app.use(ElDropdown)
    app.use(ElDropdownItem)
    app.use(ElDropdownMenu)
    app.use(ElInput)
    app.use(ElInputNumber)
    app.use(ElPagination)
    app.use(ElRadio)
    app.use(ElScrollbar)
    app.use(ElSelect)
    app.use(ElSlider)
    app.use(ElSwitch)
    app.use(ElTimePicker)
    app.use(ElTooltip)
    app.component('k-markdown', Markdown)
  },
})

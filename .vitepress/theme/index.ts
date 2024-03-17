import { defineTheme } from '@cordisjs/vitepress/client'
import { defineAsyncComponent } from 'vue'
import Empty from './components/empty.vue'
import Markdown from 'marked-vue'
import Schema from 'schemastery'
import components from '@koishijs/components'
import { createI18n } from 'vue-i18n'
import {
  ElButton,
  ElCascader,
  ElCheckbox,
  ElCollapseTransition,
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
import Layout from './layout.vue'
import Overview from './overview.vue'
import LayoutHome from './layouts/home/index.vue'
import LayoutMarket from './layouts/market.vue'
import LayoutStarter from './layouts/starter.vue'
import LayoutSchema from './layouts/schema/index.vue'

import '@koishijs/core'
import 'element-plus/dist/index.css'
import './index.scss'

globalThis.Schema = Schema

export default defineTheme({
  layouts: {
    home: LayoutHome,
    market: LayoutMarket,
    starter: LayoutStarter,
    schema: LayoutSchema,
  },
  Layout,
  enhanceApp({ app }) {
    const i18n = createI18n({
      legacy: false,
      locale: 'zh-CN',
      fallbackLocale: '',
    })

    app.use(components)
    app.use(ElButton)
    app.use(ElCascader)
    app.use(ElCheckbox)
    app.use(ElCollapseTransition)
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
    app.use(i18n)
    app.component('k-empty', Empty)
    app.component('k-markdown', Markdown)
    app.component('vp-overview', Overview)
  },
})

import ChatMessage from './components/ChatMessage.vue'
import PanelView from './components/PanelView.vue'
import { reactive, watch } from 'vue'
import { defineClientConfig } from '@vuepress/client'
import Layout from './layouts/Layout.vue'

export default defineClientConfig({
  layouts: {
    Layout,
  },
  enhance({ app }) {
    app.component('chat-message', ChatMessage)
    app.component('panel-view', PanelView)
    const key = 'koishi.docs.config'
    const data = {
      manager: 'yarn',
      language: 'ts',
      config: 'yaml',
      container: 'podman',
    }
    if (typeof localStorage !== 'undefined') {
      const config = localStorage.getItem(key)
      if (config) Object.assign(data, JSON.parse(config))
    }
    const storage = reactive(data)
    app.provide('$storage', storage)
    if (typeof localStorage !== 'undefined') {
      watch(storage, (val) => {
        localStorage.setItem(key, JSON.stringify(val))
      })
    }
  },
})

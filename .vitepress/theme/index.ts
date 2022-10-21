import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './styles/aside.scss'
import './styles/code.scss'
import './styles/doc.scss'
import './styles/vars.scss'

export default {
  ...DefaultTheme,
  Layout,
}

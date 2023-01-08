import { Component, defineComponent, h } from 'vue'
import All from './svg/all.vue'
import Balance from './svg/balance.vue'
import Business from './svg/business.vue'
import Console from './svg/console.vue'
import Download from './svg/download.vue'
import FileArchive from './svg/file-archive.vue'
import Game from './svg/game.vue'
import Insecure from './svg/insecure.vue'
import Other from './svg/other.vue'
import StarEmpty from './svg/star-empty.vue'
import StarFull from './svg/star-full.vue'
import StarHalf from './svg/star-half.vue'
import Storage from './svg/storage.vue'
import Tag from './svg/tag.vue'
import Tool from './svg/tool.vue'
import Verified from './svg/verified.vue'

const registry: Record<string, Component> = {
  'all': All,
  'balance': Balance,
  'business': Business,
  'download': Download,
  'file-archive': FileArchive,
  'console': Console,
  'game': Game,
  'insecure': Insecure,
  'other': Other,
  'star-empty': StarEmpty,
  'star-full': StarFull,
  'star-half': StarHalf,
  'storage': Storage,
  'tag': Tag,
  'tool': Tool,
  'verified': Verified,
}

export default defineComponent({
  props: {
    name: String,
  },
  render(props) {
    return props.name && h(registry[props.name])
  },
})

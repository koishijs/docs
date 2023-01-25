import { Component, defineComponent, h } from 'vue'

import Adapter from './svg/category/adapter.vue'
import Ai from './svg/category/ai.vue'
import Console from './svg/category/console.vue'
import Core from './svg/category/core.vue'
import Extension from './svg/category/extension.vue'
import Fun from './svg/category/fun.vue'
import Game from './svg/category/game.vue'
import Gametool from './svg/category/gametool.vue'
import Image from './svg/category/image.vue'
import Manage from './svg/category/manage.vue'
import Other from './svg/category/other.vue'
import Preset from './svg/category/preset.vue'
import Search from './svg/category/search.vue'
import Storage from './svg/category/storage.vue'
import Subscribe from './svg/category/subscribe.vue'
import Tool from './svg/category/tool.vue'

import Balance from './svg/market/balance.vue'
import Download from './svg/market/download.vue'
import FileArchive from './svg/market/file-archive.vue'
import Insecure from './svg/market/insecure.vue'
import Newborn from './svg/market/newborn.vue'
import Preview from './svg/market/preview.vue'
import StarEmpty from './svg/market/star-empty.vue'
import StarFull from './svg/market/star-full.vue'
import StarHalf from './svg/market/star-half.vue'
import Tag from './svg/market/tag.vue'
import Verified from './svg/market/verified.vue'

const registry: Record<string, Component> = {
  'adapter': Adapter,
  'ai': Ai,
  'balance': Balance,
  'console': Console,
  'core': Core,
  'download': Download,
  'extension': Extension,
  'file-archive': FileArchive,
  'fun': Fun,
  'game': Game,
  'gametool': Gametool,
  'image': Image,
  'insecure': Insecure,
  'manage': Manage,
  'newborn': Newborn,
  'other': Other,
  'preset': Preset,
  'preview': Preview,
  'search': Search,
  'star-empty': StarEmpty,
  'star-full': StarFull,
  'star-half': StarHalf,
  'storage': Storage,
  'subscribe': Subscribe,
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

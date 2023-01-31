import { Component, defineComponent, h } from 'vue'

import Balance from './market/balance.vue'
import Download from './market/download.vue'
import FileArchive from './market/file-archive.vue'
import Insecure from './market/insecure.vue'
import Newborn from './market/newborn.vue'
import Preview from './market/preview.vue'
import StarEmpty from './market/star-empty.vue'
import StarFull from './market/star-full.vue'
import StarHalf from './market/star-half.vue'
import Tag from './market/tag.vue'
import Verified from './market/verified.vue'

import outline from './category-outline'
import solid from './category-solid'

const registry: Record<string, Component> = {
  ...outline,
  ...solid,
  'balance': Balance,
  'download': Download,
  'file-archive': FileArchive,
  'insecure': Insecure,
  'newborn': Newborn,
  'preview': Preview,
  'star-empty': StarEmpty,
  'star-full': StarFull,
  'star-half': StarHalf,
  'tag': Tag,
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

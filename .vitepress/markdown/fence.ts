import MarkdownIt from 'markdown-it'

export default (md: MarkdownIt) => {
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args) => {
    const rawCode = fence(...args)
    return rawCode.replace(/<span class="lang">(.+?)<\/span>/, ($0, $1: string) => {
      const segments = $1.split(/\s+/)
      let title = segments[0]
      for (const text of segments.slice(1)) {
        if (text.startsWith('title=')) {
          title = text.slice(6)
        }
      }
      return `<span class="lang">${title}</span>`
    })
  }
}

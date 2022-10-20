import MarkdownIt from 'markdown-it'

export default (md: MarkdownIt) => {
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args) => {
    const rawCode = fence(...args)
    return rawCode.replace(/<span class="lang">(.+?)<\/span>/, ($0, $1) => {
      return `<span class="lang">${$1.split(' ', 1)[0]}</span>`
    })
  }
}

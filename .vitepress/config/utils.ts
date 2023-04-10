import { DefaultTheme } from 'vitepress'

type SidebarItem = DefaultTheme.SidebarItem

let prefix = ''

export function makeLink(text: string, link: string, getItems?: () => SidebarItem[]) {
  const oldPrefix = prefix
  prefix = (link = prefix + link)
  const items = getItems?.()
  prefix = oldPrefix
  return { text, link, items }
}

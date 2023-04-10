import { DefaultTheme } from 'vitepress'

type SidebarItem = DefaultTheme.SidebarItem

let prefix = ''

export function makeLink(text: string, link: string): { text: string, link: string }
export function makeLink(text: string, link: string, getItems: () => SidebarItem[]): { text: string, items: any[] }
export function makeLink(text: string, link: string, getItems?: () => SidebarItem[]) {
  const oldPrefix = prefix
  prefix = (link = prefix + link)
  const items = getItems?.()
  prefix = oldPrefix
  return items ? { text, items } : { text, link }
}

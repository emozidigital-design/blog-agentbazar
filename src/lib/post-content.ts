import 'server-only'
import DOMPurify from 'isomorphic-dompurify'
import { JSDOM } from 'jsdom'

export interface TocItem {
  id: string
  text: string
  level: number
}

const SANITIZE_CONFIG = {
  ALLOWED_TAGS: [
    'p', 'br', 'b', 'i', 'em', 'strong', 'u', 's', 'del', 'ins',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'dl', 'dt', 'dd',
    'blockquote', 'pre', 'code',
    'a', 'img',
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'colgroup', 'col',
    'div', 'span', 'section', 'article', 'aside', 'header', 'footer', 'main',
    'figure', 'figcaption', 'hr', 'sup', 'sub', 'mark',
  ],
  ALLOWED_ATTR: [
    'href', 'src', 'alt', 'title', 'class', 'id',
    'target', 'rel', 'width', 'height',
    'colspan', 'rowspan', 'scope', 'headers',
  ],
  ALLOW_DATA_ATTR: false,
}

export function processPostContent(rawHtml: string): { html: string; toc: TocItem[] } {
  const raw = rawHtml || ''
  if (!raw) return { html: '', toc: [] }

  const dom = new JSDOM(`<div id="root">${raw}</div>`)
  const div = dom.window.document.getElementById('root')!
  const toc: TocItem[] = []
  let count = 0

  div.querySelectorAll('h2, h3, h4, p').forEach((el) => {
    const tag = el.tagName.toLowerCase()
    if (tag === 'h2' || tag === 'h3' || tag === 'h4') {
      const text = el.textContent?.trim() || ''
      if (text) {
        const id = `heading-${count++}`
        el.id = id
        toc.push({ id, text, level: parseInt(tag[1]) })
      }
    } else if (tag === 'p') {
      const children = Array.from(el.childNodes)
      const onlyStrong = children.length === 1 && (el.firstElementChild?.tagName === 'STRONG' || el.firstElementChild?.tagName === 'B')
      const text = el.textContent?.trim() || ''
      if (onlyStrong && text && text.length < 120) {
        const id = `heading-${count++}`
        el.id = id
        toc.push({ id, text, level: 2 })
      }
    }
  })

  const withIds = div.innerHTML

  let cleaned = withIds.replace(/<li>\s*<\/li>/gi, '')
  cleaned = cleaned.replace(/<p>[^<]*Created with[^<]*Emozi Technologies.*?<\/p>/gi, '')
  cleaned = cleaned.replace(/Created with.*Emozi Technologies/gi, '')

  const sanitized = DOMPurify.sanitize(cleaned, SANITIZE_CONFIG)

  return { html: sanitized, toc }
}

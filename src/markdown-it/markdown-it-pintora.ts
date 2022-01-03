import mdItContainer from 'markdown-it-container'
import * as MarkdownIt from 'markdown-it'

type Options = {
  getTheme?: () => string
}

export const MarkdownItPintora = (md: MarkdownIt, options: Options = {}) => {
  const pluginKeyword = 'pintora'
  const tokenTypeInline = 'inline'
  const ttContainerOpen = 'container_' + pluginKeyword + '_open'
  const ttContainerClose = 'container_' + pluginKeyword + '_close'
  const empty = []

  md.use(mdItContainer, pluginKeyword, {
    anyClass: true,
    validate: (info) => {
      return info.trim() === pluginKeyword
    },

    render: (tokens, idx) => {
      const token = tokens[idx]
      const theme = options.getTheme()

      var src = ''
      if (token.type === ttContainerOpen) {
        for (var i = idx + 1; i < tokens.length; i++) {
          const value = tokens[i]
          if (value === undefined || value.type === ttContainerClose) {
            break
          }
          src += value.content
          if (value.block && value.nesting <= 0) {
            src += '\n'
          }
          // Clear these out so markdown-it doesn't try to render them
          value.tag = ''
          value.type = tokenTypeInline
          value.content = ''
          value.children = empty
        }
      }

      if (token.nesting === 1) {
        return `<div class="${pluginKeyword}" data-theme="${theme}">${preProcess(
          src
        )}`
      } else {
        return '</div>'
      }
    },
  })

  const highlight = md.options.highlight
  md.options.highlight = (code, lang) => {
    if (lang && lang.match(/\bpintora\b/i)) {
      const theme = options.getTheme()
      return `<pre style="all:unset;"><div class="${pluginKeyword}" data-theme="${theme}">${preProcess(
        code
      )}</div></pre>`
    }
    return highlight(code, lang, pluginKeyword)
  }
  return md
}

const preProcess = (/** @type {string} */ source) =>
  source.replace(/\</g, '&lt;').replace(/\>/g, '&gt;')

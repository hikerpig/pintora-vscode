/**
 * This script runs in VSCode markdown builtin preview webview
 */
import { pintoraStandalone } from '@pintora/standalone'

let hasThemeBeSet = false
const openedErrors = {}

const addCSS = css => (document.head.appendChild(document.createElement('style')).innerHTML = css)
addCSS(`
  .pintora-error pre {
   color: var(--vscode-errorForeground);
  }
  .pintora-error pre {
    display: none;
  }
  .pintora-error.open pre {
   display: block;
   color: var(--vscode-errorForeground);
  }
  .toggle {
   margin-top: 0.2em;
   display: block;
   font-weight: bold;
   font-family: monospace;
   font-size: 1.2rem;
   padding: 1rem;
   color: var(--vscode-errorForeground);
   cursor: pointer;
   border-radius: 7px;
   transition: all 0.25s ease-out;
   background: var(--vscode-inputValidation-errorBackground);
  }
  .pintora-error.open .toggle:after{
   content: "▾";
  }
  .pintora-error .toggle:after{
   content: "▸"
  }
`)

function init() {
  hasThemeBeSet = false
  let i = 0
  document.querySelectorAll('.pintora').forEach((container: HTMLDivElement, key) => {
    const id = `pintora-${Date.now()}-${i++}`
    const source = container.textContent

    const containerTheme = container.dataset.theme
    if (containerTheme && !hasThemeBeSet) {
      pintoraStandalone.setConfig({
        themeConfig: {
          theme: containerTheme,
        },
      })
      hasThemeBeSet = true
    }

    const out = document.createElement('div')
    out.id = id
    container.innerHTML = ''
    container.appendChild(out)
    const containerRenderer = container.dataset.renderer as any

    pintoraStandalone.renderTo(source, {
      container: out,
      renderer: containerRenderer || 'svg',
      onError(error) {
        console.error(error)
        const openError = openedErrors[key] ? 'open' : ''
        out.innerHTML = `
          <div class="pintora-error ${openError}" data-key="${key}">
             <span class="toggle">Syntax Error</span>
             <pre>${error.message}</pre>
          </div>
        `
      },
    })
  })
}

window.addEventListener('pointerdown', event => {
  const target = event.target as HTMLElement
  const parent = target.parentNode as HTMLElement
  if (!target.classList.contains('toggle')) return
  if (!parent.classList.contains('pintora-error')) return
  const key = parent.dataset.key

  if (parent.classList.contains('open')) {
    parent.classList.remove('open')
    delete openedErrors[key]
  } else {
    parent.classList.add('open')
    openedErrors[key] = true
  }
})

window.addEventListener('vscode.markdown.updateContent', init)

init()

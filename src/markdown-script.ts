/**
 * This script runs in VSCode markdown builtin preview webview
 */
import { pintoraStandalone } from '@pintora/standalone'

let hasThemeBeSet = false

function init() {
  hasThemeBeSet = false
  let i = 0
  document.querySelectorAll('.pintora').forEach((container: HTMLDivElement) => {
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
        out.innerHTML = `<pre style="color: var(--vscode-errorForeground)">${error.message}</pre>`
      },
    })
  })
}

window.addEventListener('vscode.markdown.updateContent', init)

init()

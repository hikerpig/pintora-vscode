import { pintoraStandalone } from '@pintora/standalone'
import { getTheme } from './util/webview-shared'

function init() {
  pintoraStandalone.setConfig({
    themeConfig: {
      theme: getTheme(),
    },
  })

  let i = 0
  document.querySelectorAll('.pintora').forEach((container) => {
    const id = `pintora-${Date.now()}-${i++}`
    const source = container.textContent

    const out = document.createElement('div')
    out.id = id
    container.innerHTML = ''
    container.appendChild(out)

    pintoraStandalone.renderTo(source, {
      container: out,
      onError(error) {
        console.error(error)
        out.innerHTML = `<pre style="color: var(--vscode-errorForeground)">${error.message}</pre>`
      }
    })
  })
}

window.addEventListener('vscode.markdown.updateContent', init)

init()

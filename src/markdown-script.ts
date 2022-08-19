/**
 * This script runs in VSCode markdown builtin preview webview
 */
import { pintoraStandalone } from '@pintora/standalone'

let hasThemeBeSet = false

function formatError(error){
  return `
    <div>
      <style>
        .mainErrorCollapse {
          margin-bottom: 1.2rem 0;
        }
        input[type='checkbox'] {
          display: none;
        }
        .lbl-toggle {
          display: block;
          font-weight: bold;
          font-family: monospace;
          font-size: 1.2rem;
          padding: 1rem;
          color: #ff4c4c;
          cursor: pointer;
          border-radius: 7px;
          transition: all 0.25s ease-out;
          background: #f553;
        }
        .errorCollapse-content {
          max-height: 0px;
          overflow-x: hidden;
          overflow-y: auto;
          transition: max-height .25s ease-in-out;
        }
        .toggle:checked + .lbl-toggle + .errorCollapse-content {
          max-height: 100vh;
        }
        .toggle:checked + .lbl-toggle::before {
          transform: rotate(90deg) translateX(-3px);
        }
        .lbl-toggle::before {
          content: ' ';
          display: inline-block;
        
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-left: 5px solid currentColor;
          vertical-align: middle;
          margin-right: .7rem;
          transform: translateY(-2px);
        
          transition: transform .2s ease-out;
        }
      </style>
    </div>
    <div class="mainErrorCollapse">
      <input id="errorCollapse" class="toggle" type="checkbox">
        <label for="errorCollapse" class="lbl-toggle">
          Syntax error
        </label>
      <div class="errorCollapse-content">
        <div class="content-inner">
          <pre style="color: var(--vscode-errorForeground)">
            <span style="color: #ff4c4c">${error.message.trim()}</span>
          </pre>  
        </div>
      </div>
    </div>
      `;
}

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
        out.innerHTML = formatError(error)
      },
    })
  })
}

window.addEventListener('vscode.markdown.updateContent', init)

init()

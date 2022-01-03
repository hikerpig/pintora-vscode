import * as vscode from 'vscode'
import { WebviewSendMessage, ExtensionConfig } from '../type'
import { pintoraStandalone } from '@pintora/standalone'
import { getTheme } from '../util/webview-shared'
import './index.css'

const messageHelper = (function () {
  let vscodeInterface: vscode.Webview
  try {
    vscodeInterface = (window as any).acquireVsCodeApi()
  } catch (error) {}

  return {
    postMessage(message) {
      vscodeInterface?.postMessage(message)
    },
  }
})()

const config: ExtensionConfig = (window as any)._config

function doPreview(text: string) {
  const container = document.getElementById('preview')
  container.innerHTML = ''

  pintoraStandalone.renderTo(text, {
    container,
    renderer: 'svg',
    onError(error) {
      console.error(error)
      container.innerHTML = `<pre class="error">${error.message}</pre>`
    },
  })
}

// -------- start
window.addEventListener('message', (event) => {
  const message: WebviewSendMessage = event.data
  // console.log('webview on message')
  switch (message.command) {
    case 'preview': {
      doPreview(message.data.text)
      break
    }
  }
})

messageHelper.postMessage({
  command: 'init',
})

pintoraStandalone.setConfig({
  themeConfig: {
    theme: getTheme(config),
  },
})

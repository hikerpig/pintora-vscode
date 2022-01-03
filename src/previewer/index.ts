import * as vscode from 'vscode'
import { WebviewSendMessage } from '../type'
import { pintoraStandalone } from '@pintora/standalone'
import './index.css'

const messageHelper = (function() {
  let vscodeInterface: vscode.Webview
  try {
    vscodeInterface = (window as any).acquireVsCodeApi()
  } catch (error) {
  }

  return {
    postMessage(message) {
      vscodeInterface?.postMessage(message)
    }
  }
})()

function doPreview(text: string) {
  const container = document.getElementById('preview')
  container.innerHTML = ''

  pintoraStandalone.renderTo(text, {
    container
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

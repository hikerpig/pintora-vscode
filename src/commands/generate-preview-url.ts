import * as vscode from 'vscode'
import * as path from 'path'
import { encodeForUrl } from '@pintora/core'
import config from '../config'
import { getLogChannel } from '../util/log'
import { getFileNameWithoutExt } from '../util/paths'
import * as btoa from 'btoa'

// polyfill btoa
if (!globalThis.btoa) globalThis.btoa = btoa.default

function pickRenderer() {
  return vscode.window.showQuickPick(
    [
      {
        label: 'svg',
        picked: true,
      },
      {
        label: 'canvas',
      },
    ],
    {
      title: 'Renderer',
    },
  )
}

export function initCommand() {
  let command = vscode.commands.registerCommand('pintora.generate-preview-url', async () => {
    const activeTextEditor = vscode.window.activeTextEditor
    const currentDoc = activeTextEditor.document
    const text = currentDoc.getText()

    const rendererItem = await pickRenderer()
    if (!rendererItem) {
      return
    }
    const renderer = rendererItem.label

    const editorUri = currentDoc.uri
    const url = `${config.previewUrl.replace(/\/$/, '')}/?code=${encodeForUrl(text)}&renderer=${renderer}`
    const name = getFileNameWithoutExt(editorUri.path)

    const outputPanel = getLogChannel()
    outputPanel.clear()

    outputPanel.appendLine(name + '\n')
    outputPanel.appendLine(url)
    outputPanel.show()
  })

  return command
}

import * as vscode from 'vscode'

export function getLogChannel() {
  return vscode.window.createOutputChannel('Pintora')
}

import * as vscode from 'vscode'

// let channel: vscode.OutputChannel
export function getLogChannel() {
  return vscode.window.createOutputChannel('Pintora')
}

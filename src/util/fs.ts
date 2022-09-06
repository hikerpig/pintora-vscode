import * as vscode from 'vscode'

export async function exists(s: string) {
  try {
    await vscode.workspace.fs.stat(vscode.Uri.parse(s))
  } catch (error) {
    return false
  }
  return true
}

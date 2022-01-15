import * as vscode from 'vscode'

class Config {
  get nodeExecutable(): string {
    const extensionConfig = vscode.workspace.getConfiguration('pintora')
    return extensionConfig.get('nodeExecutable')
  }
}

export default new Config()

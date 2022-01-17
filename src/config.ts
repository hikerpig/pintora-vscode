import * as vscode from 'vscode'

class Config {
  get pintoraExecutable(): string {
    const extensionConfig = vscode.workspace.getConfiguration('pintora')
    return extensionConfig.get('pintoraExecutable')
  }
}

export default new Config()

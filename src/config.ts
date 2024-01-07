import * as vscode from 'vscode'
import type { PintoraConfig } from '@pintora/standalone';

class Config {
  get pintoraExecutable(): string {
    const extensionConfig = vscode.workspace.getConfiguration('pintora')
    return extensionConfig.get('pintoraExecutable')
  }
  get previewUrl(): string {
    const extensionConfig = vscode.workspace.getConfiguration('pintora')
    return extensionConfig.get('previewUrl')
  }
}

export default new Config()

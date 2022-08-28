import * as vscode from 'vscode'
import { MarkdownItPintora } from './markdown-it/markdown-it-pintora'
import * as GENERATE_PREVIEW_URL from './commands/generate-preview-url'
import * as PREVIEW_DIAGRAM from './commands/preview-diagram'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(GENERATE_PREVIEW_URL.initCommand())
  context.subscriptions.push(PREVIEW_DIAGRAM.initCommand(context))

  return {
    extendMarkdownIt(md: any) {
      return md.use(MarkdownItPintora, {
        getTheme() {
          const extensionConfig = vscode.workspace.getConfiguration('pintora')
          const colorKind = vscode.window.activeColorTheme.kind
          const isDark =
            colorKind === vscode.ColorThemeKind.Dark ||
            colorKind === vscode.ColorThemeKind.HighContrast
          return (
            extensionConfig.get('theme') ||
            (isDark
              ? extensionConfig.get('vscode.dark')
              : extensionConfig.get('vscode.light'))
          )
        },
        getRenderer() {
          const extensionConfig = vscode.workspace.getConfiguration('pintora')
          return extensionConfig.get('renderer')
        },
      })
    },
  }
}

export function deactivate() {}

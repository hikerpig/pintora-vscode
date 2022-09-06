import { ExtensionConfig } from '../type'

/**
 * Get proper pintora theme by vscode theme and extension config
 */
export function getTheme(extensionConfig: ExtensionConfig) {
  if (extensionConfig.theme) return extensionConfig.theme
  const theme =
    document.body.classList.contains('vscode-dark') || document.body.classList.contains('vscode-high-contrast')
      ? extensionConfig.vscode.dark || 'dark'
      : extensionConfig.vscode.light || 'default'

  return theme
}

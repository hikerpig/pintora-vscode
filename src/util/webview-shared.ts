/**
 * Get proper pintora theme by vscode theme
 */
export function getTheme() {
  const theme =
    document.body.classList.contains('vscode-dark') ||
    document.body.classList.contains('vscode-high-contrast')
      ? 'dark'
      : 'default'

  return theme
}

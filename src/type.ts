export type PreviewerSendMessage = {
  command: 'init'
}

export type WebviewSendMessage = {
  command: 'preview',
  data: {
    text: string
  }
}

/**
 * Configuration throught vscode
 */
export type ExtensionConfig = {
  vscode: {
    dark: string
    light: string
  }
  theme: string
  // options: string
}

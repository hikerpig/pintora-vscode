export type PreviewerSendMessage = {
  command: 'init'
}

export type WebviewSendMessage = {
  command: 'preview',
  data: {
    text: string
  }
}
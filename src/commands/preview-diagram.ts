import * as vscode from 'vscode'
import { PreviewerSendMessage } from '../type'
import { MarkdownItPintora } from '../markdown-it/markdown-it-pintora'

export function initCommand(context: vscode.ExtensionContext) {
  let command = vscode.commands.registerCommand('pintora.preview-diagram', () => {
    const disposables: vscode.Disposable[] = []

    const initialActiveTextEditor = vscode.window.activeTextEditor
    // console.log(': initialActiveTextEditor is', initialActiveTextEditor)

    const panel = vscode.window.createWebviewPanel('pintoraPreview', 'Pintora Preview', vscode.ViewColumn.Two, {
      enableScripts: true,
    })
    const getWebviewContent = () => {
      const config = vscode.workspace.getConfiguration('pintora')


      const jsUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'out/previewer/index.js'))
      const cssUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'out/previewer/bundled.css'))
      return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Preview Pintora</title>
          <meta charset="utf-8" />
          <link rel="stylesheet" href="${cssUri}">
          <script>
            window._config = JSON.parse('${JSON.stringify(config)}');
          </script>
        </head>
        <body>
          <div id="preview" class="preview"></div>

          <script src="${jsUri}"></script>
        </body>
      </html>
      `
    }

    panel.webview.html = getWebviewContent()

    panel.webview.onDidReceiveMessage((message: PreviewerSendMessage) => {
      switch (message.command) {
        case 'init': {
          previewHandler(initialActiveTextEditor)
          break
        }
      }
    }, disposables)

    panel.onDidDispose(
      () => {
        console.log('panel closed')
        while (disposables.length) {
          const item = disposables.pop()
          if (item) {
            item.dispose()
          }
        }
      },
      null,
      context.subscriptions,
    )

    const previewHandler = (editor?: vscode.TextEditor) => {
      if (!editor) {
        editor = vscode.window.activeTextEditor
      }
      // console.log('previewHandler, editor is', editor)
      if (editor && /\.pintora$/.test(editor.document.fileName)) {
        const text = editor.document.getText()
        // const cursor = editor.document.offsetAt(editor.selection.anchor);
        panel.webview.postMessage({
          command: 'preview',
          data: {
            text,
          },
        })
      }
    }

    vscode.workspace.onDidChangeTextDocument(
      e => {
        const editor = vscode.window.activeTextEditor
        if (editor && e.document === editor.document) {
          previewHandler()
        }
      },
      null,
      disposables,
    )

    vscode.window.onDidChangeActiveTextEditor(
      editor => {
        previewHandler(editor)
      },
      null,
      disposables,
    )
  })

  return command
}

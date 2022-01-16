import * as vscode from 'vscode'

export function makeQuickPick(items: vscode.QuickPickItem[], defaultValue?: string) {
  const quickPick = vscode.window.createQuickPick()

  return {
    open() {
      return new Promise<string | null>((resolve, reject) => {
        let value = defaultValue
        quickPick.items = items
        quickPick.onDidChangeSelection(selections => {
          // console.log('selections', selections)
          const label = selections[0]?.label
          if (label) value = label
        })
        quickPick.onDidAccept(() => {
          quickPick.dispose()
          resolve(value)
        })
        quickPick.onDidHide(() => {
          quickPick.dispose()
          resolve(value)
        })

        quickPick.show()
      })
    },
    quickPick,
  }
}

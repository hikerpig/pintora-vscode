import * as vscode from 'vscode'
import * as pathe from 'pathe'
import * as mime from 'mime-types'
import * as child_process from 'child_process'
import { getLogChannel } from '../util/log'
import config from '../config'
import { makeQuickPick } from '../util/quick-pick'
import { replaceExtname } from '../util/paths'
import { exists } from '../util/fs'

function pickFormat() {
  const { quickPick, open } = makeQuickPick([
    {
      label: 'svg',
      picked: true,
    },
    {
      label: 'png',
    },
    {
      label: 'jpg',
    },
  ])
  quickPick.title = 'Output Format'
  return open()
}

function tryRequire(p: string) {
  try {
    return require.resolve(p)
  } catch (error) {}
}

export function initCommand() {
  let command = vscode.commands.registerCommand('pintora.export-diagram', async () => {
    const activeTextEditor = vscode.window.activeTextEditor
    const currentDoc = activeTextEditor.document
    if (currentDoc.isDirty) {
      vscode.window.showWarningMessage('Please save the file before exporting')
      return
    }

    const pintoraExecutable = config.pintoraExecutable
    const executableUri = vscode.Uri.parse(pintoraExecutable)
    try {
      await vscode.workspace.fs.stat(executableUri)
    } catch (error) {
      vscode.window.showErrorMessage(`pintoraExecutable is not valid, ${pintoraExecutable}`)
      return
    }

    const format = await pickFormat()
    if (!format) return
    const mimeType = mime.contentType(format)

    if (!mimeType) {
      return
    }

    const logChannel = getLogChannel()

    const editorUri = activeTextEditor.document.uri
    const name = replaceExtname(pathe.basename(editorUri.path), format)

    // let cliPath: string = tryRequire('@pintora/cli/bin/pintora')
    // if (!cliPath) {
    //   const extensionPath = vscode.extensions.getExtension(EXTENSION_NAME)?.extensionPath
    //   cliPath = path.join(extensionPath, 'node_modules', '@pintora/cli/bin/pintora')
    // }
    // if (!fs.existsSync(cliPath)) {
    //   vscode.window.showErrorMessage(`No @pintora/cli exists in ${cliPath}`)
    //   return
    // }

    const outputFilePath = pathe.join(pathe.dirname(editorUri.fsPath), name)

    // const params = [cliPath, 'render', '-i', editorUri.fsPath, '-o', outputFilePath]
    const params = [pintoraExecutable, 'render', '-i', editorUri.fsPath, '-o', outputFilePath]
    // console.log('params', params)

    const cp = child_process.spawn('node', params, {})
    let outputStr = ''
    let stderrStr = ''
    cp.stdout.on('data', (data: Buffer) => {
      outputStr += data.toString()
    })
    cp.stderr.on('data', (data: Buffer) => {
      stderrStr += data.toString()
    })
    cp.on('exit', async code => {
      let success = false
      if (code === 0) {
        if (await exists(outputFilePath)) {
          success = true
          vscode.window.showInformationMessage(`Write file to ${outputFilePath}`)
          logChannel.appendLine(outputStr)
        }
      }
      if (!success) {
        vscode.window.showErrorMessage(
          'Error while exporting diagram, please see Pintora in output panel for detailed logs',
        )
        logChannel.appendLine(outputStr)
        logChannel.appendLine(stderrStr)
      }
    })
  })
  return command
}

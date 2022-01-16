import * as vscode from 'vscode'
import * as path from 'path'
import * as fs from 'fs'
import * as mime from 'mime-types'
import * as child_process from 'child_process'
import { getLogChannel } from '../util/log'
import config from '../config'
import { EXTENSION_NAME } from '../const'
import { makeQuickPick } from '../util/quick-pick'

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

function replaceExtname(input: string, newExt: string) {
  const ext = path.extname(input)
  return input.slice(0, input.length - ext.length) + '.' + newExt.replace(/^\./, '')
}

function tryRequire(p: string) {
  try {
    return require.resolve(p)
  } catch (error) {
  }
}

export function initCommand() {
  let command = vscode.commands.registerCommand('pintora.export-diagram', async () => {
    const activeTextEditor = vscode.window.activeTextEditor
    const currentDoc = activeTextEditor.document
    if (currentDoc.isDirty) {
      vscode.window.showWarningMessage('Please save the file before exporting')
      return
    }

    const nodeExecutable = config.nodeExecutable
    if (!fs.existsSync(nodeExecutable)) {
      vscode.window.showErrorMessage(`nodeExecutable is not valid, ${nodeExecutable}`)
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
    const name = replaceExtname(path.basename(editorUri.path), format)

    let cliPath: string = tryRequire('@pintora/cli/bin/pintora')
    if (!cliPath) {
      const extensionPath = vscode.extensions.getExtension(EXTENSION_NAME)?.extensionPath
      cliPath = path.join(extensionPath, 'node_modules', '@pintora/cli/bin/pintora')
    }
    if (!fs.existsSync(cliPath)) {
      vscode.window.showErrorMessage(`No @pintora/cli exists in ${cliPath}`)
      return
    }

    const outputFilePath = path.join(path.dirname(editorUri.fsPath), name)

    const params = [cliPath, 'render', '-i', editorUri.fsPath, '-o', outputFilePath]
    // console.log('params', params)

    const cp = child_process.spawn(nodeExecutable, params, {})
    let outputStr = ''
    let stderrStr = ''
    cp.stdout.on('data', (data: Buffer) => {
      outputStr += data.toString()
    })
    cp.stderr.on('data', (data: Buffer) => {
      stderrStr += data.toString()
    })
    cp.on('exit', code => {
      let success = false
      if (code === 0) {
        if (fs.existsSync(outputFilePath)) {
          success = true
          vscode.window.showInformationMessage(`Write file to ${outputFilePath}`)
          logChannel.appendLine(outputStr)
        }
      }
      if (!success) {
        vscode.window.showErrorMessage('Error while exporting diagram, please see output for detailed logs')
        logChannel.appendLine(outputStr)
        logChannel.appendLine(stderrStr)
      }
    })
  })
  return command
}

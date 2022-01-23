import * as path from 'path'

export function replaceExtname(input: string, newExt: string) {
  const ext = path.extname(input)
  return input.slice(0, input.length - ext.length) + '.' + newExt.replace(/^\./, '')
}

export function getFileNameWithoutExt(input: string) {
  const basename = path.basename(input)
  const ext = path.extname(basename)
  return basename.slice(0, basename.length - ext.length)
}
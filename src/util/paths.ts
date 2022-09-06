import * as pathe from 'pathe'

export function replaceExtname(input: string, newExt: string) {
  const ext = pathe.extname(input)
  return input.slice(0, input.length - ext.length) + '.' + newExt.replace(/^\./, '')
}

export function getFileNameWithoutExt(input: string) {
  const basename = pathe.basename(input)
  const ext = pathe.extname(basename)
  return basename.slice(0, basename.length - ext.length)
}

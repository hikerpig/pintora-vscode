const fs = require('fs-extra')
const GRAMMAR_SCHEMA = require("./_custom-yaml-types").GRAMMAR_SCHEMA;
const read = require('yaml-import').read
const path = require('path')

const FILE_INS = [
  '../syntaxes/pintora.tmLanguage.yaml',
  '../syntaxes/markdown-pintora.tmLanguage.yaml',
]
const DIR_OUT = '../out'

fs.ensureDirSync(path.join(__dirname, DIR_OUT))

FILE_INS.forEach((inputFile) => {
  const outputName = path.basename(inputFile).replace('.yaml', '.json')
  const outputFile = `${DIR_OUT}/${outputName}`

  const res = read(path.join(__dirname, inputFile), null, GRAMMAR_SCHEMA)

  fs.writeFileSync(path.join(__dirname, outputFile), JSON.stringify(res, null, 2), {
    encoding: 'utf8',
  })
})
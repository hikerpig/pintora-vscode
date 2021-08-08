const fs = require('fs-extra')
const GRAMMAR_SCHEMA = require("./_custom-yaml-types").GRAMMAR_SCHEMA;
const read = require('yaml-import').read
const path = require('path')

const FILE_IN = '../syntaxes/pintora.tmLanguage.yaml',
  DIR_OUT = '../out',
  FILE_OUT = `${DIR_OUT}/pintora.tmLanguage.json`

const res = read(path.join(__dirname, FILE_IN), null, GRAMMAR_SCHEMA)

fs.ensureDirSync(path.join(__dirname, DIR_OUT))
fs.writeFileSync(path.join(__dirname, FILE_OUT), JSON.stringify(res, null, 2), {
  encoding: 'utf8',
})

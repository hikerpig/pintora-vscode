const fs   = require('fs');
const path = require('path');
const util = require('util');
const yaml = require('js-yaml');


const RegexYamlType = new yaml.Type('!regex', {
  kind: 'scalar',
  construct: function (data) {
    return data
      //Remove end of line comments (space then #)
      .replace(/(^|\s)#.*/g, '')
      //Remove new lines from yaml multistring
      .replace(/\n/g, '');
  }
});

const GRAMMAR_SCHEMA = yaml.Schema.create(yaml.SAFE_SCHEMA, [ RegexYamlType ]);

// do not execute the following if file is required (http://stackoverflow.com/a/6398335)
if (require.main === module) {

  // And read a document using that schema.
  fs.readFile(path.join(__dirname, 'custom_types.yml'), 'utf8', function (error, data) {
    let loaded;

    if (!error) {
      loaded = yaml.load(data, { schema: GRAMMAR_SCHEMA });
      console.log(util.inspect(loaded, false, 20, true));
    } else {
      console.error(error.stack || error.message || String(error));
    }
  });
}

// There are some exports to play with this example interactively.
module.exports.RegexYamlType = RegexYamlType;
module.exports.GRAMMAR_SCHEMA  = GRAMMAR_SCHEMA;
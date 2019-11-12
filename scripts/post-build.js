const fs = require('fs')

const template = fs
  .readFileSync('./scripts/content-script-template.js')
  .toString()

const bundle = fs.readFileSync('./extension/index.js').toString()

const contentScript = template.replace(
  '/* SCRIPT_TEXT_CONTENT */',
  'decodeURI("' + encodeURI(bundle) + '")'
)

fs.writeFileSync('./extension/content-script.js', contentScript)
console.log('Created content-script!')

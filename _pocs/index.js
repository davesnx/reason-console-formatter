import createFormatters from './formatters'

let installed = false

function install() {
  const gw = typeof window === 'undefined' ? global : window

  // Don't install more than once
  if (installed === true) {
    return
  }

  gw.devtoolsFormatters = gw.devtoolsFormatters || []

  const { RecordFormatter, ListFormatter } = createFormatters()

  gw.devtoolsFormatters.push(RecordFormatter, ListFormatter)

  installed = true
}

module.exports = install
export default install

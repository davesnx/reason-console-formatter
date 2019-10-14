import createFormatters from './formatters'

let reasonFormatterInstalled = false

function install() {
  const gw = typeof window === 'undefined' ? global : window

  // Don't install more than once
  if (reasonFormatterInstalled === true) {
    return
  }

  gw.devtoolsFormatters = gw.devtoolsFormatters || []

  const { RecordFormatter, ListFormatter } = createFormatters()

  gw.devtoolsFormatters.push(RecordFormatter, ListFormatter)

  reasonFormatterInstalled = true
}

module.exports = install
export default install

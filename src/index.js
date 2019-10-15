import {
  formatHeaderInFull,
  formatHeaderAsSummary,
  formatBody
} from './formatter'

const rootFormatter = {
  header(data) {
    // if (data.__IS_NESTED__) return formatters.formatHeaderAsTitle(data.value);
    if (data.length >= 100) return formatHeaderAsSummary(data.slice(0, 99))
    return formatHeaderInFull(data)
  },

  hasBody(data) {
    return !!data
    // return data && data.toJS && (data.size >= 100 || data.__IS_NESTED__);
  },

  body(data) {
    return formatBody(data)
  }
}

let formattersLoaded = false
function install() {
  const gw = typeof window === 'undefined' ? global : window

  // Don't install more than once.
  if (formattersLoaded === true) {
    return
  }

  gw.devtoolsFormatters = gw.devtoolsFormatters || []
  gw.devtoolsFormatters.push(rootFormatter)

  formattersLoaded = true
}

install()

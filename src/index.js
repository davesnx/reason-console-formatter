import { ListFormatter } from './formatter'

let formattersLoaded = false

function install() {
  const gw = typeof window === 'undefined' ? global : window

  // Don't install more than once.
  if (formattersLoaded === true) {
    return
  }

  gw.devtoolsFormatters = gw.devtoolsFormatters || []
  gw.devtoolsFormatters.push(ListFormatter)
  // console.log(gw.devtoolsFormatters)

  formattersLoaded = true
}

install()

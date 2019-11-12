import { ListFormatter } from './formatter'
import window from 'global/window'

window.formattersLoaded = false

const install = () => {
  // Don't install more than once.
  if (window.formattersLoaded === true) {
    return
  }

  window.devtoolsFormatters = window.devtoolsFormatters || []
  window.devtoolsFormatters.push(ListFormatter)
  window.formattersLoaded = true

  console.log('LOADED')
}

install()

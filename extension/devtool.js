var timesExtensionHasLoaded = getAndIncrementTimesExtensionHasLoaded()

// I don't think there's an easy way to detect if custom formatters have been enabled in the settings...
var moreTimes = 4 - (timesExtensionHasLoaded - 1)
if (moreTimes >= 0) {
  var message =
    "Reason Formatter: Make sure to check 'Enable custom formatters' in the DevTools settings."
  message +=
    ' (This message will show ' +
    moreTimes +
    ' more time' +
    (moreTimes === 1 ? '' : 's') +
    '.)'
  chrome.devtools.inspectedWindow.eval(
    'console.log("' + message + '")',
    function() {}
  )
}

function getAndIncrementTimesExtensionHasLoaded() {
  var timesExtensionHasLoaded = localStorage.getItem('timesExtensionHasLoaded')
  if (timesExtensionHasLoaded === undefined) {
    timesExtensionHasLoaded = 0
  }
  timesExtensionHasLoaded++
  localStorage.setItem('timesExtensionHasLoaded', timesExtensionHasLoaded)
  return parseInt(timesExtensionHasLoaded, 10)
}

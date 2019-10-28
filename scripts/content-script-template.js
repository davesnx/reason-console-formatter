/* eslint-disable-file */
var s = document.createElement('script')
// If we load the script with s.src="bundle.js" other code may run on the page before our the devtoolsFormatters are installed
// In that case the ReasonML types would appear unformatted
s.textContent = "[[SCRIPT_TEXT_CONTENT]]" // eslint-disable-line
var parentNode = document.head || document.documentElement
parentNode.appendChild(s)
parentNode.removeChild(s)

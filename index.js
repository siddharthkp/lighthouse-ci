const lighthouse = require('lighthouse')
const chrome = require('lighthouse/lighthouse-cli/chrome-launcher.js').ChromeLauncher

const config = require('lighthouse/lighthouse-core/config/perf.json')
const flags = {}
const url = 'https://example.com'

const launcher = new chrome({ port: 9222, autoSelectChrome: true })

launcher
.isDebuggerReady()
.catch(() => launcher.run()) // Launch Chrome
.then(() => lighthouse(url, flags, config)) // Run Lighthouse
.then(results => launcher.kill().then(() => results)) // Kill Chrome and return results
.then(results => {
  results.artifacts = undefined // Disable artifacts
  console.log(results)
})
.catch(err => {
  console.log(err)
  launcher.kill().then(() => { // Kill Chrome if there's an error.
    throw(err)
  })
})

import UAParser from 'ua-parser-js'
import chromiumDetector from 'chromium-detector'
import { format as timeago } from 'timeago.js'
import escapeHtml from 'escape-html'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'github-fork-ribbon-css/gh-fork-ribbon.css'
import './style.css'

/* ************************************************************** */
// Utils
/* ************************************************************** */

/**
 * Maps across each of the elements from a query selector
 * @param querySelector: the query selector, NodeList, or array to use
 * @param fn: function to execute
 */
function $each (querySelector, fn) {
  if (typeof (querySelector) === 'string') {
    Array.from(document.querySelectorAll(querySelector)).forEach(fn)
  } else if (typeof (querySelector) === 'object' && querySelector.constructor === window.NodeList) {
    Array.from(querySelector).forEach(fn)
  } else if (Array.isArray(querySelector)) {
    querySelector.forEach(fn)
  }
}

/**
 * Removes the class from multiple items
 * @param querySelector: the queryselector to use
 * @param className: the classname to remove
 */
function $classListRemove (querySelector, className) {
  $each(querySelector, ($el) => $el.classList.remove(className))
}

/**
 * Sets the src on the elements
 * @param querySelector: the queryselector to use
 * @param src: the src to set
 */
function $setSrc (querySelector, src) {
  $each(querySelector, ($el) => { $el.src = src })
}

/**
 * Sets the src on the elements
 * @param querySelector: the queryselector to use
 * @param text: the text content to set
 */
function $setText (querySelector, text) {
  $each(querySelector, ($el) => { $el.textContent = text })
}

/**
 * Creates an element from a template
 * @param id: the id of the template
 * @return { $el, targets }
 */
function templateCreate (id) {
  const $el = document.querySelector(`[data-template="${id}"]`).firstElementChild.cloneNode(true)
  const targets = Array.from($el.querySelectorAll('[data-tt]')).reduce((acc, $target) => {
    const id = $target.getAttribute('data-tt')
    if (acc[id]) {
      if (!Array.isArray(acc[id])) {
        acc[id] = [acc[id]]
      }
      acc[id].push($target)
    } else {
      acc[id] = $target
    }
    return acc
  }, {})

  return { $el, targets }
}

/* ************************************************************** */
// Parsing
/* ************************************************************** */

const detect = chromiumDetector.getBrowserInfo()
const latestChromiumVersion = window.chromiumVersions.linux.version.split('.')[0]
const isRecentChromiumVersion = (
  latestChromiumVersion === detect.version ||
  `${parseInt(latestChromiumVersion) - 1}` === detect.version ||
  detect.version > latestChromiumVersion
)

const parser = new UAParser(window.chromiumUserAgent || window.navigator.userAgent)
const claims = {
  name: 'Unknown',
  version: '',
  icon: undefined
}

if (!claims.name || !claims.version) {
  claims.name = parser.getBrowser().name
  claims.version = (parser.getBrowser().version || '').split('.')[0]
}
if (typeof (window.navigator.brave) === 'object') {
  claims.name = 'Brave'
}
if (window.navigator.userAgentData && window.navigator.userAgentData.brands && window.navigator.userAgentData.brands.length) {
  if (window.navigator.userAgentData.brands[0].brand === 'Wavebox') {
    claims.name = 'Wavebox'
    claims.version = window.navigator.userAgentData.brands[0].version
  }
}

switch (claims.name.toLowerCase()) {
  case 'chrome':
  case 'google chrome': claims.icon = 'assets/chrome.svg'; break
  case 'edg': claims.icon = 'assets/edge.svg'; break
  case 'firefox': claims.icon = 'assets/firefox.svg'; break
  case 'brave': claims.icon = 'assets/brave.png'; break
  case 'safari': claims.icon = 'assets/safari.png'; break
  case 'wavebox': claims.icon = 'assets/wavebox.svg'; break
  default: claims.icon = 'assets/globe.svg'; break
}

/* ************************************************************** */
// Outdated
/* ************************************************************** */

if (!isRecentChromiumVersion && detect.isChromium) {
  $classListRemove('[data-hook="outdated-warning"]', 'hide')
  const releaseDate = (detect.tests[detect.version] || {}).releaseDate
  $setText(
    '[data-hook="outdated-timeago"]',
    releaseDate
      ? timeago(releaseDate)
      : 'No data'
  )

  const newerVersions = window.chromiumCVE.versions.filter((v) => v > detect.version)
  const vulnerabilitiesFixed = newerVersions.reduce((acc, version) => {
    return acc + window.chromiumCVE.info[version].reduce((acc, fixes) => {
      return acc + fixes.cve.length
    }, 0)
  }, 0)

  $setText('[data-hook="outdated-vulnerabilities"]', vulnerabilitiesFixed)
  if (detect.version !== claims.version) {
    $classListRemove('[data-hook="outdated-claims-newer"]', 'hide')
  }
}

/* ************************************************************** */
// Claim
/* ************************************************************** */

$setSrc('[data-hook="claims-icon"]', claims.icon)
$setText('[data-hook="claims-name"]', claims.name)
$setText('[data-hook="claims-version"]', claims.version)
$setText('[data-hook="claims-useragent"]', window.chromiumUserAgent || window.navigator.userAgent)
$setText('[data-hook="claims-client-hints"]', window.navigator.userAgentData && window.navigator.userAgentData.brands
  ? window.navigator.userAgentData.brands
      .filter(({ brand }) => brand !== ';Not A Brand')
      .map(({ brand, version }) => `${brand} ${version}`)
      .join(', ')
  : 'Not available')

/* ************************************************************** */
// Detection
/* ************************************************************** */

if (detect.isChromium) {
  if (detect.version === claims.version) {
    $classListRemove('[data-hook="detect-chromium-correct-version"]', 'hide')
  } else {
    $classListRemove('[data-hook="detect-chromium-incorrect-version"]', 'hide')
  }
} else {
  $classListRemove('[data-hook="detect-not-chromium"]', 'hide')
}
$setText(
  '[data-hook="detect-version"]',
  detect.couldBeOlder
    ? `${detect.version} or older`
    : detect.couldBeNewer
      ? `${detect.version} or newer`
      : detect.version
)

/* ************************************************************** */
// Detection tests
/* ************************************************************** */

Object.keys(detect.tests)
  .sort((a, b) => parseInt(b) - parseInt(a))
  .forEach((version) => {
    const { result, tests, pass, releaseDate, isPreRelease } = detect.tests[version]
    const { $el, targets } = templateCreate('detect-version')

    const classNameMod = result === true
      ? 'success'
      : isPreRelease
        ? 'info'
        : pass === tests.length - 1
          ? 'warning'
          : 'danger'

    const vulnerabilitiesFixed = (window.chromiumCVE.info[version] || []).reduce((acc, fixes) => {
      return acc.concat(fixes.cve)
    }, [])
    targets.version.textContent = `Chromium ${version}`
    targets.release.textContent = releaseDate
    targets.vulnerabilities.textContent = vulnerabilitiesFixed.length
    targets.vulnerabilitiesbutton.classList.add(`btn-${classNameMod}`)
    targets.vulnerabilitieslist.innerHTML = vulnerabilitiesFixed.map((t) => (
      `<li><span class="dropdown-item">${escapeHtml(t)}</span></li>`
    )).join('\n')
    if (vulnerabilitiesFixed.length === 0) {
      targets.vulnerabilitiescontainer.classList.add('hide')
    }
    targets.version.classList.add(`text-${classNameMod}`)

    tests.forEach(({ name, url, test, optional }) => {
      const { $el: $listEl, targets } = templateCreate('detect-version-test')
      if (test) {
        $listEl.classList.add('list-group-item-success')
        targets.status.textContent = 'PASS'
        targets.status.classList.add('bg-success')
      } else {
        const mod = isPreRelease
          ? 'info'
          : optional ? 'warning' : 'danger'
        $listEl.classList.add(`list-group-item-${mod}`)
        targets.status.textContent = optional ? 'UNAVAILABLE' : 'FAIL'
        targets.status.classList.add(`bg-${mod}`)
      }
      targets.name.textContent = name
      targets.info.href = url

      $el.appendChild($listEl)
    })
    document.querySelector('#detect-tests').appendChild($el)
  })

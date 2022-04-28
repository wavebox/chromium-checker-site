import UAParser from 'ua-parser-js'
import { getBrowserInfo } from './detector'
import escapeHtml from 'escape-html'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'github-fork-ribbon-css/gh-fork-ribbon.css'
import { $setSrc, $setText, templateCreate, $show } from './utils'
import './styles/utils.css'
import './styles/masthead.css'
import './styles/footer.css'
import './styles/notchromium.css'
import './styles/chromium.css'

/* ************************************************************** */
// Not Chromium
/* ************************************************************** */

/**
 * Renders the not chromium view
 */
function renderNotChromium () {
  $show('#not-chromium')
  const parser = new UAParser(window.navigator.userAgent)
  switch (parser.getBrowser().name) {
    case 'Firefox':
      $show('#not-chromium [data-hook="detected-firefox"]')
      break
    case 'Mobile Safari':
    case 'Safari':
      $show('#not-chromium [data-hook="detected-safari"]')
      break
    default:
      $show('#not-chromium [data-hook="detected-unknown"]')
      break
  }
}

/* ************************************************************** */
// Chromium
/* ************************************************************** */

/**
 * @returns info from the UserAgent
 */
function getUAInfo () {
  const parser = new UAParser(window.chromiumUserAgent || window.navigator.userAgent)
  const info = {
    parser,
    name: 'Unknown',
    version: '',
    icon: undefined
  }

  if (!info.name || !info.version) {
    info.name = parser.getBrowser().name
    info.version = (parser.getBrowser().version || '').split('.')[0]
  }
  if (typeof (window.navigator.brave) === 'object') {
    info.name = 'Brave'
  }
  if (window.navigator.userAgentData && window.navigator.userAgentData.brands && window.navigator.userAgentData.brands.length) {
    if (window.navigator.userAgentData.brands[0].brand === 'Wavebox') {
      info.name = 'Wavebox'
      info.version = window.navigator.userAgentData.brands[0].version
    }
  }

  switch (info.name.toLowerCase()) {
    case 'chrome':
    case 'google chrome': info.icon = 'assets/chrome.svg'; break
    case 'edg': info.icon = 'assets/edge.svg'; break
    case 'firefox': info.icon = 'assets/firefox.svg'; break
    case 'brave': info.icon = 'assets/brave.png'; break
    case 'safari': info.icon = 'assets/safari.png'; break
    case 'wavebox': info.icon = 'assets/wavebox.svg'; break
    default: info.icon = 'assets/globe.svg'; break
  }

  return info
}

/**
 * Renders the chromium view
 * @param detection: the detection results
 */
function renderChromium (detection) {
  // Grab some info
  const uaInfo = getUAInfo()
  const latestChromiumVersion = window.chromiumVersions.linux.version.split('.')[0]
  const isRecentChromiumVersion = (
    latestChromiumVersion === detection.version ||
    `${parseInt(latestChromiumVersion) - 1}` === detection.version ||
    parseInt(detection.version) > parseInt(latestChromiumVersion)
  )

  // Browser details
  $setText('#is-chromium .browser-info [data-hook="browser-name"]', uaInfo.name)
  $setText('#is-chromium .browser-info [data-hook="browser-version"]', uaInfo.version)
  $setText('#is-chromium .browser-info [data-hook="detected-version"]', detection.version)
  $setSrc('#is-chromium .browser-info [data-hook="browser-icon"]', uaInfo.icon)

  // Version
  if (isRecentChromiumVersion) {
    $show('#chromium-recent')
  } else {
    $show('#chromium-outdated')
  }

  if (detection.version !== uaInfo.version && !detection.couldBeNewer) {
    $show('#chromium-claims-incorrect')
  }

  // Detection tests
  {
    const testVersions = Object.keys(detection.tests).sort((a, b) => parseInt(b) - parseInt(a))
    let unpachedVulnerabilities = []
    for (const version of testVersions) {
      const { result, pass, tests, releaseDate, isPreRelease } = detection.tests[version]
      const { $el, targets } = templateCreate('detect-version')

      const classNameMod = result === true
        ? 'success'
        : isPreRelease || pass === tests.length - 1
          ? 'info'
          : 'danger'

      let vulnerabilitiesFixed = []
      for (const fixes of (window.chromiumCVE.info[version] || [])) {
        vulnerabilitiesFixed = [...vulnerabilitiesFixed, ...fixes.cve]
        if (classNameMod === 'danger') {
          unpachedVulnerabilities = [...unpachedVulnerabilities, ...fixes.cve]
        }
      }

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
          const mod = isPreRelease || pass === tests.length - 1
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
      document.querySelector('#detection-tests').appendChild($el)
    }

    // Aggregated vuln count
    $setText('#is-chromium [data-hook="vulnerability-count"]', unpachedVulnerabilities.length)
    if (unpachedVulnerabilities.length) {
      const $el = document.getElementById('vulnerability-list')
      for (const fix of unpachedVulnerabilities) {
        $el.innerHTML += `<li class="list-group-item">${escapeHtml(fix)}</li>`
      }
    }
  }

  $show('#is-chromium')
}

/* ************************************************************** */
// Entry
/* ************************************************************** */

function main () {
  const detection = getBrowserInfo()
  const { isChromium } = detection

  if (isChromium) {
    renderChromium(detection)
  } else {
    renderNotChromium()
  }

  $setText('#is-chromium [data-hook="ua-useragent"]', window.chromiumUserAgent || window.navigator.userAgent || 'Unavailable')
  $setText('#is-chromium [data-hook="ua-useragent-headers"]', window.chromiumUserAgent || 'Unavailable')
  $setText('#is-chromium [data-hook="ua-useragent-js"]', window.navigator.userAgent || 'Unavailable')
  if (window.chromiumUserAgent === window.navigator.userAgent) {
    $show('#is-chromium [data-hook="ua-matching-useragent"]')
  } else {
    $show('#is-chromium [data-hook="ua-differing-useragent"]')
  }
  $setText('[data-hook="ua-client-hints"]', window.navigator.userAgentData && window.navigator.userAgentData.brands
    ? window.navigator.userAgentData.brands
      .filter(({ brand }) => brand !== ';Not A Brand')
      .map(({ brand, version }) => `${brand} ${version}`)
      .join(', ')
    : 'Not available')
}

main()

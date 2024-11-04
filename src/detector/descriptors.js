import {
  isFunction,
  isObject,
  supportsCSSProp,
  supportsCSSValue,
  supportsCSSQuery
} from './utils'

// https://chromestatus.com/features
// https://chromestatus.com/newfeatures?q=browsers.chrome.desktop%253D129
export const descriptors = {
  131: {
    releaseDate: 'Pre-release',
    isPreRelease: true,
    tests: [
      {
        url: 'https://chromestatus.com/feature/5094192052436992',
        name: 'Feature: CSS Anchor Positioning: anchor-scope',
        test: () => supportsCSSProp('anchorScope')
      }
    ]
  },
  130: {
    releaseDate: '2024-10-15',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5162398704205824',
        name: 'Feature: Full and unprefixed box-decoration-break support',
        test: () => supportsCSSProp('boxDecorationBreak')
      }
    ]
  },
  129: {
    releaseDate: '2024-09-17',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5193021205774336',
        name: 'Feature: Intl.DurationFormat',
        test: () => isFunction(Intl.DurationFormat)
      }
    ]
  },
  128: {
    releaseDate: '2024-08-21',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5152412192210944',
        name: 'Feature: CSS ruby-align property',
        test: () => supportsCSSProp('rubyAlign')
      },
      {
        url: 'https://chromestatus.com/feature/5201014343073792',
        name: 'document.caretPositionFromPoint API',
        test: () => isFunction(document.caretPositionFromPoint)
      },
      {
        url: 'https://chromestatus.com/feature/6315704705089536',
        name: 'Feature: Promise.try',
        test: () => isFunction(Promise.try)
      }
    ]
  },
  127: {
    releaseDate: '2024-07-21',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5720910061371392',
        name: 'Feature: CSS font-size-adjust',
        test: () => supportsCSSProp('fontSizeAdjust')
      }
    ]
  },
  126: {
    releaseDate: '2024-06-12',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5606741606924288',
        name: 'Feature: toJSON for GeolocationCoordinates and GeolocationPosition',
        test: () => isFunction(window.GeolocationCoordinates.prototype.toJSON)
      },
      {
        url: 'https://chromestatus.com/feature/5774579609108480',
        name: 'Feature: visualViewport.onscrollend Support',
        test: () => window.visualViewport.onscrollend !== undefined
      }
    ]
  },
  125: {
    releaseDate: '2024-05-14',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5500897196244992',
        name: 'Feature: CSS Stepped Value Functions',
        test: () => {
          const $el = document.createElement('div')
          $el.style.width = 'round(25.5px, 50px)'
          return $el.style.width === 'calc(50px)'
        }
      },
      {
        url: 'https://chromestatus.com/feature/5586433790443520',
        name: 'Feature: CSS custom state new :state() syntax',
        test: () => supportsCSSQuery('body:state(checked)')
      }
    ]
  },
  124: {
    releaseDate: '2024-04-17',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5479301497749504',
        name: 'Feature: \'pageswap\' event',
        test: () => window.onpageswap !== undefined // null or function
      },
      {
        url: 'https://chromestatus.com/feature/5189728691290112',
        name: 'Feature: WebSocketStream',
        test: () => isFunction(window.WebSocketStream)
      }
    ]
  },
  123: {
    releaseDate: '2024-03-27',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5205586941837312',
        name: 'Feature: \'pagereveal\' event',
        test: () => window.onpagereveal !== undefined // null or function
      },
      {
        url: 'https://chromestatus.com/feature/4909742688567296',
        name: 'Feature: CSS light-dark() Color Function',
        test: () => supportsCSSValue('background', 'light-dark(lime, green)')
      },
      {
        url: 'https://chromestatus.com/feature/5076557983121408',
        name: 'Feature: NavigationActivation',
        test: () => isObject(window.navigation.activation)
      },
      {
        url: 'https://chromestatus.com/feature/5176596826161152',
        name: 'Feature: field-sizing CSS property',
        test: () => supportsCSSProp('fieldSizing')
      }
    ]
  },
  122: {
    releaseDate: '2024-02-21',
    tests: [
      {
        url: 'https://chromestatus.com/feature/6280344932450304',
        name: 'Feature: Set methods',
        test: () => isFunction(window.Set.prototype.union)
      }
    ]
  },
  121: {
    releaseDate: '2024-01-23',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5111537299881984',
        name: 'Feature: HTMLSelectElement showPicker()',
        test: () => isFunction(document.createElement('select').showPicker)
      },
      {
        url: 'https://chromestatus.com/feature/5176417696612352',
        name: 'Feature: Feature detection for supported clipboard formats',
        test: () => isFunction(window.ClipboardItem.supports)
      }
    ]
  },
  120: {
    releaseDate: '2023-12-05',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5751531651465216',
        name: 'Feature: CSS :dir() pseudo-class selector',
        test: () => supportsCSSQuery('*:dir(ltr)')
      }
    ]
  },
  119: {
    releaseDate: '2023-10-31',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5810984110784512',
        name: 'Promise.withResolvers',
        test: () => isFunction(Promise.withResolvers)
      },
      {
        url: 'https://chromestatus.com/feature/5132477781245952',
        name: 'Feature: :user-valid and :user-invalid CSS pseudo-classes',
        test: () => supportsCSSQuery('*:user-invalid')
      }
    ]
  },
  118: {
    releaseDate: '2023-10-10',
    tests: [
      {
        url: 'https://chromestatus.com/feature/6237096230518784',
        name: 'Feature: CSS logical flow-relative values',
        test: () => supportsCSSValue('float', 'inline-start')
      }
    ]
  },
  117: {
    releaseDate: '2023-09-12',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5714791975878656',
        name: 'Array grouping',
        test: () => isFunction(Object.groupBy)
      },
      {
        url: 'https://chromestatus.com/feature/5145771917180928',
        name: 'CSS text-wrap: pretty',
        test: () => supportsCSSValue('textWrap', 'pretty')
      }
    ]
  },
  116: {
    releaseDate: '2023-08-09',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5202879349522432',
        name: 'AbortSignal.any()',
        test: () => isFunction(window.AbortSignal.any)
      }
    ]
  },
  115: {
    releaseDate: '2023-07-20',
    tests: [
      {
        url: 'https://chromestatus.com/feature/6752840701706240',
        name: 'Scroll-driven animations',
        test: () => supportsCSSProp('animationTimeline')
      }
    ]
  },
  114: {
    releaseDate: '2023-05-30',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5073244152922112',
        name: 'ArrayBuffer.prototype.transfer',
        test: () => isFunction(ArrayBuffer.prototype.transfer)
      },
      {
        url: 'https://chromestatus.com/feature/5186382643855360',
        name: 'Scrollend Event',
        test: () => document.body.onscrollend !== undefined // null or function
      },
      {
        url: 'https://chromestatus.com/feature/5463833265045504',
        name: 'Feature: The Popover API',
        test: () => document.body.popover !== undefined // null or function
      }
    ]
  },
  113: {
    releaseDate: '2023-05-02',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5109745420075008',
        name: 'image-set',
        test: () => supportsCSSValue('backgroundImage', 'image-set(url("/assets/wavebox.svg") 1x, url("/assets/wavebox.svg") 2x)')
      }
    ]
  },
  112: {
    releaseDate: '2023-04-04',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5599641280708608',
        name: 'Feature: CSS animation-composition property',
        test: () => supportsCSSProp('animationComposition')
      }
    ]
  },
  111: {
    releaseDate: '2023-03-07',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5165381072191488',
        name: 'Feature: CSS Trigonometric functions',
        test: () => {
          const $el = document.createElement('div')
          $el.style.width = 'calc(100px * sin(45deg))'
          return $el.style.width.startsWith('calc(')
        }
      },
      {
        url: 'https://chromestatus.com/feature/4668361878274048',
        name: 'Feature: Resizable ArrayBuffer and growable SharedArrayBuffer',
        test: () => isFunction(new ArrayBuffer().resize)
      },
      {
        url: 'https://chromestatus.com/feature/5730575560736768',
        name: 'Feature: baseline-source',
        test: () => supportsCSSProp('baselineSource', 'first')
      }
    ]
  },
  110: {
    releaseDate: '2023-02-07',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5190163462881280',
        name: 'AudioContext.setSinkId()',
        test: () => isFunction(new window.AudioContext().setSinkId)
      },
      {
        url: 'https://chromestatus.com/feature/5659629104136192',
        name: 'Features: Remove window.webkitStorageInfo',
        test: () => window.webkitStorageInfo === undefined
      }
    ]
  },
  109: {
    releaseDate: '2023-01-11',
    tests: [
      {
        url: 'https://chromestatus.com/feature/4998371945742336',
        name: 'Feature: CSS "lh" Length Unit',
        test: () => supportsCSSValue('width', '1lh')
      }
    ]
  },
  108: {
    releaseDate: '2022-11-29',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5093352798683136',
        name: 'Feature: Last Baseline Item Alignment',
        test: () => supportsCSSValue('alignItems', 'last baseline')
      }
    ]
  },
  107: {
    releaseDate: '2022-10-25',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5206436850696192',
        name: 'URLPattern ignoreCase',
        test: () => {
          if (!window.URLPattern) { return false }
          try {
            const pattern = new window.URLPattern('https://example.com/books/:id', { ignoreCase: true }) // eslint-disable-line no-unused-vars
            return true
          } catch (ex) {
            if (ex.message === 'Failed to construct \'URLPattern\': Invalid baseURL \'[object Object]\'') {
              return false
            } else {
              throw ex
            }
          }
        }
      },
      {
        url: 'https://chromestatus.com/feature/5166965277589504',
        name: 'Render blocking status in Resource Timing',
        test: () => {
          if (!window.performance.getEntriesByType) { return false }
          const resources = window.performance.getEntriesByType('resource')
          if (!resources || !resources.length) { return false }
          return resources[0].renderBlockingStatus !== undefined
        }
      }
    ]
  },
  106: {
    releaseDate: '2022-09-27',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5707621009981440',
        name: 'Intl.NumberFormat v3 API',
        test: () => {
          if (!window.Intl || !window.Intl.NumberFormat) { return false }
          const nf = new window.Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'CHF',
            maximumFractionDigits: 0
          })
          return isFunction(nf.formatRange) && nf.formatRange(3, 5) === 'CHF 3–5' // Includes invisible characters
        }
      }
    ]
  },
  105: {
    releaseDate: '2022-08-30',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5452774595624960',
        name: 'blocking=rendering attribute on scripts and style sheets',
        test: () => window.DOMTokenList && document.createElement('script').blocking instanceof window.DOMTokenList
      },
      {
        url: 'https://chromestatus.com/feature/5794378545102848',
        name: ':has() pseudo class',
        test: () => {
          try {
            document.querySelector('body:has(*)')
            return true
          } catch (ex) {
            return false
          }
        }
      }
    ]
  },
  104: {
    releaseDate: '2022-08-02',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5213032857731072',
        name: 'CSS object-view-box',
        test: () => supportsCSSProp('object-view-box')
      },
      {
        url: 'https://chromestatus.com/feature/5705698193178624',
        name: 'Individual Properties for CSS Transforms',
        test: () => supportsCSSProp('rotate')
      }
    ]
  },
  103: {
    releaseDate: '2022-06-21',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5768400507764736',
        name: 'AbortSignal.timeout() Static Method',
        test: () => isFunction(window.AbortSignal.timeout)
      }
    ]
  },
  102: {
    releaseDate: '2022-05-25',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5703266176335872',
        name: 'inert attribute',
        test: () => document.createElement('div').inert !== undefined
      }
    ]
  },
  101: {
    releaseDate: '2022-04-26',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5674031696052224',
        name: 'font-palette and custom @font-palette-values palettes',
        test: () => supportsCSSProp('fontPalette')
      }
    ]
  },
  100: {
    releaseDate: '2022-03-29',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5029737100476416',
        name: 'AbortSignal.prototype.throwIfAborted',
        test: () => isFunction(window.AbortSignal.prototype.throwIfAborted)
      },
      {
        url: 'https://chromestatus.com/feature/5252960583942144',
        name: 'Multi-Screen Window Placement',
        test: () => isFunction(window.getScreenDetails)
      }
    ]
  },
  99: {
    releaseDate: '2022-03-1',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5692248021794816',
        name: 'HTMLInputElement showPicker()',
        test: () => isFunction(document.createElement('input').showPicker)
      },
      {
        url: 'https://chromestatus.com/feature/5679635154075648',
        name: 'Unprefixed text-emphasis properties',
        test: () => supportsCSSProp('text-emphasis')
      }
    ]
  },
  98: {
    releaseDate: '2022-02-1',
    tests: [
      {
        url: 'https://chromestatus.com/features/5630001077551104',
        name: 'self.structuredClone()',
        test: () => isFunction(window.structuredClone)
      }
    ]
  },
  97: {
    releaseDate: '2022-01-04',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5693639729610752',
        name: 'Array and TypedArray findLast and findLastIndex',
        test: () => isFunction([].findLast)
      },
      {
        url: 'https://chromestatus.com/feature/5687325523705856',
        name: 'transform: perspective(none)',
        test: () => supportsCSSValue('transform', 'perspective(none)')
      }
    ]
  },
  96: {
    releaseDate: '2021-11-15',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5646323212615680',
        name: 'Media Queries: prefers-contrast feature',
        test: () => window.matchMedia('(prefers-contrast: more)').media === '(prefers-contrast: more)'
      }
    ]
  },
  95: {
    releaseDate: '2021-10-19',
    tests: [
      {
        url: 'https://chromestatus.com/features/5709654999957504',
        name: 'Logical properties for contain-intrinsic-size',
        test: () => supportsCSSProp('containIntrinsicBlockSize')
      }
    ]
  },
  94: {
    releaseDate: '2021-09-21',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5144822362931200',
        name: 'Feature Policy: display-capture',
        test: () => document.createElement('iframe').featurePolicy.allowedFeatures().includes('display-capture')
      },
      {
        url: 'https://chromestatus.com/features/5746559209701376',
        name: 'CSS Overflow: scrollbar-gutter',
        test: () => supportsCSSProp('scrollbarGutter')
      }
    ]
  },
  93: {
    releaseDate: '2021-08-31',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5642501387976704',
        name: 'AbortSignal.abort() static method',
        test: () => isFunction(window.AbortSignal.abort)
      },
      {
        url: 'https://chromestatus.com/feature/5662263404920832',
        name: 'Object.hasOwn',
        test: () => isFunction(Object.hasOwn)
      },
      {
        url: 'https://chromestatus.com/feature/5727099325251584',
        name: 'Feature: Error.cause property',
        test: () => {
          const error = new Error('MyError', { cause: 'testing' })
          return error.cause === 'testing'
        }
      },
      {
        url: 'https://chromestatus.com/feature/5092414224072704',
        name: 'noplaybackrate in HTMLMediaElement.controlsList',
        test: () => {
          const $el = document.createElement('video')
          return $el.controlsList.supports('noplaybackrate')
        }
      }
    ]
  },
  92: {
    releaseDate: '2021-07-20',
    tests: [
      {
        url: 'https://chromestatus.com/feature/6520669959356416',
        name: 'dayPeriod option for Intl.DateTimeFormat',
        test: () => {
          const dtf = new Intl.DateTimeFormat('en', { hour: 'numeric', dayPeriod: 'short' })
          return dtf.format(new Date('2019-05-20T07:00:00')).length > 4
        }
      },
      {
        url: 'https://chromestatus.com/feature/6123640410079232',
        name: 'Relative indexing method for Array, String, and TypedArrays',
        test: () => isFunction([].at)
      }
    ]
  },
  91: {
    releaseDate: '2021-05-21',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5692693659254784',
        name: 'CSS custom counter styles',
        test: () => {
          const $style = document.createElement('style')
          $style.innerHTML = '@counter-style custom { system: fixed; symbols: Ⓐ Ⓑ Ⓒ; suffix: " "; }'
          document.head.appendChild($style)
          const $el = document.createElement('ul')
          $el.style.listStyle = 'custom'
          const pass = $el.style.listStyle === 'custom'
          document.head.removeChild($style)
          return pass
        }
      }
    ]
  },
  90: {
    releaseDate: '2021-04-14',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5638444178997248',
        name: 'Add support for CSS properties "overflow: clip" and "overflow-clip-margin"',
        test: () => supportsCSSValue('overflow', 'clip')
      },
      {
        url: 'https://chromestatus.com/feature/5737185317748736',
        name: 'Support specifying width/height on <source> elements for <picture>',
        test: () => document.createElement('source').width !== undefined
      }
    ]
  },
  89: {
    releaseDate: '2021-03-02',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5172464636133376',
        name: 'WebHID support',
        optional: true, // Mobile devices
        test: () => isObject(window.navigator.hid)
      },
      {
        url: 'https://chromestatus.com/feature/6561346332131328',
        name: 'disclosure-open and disclosure-closed keywords for CSS list-style-type property',
        test: () => supportsCSSValue('listStyleType', 'disclosure-open')
      }
    ]
  },
  88: {
    releaseDate: '2021-01-19',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5445716612743168',
        name: 'CSS Selectors 4 Pseudo-Classes :is(), :where()',
        test: () => supportsCSSQuery(':where(div)')
      },
      {
        url: 'https://chromestatus.com/feature/5738050678161408',
        name: 'CSS aspect-ratio property',
        test: () => supportsCSSProp('aspectRatio')
      }
    ]
  },
  87: {
    releaseDate: '2020-11-17',
    tests: [
      {
        url: 'https://chromestatus.com/feature/6243382101803008',
        name: 'Atomics.waitAsync',
        test: () => isFunction(Atomics.waitAsync)
      },
      {
        url: 'https://chromestatus.com/feature/5658847691669504',
        name: 'Cookie Store API',
        test: () => isObject(window.cookieStore)
      },
      {
        url: 'https://chromestatus.com/features/5719830432841728',
        name: 'Is-Input-Pending',
        test: () => isFunction(window.navigator.scheduling.isInputPending)
      },
      {
        url: 'https://chromestatus.com/feature/5747636764147712',
        name: 'text-decoration-thickness',
        test: () => supportsCSSProp('textDecorationThickness')
      }
    ]
  },
  86: {
    releaseDate: '2020-10-06',
    tests: [
      {
        url: 'https://chromestatus.com/feature/6710566854852608',
        name: 'CSS ::marker pseudo-element',
        test: () => supportsCSSQuery('::marker')
      },
      {
        url: 'https://chromestatus.com/feature/5823526732824576',
        name: 'CSS Selectors 4 Pseudo-Class :focus-visible',
        test: () => supportsCSSQuery(':focus-visible')
      },
      {
        url: 'https://chromestatus.com/feature/6284708426022912',
        name: 'File System Access',
        optional: true, // Brave doesn't implement this
        test: () => isFunction(window.showOpenFilePicker)
      },
      {
        url: 'https://chromestatus.com/feature/5742134990733312',
        name: 'HTMLMediaElement.preservesPitch',
        test: () => document.createElement('video').preservesPitch !== undefined
      },
      {
        url: 'https://chromestatus.com/feature/6143552666992640',
        name: 'ParentNode.replaceChildren() Method',
        test: () => isFunction(document.body.replaceChildren)
      }
    ]
  },
  85: {
    releaseDate: '2020-08-25',
    tests: [
      {
        url: 'https://chromestatus.com/feature/4613920211861504',
        name: 'CSS content-visibility property',
        test: () => supportsCSSProp('contentVisibility')
      },
      {
        url: 'https://chromestatus.com/feature/4688138070917120',
        name: 'CSS counter-set',
        test: () => supportsCSSProp('counterSet')
      },
      {
        url: 'https://chromestatus.com/feature/5574922384441344',
        name: 'Promise.any and AggregateError',
        test: () => isFunction(Promise.any)
      },
      {
        url: 'https://chromestatus.com/feature/6040389083463680',
        name: 'String.prototype.replaceAll',
        test: () => isFunction(''.replaceAll)
      }
    ]
  },
  84: {
    releaseDate: '2020-07-14',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5892186633666560',
        name: 'JavaScript weak references',
        test: () => isFunction(window.WeakRef)
      },
      {
        url: 'https://chromestatus.com/feature/4636879949398016',
        name: 'Screen Wake Lock API',
        test: () => isObject(window.navigator.wakeLock)
      },
      {
        url: 'https://chromestatus.com/feature/4715298156445696',
        name: 'Unprefixed appearance CSS property',
        test: () => supportsCSSProp('appearance')
      },
      {
        url: 'https://chromestatus.com/feature/6249925820022784',
        name: 'Unprefixed ruby-position CSS property',
        test: () => supportsCSSProp('rubyPosition')
      },
      {
        url: 'https://chromestatus.com/feature/5644990145363968',
        name: 'revert keyword',
        test: () => supportsCSSValue('display', 'revert')
      }
    ]
  },
  83: {
    releaseDate: '2020-05-19',
    tests: [
      {
        url: 'https://chromestatus.com/feature/4757990523535360',
        name: 'Barcode Detection API',
        optional: true, // Some electron instances don't implement this
        test: () => isFunction(window.BarcodeDetector)
      },
      {
        url: 'https://chromestatus.com/feature/5913213940006912',
        name: 'auto keyword for -webkit-appearance CSS property CSS',
        test: () => supportsCSSValue('webkitAppearance', 'auto')
      },
      {
        url: 'https://chromestatus.com/feature/5737051062272000',
        name: 'CSS contain-intrinsic-size',
        test: () => supportsCSSProp('containIntrinsicSize')
      },
      {
        url: 'https://chromestatus.com/feature/6335927192387584',
        name: 'HTMLVideoElement.requestVideoFrameCallback()',
        test: () => isFunction(document.createElement('video').requestVideoFrameCallback)
      }
    ]
  },
  81: {
    releaseDate: '2020-04-07',
    tests: [
      {
        url: 'https://chromestatus.com/feature/4965112605573120',
        name: 'Intl.DisplayNames',
        test: () => isFunction(window.Intl.DisplayNames)
      },
      {
        url: 'https://chromestatus.com/feature/5440098147500032',
        name: 'Streams API: WritableStream close()',
        test: () => isFunction(new window.WritableStream().close)
      },
      {
        url: 'https://chromestatus.com/feature/6313474512650240',
        name: 'Support for CSS image-orientation property',
        test: () => supportsCSSProp('imageOrientation')
      }
    ]
  },
  80: {
    releaseDate: '2020-02-04',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5668660729348096',
        name: 'line-break: anywhere',
        test: () => supportsCSSValue('lineBreak', 'anywhere')
      },
      {
        url: 'https://chromestatus.com/feature/5687791428042752',
        name: 'HTMLVideoElement.getVideoPlaybackQuality()',
        test: () => isFunction(document.createElement('video').getVideoPlaybackQuality)
      },
      {
        url: 'https://chromestatus.com/feature/5126089347170304',
        name: 'overflow-wrap: anywhere',
        test: () => supportsCSSValue('overflowWrap', 'anywhere')
      }
    ]
  },
  79: {
    releaseDate: '2019-12-10',
    tests: [
      {
        url: 'https://chromestatus.com/feature/5685958032752640',
        name: 'font-optical-sizing',
        test: () => supportsCSSProp('fontOpticalSizing')
      }
    ]
  }
}

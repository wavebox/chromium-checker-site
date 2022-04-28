import { descriptors } from './descriptors'

const getBrowserInfo = () => {
  const versions = Object.keys(descriptors)
    .sort((a, b) => parseInt(a) - parseInt(b))
  const results = versions.reduce((acc, k) => {
    const { tests, releaseDate, isPreRelease } = descriptors[k]
    acc[k] = {
      pass: 0,
      result: true,
      tests: [],
      releaseDate,
      isPreRelease: isPreRelease === true
    }
    tests.forEach(({ url, name, test, optional }) => {
      const result = {
        url,
        name,
        optional: optional === true
      }
      try {
        result.test = test()
      } catch (ex) {
        result.test = false
      }
      if (result.test) {
        acc[k].pass++
      } else {
        if (optional !== true) {
          acc[k].result = false
        }
      }
      acc[k].tests.push(result)
    })
    return acc
  }, {})

  const version = versions.find((version, index) => {
    if (index === versions.length - 1) { return true }
    switch (results[versions[index + 1]].result) {
      case false: return true
      default: return false
    }
  })
  const hasInexactMatches = versions.some((version) => {
    if (results[version].pass === 0) { return false }
    if (results[version].pass === results[version].tests.length) { return false }
    if (results[version].pass === results[version].tests.length - 1) { return false }
    return true
  })

  return {
    version: version || 'unknown',
    couldBeOlder: version === versions[0],
    couldBeNewer: version === versions[versions.length - 1],
    tests: results,
    isChromium: !hasInexactMatches
  }
}

export default {
  getBrowserInfo
}
export {
  getBrowserInfo
}

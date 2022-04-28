/**
 * @param v: value to check
 * @return true if the value is of type function
 */
export function isFunction (v) {
  return (
    typeof (v) === 'function' &&
    typeof (v.toString) === 'function' &&
    v.toString().includes('[native code]')
  )
}

/**
 * @param v: value to check
 * @return true if the value is of type object
 */
export function isObject (v) {
  return typeof (v) === 'object'
}

/**
 * @param name: the name of the css property
 * @return true if the css property is present
 */
export function supportsCSSProp (name) {
  return document.createElement('div').style[name] !== undefined
}

/**
 * @param name: the name of the css property
 * @param value: the css property value
 * @return true if the css value could be set
 */
export function supportsCSSValue (name, value) {
  const $el = document.createElement('div')
  $el.style[name] = value
  return $el.style[name] === value
}

/**
 * @param query: the css query to check
 * @return true if the css query is supported
 */
export function supportsCSSQuery (query) {
  try {
    document.querySelector(query)
    return true
  } catch (ex) {
    return false
  }
}

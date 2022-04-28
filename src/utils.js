/**
 * Maps across each of the elements from a query selector
 * @param querySelector: the query selector, NodeList, or array to use
 * @param fn: function to execute
 */
export function $each (querySelector, fn) {
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
export function $classListRemove (querySelector, className) {
  $each(querySelector, ($el) => $el.classList.remove(className))
}

/**
 * Sets the src on the elements
 * @param querySelector: the queryselector to use
 * @param src: the src to set
 */
export function $setSrc (querySelector, src) {
  $each(querySelector, ($el) => { $el.src = src })
}

/**
 * Sets the src on the elements
 * @param querySelector: the queryselector to use
 * @param text: the text content to set
 */
export function $setText (querySelector, text) {
  $each(querySelector, ($el) => { $el.textContent = text })
}

/**
 * Creates an element from a template
 * @param id: the id of the template
 * @return { $el, targets }
 */
export function templateCreate (id) {
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

/**
 * Hides the elements
 * @param querySelector: the queryselector to use
 */
export function $hide (querySelector) {
  $each(querySelector, ($el) => { $el.classList.add('hide') })
}

/**
 * Shows the elements
 * @param querySelector: the queryselector to use
 */
export function $show (querySelector) {
  $each(querySelector, ($el) => { $el.classList.remove('hide') })
}

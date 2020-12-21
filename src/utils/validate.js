/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {Object} array
 * @returns {Boolean}
 * **/

export function validArray(array) {
  return array.length > 0
}

/**
 * @param {Object} obj
 * @returns {Boolean}
 * **/

export function validObject(obj) {
  return Object.keys(obj).length > 0
}
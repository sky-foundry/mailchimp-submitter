/**
 * Transforms a JavaScript object's key and values to
 * url parameters seperated by '&'.
 *
 * @param obj object to transform into url paramters
 */
export default function objToUrlParams(obj: { [key: string]: any }): string {
  let str = ''
  for (const key in obj) {
    if (str != '') {
      str += '&'
    }
    str += key + '=' + encodeURIComponent(obj[key])
  }

  return str
}

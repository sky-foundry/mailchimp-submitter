/**
 * Returns an element in an array and deletes it if found,
 * otherwise returns undefined.
 *
 * @param array array to find and delete element from
 * @param callback function to execute on each value in the array
 */
export default function findAndRemove<T>(
  array: T[],
  callback: (element: T, index?: number, array?: T[]) => boolean
): T | undefined {
  const foundIndex = array.findIndex(callback)
  if (foundIndex === -1) {
    return undefined
  }

  return array.splice(foundIndex, 1)[0]
}

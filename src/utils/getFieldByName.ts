import findAndRemove from './findAndRemove'

/**
 * Returns the value of a field from an array
 * of fields.
 * If an item is found, the field is removed
 * from the fields array.
 *
 * If the field does not exist, an error is thrown.
 *
 * @param fields list of all fields
 * @param name field name to find
 */
export default function getFieldValueByName(
  fields: HTMLInputElement[],
  name: string
): string {
  const field = findAndRemove<HTMLInputElement>(
    fields,
    field => field.name === name
  )
  if (!field) {
    throw new Error(`missing field '${name}' in mailchimp form`)
  }

  return field.value
}
